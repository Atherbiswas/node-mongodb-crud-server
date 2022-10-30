const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://Ather2:GxgbxlUKgikG1aYE@cluster0.ukuxru5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
   try{
        const userCollection = client.db('nodeMongoCrud').collection('users');

        //create
        app.get('/users', async(req,res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        //read
        app.post('/users', async(req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        });

        //delete
        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            // console.log('trying to delete', id);
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })
   }
   finally{

   }
}
run().catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Node mongo crud server running')
});

app.listen(port, () => {
    console.log(`node mongo server running ${port}`);
})