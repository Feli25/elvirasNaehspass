const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  header: String,
  content: String,
  imgPath: String,
  imgName: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment;