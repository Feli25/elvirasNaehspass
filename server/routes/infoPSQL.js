const express = require('express');
const router = express.Router();

// DB structure/model:
// id, category, header, content, list (string), teacher

// ALWAYS export it this way though:
// _id, category, header, content, list (object), teacher
// this is what the frontend is expecting

const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

function convertStringToJson (string) {
  var newJson = string.replace(/'/g, '"');

  newJson = newJson.replace(/([^"]+)|("[^"]+")/g, function($0, $1, $2) {
      if ($1) {
          return $1.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      } else {
          return $2; 
      } 
  });

  return JSON.parse(newJson);
}

router.get('/', async (req,res,next)=>{
  try{
    const client = new Client(configs);
    client.connect();
  
    const infoQuery = await client.query('SELECT id AS _id, category, header, content, list AS liststring, teacher FROM infos')
    const info = infoQuery.rows.map(kurs => {
      let list = convertStringToJson(kurs.liststring)
      return {...kurs, list: list}
    })
    res.json( info )
    client.end();
  } catch(err){
    client.end();
    next(err)
  }
})

router.get('/byid/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    const client = new Client(configs);
    client.connect();
  
    const infoQuery = await client.query('SELECT id AS _id, category, header, content, list AS liststring, teacher FROM infos WHERE id=$1',[id])
    const info = infoQuery.rows.map(kurs => {
      let list = convertStringToJson(kurs.liststring)
      return {...kurs, list: list}
    })
    res.json( info )
    client.end();
  } catch(err){
    client.end();
    next(err)
  }
})

router.get('/delete/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    const client = new Client(configs);
    client.connect();
  
    const deletePost = await client.query('DELETE FROM infos WHERE id=$1', [id])
    if(!deletePost) {
      client.end();
      next( new Error("Could not delete info"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    client.end();
    next(err)
  }
})

router.get('/:category', async (req,res,next)=>{
  try{
    let category = req.params.category.toUpperCase()
    const client = new Client(configs);
    client.connect();
  
    const tableQuery = await client.query('SELECT id AS _id, category, header, content, list AS liststring, teacher FROM infos WHERE category=$1',[category])
    const table = tableQuery.rows.map(kurs => {
      let list = convertStringToJson(kurs.liststring)
      return {...kurs, list: list}
    })
    res.json( table )
    client.end();
  } catch(err){
    client.end();
    next(err)
  }
})

router.post('/new', async (req,res,next)=>{
  try{
    let { header, content, category, list,teacher } = req.body
    const client = new Client(configs);
    client.connect();

    const insertedPost = await client.query('INSERT INTO infos (category, header, content, list, teacher) VALUES($1,$2,$3,$4,$5)',[
      category,
      header,
      content,
      JSON.stringify(list),
      teacher
    ])
    if(!insertedPost) {
      client.end();
      next( new Error("Could not create info"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    client.end();
    next(err)
  }
})

router.post('/edit/:id', async (req,res,next)=>{
  try{
    let id = req.params.id
    let { header, content, list, category,teacher } = req.body
    const client = new Client(configs);
    client.connect();
  
    const updatedInfo = await client.query('UPDATE infos SET category=$1, header=$2, content=$3, list=$4, teacher=$5 WHERE id=$6',[
      category,
      header,
      content,
      JSON.stringify(list),
      teacher,
      id
    ])
    if(!updatedInfo) {
      client.end();
      next( new Error("Could not update info"))
    }
    res.json({ success:true })
    client.end();
  } catch(err){
    client.end();
    next(err)
  }
})



module.exports = router;
