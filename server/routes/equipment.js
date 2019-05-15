const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Equipment = require('../models/Equipment')
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

router.get('/', (req,res,next)=>{
  Equipment.find(null, null, { sort: { created_at: -1 }})
    .then(equipment=>{
      res.json(equipment)
    })
    .catch(err => next(err))
})

router.post('/new-pic', parser.single('picture'), (req,res,next)=>{
  let { header, content } = req.body
  let file = req.file
  Equipment.create({
    header:header,
    content:content,
    imgPath:file.url,
    imgName:file.originalname,
    public_id:file.public_id
  })
  .then(eq => {
    res.json({
      success: true,
      eq
    });
  })
  .catch(err => console.log(err))
})

router.post('/new', (req,res,next)=>{
  let { header, content } = req.body
  Equipment.create({
    header:header,
    content:content
  })
  .then(eq => {
    res.json({
      success: true,
      eq
    });
  })
  .catch(err => console.log(err))
})

router.post('/edit-pic/:id', parser.single('picture'), (req,res,next)=>{
  let id = req.params.id
  let { header, content, public_id } = req.body
  cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
  let file = req.file;
  
  Equipment.findByIdAndUpdate(id,{
    header:header,
    content:content,
    imgPath:file.url,
    imgName:file.originalname,
    public_id: file.public_id
  })
    .then(update => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})

router.post('/edit/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, content } = req.body
  
  Equipment.findByIdAndUpdate(id,{
    header:header,
    content:content
  })
    .then(update => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})

router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id
  Equipment.findByIdAndDelete(id)
    .then(sth=>{
      res.json({
        success:true
      })
    })
    .catch(err=>{
      console.log(err)
    })
})

module.exports = router;
