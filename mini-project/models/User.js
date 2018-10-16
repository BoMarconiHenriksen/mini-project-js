var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* 
Used as example for embedding.
*/
var JobSchema = new Schema({
    type: String,
    company: String,
    companyUrl: String
});

var UserSchema = new Schema({
    userName: {type: String, unique: true, require: true},
    firstName: String,
    lastName: String,
    password: {type: String, required: true},
    email: {type: String, required: true},
    // Observe embedding. job er embedded.
    job: [JobSchema],
    created: {type: Date, default: Date.now},
    lastUpdate: Date // middleware laver det.
});

// Middleware
UserSchema.pre("save", function(next) {
    this.password = "hash_me_and_add_salt " + this.password
    this.lastUpdate  = new Date();
    next();
});

// Middleware
UserSchema.pre("update", function(next) {
    this.update({}, { set : { lastUpdated: new Date() } })
    next(); 
});

module.exports = mongoose.model("User", UserSchema)



