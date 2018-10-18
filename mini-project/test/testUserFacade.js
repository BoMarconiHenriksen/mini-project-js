const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("..//dbSetup");
var User = require('../models/User');
var userFacade = require('../facades/userFacade');

// Start test with: mocha testUserFacade.

describe("Test the user facade and database querries.", function () {

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
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    users = await Promise.all([
      new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
      new User({ firstName: "Ib", lastName: "Gutter", userName: "ig", password: "test", email: "ig@b.dk" }).save(),
      new User({ firstName: "Jim", lastName: "Hansen", userName: "jh", password: "test", email: "jh@b.dk" }).save(),
    ]);
  });

  // Test getAllUsers.
  it("Expect to find 3 users.", async function () {
    var users = await userFacade.getAllUsers();
    expect(users.length).to.be.equal(3);
  });

  // Test findByUserName.
  it("Expect to find all the values for Kurt Wonnegut", async function () {
    var user = await userFacade.findByUserName("kw");
    expect(user.firstName, user.lastName, user.userName,user.password, user.email).to.be.equal("Kurt", "Wonnegut", "kw", "test", "a@b.dk");
  });

  // Test add a new user.
  it("Expect to add a new user so there now is 4 users", async function () {
    var user = await userFacade.addUser("Sam", "Kasko", "sk", "test", "sk@b.dk");
    expect(user).to.not.be.null;
    expect(user.firstName).to.be.equal("Sam");
    var users = await userFacade.getAllUsers();
    expect(users.length).to.be.equal(4);
  });

});