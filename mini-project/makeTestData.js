require("./dbsetup.js")();

var User = require("./models/User.js");
var LocationBlog = require("./models/LocationBlog.js");
var Position = require("./models/Position.js");

//Utility Function to create users.
function userCreate(firstName, lastName, userName, password, email, type, company, companyUrl) {
    var job = [{
        type,
        company,
        companyUrl
    }, {
        type,
        company,
        companyUrl
    }];
    var userDetail = {
        firstName,
        lastName,
        userName,
        email,
        password,
        job
    };
    var user = new User(userDetail);
    return user.save(); // returner et promise.
}

//Utility Function to create Positions. // collections der sletter sig efter et vist tidspunkt
function positionCreator(lon, lat, userId, dateInFuture) {
    var posDetail = {
        user: userId,
        loc: {
            coordinates: [lon, lat]
        }
    }
    if (dateInFuture) {
        posDetail.created = "2022-09-25T20:40:21.899Z"
    }
    var pos = new Position(posDetail);
    return pos.save();
}

//Utility Function to create LocationBlogs
function locationBlogCreator(info, author, longitude, latitude) {
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

}

// Here we will setup users. Ser sekvetielt ud men er asynkront.
async function createUsers() {
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({});
    // How can we ensure that all previous users are deleted before we continue? Med async await
    // De fleste af ovenstående metoder returner et promise.

    const userPromises = [
        userCreate("Kurt", "Wonnegut", "kw", "test", "ab@b.dk", "A type", "comp", "comp.url"),
        userCreate("Hanne", "Wonnegut", "hw", "test", "ac@b.dk", "A type", "comp", "comp.url"),
        userCreate("Janne", "Wonnegut", "jw", "test", "ad@b.dk", "A type", "comp", "comp.url"),
        userCreate("Iris", "Wonnegut", "iw", "test", "ae@b.dk", "A type", "comp", "comp.url"),
    ]

    var users = await Promise.all(userPromises);

    var positionPromises = [
        positionCreator(10, 11, users[0]._id),
        positionCreator(11, 12, users[1]._id, false), // true oprette i db er der i lang tid
        positionCreator(11, 13, users[2]._id, false)
    ]

    var positions = await Promise.all(positionPromises);
    console.log("Expecting three in positions: " + positions.length);

    try {

        var blogs = await Promise.all ([
            locationBlogCreator("Cool Place", users[0]._id, 26, 28),
            locationBlogCreator("Another Cool Place", users[0]._id, 56, 56),
            locationBlogCreator("Yet Another Cool Place", users[0]._id, 28, 56),
            locationBlogCreator("The coolest Place", users[3]._id, 34, 56),
        ]);

        //var blogs = await Promise.all(blogPromises);
        console.log("Expecting four in blogs: " + blogs.length);

    } catch (err) {
        console.log("UPPPS: ", err);
    }

    //Check the virtuals
    //console.log("Slug for a Cool Place", blogs[0].slug);

    // TODO:
    //Add a few likes for "a Cool Place". Virker ikke!
/*     try {
        blogs[0].likedBy.push(users[1]); //Like by Hanne
        blogs[0].likedBy.push(users[2]); //Like by Janne

        //console.log("Likes for a Cool Place", blogs[0].likedByCount);
    } catch(err) {
        console.log('Error!');
    }  */
    
}

createUsers();