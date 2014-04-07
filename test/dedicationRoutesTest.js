'use strict'

// var expect = require('expect');
var dedicationRoutes = require('../app-cov/routes/dedicationRoutes');

describe('dedication routes', function(){

	it('should defined the approprite routes', function() {
		expect(dedicationRoutes.all).toBeDefined();
		expect(dedicationRoutes.create).toBeDefined();
		expect(dedicationRoutes.remove).toBeDefined();
		sinon.spy($, dedicationRoutes);
	});

});