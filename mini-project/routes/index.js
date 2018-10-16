var express = require("express");
var router = express.Router();
var userFacade = require("../facades/UserFacade");
var blogFacade = require("../facades/blogFacade");



/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get('/users', async function (req, res, next) {
router.get("/users", async function(req, res, next) {
  try {
    console.log("index.js");
    let users = await userFacade.getAllUsers();
    // let blogs = await blogFacade.getAllBlogs();
    console.log("I index.js efter await");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
