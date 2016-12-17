angular.module('app').controller('friendCtrl', function($scope, $stateParams, githubService) {

$scope.username = $stateParams.github_username;

$scope.getFriendActivity = () => {
  githubService.getFriendActivity($scope.username).then((response) => {
    $scope.friendActivity = response.data;
    console.dir($scope.friendActivity);
  });
};

$scope.getFriendActivity();

});
