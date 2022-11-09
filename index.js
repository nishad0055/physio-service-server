const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
       const reviewCollection = client.db('ReviewData').collection('reviews')
       

      app.get('/reviews' , async(req, res)=>{
         
        let query = {};
        if(req.query.service){
          query ={
            service: req.query.service
          }
        }
         const cursor = reviewCollection.find(query)
         const review = await cursor.toArray()
         res.send(review)
      })




        //review
        app.post('/reviews', async(req, res)=>{
          const query = req.body;
          const result = await reviewCollection.insertOne(query);
          res.send(result)
        })



       //getId
       app.get('/services/:id', async(req, res)=>{
         const id = req.params.id;
         const query = {_id: ObjectId(id)}
         const result = await productCollection.findOne(query)
         res.send(result)
       })
      
       //allservices
       app.get('/services', async(req, res)=>{
         const query = {}
         const cursor = productCollection.find(query)
         const result = await cursor.toArray()
         res.send(result)
       })
      

      // get limit
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