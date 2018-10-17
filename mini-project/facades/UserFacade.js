require("..//dbSetup.js")();
let users = require('../models/User');
let mongoose = require("mongoose");
let User = mongoose.model('User', users.UserSchema);
// Debugging mongoose. Printer til consolen.
require('mongoose').set('debug', true)

function addUSer(firstName, lastName, userName, password, email) {
    var userDetail = {
        firstName,
        lastName,
        userName,
        email,
        password,

    };

    var newUser = new User(userDetail);
    return newUser.save(); // returner et promise.
}

function getAllUsers() {
    return User.find({}).exec();
}

function findByUserName(username) {
    return User.findOne({
        userName: username
    }).exec()
}

// Delete user - Mangler test.
function deleteUserById(_id) {
    return User.findByIdAndDelete(_id);
}

// Update user - Mangler test.
function updateUser(user) {
    return User.findByIdAndUpdate( user._id, user, {new: true} ).exec();
}

// Find user by id - Mangler test
function findUserById(_id) {
    return User.findById(_id);
}

// Only if you have time.
function addJobToUser(type, company, companyUrl) {
    var jobDetails = [{
        type,
        company,
        companyUrl
    }];


}

module.exports = {
    addUser: addUSer,
    getAllUsers: getAllUsers,
    findByUserName: findByUserName,
    findUserById: findUserById,
    deleteUserById: deleteUserById,
    updateUser: updateUser,
}