const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname+"/chatbot.html");
});



app.listen(3000, function(){
    console.log("listening in port 3000");
});