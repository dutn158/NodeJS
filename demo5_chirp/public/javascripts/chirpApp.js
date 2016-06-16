var app = angular.module('chirpApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'main.html',
			controller : 'mainController'
		})
});

app.controller('mainController', function($scope) {
	$scope.posts = [];
	$scope.newPost = {created_by: '', text: '', created_at: ''};

	$scope.post = function() {
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = {created_by: '', text: '', created_at: ''};			
	};
});