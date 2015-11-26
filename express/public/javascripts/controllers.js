'use strict';

/* Controllers */

var classManagerControllers = angular.module('classManagerControllers', ['ngRoute']);

classManagerControllers.controller('HomeCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        if ($rootScope.data != null) {
            $location.url('/user');
        }
}]);

classManagerControllers.controller('LoginCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        $scope.account = null;
        $scope.password = null;
        $scope.result = {};
        $scope.login = function() {
            // if($scope.login_form.$invalid) return;
            User.login({
                account: $scope.account,
                password: $scope.password,
                // account: '14331048',
                // password: '036713',
            }).success(function(data, status, headers, config) {
                if (data.error === false) {
                    User.search_myself().success(function(data, status, headers, config) {
                        $rootScope.data = data;
                        $location.url('/user');
                    });
                } else {
                    result = data;
                }
            });
        }
}]);
classManagerControllers.controller('RegisterCtrl', ['$scope', 'User', 'Organization',
    function($scope, User, Organization) {
        $scope.account = null;
        $scope.password = null;
        $scope.re_password = null;
        $scope.result = {};
        $scope.register = function() {
            if($scope.register_form.$invalid) return;
            if ($scope.password !== $scope.re_password) return;
            User.register({
                account: $scope.account,
                password: $scope.password,
            }).success(function(data, status, headers, config) {
                $scope.result.data = data;
                $scope.result.status = status;
                $scope.result.headers = headers;
                $scope.result.config = config;
            });
        }
}]);
classManagerControllers.controller('UserCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        if ($rootScope.data == null) {
            $location.url('/');
        }
        $scope.user_data = $rootScope.data.user_data;
}]);