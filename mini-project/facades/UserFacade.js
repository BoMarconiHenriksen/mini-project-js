var User = require('../models/User');

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

async function getAllUsers() {
    console.log('Før get all');
    return await User.find({}).exec();

    console.log('efter get all');
}

function findByUserName(username) {
    return User.findOne({
        userName: username
    }).exec()
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
}