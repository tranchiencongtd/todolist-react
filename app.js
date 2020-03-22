//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb+srv://admin:admin@tranchiencong-mwri0.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = {
  name: String
};

const listdo = mongoose.model('Listdo', todoSchema);

app.post('/', function(req, res) {
  const requestedDo = req.body.newtodo;
  const createToDo = new listdo ({
    name: requestedDo
  });
  createToDo.save();
  res.redirect('/');
});

app.post('/delete', function(req, res){
  const requestDelete = req.body.delete;
  listdo.findByIdAndDelete(requestDelete,function(err){
    if(!err) {
      res.redirect('/');
    }
  });
});

app.get('/', function(req, res) {
  listdo.find({}, function(err, foundLists){
    if(!err) {
      res.render('home', {
        lists: foundLists
      });
    };
  });
});

app.listen(process.env.PORT || 3000, function (){
  console.log("Server turning on port 3000");
});
