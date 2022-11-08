const express = require('express');
const app = express();
let Reservation = require(__dirname+'/models/reservation')

const firebaseAuth = require("firebase/auth");
const firebaseApp = require("firebase/app");
const firestore = require("firebase/firestore");
const database = require("firebase/database");

let errorMessage = "";
let isLogged = false;

const mongoose = require('mongoose')
let mongoDB = "mongodb://localhost/HotelDatabase"

//connect to mongoDB
mongoose.connect(mongoDB, {useNewUrlParser: true })
mongoose.Promise = global.Promise
let mongodb = mongoose.connection

mongodb.on('error', console.error.bind(console, 'MongoDB connection error: '))

mongodb.once('open', ()=>{
  console.log("Connected to MongoDB")
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuBrjnk7cmkEDDg9aRa4yPolMZChNBSc8",
  authDomain: "hotellasinventura.firebaseapp.com",
  projectId: "hotellasinventura",
  storageBucket: "hotellasinventura.appspot.com",
  messagingSenderId: "304413763536",
  appId: "1:304413763536:web:69743801e0611462e9fbd5",
  measurementId: "G-LM73BKPHEW"
};

// Initialize Firebase
const firebase = firebaseApp.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine", "ejs");


function writeUserData(userId, firstName, lastName, email, nationality, phone, birthdate, address) {
  db.collection("users").add({
    firstName: firstName,
    lastName: lastName,
    email : email,
    nationality: nationality,
    phone : phone,
    birthdate: birthdate
  }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
};

app.post('/register', async (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
    address: req.body.address
  }

  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((userCredential) =>{
    var fUser = userCredential.user;
    console.log(fUser.uid);
    writeUserData(fUser.uid, user.firstName, user.lastName, user.email, "GT", "+523338298130", "09/16/1999", "5ta avenida sur");
    console.log("User Created Successfully");
  })
  .catch((error) => {
    console.log("user not created successfully ");
    errorMessage = error.message
    res.redirect('/register');
  });

});


app.post('/login', async (req, res) => {

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    isLogged = true;
    console.log("user signed in ");
    res.render('dashboard', {email: user.email, isLogged:true});
  })
  .catch((error) => {
    errorMessage = error.message;
    console.log("user not signed in ");
    res.redirect('/login')
  });
});



app.get('/', function (req, res) {
  res.render("home", {isLogged:isLogged, email:"lol"});
});

app.get('/register', function (req, res) {
  res.render("register", {errorMessage:errorMessage, isLogged:isLogged, email:"lol"});
});

app.get('/login', function (req, res) {
  res.render("login", {errorMessage:errorMessage, isLogged:isLogged, email:"lol"});
});

app.get('/dashboard', function (req, res) {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in")
      res.render("dashboard", {user:user, isLogged:isLogged, email:"lol"});
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      console.log("User is not signed in")
      res.redirect("/login")
    }
  
  });
});

app.get('/logout', function (req, res){
  firebase.auth().signOut().then(() => {
    res.redirect("/login");
    isLogged = false;
  }).catch((error) => {
    alert(error.message);
  });
});


app.listen(3000, function(){
    console.log("listening in port 3000");
});

let roomController = require(__dirname+'/controllers/roomController')
let reservationController = require(__dirname+'/controllers/reservationController')

app.post('/reservation', roomController.allRooms)

app.post('/payment', function (req, res){
  let single = req.body.Single
  let double = req.body.Double
  let triple = req.body.Triple
  console.log(req.body.guests)

  let price = single * 100 + double * 200 + triple * 300 

  res.render("payment", {single: single, double: double, triple: triple, price: price, isLogged:true, checkin:req.body.checkin, checkout:req.body.checkout, guests:req.body.guests, email:"lol"})

})

app.post('/succeed', function (req, res){

  firebase.auth().onAuthStateChanged((user) => {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("User is signed in")
      const email = user.email;

      let reservation = new Reservation({checkin:req.body.checkin, checkout:req.body.checkout, guests:req.body.guests, user:email, singleRoom:req.body.single, doubleRoom:req.body.double, tripleRoom:req.body.triple, price:req.body.price, email:"lol"})

      reservationController.createReservation(reservation)

      res.send('reserva creada exitosamente')
    } else {
      console.log("User is not signed in")
      res.redirect("/login")
    }
  });
})

app.post("/myRes",  reservationController.findByEmail)
  


  







