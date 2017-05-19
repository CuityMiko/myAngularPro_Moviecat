//自执行函数
(function(angular){
	'use strict';
	//声明正在热映子模块
	//注入自定义的跨域请求jsonp模块：moviecatApp.services.http
	var in_theaters=angular.module('moviecatApp.in_theaters', ['ngRoute','moviecatApp.services.http']);
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
	//由于默认的angular提供的异步请求对象不支持自定义回调函数名，angular随机分配的回调函数名称不被第三方API支持
	//则需要自定义一个跨域的服务在angular的controller中注入进来：HttpService
	in_theaters.controller('IntheatersController', ['$scope','$http','HttpService',function($scope,$http,HttpService) {
		$scope.movies={};
		$scope.massage='';
		$scope.total=0;
		$scope.loading=true;
		//$http,jsonp方式已经无法使用
		// $http.jsonp('http://api.douban.com/v2/movie/in_theaters?callback=JSONP_CALLBACK&city=上海&start=1&count=10').then((result)=>{
		// 	if(result.status==200)
		// 		$scope.movies=result.data;
		// 	else
		// 		$scope.massage=`请求数据失败，错误信息：${result.statusText}`;
		// }, (err)=>{
		// 	$scope.massage=`请求数据失败，错误信息：${err.statusText}`;
		// });
		//自定义HttpService
		HttpService.jsonp('http://api.douban.com/v2/movie/in_theaters',{
			// start:1,
			// count:10,
			city:'上海'
		},function(result){
			if(result){
				$scope.movies=result;
				$scope.total=result.total;
				$scope.loading=false;
				//由于在调用第三方API的时候$scope的数据已经在页面上加载完毕，则需要调用$scope.$apply()方法$scope的数据再重新同步一下
				$scope.$apply();
			}
			else{
				$scope.loading=false;
				$scope.massage='请求数据失败';
			}
		})
	}]);
})(angular)
