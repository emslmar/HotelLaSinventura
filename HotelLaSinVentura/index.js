const express = require('express');
const app = express();

const admin = require("firebase-admin");
const credentials = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.post('/signup', async (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false
  });
  res.json(userResponse);
});

app.post('/login', async (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false
  });
  res.json(userResponse);
})



app.get('/', function (req, res) {
  res.sendFile(__dirname+"/views/home.html");
});

app.get('/register', function (req, res) {
  res.sendFile(__dirname+"/views/register.html");
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname+"/views/login.html");
});



app.listen(3000, function(){
    console.log("listening in port 3000");
});