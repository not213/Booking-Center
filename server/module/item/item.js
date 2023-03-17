const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {type: String},
    image: {type: String},
    stock: {type: Number},
    status: {type: String},
    refRoom: {type: Schema.Types.ObjectId, ref: 'Rooms'},
  },
  {timestamps: true}
);

module.exports = mongoose.model('Item', ItemSchema);
