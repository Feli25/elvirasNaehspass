const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Post = require('../models/Post')
const Info = require('../models/Info')
const Equipment = require('../models/Equipment')
const GaleriePic = require('../models/GaleriePic')



router.get('/latestPosts', (req, res, next) => {
  Post.find({ status: "ACTIVE" }, null, { sort: { created_at: -1 }, limit: 10 })
    .populate('_creator')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => next(err))
});

router.get('/allPosts', (req, res, next) => {
  Post.find({ status: "ACTIVE" }, null, { sort: { created_at: -1 } })
    .populate('_creator')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => next(err))
});

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

router.get('/equipment', (req,res,next)=>{
  Equipment.find(null, null, { sort: { created_at: -1 }})
    .then(equipment=>{
      res.json(equipment)
    })
    .catch(err => next(err))
})

router.get('/galerie', (req,res,next)=>{
  GaleriePic.find(null, null, { sort: { created_at: -1 }})
    .then(pictures =>{
      res.json(pictures)
    })
    .catch(err => next(err))
})






router.get('/kurse', (req,res,next)=>{
  
})


module.exports = router;
