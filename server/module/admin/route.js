const router = require('express').Router();
const Admin = require('./admin');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Models

const Item = require('../../module/item/item');
const Borrow = require('../../module/borrow/borrow');

/**
 * method: POST
 * path: /admin/register
 */

router.post('/register', async (req, res, next) => {
  try {
    const {email, password} = req.body;

    // check exisit email
    const user = await Admin.findOne({email});

    console.log(user);
    if (user) throw new Error(`User with email ${user.email} already exists`);

    // hashing password
    const hash = await argon2.hash(password);

    // save new admin
    await Admin.create({email, password: hash});
    res.send({message: 'Success Registration'});
  } catch (error) {
    next(error);
  }
});

/**
 * method: POST
 * path: /admin/login
 */

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body;

    // Check if email existing
    const user = await Admin.findOne({email});

    if (!user) throw new Error('Email or password not match');

    // verify password
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) throw new Error('Email or password not match');

    // create jwt token

    const token = jwt.sign({id: user._id}, process.env.ADMIN_JWT_SECRET);
    res.send({message: 'Success Login', token});
  } catch (error) {
    next(error);
  }
});

// Upload items

const multer = require('multer');
const path = require('path');

const TOOL_IMAGE_PATH = path.resolve('.', 'public/images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TOOL_IMAGE_PATH); // specify the upload directory
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]; // get the file extension
    const filename = 'images_' + Date.now() + '.' + ext; // create a unique file name
    cb(null, filename);
  },
});

const upload = multer({storage: storage});

/**
 * method: POST
 * path: /items
 */

router.post('/items', upload.single('image'), async (req, res, next) => {
  try {
    const body = {
      ...req.body,
      image: req.file.filename,
      status: 'ok',
    };
    await Item.create(body);

    res.send({message: 'Create item successfully'});
  } catch (error) {
    next(error);
  }
});

// Booking
router.put('/bookings', async (req, res, next) => {
  try {
    const {status} = req.body;
    if (status === 'accepted') {
      const borrows = await Borrow.find({_id: {$in: req.body.items.map(item => item.id)}});
      const filterItems = borrows?.map(borrow => ({item_id: borrow.item_id, id: borrow._id}));

      const items = await Item.find({_id: {$in: filterItems.map(ft => ft.item_id)}});

      for (const filterId of filterItems) {
        const item = items.find(it => it._id.equals(filterId.item_id));

        // const borrowItems = await Borrow.find({item_id: filterId.item_id, status: 'accepted'});
        const borrowItems = await Borrow.aggregate([
          {$match: {item_id: filterId.item_id, status: 'accepted'}},
          {$group: {_id: null, totalQuantity: {$sum: '$quantity'}}},
        ]);

        if (borrowItems.length === 0) {
          await Borrow.updateOne({_id: filterId.id}, {status: req.body.status});
        } else if (item.stock > borrowItems[0].totalQuantity) {
          const borrow = (await Borrow.findOne({_id: filterId.id})) ?? 0;

          if (borrowItems[0].totalQuantity + borrow.quantity < item.stock) {
            borrow.status = req.body.status;
            await borrow.save();
          }
        }
      }
    } else if (status === 'rejected') {
      // rejected
      await Borrow.updateMany({_id: {$in: req.body.items.map(item => item.id)}}, {status: status});
    } else {
      // recieve
      await Borrow.updateMany({_id: {$in: req.body.items.map(item => item.id)}}, {status: status});
    }

    res.send({message: 'Update booking successfully'});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/bookings', async (req, res, next) => {
  try {
    const borrows = await Borrow.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item',
        },
      },
      {
        $unwind: {
          path: '$item',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room_id',
          foreignField: '_id',
          as: 'room',
        },
      },
      {
        $unwind: {
          path: '$room',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: {
            date: '$createdAt',
            status: '$status',
            user: '$user.username',
            room: '$room.name',
          },
          items: {
            $push: {
              name: '$item.name',
              quantity: '$quantity',
            },
          },
          ids: {
            $push: {
              id: '$_id',
            },
          },
        },
      },
      {$sort: {'_id.date': -1}},
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$_id.date',
            },
          },
          room: '$_id.room',
          user: '$_id.user',
          status: '$_id.status',
          items: 1,
          ids: 1,
        },
      },
    ]);
    res.send({message: 'Successful get bookings', data: borrows});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
