angular.module('Login',[])
.controller('LoginCtrl', ['$scope','$location', LoginCtrl]);

function LoginCtrl($scope,$location){
	$scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			$location.absUrl('http://localhost:8080/Customer360/dashboard.html');
		}

	};
}