var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var locationBlogSchema = new Schema({
    info: {type: String, required: true},
    pos: {
        longitude: {type: Number, require: true},
        latitude: {type: Number, require: true} 
    },
    // Not embedding, this is a one to many relation with referance on the many side.
    author: {type: Schema.Types.ObjectId, ref: "User", required: true}, // refer til User som fremmednøgle.
    // Verify wheter unique works this way. only one like.
    likedBy: [ Schema.Types.ObjectId ],
    created: { type: Date, default: Date.now },
});

locationBlogSchema.virtual("slug").get(function() {
    return "/locationblog/" + this._id; 
});

locationBlogSchema.virtual("likeByCount").get(function() {
    return this.likedBy.length;
});


// L betyder konstruktør funktion
module.exports = mongoose.model("LocationBlog", locationBlogSchema)
