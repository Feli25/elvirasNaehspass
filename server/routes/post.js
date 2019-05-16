const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Post = require('../models/Post')
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

router.get('/latest', (req, res, next) => {
  Post.find({ status: "ACTIVE" }, null, { sort: { created_at: -1 }, limit: 10 })
    .populate('_creator')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => next(err))
});

router.get('/all', (req, res, next) => {
  Post.find({ status: "ACTIVE" }, null, { sort: { created_at: -1 } })
    .populate('_creator')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => next(err))
});

router.post('/new-pic', parser.single('picture'), (req,res,next)=>{
  let { header, content } = req.body
  let file = req.file
  Post.create({
    header:header,
    content:content,
    imgPath:file.url,
    imgName:file.originalname,
    public_id:file.public_id,
    _creator:req.user,
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

router.post('/new', (req,res,next)=>{
  let { header, content } = req.body
  Post.create({
    header:header,
    content:content,
    _creator:req.user,
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

router.post('/edit-pic/:id', parser.single('picture'), (req,res,next)=>{
  let id = req.params.id
  let { header, content, public_id } = req.body
  cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
  let file = req.file;
  
  Post.findByIdAndUpdate(id,{
    header:header,
    content:content,
    imgPath:file.url,
    imgName:file.originalname,
    _creator: req.user,
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

router.post('/edit/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, content } = req.body
  
  Post.findByIdAndUpdate(id,{
    header:header,
    content:content,
    _creator: req.user,
    status:"ACTIVE",
  })
    .then(post => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})

router.get('/delete/:id', (req,res,next)=>{
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
