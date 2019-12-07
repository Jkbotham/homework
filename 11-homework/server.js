
var express = require("express");
var path = require("path");
const fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

// -----------------------------------------------

let uniqueID = 1
let notesList = []

// -----------------------------------------------
function readJSON() {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    const prevData = JSON.parse(data);
    for (i = 0; i < prevData.length; i++) {
      let x = JSON.parse(prevData[i])
      notesList.push(x)
    }
    let p = notesList.length
    uniqueID = notesList[p - 1].id
  })
}

function writeJSON() {

  let notesString = []

  for (i = 0; i < notesList.length; i++) {
    let x = JSON.stringify(notesList[i])
    notesString.push(x)
  }

  let stringArray = JSON.stringify(notesString)
  fs.writeFileSync("./db/db.json", stringArray, function (err) {
    if (err) throw err;
  });
};
// -----------------------------------------------
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(notesList)
});

app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params.id)
  var removeIndex = notesList.map(function (item) { return item.id; }).indexOf(parseInt(req.params.id));
  notesList.splice(removeIndex, 1);
  writeJSON();
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.post("/api/notes", function (req, res) {
  req.body.id = uniqueID
  uniqueID++
  data = req.body
  notesList.push(data)
  res.sendFile(path.join(__dirname, "public/notes.html"));
  writeJSON(data);
})

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
  readJSON();
});

// -----------------------------------------------
