const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Post = require('../models/Post')
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

// DB structure/model:
// id, status, header, content, creator, imgpath, imgname, publicid

// ALWAYS export it this way though:
// _id, status, header, content, _creator (object), imgPath, imgName, public_id
// this is what the frontend is expecting

const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

router.get('/latest', (req, res, next) => {
  Post.find({ status: "ACTIVE" }, null, { sort: { created_at: -1 }, limit: 10 })
    .populate('_creator')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => next(err))
});
// router.get('/latest', async (req,res,next)=>{
//   try{
//     const client = new Client(configs);
//     client.connect();
  
//     const query = await client.query('SELECT posts.id AS _id, status, header, content, imgpath, imgname, publicid AS public_id, users.username AS creator FROM posts LEFT JOIN users ON CAST(users.id AS text) = posts.creator WHERE status=$1',["ACTIVE"])
//     const postArray =  query.rows.map(elem=>{return {...elem, imgPath: elem.imgpath, imgName: elem.imgname}})
//     res.json(postArray)
//     client.end();
//   } catch(err){
//     next(err)
//   }
// })

router.get('/all', (req, res, next) => {
  Post.find({ status: "ACTIVE" }, null, { sort: { created_at: -1 } })
    .populate('_creator')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => next(err))
});

router.post('/new-pic', isLoggedIn, parser.single('picture'), (req,res,next)=>{
  let { header, content } = req.body
  let file = req.file
  Post.create({
    header:header,
    content:content,
    imgPath:file.url,
    imgName:file.originalname,
    public_id:file.public_id,
    _creator:req.user._id,
    status:"ACTIVE",
  })
  .then(post => {
    res.json({
      success: true,
      post
    });
  })
  .catch(err => console.log(err))
})

router.post('/new', isLoggedIn, (req,res,next)=>{
  let { header, content } = req.body
  Post.create({
    header:header,
    content:content,
    _creator:req.user._id,
    status:"ACTIVE",
    imgPath:null,
    imgName:null,
    public_id:null,
  })
  .then(post => {
    res.json({
      success: true,
      post
    });
  })
  .catch(err => console.log(err))
})

router.post('/edit-pic/:id', isLoggedIn, parser.single('picture'), (req,res,next)=>{
  let id = req.params.id
  let { header, content, public_id } = req.body
  cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
  let file = req.file;
  
  Post.findByIdAndUpdate(id,{
    header:header,
    content:content,
    imgPath:file.url,
    imgName:file.originalname,
    status:"ACTIVE",
    public_id: file.public_id
  })
    .then(post => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})

router.post('/edit/:id', isLoggedIn, (req,res,next)=>{
  let id = req.params.id
  let { header, content } = req.body
  
  Post.findByIdAndUpdate(id,{
    header:header,
    content:content,
    status:"ACTIVE",
  })
    .then(post => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})

router.get('/delete/:id', isLoggedIn, (req,res,next)=>{
  let id = req.params.id
  Post.findById(id)
    .then(post=>{
      if(post.public_id){
        cloudinary.v2.uploader.destroy(eq.public_id, function(result) { console.log(result) });
      }
    })
    .then(sth=>
          Post.findByIdAndDelete(id)
        .then(sth=>{
          res.json({
            success:true
          })
        })
        .catch(err=>{
          console.log(err)
        })
      )
    .catch(err=>console.log(err))
  
})

module.exports = router;
