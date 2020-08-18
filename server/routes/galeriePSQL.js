const express = require('express');
// const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

// DB structure/model:
// id, header, imgpath, imgname, publicid

// ALWAYS export it this way though:
// _id, header, imgPath, imgName, public_id
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
  
    const query = await client.query('SELECT id AS _id, header, imgpath, imgname, publicid AS public_id FROM galeriepics ORDER BY id ASC')
    const pictureArray = query.rows.map(elem=>{return {...elem, imgPath: elem.imgpath, imgName: elem.imgname}})
    res.json(pictureArray)
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
  
    const publicidQuery = await client.query('SELECT publicid FROM galeriepics WHERE id=$1',[id])
    const publicid = publicidQuery && publicidQuery.rows && publicidQuery.rows[0] && publicidQuery.rows[0].publicid
    if (publicid) cloudinary.v2.uploader.destroy(publicid, function(result) { console.log(result) })
    const deletePost = await client.query('DELETE FROM galeriepics WHERE id=$1', [id])
    if(!deletePost) throw "ERROR";
    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

router.post('/new', parser.single('picture'), async (req,res,next)=>{
  try{
    let { header } = req.body
    let file = req.file
    const client = new Client(configs);
    client.connect();
  
    const addedPicture = await client.query('INSERT INTO galeriepics (header, imgpath, imgname, publicid) VALUES ($1, $2, $3, $4)',[
      header,
      file.url,
      file.originalname,
      file.public_id
    ])
    if(!addedPicture) throw "ERROR";
    res.json({ success:true })
    client.end();
  } catch(err){
    next(err)
  }
})

module.exports = router;
