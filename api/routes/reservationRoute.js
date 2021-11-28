const express = require("express");
const router = express.Router();

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

router.post("/", function (req, res, next) {
  Day.find({ date: req.body.date }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.tables.forEach((table) => {
          if (table._id == req.body.table) {
            // The correct table is table
            table.reservation = new Reservation({
              userId: req.body.userId,
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
            });
            table.isAvailable = false;
            day.save((err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Reserved");
                res.status(200).send("Added Reservation");
              }
            });
          }
        });
      } else {
        console.log("Day not found");
      }
    }
  });
});

module.exports = router;
