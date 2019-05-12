const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  header: String,
  content: String,
  imgPath: String,
  imgName: String,
  _creator: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["PENDING", "ACTIVE"], default: "PENDING" }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
