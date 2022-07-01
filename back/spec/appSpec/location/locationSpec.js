const server = require("../../../server");
const chaiHttp = require("chai-http");
const chai = require("chai");

chai.use(chaiHttp);
const findParams = [
    {
        latitude: "43.6043",
        longitude: "1.4437",
        radius: 10000
    }
];

describe("LocationController GET /find tests", function () {

    it("/find with address query param", function (done) {
        chai.request(server).get("/find?address=31+Allée+Ju").end((err, res) => {
            expect(res.statusCode).toBe(404);
            expect(typeof res.body === "object").toBeTruthy();
            done();
        });
    });

})

describe("LocationController POST /enjoy tests", function () {

    it("POST /enjoy", (done) => {
        chai.request(server).post("/enjoy").send(findParams).end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            done();
        });
    });

});

describe("LocationController POST /sleep tests", function () {

    it("POST /sleep", function (done) {
        chai.request(server).post("/sleep").send(findParams).end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            done();
        });
    });

})

describe("LocationController POST /travel tests", function () {

    it("POST /travel", function (done) {
        chai.request(server).post("/travel").send(findParams).end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            done();
        });
    });

})

describe("LocationController POST /eat tests", function () {

    it("POST /eat", function (done) {
        chai.request(server).post("/eat").send(findParams).end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            done();
        });
    });

})

describe("LocationController POST /drink tests", function () {

    it("POST /drink", function (done) {
        chai.request(server).post("/drink").send(findParams).end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            done();
        });
    });

})