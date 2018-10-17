require("..//dbSetup.js")();
var blogs = require('../models/LocationBlog');
var mongoose = require("mongoose");
var LocationBlog = mongoose.model('LocationBlog', blogs.UserSchema);

function addLocationBlog(info, author, longitude, latitude) {
    let blogDetails = {
        info,
        author,
        pos: {
            longitude,
            latitude
        }
    };

    let newBlog = new LocationBlog(blogDetails);
    return newBlog.save();

};

async function likeLocationBlog(id, user_id) {
    var blog = await LocationBlog.findById({ _id:id }).exec();
    blog.likedBy.push(user_id);
    return blog.save();   
}

function getAllBlogs() {
    return LocationBlog.find({}).exec();
}

function findById(id) {
    return LocationBlog.findById({
        _id: id
    }).exec();
}

module.exports = {
    addLocationBlog: addLocationBlog,
    likeLocationBlog: likeLocationBlog,
    getAllBlogs: getAllBlogs,
    findById: findById,
}
