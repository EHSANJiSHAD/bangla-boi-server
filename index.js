const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

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

        app.get('/book',async(req,res)=>{
            const query = {};
            const cursor = bookCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
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