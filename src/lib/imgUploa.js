
// 自执行函数，不和外面变量重复，传入常用的window和document对象
;(function(w, d){
	// 定义默认的参数
	var config = {
		body : d.querySelector('body')
	};
	
	// 定义需要的工具函数，跟业务无关，不放在构造函数中，防止业务过于臃肿
	var tool = {
		// 给节点分别设置传入的所有的属性
		attr : function(nodeName, attrObj){
			for(var key in attrObj){
				nodeName.setAttribute(key, attrObj[key]);
			}
			return nodeName;
		},
		// 不同的input容器 
		// 创建：<input type="file" name="file" class="element"  id="id" accept="image/*">
		inputContainer : function() {
			var input = tool.attr(
				d.createElement('input'),
				{	
					type : 'file',
					accept : 'image/*',
					class : 'element',
					id : tool.getId()
				}
			);
			// 把创建的input节点先给隐藏掉,不用显示上传的input框，只显示出返回来的缩略图即可
			input.style.display = 'none';
			return input;
		},
		// 获得每个input的id方法
		getId : function() {
			var date = new Date().getTime()
			return ('input' + date );
		},
		checkType : function( file ) {
			return /image\/\w+/.test(file) ;
		}
		
	};
	
	var uploadImg = function(args) {
		this.args = args;
		// 传入的操作节点的类型,如果是dom对象，那么直接使用，如果是字符串，那么querySelector获取dom
		// 这里没有传入jQuery，也就是$,全部用原生来写
		this.node = typeof(args.node) == 'string' ? d.querySelector(args.node) : args.node;
		// 每个ajax请求都需要传入token
		this.token = args.token;
		// files作为存放每个图片的信息的容器(包括input信息)
		this.files = [];
		// 存放input框的地方，放哪里不重要，反正是隐藏的，如果没有指定就放到body里吧。
		this.wrap = args.wrap ? (typeof args.wrap == 'string' ? d.querySelector( args.wrap ) : args.wrap) : config.body ;
		//this.imgThumbnail = 
		this.init();
	};
	
	uploadImg.prototype = {
		constructor : uploadImg,
		init : function() {
			var _this = this;
			this.node.addEventListener('click', function() {
				
				// 每点击一次创建一个input的dom放入到files数组中，放到最后
				this.files.push({
					xhr : new XMLHttpRequest,
					input : tool.inputContainer()
				})
				
				/*  获得最后一个input=file，此个就是刚创建的,file为
				
				{
					xhr : xxx,
					input : <input 
							type="file" 
							name="file" 
							class="element"  
							id="id" 
							accept="image/*" 
							style="display:none">
				};
				是个对象
				*/

				// 建立多个放到一个数组内原因就是后续要分别删除操作
				var file = this.files[this.files.length - 1];
				// 使得每次新建的input框有着落
				this.wrap.appendChild( file.input );
				file.input.onchange = _this.changeEvent().bind(file);
				file.input.click();				
			}.bind(this),false)
		},
		progress : function( file ) {
			if( file.xhr ){
				// 上传进度
				file.xhr.upload.onprogress = function(e) {
					if(e.lengthComputable){
						var result = parseInt((e.loaded / e.total)*100);
						return result;
					}
				}
			}
		},
		loaded : function( file ) {
			file.xhr.onload = function(){
				var result = JSON.parse(this.xhr.responseText);
			}
		},

		doThumbnail : function () {
			var self = this;
			console.log(this);

			return function () {
				var me = this;
				console.log(this);
				var file = me.input.files[0];
				var formData = new FormData(),
				reader = new FileReader();				
				reader.readAsDataURL(file);
				reader.onload = function() {
					console.log(this.result)
				}	
				
			}
		},

		changeEvent : function() {
			var self = this;
			return function () {
				self.doThumbnail().call( this ) 
				console.log(this);

			}
			// console.log(this.files[this.files.length - 1])
			// var file = file.files[0];
			// console.info(file)
			// var self = this;
			// if(!tool.checkType(file.type)){
			// 	alert('请选择图片文件');
			// 	return false;
			// };
			// var formData = new FormData(),
			// 	reader = new FileReader();				
			// reader.readAsDataURL(file);
			// reader.onload = function() {
			// 	console.info(this.result);
			// }	
			
			
		}
		
	}
	
	// 把方法作为属性赋给window，在全局就可以调用了
	w.uploadImg = uploadImg;
	
})(window, document);