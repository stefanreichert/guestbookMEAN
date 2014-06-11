/*! guestbookMEAN 2014-06-10 */
"use strict";var controllers=angular.module("controllers",["services"]);controllers.controller("newDedicationController",["$scope","guestbookService","spinnerService",function(a,b,c){a.newText="",a.newAuthor="",a.authorCompletionPrefix="",a.authors=[],a.$watch("newAuthor",function(){a.newAuthor&&a.newAuthor.length>=3?d():a.authors&&a.authors.length>0&&e()});var d=function(){var c=a.authorCompletionPrefix.length>0&&a.authorCompletionPrefix===a.newAuthor.substring(0,3);c||(a.authorCompletionPrefix=a.newAuthor.substring(0,3),b.findAuthors(a.authorCompletionPrefix).then(function(b){a.authors=b}))},e=function(){a.authorCompletionPrefix="",a.authors=[]};this.addDedication=function(d,f){var g=!0;d||(showWarning("cannot add dedication, author is missing!"),g=!1),f||(showWarning("cannot add dedication, text is missing!"),g=!1),g&&(c.startSpinning(),b.addDedication(d,f).then(function(b){a.dedications.unshift(b),e(),showSuccess('dedication "'+f+'" added')}).catch(function(a){showError("Failed to add dedication",a)}).then(function(){c.stopSpinning()}))}}]),controllers.controller("guestbookController",["$scope","$log","guestbookService","spinnerService",function(a,b,c,d){a.dateFormat="dd.MM.yyyy HH:mm",a.dedications=[];var e=function(c,d){a.notifications&&d?a.notifications.show(d,c):b.log("cannot show ["+c+"]: "+d)},f=function(a,c){e("error",a),b.log(c)},g=function(a){e("success",a)};this.removeDedication=function(b){b?(d.startSpinning(),c.removeDedication(b).then(function(b){var c=a.dedications.filter(function(a){return a._id!=b});a.dedications=c,g("dedication removed")}).catch(function(a){f("Failed to remove dedication",a)}).then(function(){d.stopSpinning()})):messageService.showError("cannot remove dedication, key is missing!")},this.refresh=function(){d.startSpinning(),c.loadAll().then(function(b){b&&(a.dedications=b.splice(0))}).catch(function(a){f("Failed to load dedications",a)}).then(function(){d.stopSpinning()})},this.refresh()}]);