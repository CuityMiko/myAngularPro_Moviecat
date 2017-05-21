//自执行函数
(function(angular){
	'use strict';
	//声明左侧导航菜单子模块
	//注入自定义的跨域请求jsonp模块：moviecatApp.services.http
	var movie_list=angular.module('moviecatApp.movie_list', ['ngRoute','moviecatApp.services.http']);
	//配置路由
	movie_list.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:classify/:page', {
			templateUrl: 'movie_list/index.html',
			controller: 'MovieListController'
		});
	}])
	//声明控制器
	//注入一个做ajax请求的$http服务 跨域请求用 $http.jsonp(url)方式
	//此时jsonp中的url就必须加上callback=JSON_CALLBACK
	//由于默认的angular提供的异步请求对象不支持自定义回调函数名，angular随机分配的回调函数名称不被第三方API支持
	//则需要自定义一个跨域的服务在angular的controller中注入进来：HttpService
	movie_list.controller('MovieListController', ['$scope','$http','$route','$routeParams','HttpService','Appconfig',function($scope,$http,$route,$routeParams,HttpService,Appconfig) {
		var page=parseInt($routeParams.page); //获取当前页
		var pagecount=Appconfig.pagesize; //每页显示条数
		var start=(page-1)*pagecount;
		$scope.movies={};
		$scope.massage='';
		$scope.total=0;
		$scope.loading=true;
		$scope.currentpage=page;
		$scope.pagetotal=0;
		//$http,jsonp方式已经无法使用
		// $http.jsonp('http://api.douban.com/v2/movie/'+$routeParams.classify+'?callback=JSONP_CALLBACK&city=上海&start=1&count=10').then((result)=>{
		// 	if(result.status==200)
		// 		$scope.movies=result.data;
		// 	else
		// 		$scope.massage=`请求数据失败，错误信息：${result.statusText}`;
		// }, (err)=>{
		// 	$scope.massage=`请求数据失败，错误信息：${err.statusText}`;
		// });
		//自定义HttpService
		HttpService.jsonp(Appconfig.listAPIurl+$routeParams.classify,{
			start:start,
			count:pagecount,
			city:'上海',
			q:$routeParams.q
		},function(result){
			if(result){
				$scope.movies=result;
				$scope.total=result.total;
				$scope.loading=false;
				$scope.pagetotal=Math.ceil(result.total/pagecount);
				//由于在调用第三方API的时候$scope的数据已经在页面上加载完毕，则需要调用$scope.$apply()方法$scope的数据再重新同步一下
				$scope.$apply();
			}
			else{
				$scope.loading=false;
				$scope.massage='请求数据失败';
			}
		})
		//点击翻页行为
		$scope.go=function(page){
			if(page>=1 && page<=$scope.pagetotal){
				$route.updateParams({page:page});
			}
		}
	}]);
})(angular)
