const express = require('express');
// const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

// DB structure/model:
// id, header, content, imgpath, imgname, publicid

// ALWAYS export it this way though:
// _id, header, content, imgPath, imgName, public_id
// this is what the frotend is expecting

const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

router.get('/', async (req,res,next)=>{
  try{
    const client = new Client(configs);
    client.connect();
  
    const query = await client.query('SELECT id AS _id, header, content, imgpath, imgname, publicid AS public_id FROM equipment ORDER BY id ASC;')
    const equipmentArray = query.rows.map(elem=>{return {...elem, imgPath: elem.imgpath, imgName: elem.imgname}})
    res.json(equipmentArray)
    client.end();
  } catch(err){
    next(err)
  }
})

router.post('/new-pic', parser.single('picture'), (req,res,next)=>{
  const client = new Client(configs);
  client.connect();

  let { header, content } = req.body
  let file = req.file
  client.query('INSERT INTO equipment (header, content, imgpath, imgname, publicid) VALUES ($1, $2, $3, $4, $5);', [
    header,
    content,
    file.url,
    file.originalname,
    file.public_id
  ])
    .then(query => {
      res.json({ success:true })
      client.end();
    })
    .catch(err => next(err))
})

router.post('/new', (req,res,next)=>{
  const client = new Client(configs);
  client.connect();

  let { header, content } = req.body
  console.log("request",header,content)
  client.query('INSERT INTO equipment (header, content) VALUES($1, $2);', [header, content])
    .then(query => {
      res.json({ success:true })
      client.end();
    })
    .catch(err => next(err))
})

router.post('/edit-pic/:id', parser.single('picture'), (req,res,next)=>{
  let id = req.params.id
  let { header, content, public_id } = req.body
  cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
  let file = req.file;

  const client = new Client(configs);
  client.connect();

  client.query('UPDATE equipment SET header=$1, content=$2, imgpath=$3, imgname=$4, publicid=$5 WHERE id=$6', [
    header,
    content,
    file.url,
    file.originalname,
    file.public_id,
    id
  ])
    .then(query => {
      res.json({success:true })
      client.end();
    })
    .catch(err => next(err))
})

router.post('/edit/:id', (req,res,next)=>{
  const client = new Client(configs);
  client.connect();

  let id = req.params.id
  let { header, content } = req.body

  client.query('UPDATE equipment SET header=$1, content=$2 WHERE id=$3', [
    header,
    content,
    id
  ])
    .then(query => {
      res.json({ success:true })
      client.end();
    })
    .catch(err => next(err))
})

router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id

  const client = new Client(configs);
  client.connect();

  client.query('SELECT publicid FROM equipment WHERE id=$1',[id])
    .then(publicid=>{
      if(publicid) cloudinary.v2.uploader.destroy(publicid, function(result) { console.log(result) });
    })
    .then(sth=>{
      client.query('DELETE FROM equipment WHERE id=$1',[id])
      .then(query => {
        res.json({ success:true })
        client.end();
      })
      .catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router;
