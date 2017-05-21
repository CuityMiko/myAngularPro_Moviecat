/**
 * 定义一个搜索的指令
 */
(function(angular){
	var searchapp=angular.module('moviecatApp.directives.search',[]);
	searchapp.directive('search',['$route',function($route){
		return {
			restrict:'AE',
			template:`<form class="navbar-form navbar-right" ng-submit='tosearch()'>
						<input type="text" class="form-control" ng-model="content" placeholder="Search...">
					</form>`,
			link:function($scope,iElm,iAttrs,controller){
				$scope.tosearch=function(){
					$route.updateParams({
						classify:'search',
						page:1,
						q:$scope.content
					})
					$scope.content='';
				}
			}
		}
	}])
})(angular)
