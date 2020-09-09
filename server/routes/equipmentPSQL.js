const express = require('express');
// const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

// DB structure/model:
// id, header, content, imgpath, imgname, publicid

// ALWAYS export it this way though:
// _id, header, content, imgPath, imgName, public_id
// this is what the frontend is expecting

const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

router.get('/', async (req,res,next)=>{
  try{
    const client = new Client(configs);
    client.connect();
  
    const query = await client.query('SELECT id AS _id, header, content, imgpath, imgname, publicid AS public_id FROM equipment ORDER BY id DESC;')
    const equipmentArray = query.rows.map(elem=>{return {...elem, imgPath: elem.imgpath, imgName: elem.imgname}})
    client.end();
    res.json(equipmentArray)
  } catch(err){
    client && client.end()
    next(err)
  }
})

router.post('/new-pic', parser.single('picture'), async (req,res,next)=>{
  try{
    let { header, content } = req.body
    let file = req.file
    const client = new Client(configs);
    client.connect();
  
    const addNewWithPic = await client.query('INSERT INTO equipment (header, content, imgpath, imgname, publicid) VALUES ($1, $2, $3, $4, $5)',[
      header,
      content,
      file.url,
      file.originalname,
      file.public_id
    ])
    client.end();
    if(!addNewWithPic) {
      next (new Error("Could not create new equipment picture"))
    }
    res.json({ success:true })
  } catch(err){
    client && client.end()
    next(err)
  }
})

router.post('/new', async (req,res,next)=>{
  try{
    let { header, content } = req.body
    const client = new Client(configs);
    client.connect();

    const addNewEquipment = await client.query('INSERT INTO equipment (header, content) VALUES($1, $2)',[header, content])
    client.end();
    if(!addNewEquipment) {
      next (new Error("Could not create new equipment"))
    }
    res.json({ success:true })
  } catch(err){
    client && client.end()
    next(err)
  }
})

router.post('/edit-pic/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    let { header, content, public_id } = req.body
    cloudinary.v2.uploader.destroy(public_id, function(result) { console.log(result) });
    let file = req.file;
    const client = new Client(configs);
    client.connect();
  
    const updatedEquipment = await client.query('UPDATE equipment SET header=$1, content=$2, imgpath=$3, imgname=$4, publicid=$5 WHERE id=$6',[
      header,
      content,
      file.url,
      file.originalname,
      file.public_id,
      id
    ])
    client.end();
    if(!updatedEquipment) {
      next (new Error("Could not update equipment picture"))
    }
    res.json({ success:true })
  } catch(err){
    client && client.end()
    next(err)
  }
})

router.post('/edit/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    let { header, content } = req.body
    const client = new Client(configs);
    client.connect();
  
    const updatedPost = await client.query('UPDATE equipment SET header=$1, content=$2 WHERE id=$3',[
      header,
      content,
      id
    ])
    client.end();
    if(!updatedPost) {
      next (new Error("Could not update equipment"))
    }
    res.json({ success:true })
  } catch(err){
    client && client.end()
    next(err)
  }
})

router.get('/delete/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    const client = new Client(configs);
    client.connect();
  
    const publicidQuery = await client.query('SELECT publicid FROM equipment WHERE id=$1',[id])
    const publicid = publicidQuery && publicidQuery.rows && publicidQuery.rows[0] && publicidQuery.rows[0].publicid
    if(publicid) cloudinary.v2.uploader.destroy(publicid, function(result) { console.log("destroyed",result) });
    const deletePost = await client.query('DELETE FROM equipment WHERE id=$1',[id])
    client.end();
    if(!deletePost) {
      next (new Error("Could not delete equipment"))
    }
    res.json({ success:true })
  } catch(err){
    client && client.end()
    next(err)
  }
})

module.exports = router;
