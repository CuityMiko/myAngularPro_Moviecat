(function(angular){
	'use strict';

	// 声明主模块并引入movie_list子模块
	// 引入自定义指令模块
	var moviecatApp= angular.module('moviecatApp', [
		'ngRoute',
		'moviecatApp.movie_detail', //引入电影详情模块，由于路由的优先匹配原则，则需要将该详情路由放在list的前面
		'moviecatApp.movie_list',
		'moviecatApp.directives.auto_focus',
		'moviecatApp.directives.search' //注入自定义的搜索指令
	]);
	//为注入的模块定义一些可配置的配置信息,子模块用的时候只需要注入一下即可使用
	moviecatApp.constant("Appconfig",{
		pagesize:10,
		city:'杭州',
		listAPIurl:'http://api.douban.com/v2/movie/',
		detailAPIurl:'http://api.douban.com/v2/movie/subject/'
	})
	//配置路由规则
	moviecatApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'}); //当没有匹配到路由的时候则会跳转到默认配置的路由上去
	}]);
	//搜索 方式一添加controller
	// moviecatApp.controller('SearchController',['$scope','$route',function($scope,$route){
	// 	$scope.search=function(){
	// 		$route.updateParams({
	// 			classify:'search',
	// 			page:1,
	// 			q:$scope.content
	// 		})
	// 	}
	// }])

})(angular)
