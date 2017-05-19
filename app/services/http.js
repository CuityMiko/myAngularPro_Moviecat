/**
 * 自定义一个跨域请求的Jsonp服务
 */
(function(angular){
	var http=angular.module('moviecatApp.services.http',[]);
	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp=function(url,data,callback,fcname='callback'){
			//随机生成函数名
			var funcName='callback_jsonp'+Math.random().toString().replace('.','');
			//将随机生成的函数名作为$window的属性并给其赋值callback函数
			$window[funcName]=callback;
			//将数据对象转换成字符串格式的参数
			var querystring=url.indexOf('?')==-1?'?':'&';
			for(var key in data){
				querystring+=key+'='+data[key]+'&';
			}
			//将随机生成的函数名也加到字符串参数中
			querystring +=fcname+'='+funcName;
			//生成script标签
			var scriptElement=$document[0].createElement('script');
			scriptElement.src=url+querystring;
			//将生成的script标签追加在页面上
			$document[0].body.appendChild(scriptElement);
		}
	}])
})(angular)
