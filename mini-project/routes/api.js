var express = require("express");
var router = express.Router();
var userFacade = require("../facades/UserFacade");
var blogFacade = require("../facades/blogFacade");

// REST endpoints for User.
router.get("/users", async function (req, res, next) {
    try {
        let users = await userFacade.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// TODO: More endpoints here.

// Find user by name.

// Add user.


// REST endpoints for Blogs.
router.get("/blogs", async function (req, res, next) {
    try {
        let blogs = await blogFacade.getAllBlogs();
        res.json(blogs);
    } catch (err) {
        next(err);
    }
});

// TODO: More end points here.

// Add location blog.

// Like location blog.

module.exports = router;