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


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mmmt3qa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("autoWerke");
        const servicesCollection = database.collection("services");

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {

    }
}

run().catch((error) => console.error(error));



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})