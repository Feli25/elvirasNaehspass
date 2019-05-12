const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  header: String,
  content: String,
  category: { type: String, enum: ["KURSE", "WORKSHOPS"], default: "KURSE" }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;