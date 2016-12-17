angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './templates/home.html',
            controller: 'homeCtrl'
        })
        .state('login', {
            url: '/',
            templateUrl: './templates/login.html',
            controller: 'mainCtrl'
        })
        .state('friend', {
            url: '/friend/:github_username',
            templateUrl: './templates/friend.html',
            controller: 'friendCtrl'
        });

    $urlRouterProvider
        .otherwise('/');

})

.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');
})

.factory('myHttpInterceptor', function($q) {
    return {
        'responseError': function(rejection) {
            if (rejection.status == 403) {
                document.location = '/';
                return;
            }
            return $q.reject(rejection);
        }
    };
});
