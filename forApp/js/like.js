var url = 'http://test20.1haomei.com/shop/',
	token;
var request = new HproseHttpClient(url+'Collection.php', ['getCollectionList'],{ timeout: 20000 }),
	del = new HproseHttpClient(url+'Collection.php', ['removeCollection'],{ timeout: 20000 });
const maplistToArr = maplist => {
	var list = [];
	if (maplist.data) {
	    var title = maplist.data[0];
	    for (var i = 1; i < maplist.data.length; i++) {
	      var row = new Object();
	      for (var j = 0; j < title.length; j++) {
	        row[title[j]] = maplist.data[i][j];
	      }
	      list.push(row);
	    }
	} else {
	    var title = maplist[0];
	    for (var i = 1; i < maplist.length; i++) {
	      var row = new Object();
	      for (var j = 0; j < title.length; j++) {
	        row[title[j]] = maplist[i][j];
	      }
	      list.push(row);
	    }
	}
  	return list;
}	
function getLikeInfo(){
	if(window.androidJSBridge){
		var result = androidJSBridge.getClientInfo(),
			info = JSON.parse(result);
			token = info.token;
		}
}
function bindEvents() {
	$(".likeList").on("click",".itemImg",$.proxy(this.handleOpenDetail))
	$(".likeList").on("click",".itemDel",$.proxy(this.handleDelLike))

}
function handleOpenDetail() {
	alert($(this).attr('data-id'))
	if(window.androidJSBridge){
		var result = androidJSBridge.openWindow('{"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"'+$(this).attr('data-id')+'"}, "authRequired":"2"}');
	}
}
function handleDelLike() {
	var r=confirm("真的要删除人家嘛~")
	if (r==true){
		del.setHeader('token',741);
		del.removeCollection($(this).attr('data-id'),
			function (res) {
				res.error == 0 ? location.reload() : alert(res.error_msg)
			}
		)
	}
}
$(function(){

	// layer.confirm('您是如何看待前端开发？', {
	//   	btn: ['重要','奇葩'], //按钮
	//   	area: ['500px', '300px']
	// }, function(){
	//   layer.msg('的确很重要', {icon: 10});
	// }, function(){
	//   layer.msg('也可以这样', {
	//     time: 20000, //20s后自动关闭
	//     btn: ['明白了', '知道了']
	//   });
	// });  

	getLikeInfo();
	bindEvents();
	var limit = '0,20';
	request.setHeader('token',741);
    request.getCollectionList('',
    function (result) {
        if (typeof(result) === "undefined") {
            alert("接口返回错误");
        } else {
            let res = maplistToArr(result),
            	content = '';
            console.log(res)
           $('.likeTit').html(`我已收藏<strong style="color:#fd7f7b;font-size: .5rem;margin: 0 .1rem;">${res.length}</strong>件商品`)
           res.map( item => {
           		content += `
           		<div class="likeListItem border-right border-bottom">
					<img class="itemImg" data-id="${item.id}" mode="widthFix" src="${item.goods_img}" alt="">
					<div class="itemName">
						${item.name}
					</div>
					<div class="itemNum">
						<p>¥${item.shopprice}</p>
						<img class="itemDel" data-id="${item.id}" src="../img/del.png">
					</div>
				</div>`
           })
           $('.likeList').append(content)
            // console.log(result);
        }
    }, function (name, err) {
        console.log(err);
    });
})
