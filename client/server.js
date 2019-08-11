const express = require('express'),
      path    = require('path'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

const app = express();
const Blog = require('./Schemas/blog');
const User = require('./Schemas/user');
const port = process.env.PORT || 5000;
let db = mongoose.connection;
const uri = 'mongodb+srv://knielsen0506:nrpxKReM84!!@kevincluster-93exz.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true});
// client.connect(err => {
//   // const collection = client.db('test').collection('devices');
//   // console.log(collection);
//   console.log(err);
//   client.close()
// })
// Connects to mongo db
// mongoose.connect(uri, {useNewUrlParser: true});

// Mongoose connection handling
db.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at:', reason.stack || reason);
})
db.on('error', console.trace.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected');
})

// Express rules
// Static File
app.use(express.static(path.join(__dirname, 'public/index.html')));

// Production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build/index.html')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
      });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Build mode
// app.get('*', (req, res) => {  res.sendFile(path.join(__dirname, 'public/index.html'));});

// Gets list of all the current blogs
app.get('/api/blog/all', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(blogs);
    
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
    created: Date.now(),
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

