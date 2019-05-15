const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Info = require('../models/Info')

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

router.post('/new', (req,res,next)=>{
  let { header, content, category, list } = req.body
  Info.create({
    header:header,
    content:content,
    list:list,
    category:category
  })
  .then(info => {
    res.json({
      success: true,
      info
    });
  })
  .catch(err => console.log(err))
})

router.post('/edit/:id', (req,res,next)=>{
  let id = req.params.id
  let { header, content, list, category } = req.body
  
  Info.findByIdAndUpdate(id,{
    header:header,
    content:content,
    list:list,
    category:category
  })
    .then(info => {
      res.json({
        success: true,
      })
    })
    .catch(err=>{console.log(err)})
})


module.exports = router;
