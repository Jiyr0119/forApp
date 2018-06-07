var url = baseURI,
    token, lv;
var request = new HproseHttpClient(url + 'GetProduct.php', ['getSepecialGoods'], { timeout: 20000 }),
    send = new HproseHttpClient(url + 'GetProduct.php', ['applySpecial'], { timeout: 20000 });

function getLikeInfo() {

    if (window.androidJSBridge) {
        var result = androidJSBridge.getClientInfo(),
            info = JSON.parse(result);
            token = info.token,
            lv = info.distribution_level;
    }

}

function bindEvents() {
    $(".tab li").click(function() {
        $(".tab li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
        $(".one").hide().eq($(this).index()).show();
    });
    $(".one").on("click", ".spec-btn", this.handleBuy);
    $(".one").on("click", ".spec-Auditing", this.handleSet);
    $(".one").on("click", ".GET", this.handleOne);

}

function handleOne() {
    if (window.androidJSBridge) {
        var result = androidJSBridge.openWindow('{"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"' + $(this).attr('data-id') + '"}, "authRequired":"2"}');
    }
}

function handleShowDialog(content, left, right) {
    if (window.androidJSBridge) {
        var result = androidJSBridge.showDialog(content, left, right);
    }
}

function handleBuy() {
    if (window.androidJSBridge) {
        $(".one").off("click", ".GET")
        var result = androidJSBridge.openWindow('{"target":"com.yhm.wst.activity.OrderConfirmActivity", "params":{"extra_goods_id":"' + $(this).attr('data-id') + '", "extra_goods_num":"1"}, "authRequired":"2"}');
        location.reload()
    }
}

function handleSet() {
    handleShowProgress();
    send.setHeader('token', token);
    send.applySpecial('',
        function(result) {
        handleCloseProgress();
            if (typeof(result) === "undefined" || result.error != 0) {
                alert(result.err_msg);
            } else {
                $(".SEND .spec-Auditing").hide();
                $(".SEND .spec-prompt").html('申请成功，48小时内客服会处理您的需求。')
            }
        },
        function(name, err) {
            console.log(err);
        });
}

$(function() {
    handleShowProgress();
    getLikeInfo();
    request.setHeader('token', token);
    request.getSepecialGoods('',
        function(result) {
            console.log(result)
            handleCloseProgress();
            if (typeof(result) === "undefined") {
                alert("接口返回错误");
            } else {
                if (result.error == 0) {
                    var res = result.data,
                        status = result.is_apply,
                        content = '',
                        has = result.is_special,
                        spec = '',
                        show = '';
                    // res.map(item => {
                    //     // console.log(item.goods_img.substring(0,item.goods_img.indexOf("?")))
                    //     item.goods_img = item.goods_img.substring(0, item.goods_img.indexOf("?"));
                    //     item.id >= -2 ? spec += `<li class="spec-goods GET border-bottom" data-id="${item.id}">
                    //     <img class="spec-img" data-id="${item.id}" src="${item.goods_img}" alt="">
                    //     <p data-id="${item.id}" class="spec-name">
                    //       <text style="margin-bottom: .6rem;margin-top: .2rem;">${item.name}</text>
                    //       <text style="color: #fd4341; font-size:.36rem;">¥${item.shopprice}</text>
                    //     </p>
                    //     <p data-id="${item.id}" class="spec-btn" style="display:${lv == 0? 'block':'none'}">立即购买</p>  
                    //   </li>
                    //     ` : content += `<li class="spec-goods GET border-bottom" data-id="${item.id}">
                    //     <img class="spec-img" data-id="${item.id}" src="${item.goods_img}" alt="">
                    //     <p  data-id="${item.id}"  class="spec-name">
                    //       <text style="margin-bottom: .6rem;margin-top: .2rem;">${item.name}</text>
                    //       <text style="color: #fd4341;">¥${item.shopprice}</text>
                    //     </p>
                    //   </li>`
                    // })
                res.map(function(item) {
                    if(item.goods_img.indexOf("?") > 0) {
                        item.goods_img = item.goods_img.substring(0, item.goods_img.indexOf("?"));
                    }
                  item.id >= -2
                    ? (spec +=
                        '<li class="spec-goods GET border-bottom" data-id="' +
                        item.id +
                        '"><img class="spec-img" data-id="' +
                        item.id +
                        '" src="' +
                        item.goods_img +
                        '" alt=""><p data-id="' +
                        item.id +
                        '" class="spec-name"><text style="margin-bottom: .6rem;margin-top: .2rem;">' +
                        item.name +
                        '</text><text style="color: #f21177; font-size:.36rem;">\xA5' +
                        item.shopprice +
                        '</text></p><p data-id="' +
                        item.id +
                        '" class="spec-btn" style="display:' +
                        (lv == 0 ? "block" : "none") +
                        '">\u7ACB\u5373\u8D2D\u4E70</p></li>')
                    : (content +=
                        '<li class="spec-goods GET border-bottom" data-id="' +
                        item.id +
                        '"><img class="spec-img" data-id="' +
                        item.id +
                        '" src="' +
                        item.goods_img +
                        '" alt=""><p  data-id="' +
                        item.id +
                        '"  class="spec-name"><text style="margin-bottom: .6rem;margin-top: .2rem;">' +
                        item.name +
                        '</text><text style="color: #f21177;">\xA5' +
                        item.shopprice +
                        "</text></p></li>");
                });
                $('.one').eq(0).append(spec)
                $('.one').eq(1).append(content)
                    if (status == 1) {
                        $(".one .spec-Auditing").hide();
                        $(".one .spec-prompt").show().html('申请成功，48小时内客服会处理您的需求。');
                    }
                    if (has != 0) {
                        $(".one .tit").hide();
                    }
                    if (lv > 0) { // 完事该  或者 返回数据里面 特殊商品有数据显示
                        $(".tab").removeClass('none');
                    }
                } else {
                    handleShowDialog(result.err_msg, '确定', '')
                }
            }
        },
        function(name, err) {
            console.log(err);
        });
    bindEvents();

})
