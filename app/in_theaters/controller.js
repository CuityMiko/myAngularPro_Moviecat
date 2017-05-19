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
	//注入一个做ajax请求的$http服务
	in_theaters.controller('IntheatersController', ['$scope','$http',function($scope,$http) {
		$scope.movies={};
		$scope.massage='';
		$http.get('/app/datas/in_theaters.json').then((result)=>{
			if(result.status==200)
				$scope.movies=result.data;
			else
				$scope.massage=`请求数据失败，错误信息：${result.statusText}`;
		}, (err)=>{
			$scope.massage=`请求数据失败，错误信息：${err.statusText}`;
		});
	}]);
})(angular)
