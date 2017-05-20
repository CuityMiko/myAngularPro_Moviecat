(function(angular){
	'use strict';

	// 声明主模块并引入movie_list子模块
	// 引入自定义指令模块
	var moviecatApp= angular.module('moviecatApp', [
		'ngRoute',
		'moviecatApp.movie_list',
		'moviecatApp.directives.auto_focus'
	]);
	//配置路由规则
	moviecatApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'}); //当没有匹配到路由的时候则会跳转到默认配置的路由上去
	}]);

})(angular)
