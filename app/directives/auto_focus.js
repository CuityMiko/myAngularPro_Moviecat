/**
 * 自定义一个自动切换状态的指令
 */
(function(angular){
	var autoFocus=angular.module('moviecatApp.directives.auto_focus',[]);
	autoFocus.directive('autoFocus',['$location',function($location){
		var path=$location.path();
		return {
			restrict:'A', //指令以属性（Attribute）方式引入 E:Element（标签） C:Class（类） M:注释方式
			link:function($scope,iElm,iAttrs,controller){ //iElm:当前指令所在元素
				var aLink=iElm.children().attr('href');
				var lk_type=aLink.split('/')[1];
				if(path.indexOf(lk_type)>-1) //为当前访问链接
					iElm.addClass('active');
				//为当前元素注册点击事件
				iElm.on('click',()=>{
					iElm.parent().children().removeClass('active');
					iElm.addClass('active');
				})
			}
		}
	}])
})(angular)
