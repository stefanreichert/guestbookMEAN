/*! guestbookMEAN 2014-06-10 */
"use strict";var services=angular.module("services",["resources","angularSpinner"]);services.service("guestbookService",["Dedication","$http",function(a,b){this.addDedication=function(b,c){return a.save({author:b,text:c}).$promise.then(function(a){return a})},this.removeDedication=function(b){return a.remove({dedicationId:b}).$promise.then(function(){return b})},this.loadAll=function(){return a.query().$promise.then(function(a){return a})},this.findAuthors=function(a){return b.get("dedication/author",{params:{prefix:a}}).then(function(a){return a.data})}}]),services.service("spinnerService",["usSpinnerService",function(a){var b="spinner";this.startSpinning=function(){a.spin(b)},this.stopSpinning=function(){a.stop(b)}}]);