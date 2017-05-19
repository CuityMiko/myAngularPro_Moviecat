(function(angular){
	'use strict';

	// 声明主模块并引入三个子模块
	var moviecatApp= angular.module('moviecatApp', [
		'ngRoute',
		'moviecatApp.in_theaters',
		'moviecatApp.coming_soon',
		'moviecatApp.top250'
	]);
	//配置路由规则
	moviecatApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'}); //当没有匹配到路由的时候则会跳转到默认配置的路由上去
	}]);

})(angular)
