const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowSchema = new Schema(
  {
    item_id: {type: Schema.Types.ObjectId, ref: 'Item'},
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
    room_id: {type: Schema.Types.ObjectId, ref: 'Rooms'},
    quantity: {type: Number},
    status: {type: String, enum: ['pending', 'accepted', 'rejected', 'receive'], default: 'pending'},
  },
  {timestamps: true}
);

module.exports = mongoose.model('Borrow', BorrowSchema);
