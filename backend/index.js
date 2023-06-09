// add dependencies here 
//const nameOfDependency = require('dependency')

const express = require('express');
const app = express();
const port = 3000;


// Define your routes here

app.get('/', (req, res) => {
  res.send('Hello Emerald Team!');
});

//on backend directory run 'node index.js' 
//open your browser and type 'localhost:3000' should display a hello message
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
