const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    res.send('server running')
});



const uri = "mongodb+srv://DB_USER:DB_PASSWORD@cluster0.mmmt3qa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})