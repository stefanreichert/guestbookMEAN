'use strict';

describe('test suite', function() {

	beforeEach(function (){
		module('services');
	});

	var noError = 'this error should not be there, dude!';
	var thrownError = 'just for the fun of it';

	describe('guestbook service', function(){
		
		var addDedicationResultMock;
		var removeDedicationResultMock;
		var loadAllDedicationResultMock;
		var failedResultMock;

		beforeEach(inject(function ($q){
			addDedicationResultMock = {
				$promise: $q.when({author:'Stefan', text:'A mock dedication'})
			}
			removeDedicationResultMock = {
				$promise: $q.when('mockID')
			}
			loadAllDedicationResultMock = {
				$promise: $q.when([{author:'Stefan', text:'A mock dedication'}])
			}
			failedResultMock = {
				$promise: $q.reject(thrownError)
			}
		}));

		it('should call "save" on the resource when adding a new dedication', inject(function (guestbookService, Dedication) {
			expect(guestbookService, 'addDedication').toBeDefined();
			spyOn(Dedication, 'save').andReturn(addDedicationResultMock);
			guestbookService.addDedication('an author', 'a text');
			expect(Dedication.save).toHaveBeenCalled();
		}));

		it('should fail if "save" fails on the resource', inject(function (guestbookService, Dedication, $rootScope) {
			expect(guestbookService, 'addDedication').toBeDefined();
			spyOn(Dedication, 'save').andReturn(failedResultMock);
			var error = noError;
			guestbookService.addDedication('an author', 'a text').catch(function (err){
				error = err;
			});
			expect(Dedication.save).toHaveBeenCalled();
			$rootScope.$apply();
			expect(error).toBe(thrownError);
		}));

		it('should call "remove" on the resource when removing an existing dedication', inject(function (guestbookService, Dedication) {
			expect(guestbookService, 'removeDedication').toBeDefined();
			spyOn(Dedication, 'remove').andReturn(removeDedicationResultMock);
			guestbookService.removeDedication('mockID');
			expect(Dedication.remove).toHaveBeenCalled();
		}));

		it('should fail if "remove" fails on the resource', inject(function (guestbookService, Dedication, $rootScope) {
			expect(guestbookService, 'removeDedication').toBeDefined();
			spyOn(Dedication, 'remove').andReturn(failedResultMock);
			var error = noError;
			guestbookService.removeDedication('mockID').catch(function (err){
				error = err;
			});
			expect(Dedication.remove).toHaveBeenCalled();
			$rootScope.$apply();
			expect(error).toBe(thrownError);
		}));

		it('should call "query" on the resource when loading all dedications', inject(function (guestbookService, Dedication, $rootScope){
			expect(guestbookService, 'loadAll').toBeDefined();
			spyOn(Dedication, 'query').andReturn(loadAllDedicationResultMock);
			var loadedDedications;
			guestbookService.loadAll().then(function (dedications) {
				loadedDedications = dedications;
			});
			expect(Dedication.query).toHaveBeenCalled();
			$rootScope.$apply();
			expect(loadedDedications.length).toBe(1);
		}));

		it('should fail if "query" fails on the resource', inject(function (guestbookService, Dedication, $rootScope){
			expect(guestbookService, 'loadAll').toBeDefined();
			spyOn(Dedication, 'query').andReturn(failedResultMock);
			var error = noError;
			guestbookService.loadAll().catch(function (err){
				error = err;
			});
			expect(Dedication.query).toHaveBeenCalled();
			$rootScope.$apply();
			expect(error).toBe(thrownError);
			
		}));
	});

	describe('message service', function() {
		it('should define a pop method', inject(function (toaster){
			expect(toaster, 'pop').toBeDefined();
		}));

		it('should pop up an error message', inject(function (toaster, messageService){
			spyOn(toaster, 'pop');
			messageService.showError(thrownError);
			expect(toaster.pop).toHaveBeenCalledWith('error', thrownError);
		}));

		it('should not pop up an error message in case of an empty text', inject(function (toaster, messageService){
			spyOn(toaster, 'pop');
			messageService.showError(null);
			expect(toaster.pop).not.toHaveBeenCalled();
		}));

		it('should pop up a success message', inject(function (toaster, messageService){
			spyOn(toaster, 'pop');
			messageService.showSuccess(thrownError);
			expect(toaster.pop).toHaveBeenCalledWith('success', thrownError);
		}));

		it('should not pop up a success message in case of an empty text', inject(function (toaster, messageService){
			spyOn(toaster, 'pop');
			messageService.showSuccess(null);
			expect(toaster.pop).not.toHaveBeenCalled();
		}));


		it('should pop up a warning message', inject(function (toaster, messageService){
			spyOn(toaster, 'pop');
			messageService.showWarning(thrownError);
			expect(toaster.pop).toHaveBeenCalledWith('warning', thrownError);
		}));

		it('should not pop up a warning message in case of an empty text', inject(function (toaster, messageService){
			spyOn(toaster, 'pop');
			messageService.showWarning(null);
			expect(toaster.pop).not.toHaveBeenCalled();
		}));
	});

	describe('spinner service', function() {
		it('should start spinning', inject(function (usSpinnerService, spinnerService){
			spyOn(usSpinnerService, 'spin');
			spinnerService.startSpinning();
			expect(usSpinnerService.spin).toHaveBeenCalledWith('spinner');
		}));
		it('should stop spinning', inject(function (usSpinnerService, spinnerService){
			spyOn(usSpinnerService, 'stop');
			spinnerService.stopSpinning();
			expect(usSpinnerService.stop).toHaveBeenCalledWith('spinner');
		}));
	});
});