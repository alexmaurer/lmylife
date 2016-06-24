var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http, $window) {
	$scope.formData = {};


	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
			.success(function (data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	




	// when submitting the add form, send the text to the node API
	$scope.createTodo = function () {
		$http.post('/api/todos', $scope.formData)
			.success(function (data) {

				$scope.formData = {}; // clear the form so our user is ready to enter another

				$scope.todos = data.reverse();
				$window.text_remaining = 199;

				console.log(data);

			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	};







	// delete a todo after checking it
	$scope.deleteTodo = function (id) {
		$http.delete('/api/todos/' + id)
			.success(function (data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	};

	$scope.addLike = function (doc) {
		

		if (doc.counterDisabled == false) {
			doc.counter += 1;
			$http.put('/api/todos/' + doc._id, doc).success(function (response) {
				console.log('Likes updated!')
			});
		}

		doc.counterDisabled = true;
		console.log(doc);
		console.log(doc.counterDisabled);
	}


}