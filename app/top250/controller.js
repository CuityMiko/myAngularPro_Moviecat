//自执行函数
(function(angular){
	'use strict';
	//声明Top250子模块
	var top250=angular.module('moviecatApp.top250', ['ngRoute']);
	//配置路由
	top250.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/top250', {
			templateUrl: 'top250/index.html',
			controller: 'Top250Controller'
		});
	}])
	//声明控制器
	top250.controller('Top250Controller', ['$scope',function($scope) {

	}]);
})(angular)
