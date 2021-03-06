var assert = require('assert');
var httpHelper = require('./helpers/httpHelper.js');
var appHelper = require('./helpers/appHelper');

describe('Default controller routing', function() {
	var appName = 'testApp';

	before(function(done) {
    appHelper.build(function(err) {
      if(err) return done(err);
      process.chdir(appName);
      done();
    });
  });

  after(function() {
    process.chdir('../');
    appHelper.teardown();
  });

	describe('requests to :controller/:method', function() {

		it('should call the specified method of the specified controller', function(done) {

			httpHelper.testRoute('get', 'test/index', function(err, response) {
				if (err) done(new Error(err));

				assert(response.body === 'index');
				done();
			});
		});

	});

	describe('REST default routes', function() {

		describe('a get request to /:controller', function() {

			it('should call the controller index method', function(done) {

				httpHelper.testRoute('get', 'test', function(err, response) {
					if (err) done(new Error(err));

					assert(response.body === 'index');
					done();
				});
			});
		});

		describe('a get request to /:controller/:id', function() {

			it('should call the controller find method', function(done) {

				httpHelper.testRoute('get', 'test/1', function(err, response) {
					if (err) done(new Error(err));

					assert(response.body === 'find');
					done();
				});
			});
		});

		describe('a get request to /:controller/create', function() {

			it('should call the controller create method', function(done) {

				httpHelper.testRoute('get', 'test/create', function(err, response) {
					if (err) done(new Error(err));

					assert(response.body === 'create');
					done();
				});
			});
		});

		describe('a post request to /:controller/create', function() {

			it('should call the controller create method', function(done) {

				httpHelper.testRoute('post', 'test/create', function(err, response) {
					if (err) done(new Error(err));

					assert(response.body === 'create');
					done();
				});
			});
		});

		describe('a put request to /:controller/:id', function() {

			it('should call the controller update method', function(done) {

				httpHelper.testRoute('put', 'test/1', function(err, response) {
					if (err) done(new Error(err));

					assert(response.body === 'update');
					done();
				});
			});
		});

		describe('a delete request to /:controller/:id', function() {

			it('should call the controller destroy method', function(done) {

				httpHelper.testRoute('del', 'test/1', function(err, response) {
					if (err) done(new Error(err));

					assert(response.body === 'destroy');
					done();
				});
			});
		});
	});
});
