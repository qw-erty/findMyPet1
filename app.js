const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");

const authRoutes = require('./routes/authRoutes');
const mySecret = process.env['MONGO_URL']

const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(cors());

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

require('dotenv').config()

// database connection
const dbURI = process.env.MONGO_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/home', (req, res) => res.render('home'));
app.get('/', (req, res) => res.render('newTemp/index'));
app.get('/post-a-pet', requireAuth, (req, res) => res.render('postPet'));
app.use(authRoutes);
app.get('/success', (req, res) => res.render('success'));
const PostPetRoutes = require("./routes/PostPetRoutes");

app.use("/api/uploadPostPet", PostPetRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

app.get('/blog-details', (req, res) => res.render('newTemp/blog-details'));
app.get('/blog', (req, res) => res.render('newTemp/blog'));
app.get('/portfolio-details', (req, res) => res.render('newTemp/portfolio-details'));
app.get('/sample-inner-page', (req, res) => res.render('newTemp/sample-inner-page'));
app.get('/login', (req, res) => res.render('partials/login'));


