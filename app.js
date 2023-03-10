const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Post = require('./models/Post');
const app = express();

mongoose.connect('mongodb://192.168.152.172:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//VİEW ENGİNE
app.set('view engine', 'ejs');


//MİDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index',{
      posts
    });
  });

  app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post',{
      post
    });
  });

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
   await Post.create(req.body);
    res.redirect('/');
  });


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});



