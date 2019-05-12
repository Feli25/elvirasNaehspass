const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galeriePicSchema = new Schema({
  header: String,
  imgPath: String,
  imgName: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const GaleriePic = mongoose.model('GaleriePic', galeriePicSchema);
module.exports = GaleriePic;