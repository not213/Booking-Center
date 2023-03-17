const router = require('express').Router();

const Borrow = require('../borrow/borrow');
// Models
const Item = require('./item');

// Get all items

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.send({length: items.length, items, message: 'Get items successful.'});
  } catch (error) {
    res.status(error.status || 500).send({message: error.message || 'Something went wrong'});
  }
});

// Get an item
router.get('/id', async (req, res) => {
  try {
    const {itemId} = req.body;
    const item = await Item.findById(itemId);
    res.send({item, message: 'Get an item successful.'});
  } catch (error) {
    res.status(error.status || 500).send({message: error.message || 'Something went wrong'});
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create({...req.body});
    res.send({item: newItem, message: 'Created new Item successful.'});
  } catch (error) {
    res.status(error.status || 500).send({message: error.message || 'Something went wrong'});
  }
});

// Update an existing item
router.get('/:itemId', async (req, res) => {
  try {
    const {itemId: id} = req.body;
    delete req.body.itemId;

    const updatedItem = await Item.findByIdAndUpdate(id, {...req.body}, {new: true});
    res.send({item: updatedItem, message: 'Updated item successfuly.'});
  } catch (error) {
    res.status(error.status || 500).send({message: error.message || 'Something went wrong'});
  }
});

// delete an existing item
router.delete('/:itemId', async (req, res) => {
  try {
    const {itemId: id} = req.body;
    await Item.deleteById(id);

    res.send({message: 'Item deleted successfully.'});
  } catch (error) {
    res.status(error.status || 500).send({message: error.message || 'Something went wrong'});
  }
});

// Relate to room

router.get('/rooms/:roomId', async (req, res) => {
  try {
    const {roomId} = req.params;

    const items = await Item.find({refRoom: roomId});

    const payload = [];

    for (const item of items) {
      const borrowItems = await Borrow.aggregate([
        {$match: {item_id: item._id, status: 'accepted'}},
        {$group: {_id: null, totalQuantity: {$sum: '$quantity'}}},
      ]);

      payload.push({...item.toObject(), stock: item.stock - getStockAvalible(borrowItems)});
    }

    res.send({message: 'Updated item successfuly.', data: payload});
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({message: error.message || 'Something went wrong'});
  }
});

const getStockAvalible = data => (data.length === 0 ? 0 : data[0].totalQuantity);

module.exports = router;
