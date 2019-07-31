const express = require('express'),
      path    = require('path'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

const app = express();
const Blog = require('./Schemas/blog');
const User = require('./Schemas/user');
const port = process.env.PORT || 5000;
let db = mongoose.connection;

// Connects to mongo db
mongoose.connect('mongodb://localhost:27017/blogs', {useNewUrlParser: true});

// Mongoose connection handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected');
})

// Express rules
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin' , 'http://localhost:27017');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.append('Access-Control-Allow-Credentials', true);
  next();
});


// Gets list of all the current blogs
app.get('/api/blog/all', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(blogs);
  })
});

// Gets list of all the current blogs, sorts them newest to oldest, and returns the newest one
app.get('/api/blog/new', (req, res) => {
  Blog.findOne({}, {}, { sort: { 'name': -1}}, (err, blog) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(blog);
  });
})

// Finds and returns correct user if in the DB
app.get('/api/sign-in/:user/:password', (req, res) => {
  const userName = req.params.user;
  const password = req.params.password;
  console.log(req.params);

  User.find({userName: userName, password: password}, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(user);

    res.send(user);
  })
})

// Route to create new user
app.post('/api/user/create', (req, res) => {
  const user = {
    userName: "knielsen0506",
    password: 'pass',
    first_name: "Kevin",
    last_name: "Nielsen",
    userType: "Admin"
  }
  User.create(user, (err, res) => {
    if (err) {
      console.log('error', err);
      return;
    }
    console.log("added new user");
  });
});

// Route to create new blog
app.post('/api/blog/create', (req, res) => {
  const createBlog = {
    name: req.body.name,
    image: req.body.image,
    authorImage: req.body.authorImg,
    author: req.body.author,
    body: req.body.body
  }
  Blog.create(createBlog, (err, res) => {
    if (err) {
      console.log('error', err);
      return;
    }
    console.log("added new blog", res);
  });
  res.send(res.status)
});

// Route to delete a blog
app.get('/api/blog/delete/:id', (req, res) => {
  const blogToDelete = req.params.id;
  console.dir(blogToDelete);
  Blog.deleteOne({_id: blogToDelete}, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    return;
  });

  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(blogs);
  });
})


app.listen(port);

console.log(`App is listening on port ${port}`);

