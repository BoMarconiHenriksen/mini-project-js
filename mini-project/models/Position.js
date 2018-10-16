/* 
Sætter 2 indexer op linje 18(position) og linje 12(created).
linje 12(created) - lever i db i 60 sekunder. GIv det en date for at ku holde det i længere tid ved test og udvikling.
Linje 13 user: 
loc: Måden det bygges op. enum point eller linjer, polygomer ect.
coordinates array af numbers.
typisk backend long, lat og front end omvendt!
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const SECONDS = 1;
var EXPIRES = 10  * SECONDS ;

var PositionSchema = new Schema({
 //Make sure that next line reflects your User-model
 user: {type: Schema.ObjectId, ref: 'User', required: true},
 created: { type: Date, expires: EXPIRES, default: Date.now },
 loc: {
 'type': { type: String, enum: "Point", default: "Point" },
 coordinates: { type: [Number] }
 }
})
PositionSchema.index({ loc: "2dsphere" },{ "background": true });

module.exports = mongoose.model("Position",PositionSchema);
