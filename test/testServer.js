/*var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('Blobs', function() {
  it('should list ALL blobs on /blobs GET');
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});*/

/*describe('First test', () => {
  it('Should assert true to be true', () => {
    expect(true).to.be.true;
  });
}); 

describe('Get Application tests', () => {
  beforeEach(() => {
    nock('http://10.1.11.27:8090')
      .get('/application/1')
      .reply(200, response);
  });

  it('Get a application by applicationId', () => {
    return getApplication('1')
      .then(response => {
        expect(typeof response).to.equal('object');
        expect(response.firstName).to.equal('firstName1');
        expect(response.lastName).to.equal('lastName1');
        expect(response.nic).to.equal('000000001v');
        expect(response.institute).to.equal('institute1');
        expect(response.gender).to.equal('gender');
        expect(response.lastCompany).to.equal('company1');
        expect(response.email).to.equal('user1@gmail.com');
        expect(response.contactNumber).to.equal('0000000001');
        expect(response.positionByPositionId).to.equal('1');
        expect(response.cvName).to.equal('firstName1lastName000000001v');

      });
  });
});

/*describe('Get Application tests', () => {
  beforeEach(() => {
    nock('http://10.1.11.27:8090')
      .get('/application/')
      .reply(200, response);
  });

  it('Get all the applications', () => {
    return getApplication('1')
      .then(response => {
        expect(typeof response).to.equal('object');
        expect(response.firstName).to.equal('firstName1');
        expect(response.lastName).to.equal('lastName1');
        expect(response.nic).to.equal('000000001v');
        expect(response.institute).to.equal('institute1');
        expect(response.gender).to.equal('gender');
        expect(response.lastCompany).to.equal('company1');
        expect(response.email).to.equal('user1@gmail.com');
        expect(response.contactNumber).to.equal('0000000001');
        expect(response.positionByPositionId).to.equal('1');
        expect(response.cvName).to.equal('firstName1lastName000000001v');

      });
  });
});*/

/*
it('Get all the applications', function(done) {
    request('http://10.1.11.27:8090/application/',{ headers: { 'Authorization': Basic } }, function(error, response, body) {
        //expect(body).to.equal('Hello World');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.equal()
        done();
    });
});

 /* describe ('Application API', function() {
      it('status', function(done){
          request('http://10.1.11.27:8090/application/',{ headers: { 'Authorization': Basic } }, function(error, response, body) {
              expect(response.statusCode).to.equal(200);
              response.should.be.json;
              done();
          });
      });

      it('content', function(done) {
          request('http://10.1.11.27:8090/application/',{ headers: { 'Authorization': Basic } }, function(error, response, body) {
              response.should.be.json;
              done();
          });
      });
  });*/