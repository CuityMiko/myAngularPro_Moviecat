//自执行函数
(function(angular){
	'use strict';
	//声明正在热映子模块
	var in_theaters=angular.module('moviecatApp.in_theaters', ['ngRoute']);
	//配置路由
	in_theaters.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/in_theaters', {
			templateUrl: 'in_theaters/index.html',
			controller: 'IntheatersController'
		});
	}])
	//声明控制器
	in_theaters.controller('IntheatersController', ['$scope',function($scope) {

	}]);
})(angular)
