const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    //fileSize: 10000000
    fileSize: 999999999
  }
});


// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  asl: String,
  contact: String,
  description: String,
  path: String,
});

const chatSchema = new mongoose.Schema({
  subject: String,
  message: String,
  poster: String,
});

const Post = mongoose.model('Post', chatSchema);

app.post('/api/posts', async (req, res) => {
  const post = new Post({
    subject: req.body.subject,
    message: req.body.message,
    poster: req.body.poster,
  });
  try {
    await post.save();
    res.send(post);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.deleteOne({
      _id: req.params.id
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    let post = await Post.findOne({
      _id: req.params.id
    });
    post.subject = req.body.subject;
    post.message = req.body.message;
    post.poster = req.body.poster;
    post.save();
  } catch (error) {
    res.sendStatus(500);
  }
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    asl: req.body.asl,
    contact: req.body.contact,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
  } catch (error) {
    res.sendStatus(500);
  }
});


app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.asl = req.body.asl;
    item.contact = req.body.contact;
    item.description = req.body.description;
    item.save();
  } catch (error) {
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));