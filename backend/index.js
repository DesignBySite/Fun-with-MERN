const express = require('express'),
      path    = require('path'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

const app = express();
let db;
const Campground = require('./Schemas/blog');
const User = require('./Schemas/user');

mongoose.connect('mongodb://localhost:27017/kitties', {useNewUrlParser: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected');
})

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const campgroundSchema = new mongoose.Schema({
//   name: String,
//   image: String
// });

// var Campground = mongoose.model("Campround", campgroundSchema);


app.get('/api/getList', (req, res) => {
  let result;
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(campgrounds);
  })
});

app.get('/newestCampground', (req, res) => {
  Campground.findOne({}, {}, { sort: { 'name': -1}}, (err, camp) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(camp);
  });
})

app.get('/sign-in/:user/:password', (req, res) => {
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

app.post('/create-user', (req, res) => {
  const user = {
    userName: "knielsen0506",
    password: "nrpxKReM84!!",
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

app.post('/create', (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.body;
  const createCampground = {name: name, image: image, body: description};
  Campground.create(createCampground, (err, res) => {
    if (err) {
      console.log('error', err);
      return;
    }
    console.log("added new campground", res);
  });
  res.send(res.status)
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);

