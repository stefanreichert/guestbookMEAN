'use strict';

describe('services', function() {

	beforeEach(function (){
		module('services');
	});

	var noError = 'this error should not be there, dude!';
	var thrownError = 'just for the fun of it';

	describe('guestbookService', function(){
		
		// the test result mocks
		var addDedicationResourceMock;
		var removeDedicationResourceMock;
		var loadAllDedicationResourceMock;
		var failedResourceMock;

		// the service
		var _guestbookService;

		// the resource
		var _Dedication

		beforeEach(inject(function ($q, guestbookService, Dedication){
			var testDedication = {_id: 'mockID', author:'Stefan', text:'A mock dedication'};
			// set the services and resources
			_guestbookService = guestbookService;
			_Dedication = Dedication;
			// setup the resource result mocks for the different resource calls
			addDedicationResourceMock = {
				$promise: $q.when(testDedication)
			}
			removeDedicationResourceMock = {
				$promise: $q.when(testDedication._id)
			}
			loadAllDedicationResourceMock = {
				$promise: $q.when([testDedication])
			}
			failedResourceMock = {
				$promise: $q.reject(thrownError)
			}
		}));

		it('should save the resource when adding a new dedication', inject(function ($rootScope) {
			// setup spy
			spyOn(_Dedication, 'save').andReturn(addDedicationResourceMock);
			// call method under test
			_guestbookService.addDedication('an author', 'a text');
			$rootScope.$apply(); // force the then function to be executed
			// check method calls
			expect(_Dedication.save).toHaveBeenCalled();
		}));

		it('should fail if saving the resource fails', inject(function ($rootScope) {
			// setup spy
			spyOn(_Dedication, 'save').andReturn(failedResourceMock);
			// call method under test
			var error = noError;
			_guestbookService.addDedication('an author', 'a text').catch(function (err){
				error = err;
			});
			$rootScope.$apply(); // force the catch function to be executed
			// check method calls and result
			expect(_Dedication.save).toHaveBeenCalled();
			expect(error).toBe(thrownError);
		}));

		it('should remove the resource when removing an existing Dedication', inject(function ($rootScope) {
			// setup spy
			spyOn(_Dedication, 'remove').andReturn(removeDedicationResourceMock);
			// call method under test
			_guestbookService.removeDedication('mockID');
			$rootScope.$apply(); // force the then function to be executed
			// check method calls
			expect(_Dedication.remove).toHaveBeenCalled();
		}));

		it('should fail removing the resource fails', inject(function ($rootScope) {
			// setup spy
			spyOn(_Dedication, 'remove').andReturn(failedResourceMock);
			// call method under test
			var error = noError;
			_guestbookService.removeDedication('mockID').catch(function (err){
				error = err;
			});
			$rootScope.$apply(); // force the catch function to be executed
			// check method calls and result
			expect(_Dedication.remove).toHaveBeenCalled();
			expect(error).toBe(thrownError);
		}));

		it('should query the resource when loading all dedications', inject(function ($rootScope){
			// setup spy
			spyOn(_Dedication, 'query').andReturn(loadAllDedicationResourceMock);
			// call method under test
			var loadedDedications;
			_guestbookService.loadAll().then(function (dedications) {
				loadedDedications = dedications;
			});
			$rootScope.$apply(); // force the then function to be executed
			// check method calls and result
			expect(_Dedication.query).toHaveBeenCalled();
			expect(loadedDedications.length).toBe(1);
		}));

		it('should fail if querying the resource fails', inject(function ($rootScope){
			// setup spy
			spyOn(_Dedication, 'query').andReturn(failedResourceMock);
			// call method under test
			var error = noError;
			_guestbookService.loadAll().catch(function (err){
				error = err;
			});
			$rootScope.$apply(); // force the catch function to be executed
			// check method calls and result
			expect(_Dedication.query).toHaveBeenCalled();
			expect(error).toBe(thrownError);
			
		}));
	});

	describe('messageService', function() {

		var _messageService;

		describe('with invalid setup', function() {
			
			beforeEach(inject(function (messageService){
				_messageService = messageService;
			}));
			
			it('should log a warning if no messageListener is set', inject(function ($log){
				spyOn($log, 'warn');
				_messageService.showError(thrownError);
				expect($log.warn).toHaveBeenCalledWith('no listeners registered - cannot show [error]: ' + thrownError);
			}));
		});

		describe('with valid setup', function() {
			
			var _notificationListener;

			beforeEach(inject(function (messageService){
				_messageService = messageService;
				_notificationListener = {
					handleMessage: function(type, message){}
				}
				_messageService.addListener(_notificationListener);
				spyOn(_notificationListener, 'handleMessage');
			}));

			it('should pop up an error message', function (){
				_messageService.showError(thrownError);
				expect(_notificationListener.handleMessage).toHaveBeenCalledWith('error', thrownError);
			});

			it('should not pop up an error message in case of an empty text', inject(function ($log){
				spyOn($log, 'warn');
				_messageService.showError(null);
				expect(_notificationListener.handleMessage).not.toHaveBeenCalled();
				expect($log.warn).toHaveBeenCalledWith('not showing [error]: null');
			}));

			it('should pop up a success message', function (){
				_messageService.showSuccess(thrownError);
				expect(_notificationListener.handleMessage).toHaveBeenCalledWith('success', thrownError);
			});

			it('should not pop up a success message in case of an empty text', inject(function ($log){
				spyOn($log, 'warn');
				_messageService.showSuccess(null);
				expect(_notificationListener.handleMessage).not.toHaveBeenCalled();
				expect($log.warn).toHaveBeenCalledWith('not showing [success]: null');
			}));


			it('should pop up a warning message', function (){
				_messageService.showWarning(thrownError);
				expect(_notificationListener.handleMessage).toHaveBeenCalledWith('warning', thrownError);
			});

			it('should not pop up a warning message in case of an empty text', inject(function ($log){
				spyOn($log, 'warn');
				_messageService.showWarning(null);
				expect($log.warn).toHaveBeenCalledWith('not showing [warning]: null');
			}));
		});
		
	});

	describe('spinnerService', function() {

		var _usSpinnerService;
		var _spinnerService;

		beforeEach(inject(function (usSpinnerService, spinnerService){
			_usSpinnerService = usSpinnerService;
			_spinnerService = spinnerService;
		}));

		it('should start spinning', function (){
			spyOn(_usSpinnerService, 'spin');
			_spinnerService.startSpinning();
			expect(_usSpinnerService.spin).toHaveBeenCalledWith('spinner');
		});
		
		it('should stop spinning', function (){
			spyOn(_usSpinnerService, 'stop');
			_spinnerService.stopSpinning();
			expect(_usSpinnerService.stop).toHaveBeenCalledWith('spinner');
		});
	});
});