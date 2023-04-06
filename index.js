const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT | 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i4cqwjk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {

        const usersCollection = client.db("Instagram").collection("users")
        const postsCollection = client.db("Instagram").collection("posts")

        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })

        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postsCollection.insertOne(post)
            res.send(result)
        })

        app.get('/posts', async (req, res) => {
            const query = {}
            const result = await postsCollection.find().toArray()
            res.send(result)
        })

        app.get('/post/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await postsCollection.findOne(query)
            res.send(result)
        })

























    }

    finally {



    }


}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('server running');
})

app.listen(port, () => {
    console.log('server running on port', port);
})