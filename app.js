const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const User = require("./model/User");

const port = 3000 || process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect(
  "mongodb://127.0.0.1/login",
  { useNewUrlParser: true },
  () => {
    console.log("connected");
  }
);

app.post("/register", (req, res) => {
  const newUser = new User();
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  var bcrypt = require("bcryptjs");
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;

      newUser
        .save()
        .then(userSave => {
          res.send("user saved");
        })
        .catch(err => {
          res.send(`user not saved because ... ${err}`);
        });
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matched) => {
        if (err) return err;
        if (matched) {
          res.send("user found");
        } else {
          res.send("access denied");
        }
      });
    } else {
      res.send("user not found");
    }
  });
});

app.listen(port, err => {
  if (err) console.log("error occured " + err);
  else console.log("on port 3000");
});
