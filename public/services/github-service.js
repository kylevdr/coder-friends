angular.module('app').service('githubService', function($http) {

this.getFollowing = () => {
  return $http({
    method: 'GET',
    url: '/api/github/following'
  })
};

this.getFriendActivity = (username) => {
  return $http({
    method: 'GET',
    url: `/api/github/${username}/activity`
  })
};

});
