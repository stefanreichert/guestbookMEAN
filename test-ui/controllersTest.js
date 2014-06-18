'use strict'

describe('controllers', function(){

	// standard services
	var _spinnerService;
	var _notificationService;

	// test scope
	var testScope;

	// test errors
	var error = 'just for the fun of it!';
	
	beforeEach(function(){
		module('controllers');
	});
	
	beforeEach(inject(function ($q, notificationService, spinnerService) {
		_spinnerService = spinnerService;
		_notificationService = notificationService;
		spyOn(_notificationService, 'warning');
		spyOn(_notificationService, 'error');
		spyOn(_notificationService, 'success');
		spyOn(_spinnerService, 'startSpinning');
		spyOn(_spinnerService, 'stopSpinning');
	}));

	var checkNoMessage = function (count){
		expect(_notificationService.success).not.toHaveBeenCalled();
		expect(_notificationService.error).not.toHaveBeenCalled();
		expect(_notificationService.warning).not.toHaveBeenCalled();
	}

	var checkWarning = function (count){
		expect(_notificationService.success).not.toHaveBeenCalled();
		expect(_notificationService.error).not.toHaveBeenCalled();
		expect(_notificationService.warning.callCount).toBe(count);
	}

	var checkError = function (){
		expect(_notificationService.warning).not.toHaveBeenCalled();
		expect(_notificationService.success).not.toHaveBeenCalled();
		expect(_notificationService.error.callCount).toBe(1);
	}

	var checkSuccess = function (){
		expect(_notificationService.warning).not.toHaveBeenCalled();
		expect(_notificationService.error).not.toHaveBeenCalled();
		expect(_notificationService.success.callCount).toBe(1);
	}

	var checkSpinning = function (){
		expect(_spinnerService.startSpinning.callCount).toBe(1);
		expect(_spinnerService.stopSpinning.callCount).toBe(1);
	}
	
	var checkNoSpinning = function (){
		expect(_spinnerService.startSpinning).not.toHaveBeenCalled();
		expect(_spinnerService.stopSpinning).not.toHaveBeenCalled();
	}

	describe('newDedicationController', function(){
		it('should exist to existing fields', inject(function ($rootScope, $controller){
			// reset scope
			testScope = $rootScope.$new();
			// init controller
			$controller('newDedicationController', {$scope: testScope});
			// check scope
			expect(testScope.newAuthor).toEqual('');
			expect(testScope.newText).toEqual('');
		}));
	});

	describe('guestbookController', function(){
		// test artifact
		var testDedication;

		// result mocks
		var testAddResultMock;
		var testRemoveResultMock;
		var testLoadAllResultMock;
		var nullResultMock;
		var failedResultMock;

		// service
		var _guestbookService;
			
		beforeEach(inject(function ($rootScope, $q, guestbookService){
			// set fields
			_guestbookService = guestbookService;
			testDedication = {_id:'test', author:'Stefan', text:'a test dedication', date: new Date()};
			testAddResultMock = $q.when(testDedication);
			testLoadAllResultMock = $q.when([testDedication]);
			testRemoveResultMock = $q.when(testDedication._id);
			nullResultMock = $q.when(null);
			failedResultMock = $q.reject(error);
		}));

		describe('properly initialized', function(){
			
			var _guestbookController;

			beforeEach(inject(function ($rootScope, $controller){
				// reset scope
				testScope = $rootScope.$new();
				// setup spy
				spyOn(_guestbookService, 'loadAll').andReturn(testLoadAllResultMock);
				// init controller
				_guestbookController = $controller('guestbookController', {$scope: testScope});
				$rootScope.$apply(); // async init!
				// check initial state of the scope /keep in mind that refresh() was called on creation
				expect(testScope.dedications.length).toBe(1);
				expect(testScope.dedications[0]).toEqual(testDedication);
				expect(_guestbookService.loadAll.callCount).toBe(1);
				_guestbookService.loadAll.reset();
				checkSpinning();
				_spinnerService.startSpinning.reset();
				_spinnerService.stopSpinning.reset();
			}));
		
			it('should add a new dedication', inject(function ($rootScope){
				// setup spy
				spyOn(_guestbookService, 'addDedication').andReturn(testAddResultMock);
				// invoke method
				_guestbookController.addDedication(testDedication.author, testDedication.text);
				$rootScope.$apply(); // async result!
				// check scope state after invocation
				expect(testScope.dedications.length).toBe(2);
				expect(testScope.dedications[0]).toEqual(testDedication);
				expect(testScope.dedications[1]).toEqual(testDedication);
				// check service calls
				expect(_guestbookService.addDedication).toHaveBeenCalledWith(testDedication.author, testDedication.text);
				checkSpinning();
				checkSuccess();
			}));

			it('should show an error on service failure when adding', inject(function ($rootScope) {
				//setup spy
				spyOn(_guestbookService, 'addDedication').andReturn(failedResultMock);
				// invoke method
				_guestbookController.addDedication(testDedication.author, testDedication.text);
				$rootScope.$apply(); // async result!
				// check scope state after invocation
				expect(testScope.dedications.length).toBe(1);
				// check service calls
				expect(_guestbookService.addDedication).toHaveBeenCalledWith(testDedication.author, testDedication.text);
				checkSpinning();
				checkError();
			}));

			it('should show two warnings on missing data when adding', inject(function ($rootScope){
				//setup spy
				spyOn(_guestbookService, 'addDedication').andReturn(testAddResultMock);
				// invoke method
				_guestbookController.addDedication(null, null);
				$rootScope.$apply(); // async result!
				// check scope state after invocation
				expect(testScope.dedications.length).toBe(1);
				// check service calls
				expect(_guestbookService.addDedication).not.toHaveBeenCalled();
				checkNoSpinning();
				checkWarning(2);
			}));

			it('should remove a dedication', inject(function ($rootScope){
				// setup spy
				spyOn(_guestbookService, 'removeDedication').andReturn(testRemoveResultMock);
				// invoke method
				_guestbookController.removeDedication(testDedication._id);
				$rootScope.$apply(); // async result!
				// check scope state after invocation
				expect(testScope.dedications.length).toBe(0);
				// check service calls
				expect(_guestbookService.removeDedication).toHaveBeenCalledWith(testDedication._id);
				checkSpinning();
				checkSuccess();
			}));

			it('should show an error on service failure when removing', inject(function ($rootScope){
				// setup spy
				spyOn(_guestbookService, 'removeDedication').andReturn(failedResultMock);
				// invoke method
				_guestbookController.removeDedication(testDedication._id);
				$rootScope.$apply();
				// check scope state after invocation
				expect(testScope.dedications.length).toBe(1);
				// check service calls
				expect(_guestbookService.removeDedication).toHaveBeenCalledWith(testDedication._id);
				checkSpinning();
				checkError();
			}));

			it('should show a warning on missing data when removing', inject(function ($rootScope){
				// setup spy
				spyOn(_guestbookService, 'removeDedication').andReturn(testRemoveResultMock);
				// invoke method
				_guestbookController.removeDedication(null);
				$rootScope.$apply();
				// check scope state after invocation
				expect(testScope.dedications.length).toBe(1);
				// check service calls
				expect(_guestbookService.removeDedication).not.toHaveBeenCalled();
				checkNoSpinning();
				checkError();
			}));
		});

		describe('with service initially failing to load', function(){

			it('should show an error when refreshing', inject(function ($rootScope, $controller){
				// reset scope
				testScope = $rootScope.$new();
				// setup spy
				spyOn(_guestbookService, 'loadAll').andReturn(failedResultMock);
				// init controller
				$controller('guestbookController', {$scope: testScope});
				$rootScope.$apply(); // async init!
				// check state of the scope
				expect(testScope.dedications.length).toBe(0);
				// check service calls, refresh() was called on creation
				expect(_guestbookService.loadAll.callCount).toBe(1);
				checkSpinning();
				checkError();
			}));
		});

		describe('with service initially returning null', function(){

			it('should do nothing when refreshing', inject(function ($rootScope, $controller){
				// reset scope
				testScope = $rootScope.$new();
				// setup spy
				spyOn(_guestbookService, 'loadAll').andReturn(nullResultMock);
				// init controller
				$controller('guestbookController', {$scope: testScope});
				$rootScope.$apply(); // async init!
				// check state of the scope
				expect(testScope.dedications.length).toBe(0);
				// check service calls, refresh() was called on creation
				expect(_guestbookService.loadAll.callCount).toBe(1);
				checkSpinning();
				checkNoMessage();
			}));
		});
	});
});