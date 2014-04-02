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
		var _toaster;

		beforeEach(inject(function (toaster, messageService){
			_messageService = messageService;
			_toaster = toaster;
		}));

		it('should define a pop method', function (){
			expect(_toaster, 'pop').toBeDefined();
		});

		it('should pop up an error message', function (){
			spyOn(_toaster, 'pop');
			_messageService.showError(thrownError);
			expect(_toaster.pop).toHaveBeenCalledWith('error', thrownError);
		});

		it('should not pop up an error message in case of an empty text', function (){
			spyOn(_toaster, 'pop');
			_messageService.showError(null);
			expect(_toaster.pop).not.toHaveBeenCalled();
		});

		it('should pop up a success message', function (){
			spyOn(_toaster, 'pop');
			_messageService.showSuccess(thrownError);
			expect(_toaster.pop).toHaveBeenCalledWith('success', thrownError);
		});

		it('should not pop up a success message in case of an empty text', function (){
			spyOn(_toaster, 'pop');
			_messageService.showSuccess(null);
			expect(_toaster.pop).not.toHaveBeenCalled();
		});


		it('should pop up a warning message', function (){
			spyOn(_toaster, 'pop');
			_messageService.showWarning(thrownError);
			expect(_toaster.pop).toHaveBeenCalledWith('warning', thrownError);
		});

		it('should not pop up a warning message in case of an empty text', function (){
			spyOn(_toaster, 'pop');
			_messageService.showWarning(null);
			expect(_toaster.pop).not.toHaveBeenCalled();
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