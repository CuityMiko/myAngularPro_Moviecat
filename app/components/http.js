/**
 * 自定义一个跨域的组件
 */
(function(window,document){
	'use strict'
	/**
	 * @param {*跨域请求的URL} url
	 * @param {*跨域的参数对象} data
	 * @param {*接收的回调函数} callback
	 * @param {*API自定义的回调函数名一般默认为callback} fcname
	 */
	var jsonp=function(url,data,callback,fcname='callback'){
		//随机生成函数名
		var funcName='callback_jsonp'+Math.random().toString().replace('.','');
		//将随机生成的函数名作为window的属性并给其赋值callback函数
		window[funcName]=callback;
		//将数据对象转换成字符串格式的参数
		var querystring=url.indexOf('?')==-1?'?':'&';
		for(var key in data){
			querystring+=key+'='+data[key]+'&';
		}
		//将随机生成的函数名也加到字符串参数中
		querystring +=fcname+'='+funcName;
		//生成script标签
		var scriptElement=document.createElement('script');
		scriptElement.src=url+querystring;
		//将生成的script标签追加在页面上
		document.body.appendChild(scriptElement);
	}
	//声明window的一个$jsonp对象并将自定义的jsonp函数赋值为window的$jsonp
	window.$jsonp=jsonp;
})(window,document)
