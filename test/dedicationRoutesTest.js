'use strict'

// var expect = require('expect');
var http = require('http');
var dedicationRoutes = require('../app-cov/routes/dedicationRoutes');
var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

describe('dedication routes', function(){

	var request;
	var response;

	beforeEach(function (){
		request = {
			body:{}
		};
		response = {
			statusCode: null,
			send: function(message){},
			json: function(data){}
		}
	});

	it('should defined the approprite routes', function() {
		expect(dedicationRoutes.all).to.exist;
		expect(dedicationRoutes.create).to.exit;
		expect(dedicationRoutes.remove).to.exist;
	});
		

	it('should return a 400 when author param is missing', function () {
		var hasAuthorPropertySpy = sinon.stub(request.body, 'hasOwnProperty');
		hasAuthorPropertySpy.withArgs('author').returns(false);
		hasAuthorPropertySpy.withArgs('text').returns(true);
		var sendSpy = sinon.spy(response, 'send');
		dedicationRoutes.create(request, response);

		expect(hasAuthorPropertySpy).to.be.calledWith('author');
		expect(hasAuthorPropertySpy).not.to.be.calledWith('text');
		expect(sendSpy).to.be.calledWith('Error 400: Post syntax incorrect.');
		expect(response.statusCode).to.equal(400);
	});

	it('should return a 400 when text param is missing', function () {
		var hasAuthorPropertySpy = sinon.stub(request.body, 'hasOwnProperty');
		hasAuthorPropertySpy.withArgs('author').returns(true);
		hasAuthorPropertySpy.withArgs('text').returns(false);
		var sendSpy = sinon.spy(response, 'send');
		dedicationRoutes.create(request, response);

		expect(hasAuthorPropertySpy).to.be.calledWith('author');
		expect(hasAuthorPropertySpy).to.be.calledWith('text');
		expect(sendSpy).to.be.calledWith('Error 400: Post syntax incorrect.');
		expect(response.statusCode).to.equal(400);
	});


});