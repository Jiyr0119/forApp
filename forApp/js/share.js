var url = baseURI,
	token;
var request = new HproseHttpClient(url+'GoodsDetails.php', ['getGoodsDetails'],{ timeout: 20000 });

$(function(){
	var urlRequest = new Object();
    urlRequest = GetRequest();
    request.getGoodsDetails(urlRequest.goodsId,
    function (result) {
        if (typeof(result) === "undefined") {
            alert("接口返回错误");
        } else {
            var res = maplistToArr(result), 
            	content = '',
            	freight = '';
            // content+= '<img class="detail-img" src="http://yhmbucket.img-cn-qingdao.aliyuncs.com/supply/upload/img/201702/2eb25002870582c397d93de4bd77fb11.jpeg" alt="">'
           	for (var i = 0; i < res.length; i++) {
           		res[i].manmoney == null ? freight=0 : freight=res[i].manmoney;
           		content+= '<img class="detail-img" src='+res[i].goods_img+' alt=""><ul class="detail-tit">'
						+'<li class="detail-text">'
							+'<p><img class="detail-icon" src="../img/icon_02@3x.png" >'+res[i].name+'</p>'
						+'</li>'
					+'</ul>'
					+'<ul class="detail-rmb padding ">'
						+'<li class="goods-price mb">'
							+'¥ '+res[i].price+''

						+'</li>'
						+'<li class="shop-price mb">'
							+'市场价：'+res[i].market_price+''
						+'</li>'
						+'<li class="shop-num flex mb">'
							+'<div>满'+freight+'元包邮</div>'
							+'<div style="margin-left: .5rem;">销量:'+res[i].goodsnumber+'</div>'

						+'</li>'
					+'</ul>'
					+'<ul class="detail-msg flex padding-tb">'
						+'<li>'
							+'<p><img class="detail-icon" src="../img/1515660549.png" >正品保障</p>'
						+'</li>'
						+'<li>'
							+'<p><img class="detail-icon" src="../img/1515660549.png" >名品授权</p>'
						+'</li>'
						+'<li>'
							+'<p><img class="detail-icon" src="../img/1515660549.png" >七天退换</p>'
						+'</li>'
					+'</ul>'
					+'<div class="details-tit">商品详情</div>'
					+'<div class="goods-detail">'
					+''+res[i].goods_desc+''
					+'</div>'
                    
           		''
           	}
           		$('.details').append(content)

            
        }
    }, function (name, err) {
        console.log(err);
    });
})
