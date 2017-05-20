/**
 * 自定义一个自动切换状态的指令
 */
(function(angular){
	var autoFocus=angular.module('moviecatApp.directives.auto_focus',[]);
	autoFocus.directive('autoFocus',['$location',function($location){
		//var path=$location.path();
		return {
			//template:'',//指令模板
			restrict:'A', //指令以属性（Attribute）方式引入 E:Element（标签） C:Class（类） M:注释方式
			link:function($scope,iElm,iAttrs,controller){ //$scope:当前指令的数据模型 iElm:当前指令所在元素
				//方式一:给当前指令所在的元素注册点击事件
				// var aLink=iElm.children().attr('href');
				// var lk_type=aLink.split('/')[1];
				// if(path.indexOf(lk_type)>-1) //为当前访问链接
				// 	iElm.addClass('active');
				// //为当前元素注册点击事件
				// iElm.on('click',()=>{
				// 	iElm.parent().children().removeClass('active');
				// 	iElm.addClass('active');
				// })

				//方式二:通过监视路由的变化切换状态
				$scope.$location=$location;
				$scope.$watch('$location.path()',(now,old)=>{
					var aLink=iElm.children().attr('href');
					var lk_type=aLink.split('/')[1];
					//为当前访问链接
					if(now.indexOf(lk_type)>-1){
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
				})
			}
		}
	}])
})(angular)
