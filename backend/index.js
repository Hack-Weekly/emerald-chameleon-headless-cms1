// add dependencies here 
//const nameOfDependency = require('dependency')

const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;

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

const content1 = `Hello emerald team. This is a fake post that's shorter than the other.`;
const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
mollit anim id est laborum.` 

// const newPost = new Post({
//   _id: 3, 
//   post_title: "New Post", 
//   post_content: content2, 
//   author_id: 1, 
//   created_at: new Date()
// });

// newPost.save()
// .then(
//   () => console.log("Successfully added!"), 
//   (err) => console.log(err)
// );

// app.get('/', (req, res) => {
//   Post.find({}, (err, found) => {
//     if (!err) {
//       res.send(found);
//     }
//     console.log(err);
//     res.send("Some error occured!")
//   }).catch(err => console.log("Error occured, " + err));
// });

// Create one
app.post('/', async (req, res)=> {
  let collection = await db.collection("posts");
  // let newPost = new Post({
  //   _id: 3, 
  //   post_title: "New Post", 
  //   post_content: content2, 
  //   author_id: 2, 
  //   created_at: new Date()
  // });
    let newPost = new Post({
    _id: db.collection("posts").count()+1, 
    post_title: req.body.post_title, 
    post_content: req.body.post_content, 
    post_url: req.body.post_url,
    post_img: req.body.post_img,
    author_id: req.body.author_id, 
    created_at: new Date(),
  });
  let result = await collection.insertOne(newPost);
  res.send(`Successfully added! ${JSON.stringify(req.body)}`)

  // newPost.save()
  // .then(
  //   () => console.log("Successfully added!"), 
  //   (err) => console.log(err)
  // )
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
