//自执行函数
(function(angular){
	'use strict';
	//声明电影详情子模块
	//注入自定义的跨域请求jsonp模块：moviecatApp.services.http
	var movie_detail=angular.module('moviecatApp.movie_detail', ['ngRoute','moviecatApp.services.http']);
	//配置路由
	movie_detail.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/index.html',
			controller: 'MoviedetailController'
		});
	}])
	//声明控制器
	//由于默认的angular提供的异步请求对象不支持自定义回调函数名，angular随机分配的回调函数名称不被第三方API支持
	//则需要自定义一个跨域的服务在angular的controller中注入进来：HttpService
	movie_detail.controller('MoviedetailController', ['$scope','$routeParams','HttpService','Appconfig',function($scope,$routeParams,HttpService,Appconfig) {
		$scope.movie={};
		$scope.loading=true;
		$scope.massage='';
		//自定义HttpService
		HttpService.jsonp(Appconfig.detailAPIurl+$routeParams.id,{},function(result){
			if(result){
				$scope.movie=result;
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
