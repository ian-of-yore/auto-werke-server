const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const ordersCollection = database.collection("orders");

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.send(service);
        })

        // Orders API
        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = { email: req.query.email }
            }
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })

        app.post('/orders', async (req, res) => {
            const doc = req.body;
            const order = await ordersCollection.insertOne(doc);
            res.send(order);
        })

        app.patch('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body.status;
            const query = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: status
                }
            }
            const result = await ordersCollection.updateOne(query, updatedDoc);
            res.send(result);
        })

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch((error) => console.error(error));



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})