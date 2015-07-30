/* global angular */

var validateBeforeSubmit = function() {
	'use strict';

		return {
			restrict: 'A',
			link: function(scope , element , attributes) {
				element.bind('submit', function(e) {
					e.preventDefault();

					['input', 'textarea', 'select'].forEach(function(e){
							element.find(e).removeClass('ng-pristine');
					});

					// Get the form object.
					var form = scope[attributes.name];

					// Set all the fields to dirty and apply the changes on the scope so that
					// validation errors are shown on submit only.
					angular.forEach(form , function (formElement , fieldName) {
							// If the fieldname starts with a '$' sign, it means it's an Angular
							// property or function. Skip those items.
							if (fieldName[0] === '$') { return; }

							formElement.$pristine = false;
							formElement.$dirty = true;
					});

					// Continue if the form is valid.
					if (form.$valid) {
							scope.$eval(attributes.validateBeforeSubmit);
					}

					scope.$apply();

				});
			}
		};
};

angular.module('myApp.directives').directive('validateBeforeSubmit', validateBeforeSubmit);
