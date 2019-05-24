const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  header: String,
  content: String,
  // list: {type:Array, defaul:[]},
  list: [{name:String,belegt:Boolean}],
  category: { type: String, enum: ["KURSE", "WORKSHOPS"], default: "KURSE" },
  teacher:{type:String}
  // imgPath: String,
  // imgName: String,
  // public_id:String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;