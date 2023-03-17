const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    refcode: {type: String},
    name: {type: String},
  },
  {timestamps: true}
);

module.exports = mongoose.model('Rooms', RoomSchema);
