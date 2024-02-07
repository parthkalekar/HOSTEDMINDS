const router = require("express").Router();
const { testConnection } = require("../models/connectionTest");
const Room = require("../models/Room");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;

const jwt = require("jsonwebtoken");
const SECRET_KEY = "sijfbiudsfiobdsfmd mwdifjw93r8pgh po";

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

router.post("/register", async (req, res) => {
  if (!testConnection()) {
    res.json({
      result: false,
      message: "Database Connection Failed...",
    });
  }

  let firstname = req.body.firstname;
  let middlename = req.body.middlename;
  let lastname = req.body.lastname;
  let rollno = req.body.rollno;
  let address = req.body.address;
  let username = req.body.username;

  if (
    firstname  &&
    middlename &&
    lastname &&
    rollno &&
    username &&
    req.body.password
  ) {
    try {
      await User.create({
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        rollno: rollno,
        address: address,
        username: username,
        password: await bcrypt.hash(req.body.password, salt),
      });

      res.json({
        result: true,
        message: "User Registered Successfully.",
      });
    } catch (error) {
      res.json({
        result: false,
        message: "Failed to Register User..",
      });
    }
  }
});


router.post("/login", async (req, res) => {
  try {
    let check = await User.findAll({
      where: { username: req.body.username },
    });
    if (check) {
      data = check[0].get();
      if (await bcrypt.compare(req.body.password, data.password)) {
        await jwt.sign(data, SECRET_KEY,'500s', (err, token) => {
          if (err) {
            res.json({ result: false, message: "Error Creating token..." });
          } else {
            res.json({ result: true, token: token });
          }
        });
      } else {
        res.json({ result: false, message: "Failed due to Some Error..." });
      }
    } else {
      res.json({ result: false, message: "Email Id Does not Match..." });
    }
  } catch (error) {
    res.json({ result: false, message: "Some Error Try Again Later..." });
  }
});

router.post("/addroom", verifyToken, async (req, res) => {
  if (testConnection()) {
    let department = req.body.department;
    let schedule = req.body.schedule;
    let year = req.body.year;
    let roomnumber = req.body.roomNumber;
    let subject = req.body.subject;

    if (department || schedule || year || roomnumber || subject) {
      let check = await Room.create({
        department: req.body.department,
        schedule: req.body.schedule,
        year: req.body.year,
        roomnumber: req.body.roomNumber,
        subject: req.body.subject,
      });

      if (check) {
        res.json({
          result: true,
          message: "Room Created Successfully..🎉🎉",
        });
      } else {
        res.json({
          result: false,
          message: "Unable to Create Room...❗❗",
        });
      }
    } else {
      res.json({
        result: false,
        message: "Blank Fields not Allowed..",
      });
    }
  } else {
    res.json({
      result: false,
      message: "Connection to Database Failed...🎉🎉",
    });
  }
});

router.get("/getroom/:id", verifyToken, async (req, res) => {
  let roomNo = req.params.id;
  let data = await Room.findOne({ where: { roomnumber: roomNo } });
  if (data) {
    res.send(data);
  } else {
    res.send(`Room Number ${roomNo} not Available`);
  }
});

router.get("/getrooms", verifyToken, async (req, res) => {
  let rooms = await Room.findAll({});
  if (rooms) {
    res.json(rooms);
    console.log(rooms);
  } else {
    res.json({ error: "Failed to fetch Data" });
  }
});

module.exports = router;
