const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 5000;

//log all requests to the console
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'game/build')));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

// Init the express-jwt middleware
const isAuthenticated = exjwt({
    secret: 'all sorts of code up in here'
  });

  // LOGIN ROUTE
app.post('/api/login', (req, res) => {
    db.User.findOne({
      email: req.body.email
    }).then(user => {
      user.verifyPassword(req.body.password, (err, isMatch) => {
        if(isMatch && !err) {
          let token = jwt.sign({ id: user._id, email: user.email }, 'all sorts of code up in here', { expiresIn: 129600 }); // Sigining the token
          res.json({success: true, message: "Token Issued!", token: token, user: user});
        } else {
          res.status(401).json({success: false, message: "Authentication failed. Wrong password."});
        }
      });
    }).catch(err => res.status(404).json({success: false, message: "User not found", error: err}));
  });
  
  // SIGNUP ROUTE
  app.post('/api/signup', (req, res) => {
    db.User.create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
  });
  
  // Any route with isAuthenticated is protected and you need a valid token
  // to access
  app.get('/api/user/:id', isAuthenticated, (req, res) => {
    db.User.findById(req.params.id).then(data => {
      if(data) {
        res.json(data);
      } else {
        res.status(404).send({success: false, message: 'No user found'});
      }
    }).catch(err => res.status(400).send(err));
  });
  
  // Serve up static assets (usually on heroku)
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("game/build"));
  }
  
  
  app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
  });
  
  // Error handling
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
      res.status(401).send(err);
    }
    else {
      next(err);
    }
  });
  
// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["Score: 50", "Score: 30", "Score: 120"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, './game/build/index.html'));
});


app.listen(PORT);

console.log('App is listening on port ' + PORT);