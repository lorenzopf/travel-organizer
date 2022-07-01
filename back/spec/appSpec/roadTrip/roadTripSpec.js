const server = require("../../../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const request = require('request');
const base_url = 'http://localhost:' + server.port;
let roadTrip = {
    name: 'go to paris',
    budget: '1200 €',
    cities: [{ lat: '', lgt: '' }, { lat: '', lgt: '' }, { lat: '', lgt: '' }],
    enjoys: [{ lat: '', lgt: '' }, { lat: '', lgt: '' }, { lat: '', lgt: '' }],
    sleeps: [{ lat: '', lgt: '' }, { lat: '', lgt: '' }, { lat: '', lgt: '' }],
    travels: [{ lat: '', lgt: '' }, { lat: '', lgt: '' }, { lat: '', lgt: '' }],
    eats: [{ lat: '', lgt: '' }, { lat: '', lgt: '' }, { lat: '', lgt: '' }],
    drinks: [{ lat: '', lgt: '' }, { lat: '', lgt: '' }, { lat: '', lgt: '' }]
};

let id = "";



describe("roadTripController test", function () {

    it("/create/roadtrips create a road trip", function (done) {
        /* chai.request(base_url).post("/create/roadtrips").type('form').send(roadtrip).then(function(res){
 
             expect(res.statusCode).toBe(200);
             expect(typeof res.body === "object").toBeTruthy();
             done();
 
        }); */

        /*request.post({ url: base_url + "/create/roadtrips", form: roadTrip }, '', function (err, httpResponse, body) {
            expect(httpResponse.statusCode).toBe(200);
            done();
        })*/
        done();
    })

    /* it("/roadtrips list all road trip", function (done) {
         chai.request(base_url).get("/roadtrips").end((err, res) => {
             expect(res.statusCode).toBe(200);
             expect(typeof res.body === "object").toBeTruthy();
             done();
         });
     })

     it("/roadtrip/:id_road_trip show one road trip", function (done) {
         chai.request(base_url).get("/roadtrip/"+id).end((err, res) => {
             expect(res.statusCode).toBe(200);
             expect(typeof res.body === "object").toBeTruthy();
             done();
         });
     })


     it("/roadtrip/:id_road_trip delete road trip", function (done) {
         chai.request(base_url).delete("/roadtrip/"+id).end((err, res) => {
             expect(res.statusCode).toBe(200);
             expect(typeof res.body === "object").toBeTruthy();
             done();
         });
     })*/
})