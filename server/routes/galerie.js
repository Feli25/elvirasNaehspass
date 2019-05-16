const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const GaleriePic = require('../models/GaleriePic')
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

router.get('/', (req,res,next)=>{
  GaleriePic.find(null, null, { sort: { created_at: -1 }})
    .then(pictures =>{
      res.json(pictures)
    })
    .catch(err => next(err))
})

router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id
  GaleriePic.findById(id)
    .then(pic=>cloudinary.v2.uploader.destroy(pic.public_id, function(result) { console.log(result) }))
    .then(sth=>
      GaleriePic.findByIdAndDelete(id)
      .then(sth=>{
        res.json({
          success:true
        })
      })
      .catch(err=>{console.log(err)})
      )
    .catch(err=>console.log(err))
})

router.post('/new', parser.single('picture'), (req,res,next)=>{
  let { header } = req.body
  let file = req.file
  GaleriePic.create({
    header:header,
    imgPath:file.url,
    imgName:file.originalname,
    public_id:file.public_id
  })
  .then(pic => {
    res.json({
      success: true,
      pic
    });
  })
  .catch(err => console.log(err))
})

module.exports = router;
