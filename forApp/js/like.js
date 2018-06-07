var url = baseURI,
	token;
var request = new HproseHttpClient(url+'Collection.php', ['getCollectionList'],{ timeout: 20000 }),
	del = new HproseHttpClient(url+'Collection.php', ['removeCollection'],{ timeout: 20000 });

function getLikeInfo(){
	if(window.androidJSBridge){
		var result = androidJSBridge.getClientInfo(),
			info = JSON.parse(result);
			token = info.token;
	}
}
function bindEvents() {
	$(".likeList").on("click",".itemImg",this.handleOpenDetail);
	$(".likeList").on("click",".itemDel",this.handleDelLike);

}
function handleOpenDetail() {
	if(window.androidJSBridge){//是安卓跳转详情  openWindow属于安卓@JavascriptInterface方法  webview.addJavascriptInterface(new JavaScriptInterface(this), "androidJSBridge");
		var result = androidJSBridge.openWindow('{"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"'+$(this).attr('data-id')+'"}, "authRequired":"2"}');
	}									
}
function handleDelLike() {
	if(window.androidJSBridge){
		var result = androidJSBridge.showDialogForDelCollection($(this).attr('data-id'));
	}
}
function handleShowDialog(content,left,right) {
	if(window.androidJSBridge){
		var result = androidJSBridge.showDialog(content,left,right);
	}
}
function handleDelCollection(id) {
	del.setHeader('token',token);
	del.removeCollection(id,
		function (res) {
			res.error == 0 ? location.reload() : handleShowDialog('删除失败','','确认');
		}
	)
}
$(function(){
	handleShowProgress();
	getLikeInfo();
	bindEvents();
	var limit = '0,20';
	request.setHeader('token',token);
    request.getCollectionList('',function (result) {
    	handleCloseProgress();
        if (typeof(result) === "undefined") {
            alert("接口返回错误");
        } else {
            var res = maplistToArr(result), 
            	content = '';
           $('.likeTit').html('您已收藏<strong style="color:#fd7f7b;font-size: .4rem;margin: 0 .1rem;">'+res.length+'</strong>件商品')
    //        res.map( item => {
    //        		content += `
    //        		<div class="likeListItem border-right border-top">
				// 	<img class="itemImg" data-id="${item.id}" mode="widthFix" src="${item.goods_img}" alt="">
				// 	<div class="itemName">
				// 		${item.name}
				// 	</div>
				// 	<div class="itemNum">
				// 		<p>¥${item.shopprice}</p>
				// 		<img class="itemDel" data-id="${item.id}" src="../img/del.png">
				// 	</div>
				// </div>`
    //        })
    		res.map(function(item) {
			  content +=
			    '<div class="likeListItem border-right border-top"><img class="itemImg" data-id="' +
			    item.id +
			    '" mode="widthFix" src="' +
			    item.goods_img +
			    '" alt=""><div class="itemName">' +
			    item.name +
			    '</div><div class="itemNum"><p>\xA5' +
			    item.shopprice +
			    '</p><img class="itemDel" data-id="' +
			    item.id +
			    '" src="../img/del.png"></div></div>';
			});

           $('.likeList').append(content)


            // console.log(result);
        }
    }, function (name, err) {
        // console.log(err);
        handleCloseProgress();
        alert(err)
    });
})
