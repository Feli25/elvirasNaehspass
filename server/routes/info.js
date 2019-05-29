const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Info = require('../models/Info')
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

router.get('/kurse', (req,res,next)=>{
  Info.find({ category: "KURSE" })
  .then(info =>{
    res.json(info)
  })
  .catch(err => next(err))
})

router.get('/workshops', (req,res,next)=>{
  Info.find({ category: "WORKSHOPS" })
  .then(info =>{
    res.json(info)
  })
  .catch(err => next(err))
})

router.get('/table', (req,res,next)=>{
  Info.find({ category: "TABLE" })
  .then(info =>{
    res.json(info)
  })
  .catch(err => next(err))
})

// router.post('/new-pic',  parser.single('picture'),(req,res,next)=>{
//   let { header, content, category, list } = req.body
//   let file = req.file
//   console.log("list",list)
//   Info.create({
//     header:header,
//     content:content,
//     list:list,
//     category:category,
//     imgPath:file.url,
//     imgName:file.originalname,
//     public_id:file.public_id
//   })
//   .then(info => {
//     res.json({
//       success: true,
//       info
//     });
//   })
//   .catch(err => console.log(err))
// })

router.get('/byid/:id', (req,res,next)=>{
  let id = req.params.id
  Info.findById(id)
  .then(info =>{
    res.json(info)
  })
  .catch(err => next(err))
})

router.post('/new', (req,res,next)=>{
  let { header, content, category, list,teacher } = req.body
  Info.create({
    header:header,
    content:content,
    list:list,
    category:category,
    imgPath:null,
    imgName:null,
    public_id:null,
    teacher:teacher
  })
  .then(info => {
    res.json({
      success: true,
      info
    });
  })
  .catch(err => console.log(err))
})

// router.post('/edit-pic/:id', parser.single('picture'), (req,res,next)=>{
//   let id = req.params.id
//   let { header, content, list, category, public_id } = req.body
//   cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
//   let file = req.file;

//   Info.findByIdAndUpdate(id,{
//     header:header,
//     content:content,
//     list:list,
//     category:category,
//     imgName:file.originalname,
//     imgPath:file.url,
//     public_id: file.public_id
//   })
//     .then(info => {
//       res.json({
//         success: true,
//       })
//     })
//     .catch(err=>{console.log(err)})
// })

router.post('/edit/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, content, list, category,teacher } = req.body
  
  Info.findByIdAndUpdate(id,{
    header:header,
    content:content,
    list:list,
    category:category,
    teacher:teacher
  })
    .then(info => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})

router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id
      Info.findByIdAndDelete(id)
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
