const router = require('express').Router();
const Room = require('./room');
const Item = require('../item/item');
const Borrow = require('../borrow/borrow');
// const adminPassport = require('@/middleware/adminPassport');

/**
 * method: GET
 * path: /rooms
 */

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.find({}).sort({name: 1, nameLowerCase: 1}).collation({locale: 'en', strength: 2});
    res.send({message: 'Success Get Rooms', data: rooms});
  } catch (error) {
    next(error);
  }
});

router.get('/:roomId', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.send({message: 'Success get a room', data: room});
  } catch (error) {
    next(error);
  }
});

/**
 * method: POST
 * path: /rooms/new
 */

router.post('/', async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.send({message: 'Success Create a Room', data: room});
  } catch (error) {
    next(error);
  }
});

/**
 * method: POST
 * path: /rooms/remove
 */

router.post('/remove', async (req, res, next) => {
  try {
    const {id} = req.body;

    await Promise.all([
      Room.findOneAndDelete({_id: id}),
      Item.deleteMany({refRoom: id}),
      Borrow.deleteMany({room_id: id}),
    ]);
    res.send({message: 'Success Delete a Room'});
  } catch (error) {
    next(error);
  }
});

/**
 * method: PUT
 * path: /rooms
 */

router.put('/', async (req, res, next) => {
  try {
    const {id} = req.body;
    const body = {...req.body, id: undefined};

    await Room.findByIdAndUpdate(id, {...body});
    res.send({message: 'Success Update a Room'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
