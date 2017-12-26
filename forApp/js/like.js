function Page() {

}
$.extend(Page.prototype,{
		//构造器
		init () {
			this.bindEvents();
		},
		//绑定事件
		bindEvents : function() {
			$(".itemImg").on("click",$.proxy(this.handleLeavePage,this))
		},
		handleLeavePage : function() {
			console.log($(this).attr('data-id'))
			if(window.androidJSBridge){
				var result = androidJSBridge.openWindow('{"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"8"}, "authRequired":"2"}');
				alert(result)
			}
		}
})

var  page  =  new Page()
page.init()