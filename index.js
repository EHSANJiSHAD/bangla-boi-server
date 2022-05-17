const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

//////////////MIDDLEWARE/////////////////
app.use(cors());
app.use(express.json());

//////////////////MONGODB CONNECT/////////////////

const uri = `mongodb+srv://${process.env.DB_USER1}:${process.env.DB_PASSWORD1}@cluster0.gbtik.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const bookCollection = client.db('banglaBoi').collection('book');


        ////////////////GET ALL ITEMS///////////////////
        app.get('/book',async(req,res)=>{
            const query = {};
            const cursor = bookCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        ////////////////GET ALL ITEMS///////////////////

        /////////////////GET SINGLE ITEM////////////
        app.get('/book/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await bookCollection.findOne(query);
            res.send(result);
        })
        /////////////////GET SINGLE ITEM////////////

        ////////////////UPDATE ITEM /////////////////
        // app.put('/book/:id',async(req,res)=>{
        //     const id = req.params.id;
        //     // console.log(req.params.id);
        //     const updatedUser = req.body;
        //     const filter = {_id: ObjectId(id)};
        //     const options = {upsert:true};
        //     const updatedDoc = {
        //         $set:{
        //                 quantity: updatedUser.updatedQuantity
                              
        //         }
        //     }
        //     const result = await bookCollection.updateOne(filter,updatedDoc,options);
        //     res.send(result);
        // })

        ///RESTOCK
        app.put('/book/:id',async(req,res)=>{
            const id = req.params.id;
            console.log(req.params.id);
            const updatedUser2 = req.body;
            console.log(updatedUser2);
            const filter = {_id: ObjectId(id)};
            const options = {upsert:true};
            const updatedDoc = {
                $set:{
                    quantity: updatedUser2.quantity
                }
            }
            const result = await bookCollection.updateOne(filter,updatedDoc,options);
            res.send(result);
        })

        ////////////////UPDATE ITEM /////////////////
    }
    finally{

    }
}

run().catch(console.dir);
//////////////////MONGODB CONNECT/////////////////

app.get('/',(req,res)=>{
    res.send('RUNNING BANGLA-BOI SERVER');
})

app.listen(port,()=>{
    console.log('RUNNING ON PORT' , port)
})