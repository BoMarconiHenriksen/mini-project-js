var mongoose = require('mongoose');
const dbURI = require("./settings").DEV_DB_URI;

// connect metode. Vælger dev db eller test db.
function connect(dbUriString) {
    const conStr = dbUriString ? dbUriString : dbURI;

    // This returns a promise. Her connects der til db.
    return mongoose.connect(conStr, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
}

// 2 event handlers. once betyder kalder kun en gang ved test cases ellers lægges eventhandler på hele tiden.
mongoose.connection.once('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.once('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

module.exports = connect;