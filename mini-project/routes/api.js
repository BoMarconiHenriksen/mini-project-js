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

// Update user
router.put("/update_user/", async function (req, res, next) {
    try {
        user = req.body;
        console.log(user);
        let updatedUser = await userFacade.updateUser(user);

        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

// Delete user.
router.delete("/delete_user/:id", async function (req, res, next) {
    try {
        user = req.params.id;
        await userFacade.deleteUserById(id);

        // Maybe delete this line.
        let users = await userFacade.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Find user by name.
router.get("/find_user/:username", async function (req, res, next) {
    try {
        userNameFromReq = req.params.username;
        let user = await userFacade.findByUserName(userNameFromReq);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Add user. https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express
// Add a new user.
router.post("/add_user/", async function (req, res, next) {
    try {
        const newUser = req.body;
        await userFacade.addUser(newUser.firstName, newUser.lastName, newUser.userName, newUser.password, newUser.email)
        
    } catch (err) {
        next(err);
    }
});

// REST endpoints for Blogs.

// Get all blogs
router.get("/blogs", async function (req, res, next) {
    try {
        let blogs = await blogFacade.getAllBlogs();
        res.json(blogs);
    } catch (err) {
        next(err);
    }
});

// TODO: More end points here for blog.

// Add location blog. Virker ikke!
router.post("/add_blog/", async function (req, res, next) {
    try {
        let newBlog = req.body;
        
        let userId = newBlog.author;
        
        let author = await userFacade.findUserById(userId);
        id = author._id;
        console.log(author); 
        
        await blogFacade.addLocationBlog(newBlog.info, id, newBlog.pos.longitude, newBlog.pos.latitude);
        
    } catch (err) {
        next(err);
    }
});

// Like location blog.

module.exports = router;