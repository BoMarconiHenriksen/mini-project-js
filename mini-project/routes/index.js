var express = require("express");
var router = express.Router();
var userFacade = require("../facades/UserFacade");
var blogFacade = require("../facades/blogFacade");



/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
