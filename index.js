const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

//////////////MIDDLEWARE/////////////////
app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('RUNNING BANGLA-BOI SERVER');
})

app.listen(port,()=>{
    console.log('RUNNING ON PORT' , port)
})