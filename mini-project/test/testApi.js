const chai = require("chai");
var chaiHttp = require('chai-http');
const expect = chai.expect;
const dbSetup = require("..//dbSetup");
const app = require('../app'); // Pass the http.Server to the request().
var userFacade = require("../facades/UserFacade");

chai.use(chaiHttp);

// OBS lige nu tester vi ikke på test databasen.

describe("REST API Test", function () {

    /* 
    before køres en gang før alle test og en gang efter alle test.
    beforeEach køres før hver describe og efter hver describe.
    */

    // before(function (done) {
    /* this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
    dbSetup(require("../settings").TEST_DB_URI); */

 


    describe.only('GET /api/users', function () {
        it('respond with json containing a list of all users.', function (done) {

            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    if (err) console.log(err);
                    res.expect.to.be.json,
                        res.should.have.status(200)

                });
            done();
        });
    });

    describe.only('GET /api/user/:username', function () {
        it('respond with json containing a single user and user name is equal to Kurt.', function (done) {
            chai.request(app)
                .get('/api/find_user/kw')
                .end((err, res) => {
                    if (err) console.log(err);
                    res.expect.to.be.json,
                        res.should.have.status(200)
                    expect(body[0].firstName).to.be.equal("Kurt");
                });
            done();
        });
    });

    describe.only('POST /add_user', function () {
        let data = {
            "firstName": "James",
            "lastName": "Bond",
            "userName": "jb",
            "password": "test",
            "email": "007@007.com"
        }
        it('respond with 201 created and user name is equal James.', function (done) {
            chai.request(app)
                .post('/api/add_user/')
                .send(data)
                .end((err, res) => {
                    if (err) console.log(err);
                    res.expect.to.be.json,
                        res.should.have.status(201) // 201 = response user created.
                    expect(body[0].firstName).to.be.equal("James");
                });
            done();
        });
    });

    describe.only('DELETE /delete_user/', function () {
        it('Delete James Bond and check that userName is null.', function (done) {
            userId = userFacade.findByUserName('jb')._id; // Se på denne her.

            chai.request(app)
                .delete('/delete_user/')
                .send(userId)
                .end((err, res) => {
                    if (err) console.log(err);
                    // Se på det her.
                    user = userFacade.findByUserName('jb');
                    userName = user.userName;
                    expect(res.body.userName).to.be.undefined;
                });
            done();
        });
    });

/*     describe.only("PUT: /update_user/", function () {
        userId = userFacade.findByUserName('kw')._id; // Se på denne her.

        let data = {
            "_id": userId,
            "firstName": "Hans",
            "lastName": "Jensen",
            "userName": "bh",
            "email": "bh@bg.dk",
            "password": "test"
        }
        it('Expect to update ', function (done) {

            chai.request(app)
                .put('/update_user/')
                .send(data)
                .end((err, res) => {
                    expect(res.body.userName).to.be.equal('Hans');

                });
            done()
        });
    }); */

});
