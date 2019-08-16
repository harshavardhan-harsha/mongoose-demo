var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Book = require("./Book.Model");
var port = 8080;
//var db = "mongodb://localhost:example";

mongoose.connect("mongodb://localhost:27017/example", { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Happy to see here");
});

app.get("/books", (req, res) => {
  console.log("getting books");
  Book.find({}).exec((err, books) => {
    if (err) {
      res.send("error in loading books");
    } else {
      console.log(books);
      res.json(books);
    }
  });
});

app.get("/books/:id", (req, res) => {
  console.log("getting one book");
  Book.findOne({
    _id: req.params.id
  }).exec((err, book) => {
    if (err) {
      res.send("error in loading book");
    } else {
      console.log(book);
      res.json(book);
    }
  });
});

app.post("/book", (req, res) => {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save((err, book) => {
    if (err) {
      res.send("error saving book");
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.post("/book1", (req, res) => {
  Book.create(req.body, (err, book) => {
    if (err) {
      res.send("error saving book");
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.put("/book/:id", (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title } }, { upsert: true }, (err, newBook) => {
    if (err) {
      console.log("error occured");
    } else {
      console.log(newBook);
      res.send(newBook);
    }
  });
});

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove({ _id: req.params.id }, (err, book) => {
    if (err) {
      res.send("error deleting");
    } else {
      console.log(book);
      res.status(204);
    }
  });
});

app.listen(port, () => {
  console.log("App listening on port number:" + port);
});
