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
	//注入一个做ajax请求的$http服务 跨域请求用 $http.jsonp(url)方式
	//此时jsonp中的url就必须加上callback=JSON_CALLBACK
	in_theaters.controller('IntheatersController', ['$scope','$http',function($scope,$http) {
		$scope.movies={};
		$scope.massage='';
		$http.jsonp('http://api.douban.com/v2/movie/in_theaters?callback=JSONP_CALLBACK&city=上海&start=1&count=10').then((result)=>{
			if(result.status==200)
				$scope.movies=result.data;
			else
				$scope.massage=`请求数据失败，错误信息：${result.statusText}`;
		}, (err)=>{
			$scope.massage=`请求数据失败，错误信息：${err.statusText}`;
		});
	}]);
})(angular)
