angular.module('app').controller('mainCtrl', function($scope, githubService) {

$scope.login = () => {
  $window.location.href = 'http://localhost:3000/auth/github';
}

});
