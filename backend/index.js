// add dependencies here 
//const nameOfDependency = require('dependency')

const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// mongodb connection setup
const mongoose = require("mongoose");
require("dotenv").config(); 
console.log("env", process.env.MONGODB_URI);
const Post = require('./models/post');

mongoose.connect(
  process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

let db = mongoose.connection;

db.on('error', (err)=>
{
  console.log( `Database error: ${err}`);
});

// Create one
app.post('/', (req, res)=> {
    let newPost = new Post({
    post_title: req.body.post_title, 
    post_content: req.body.post_content, 
    post_url: req.body.post_url,
    post_img: req.body.post_img,
    author_id: req.body.author_id, 
    created_at: new Date(),
  });
  res.send(`Successfully added! ${JSON.stringify(req.body)}`)

  newPost.save()
  .then(
    () => console.log("Successfully added!"), 
    (err) => console.log(err)
  )
});

// Read one
app.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `Post does not exist.` });
    });
});

// Define your routes here

app.get('/', (req, res) => {
  res.send('Hello Emerald Team!');
});

//on backend directory run 'node index.js' 
//open your browser and type 'localhost:3000' should display a hello message
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
