const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});

let books = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/book", (req, res) => {
  const book = req.body;
  books.push({ id: books.length + 1, ...book });

  res.send(books[books.length - 1]);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/book", (req, res) => {
  const sortedBooks = [...books];
  sortedBooks.sort((a, b) => a.title - b.title);
  res.json(sortedBooks);
});

app.delete("/book", (req, res) => {
  books = [];
  res.send(204);
});

module.exports = app;
