const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("..//dbSetup");
var User = require('../models/User');
var LocationBlog = require('../models/LocationBlog');
var blogFacade = require('../facades/blogFacade');


describe("Test the blog facade and database querries.", function () {
    // Connect to test database before running tests.
  before(async function () {
    this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
    await dbSetup(require("../settings").TEST_DB_URI);
  });

  // Close the connection after the tests.
  after(function () {
    mongoose.connection.close();
  });
  
  // Setup the database before each test.
  // var users = [];
  // var blogs = [];
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    await LocationBlog.deleteMany({}).exec();
    
    users = await Promise.all([
      new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
      new User({ firstName: "Ib", lastName: "Gutter", userName: "ig", password: "test", email: "ig@b.dk" }).save(),
      new User({ firstName: "Jim", lastName: "Hansen", userName: "jh", password: "test", email: "jh@b.dk" }).save(),
    ])
  
    blogs = await Promise.all([
        new LocationBlog({ info: "Cool Place", pos: { longitude: 26, latitude: 28 }, author: users[0]._id }).save(),
        new LocationBlog({ info: "Another Cool Place", pos: { longitude: 56, latitude: 56 }, author: users[1]._id }).save(),
        new LocationBlog({ info: "Really Cool Place", pos: { longitude: 36, latitude: 56 }, author: users[2]._id }).save(),
        new LocationBlog({ info: "Stupid Cool Place", pos: { longitude: 16, latitude: 26 }, author: users[1]._id }).save(),
    ])   
})
    // Test get all blogs.
    it("Expect to find 4 blogs.", async function () {
        var blogs = await blogFacade.getAllBlogs(); 
        expect(blogs.length).to.be.equal(4);
      });

    // Test add a new user.
    it("Expect to add a new blog so there now is 5 blogs", async function () {
        var blog = await blogFacade.addLocationBlog('Wanna Be Place' , users[1]._id ,12, 14 ); //userFacade.addUser("Sam", "Kasko", "sk", "test", "sk@b.dk");
        expect(blog).to.not.be.null;
        expect(blog.info).to.be.equal('Wanna Be Place');
        var blogs = await blogFacade.getAllBlogs(); 
        expect(blogs.length).to.be.equal(5);
    });

    // Test that we can find a blog by id.
    it("Expect to find a blog by id.", async function () {
        blog = await blogFacade.findById(blogs[3]._id); 
        expect(blog.info).to.be.equal("Stupid Cool Place");
      });

      it("Like Cool Place", async function () {
        await blogFacade.likeLocationBlog(blogs[0]._id, users[0]._id);      
        var blog = await blogFacade.likeLocationBlog(blogs[0]._id, users[1]._id);
        expect(blog.likedByCount).to.be.equal(2);
      });






});