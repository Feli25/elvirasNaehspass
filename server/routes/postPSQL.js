const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

// DB structure/model:
// id, status, header, content, creator, imgpath, imgname, publicid

// ALWAYS export it this way though:
// _id, status, header, content, _creator:{username}, imgPath, imgName, public_id
// this is what the frontend is expecting

const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

router.get('/latest', async (req,res,next)=>{
  try{
    const client = new Client(configs);
    client.connect();
    const query = await client.query('SELECT posts.id AS _id, status, header, content, imgpath, imgname, publicid AS public_id, users.username AS creator FROM posts LEFT JOIN users ON CAST(users.id AS text) = posts.creator WHERE status=$1 ORDER BY posts.id DESC LIMIT 10',["ACTIVE"])
    const postArray =  query.rows.map(elem=>{return {...elem, imgPath: elem.imgpath, imgName: elem.imgname, _creator: { username : elem.creator }}})
    res.json(postArray)
    client.end();
  } catch(err){
    next(err)
  }
})

router.get('/all', async (req,res,next)=>{
  try{
    const client = new Client(configs);
    client.connect();
  
    const query = await client.query('SELECT posts.id AS _id, status, header, content, imgpath, imgname, publicid AS public_id, users.username AS creator FROM posts LEFT JOIN users ON CAST(users.id AS text) = posts.creator WHERE status=$1 ORDER BY posts.id DESC',["ACTIVE"])
    const postArray =  query.rows.map(elem=>{return {...elem, imgPath: elem.imgpath, imgName: elem.imgname, _creator: { username : elem.creator }}})
    res.json(postArray)
    client.end();
  } catch(err){
    next(err)
  }
})

router.post('/new-pic', isLoggedIn, parser.single('picture'), async (req,res,next)=>{
  try{
    let { header, content } = req.body
    let file = req.file
    const client = new Client(configs);
    client.connect();
  
    const addNewWithPic = await client.query('INSERT INTO posts (status, header, content, creator, imgPath, imgName, publicId) VALUES($1, $2, $3, $4, $5, $6, $7)',[
      "ACTIVE",
      header,
      content,
      req.user._id,
      file.url,
      file.originalname,
      file.public_id
    ])
    if(!addNewWithPic) {
      client.end();
      next (new Error("Could not create new post picture"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

router.post('/new', isLoggedIn, async (req,res,next)=>{
  try{
    let { header, content } = req.body
    const client = new Client(configs);
    client.connect();
  
    const addNewWithPic = await client.query('INSERT INTO posts (status, header, content, creator) VALUES($1, $2, $3, $4)',[
      "ACTIVE",
      header,
      content,
      req.user._id
    ])
    if(!addNewWithPic) {
      client.end();
      next (new Error("Could not create new post"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

router.post('/edit-pic/:id', isLoggedIn, parser.single('picture'), async (req,res,next)=>{
  try{
    let id = req.params.id
    let { header, content, public_id } = req.body
    cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
    let file = req.file;
    const client = new Client(configs);
    client.connect();
  
    const updatetPost = await client.query('UPDATE posts SET status=$1, header=$2, content=$3, imgpath=$4, imgname=$5, publicid=$6 WHERE id=$7',[
      "ACTIVE",
      header,
      content,
      file.url,
      file.originalname,
      file.public_id,
      id
    ])
    if(!updatetPost) {
      client.end();
      next (new Error("Could not update post picture"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

router.post('/edit/:id', isLoggedIn, async (req,res,next)=>{
  try{
    let id = req.params.id
    let { header, content } = req.body
    const client = new Client(configs);
    client.connect();
  
    const updatetPost = await client.query('UPDATE posts SET status=$1, header=$2, content=$3 WHERE id=$4',[
      "ACTIVE",
      header,
      content,
      id
    ])
    if(!updatetPost) {
      client.end();
      next (new Error("Could not update post"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

router.get('/delete/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    const client = new Client(configs);
    client.connect();
  
    const publicidQuery = await client.query('SELECT publicid FROM posts WHERE id=$1',[id])
    const publicid = publicidQuery && publicidQuery.rows && publicidQuery.rows[0] && publicidQuery.rows[0].publicid
    if(publicid) cloudinary.v2.uploader.destroy(publicid, function(result) { console.log("destroyed",result) });
    const deletePost = await client.query('DELETE FROM posts WHERE id=$1',[id])
    if(!deletePost) {
      client.end();
      next (new Error("Could not delete post"))
    }

    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

module.exports = router;
