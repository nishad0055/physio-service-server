const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

//mid
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Assignment eleven server is running')
})

//mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tbf6iah.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const productCollection = client.db('serviceData').collection('services')
    
       //get
       app.get('/service', async(req, res)=>{
         const query = {}
         const cursor = productCollection.find(query).limit(3)
         const result = await cursor.toArray()
         res.send(result)
       })

   
       //post
       app.post('/services', async(req, res)=>{
          const query = req.body;
          const result = await productCollection.insertOne(query)
          res.send(result)
       })
    }
    finally{

    }
}
run().catch(e=>console.error(e))




app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})