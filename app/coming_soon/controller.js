//自执行函数
(function(angular){
	'use strict';
	//声明即将上映子模块
	var coming_soon=angular.module('moviecatApp.coming_soon', ['ngRoute']);
	//配置路由
	coming_soon.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/coming_soon', {
			templateUrl: 'coming_soon/index.html',
			controller: 'ComingsoonController'
		});
	}])
	//声明控制器
	coming_soon.controller('ComingsoonController', ['$scope',function($scope) {

	}]);
})(angular)
