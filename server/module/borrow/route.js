const router = require('express').Router();

// middleware
const requireAuth = require('../../middleware/requireAuth');
const Item = require('../item/item');

// Models
const Borrow = require('./borrow');

// Borrow list of item

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const borrows = await Borrow.aggregate([
      {
        $match: {
          user_id: req.user._id,
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item',
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
          path: '$item',
          preserveNullAndEmptyArrays: false,
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
            receive_date: '$updatedAt',
            status: '$status',
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
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d %H:%M',
              date: '$_id.date',
            },
          },
          receive_date: {
            $cond: {
              if: {$eq: ['$_id.status', 'receive']},
              then: {
                $dateToString: {
                  format: '%Y-%m-%d %H:%M',
                  date: '$_id.receive_date',
                },
              },
              else: '$$REMOVE',
            },
          },
          status: '$_id.status',
          room: '$_id.room',
          items: 1,
        },
      },
      {$sort: {date: -1}},
      {$limit: 20},
    ]);

    res.send({message: 'Successful get bookings', data: borrows});
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const {items} = req.body;

    if (!items) throw new Error('Items not found');
    const promises = items.map(
      async item =>
        await Borrow.create({
          item_id: item._id,
          user_id: req.user._id,
          quantity: item.total,
          room_id: item.roomId,
          date: new Date(),
        })
    );
    await Promise.all(promises);
    res.send({message: 'Successful booking'});
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || 'Something went wrong',
    });
  }
});

router.put('/', async (req, res, next) => {
  try {
    // Validate total
    const borrows = await Borrow.find({_id: {$in: req.body.items}});
    const filterItems = borrows?.map(borrow => borrow.item_id);

    const items = await Item.find({_id: {$in: filterItems}});

    await Borrow.updateMany({_id: {$in: req.body.items}}, {status: req.body.status});
    res.send({message: 'Update booking successfully'});
  } catch (error) {
    next();
  }
});

module.exports = router;
