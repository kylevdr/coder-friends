angular.module('app').controller('homeCtrl', function($scope, githubService) {

$scope.getFollowing = () => {
  githubService.getFollowing().then((response) => {
    $scope.friends = response.data;
  });
};

$scope.getFollowing();

});
