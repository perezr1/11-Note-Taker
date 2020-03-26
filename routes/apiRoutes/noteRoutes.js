const router = require("express").Router();
const path = require("path");
const fs = require("fs");
let filePath = path.join(__dirname, "../../db/db.json");
console.log("filePath:", filePath);

router.get("/", function(req, res) {
  fs.readFile(filePath, "utf8", function(err, db) {
    if (err) throw err;
    db = JSON.parse(db);
    res.json(db);
  });
});

// this receive a new request to save the note on the request body add it to the db.json file, and then return the new note to the client.
router.post("/", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  const newNote = req.body;
  // This works because of our body parsing middleware
  console.log(newNote);
  fs.readFile(filePath, "utf8", function(err, db) {
    if (err) throw err;
    db = JSON.parse(db);

    newNote.id = db.length > 0 ? db[db.length - 1].id + 1 : 1;

    db.push(newNote);

    fs.writeFile(filePath, JSON.stringify(db), err => {
      if (err) {
        res.json(err);
      } else {
        res.json(db);
      }
    });
  });
});

router.delete("/:id", function(req, res) {
  fs.readFile(filePath, "utf8", function(err, db) {
    if (err) throw err;
    db = JSON.parse(db);

    db = db.filter(post => post.id !== parseInt(req.params.id));

    fs.writeFile(filePath, JSON.stringify(db), err => {
      if (err) {
        res.json(err);
      } else {
        res.json(db);
      }
    });
  });
});

module.exports = router;
