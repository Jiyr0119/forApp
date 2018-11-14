var url = baseURI,
    token;
var request = new HproseHttpClient(url + 'Distribution.php', ['getnotProfitOrder'], {
    timeout: 20000
});

function getLikeInfo() {
    if (window.androidJSBridge) {
        var result = androidJSBridge.getClientInfo(),
            info = JSON.parse(result);
        token = info.token;
    }
}
$(function() {
    handleShowProgress();
    getLikeInfo();
    request.setHeader('token', token);
    request.getnotProfitOrder('',
        function(result) {
            handleCloseProgress();
            if (typeof(result) === "undefined") {
                alert("接口返回错误");
            } else {
                var res = maplistToArr(result),
                    content = '';
                res.map(function(item) {
                    item.pay_time = formatTimeSec(new Date(Number(item.pay_time) * 1000));
                    content +=
                        '<div class="order-box"><div class="order-num border-bottom"><p style="margin-left: .2rem; ">\u8BA2\u5355\u7F16\u53F7\uFF1A' +
                        item.order_sn +
                        '</p><p style="color:#f21177;margin-right: .2rem;">' +
                        item.status_msg +
                        "</p></div>";
                    item.order_goods.map(function(item) {
                        content +=
                            '<div class="order-msg  border-bottom"><img class="order-img" src="' +
                            item.goods_img +
                            '" alt=""><div class="order-name"><div class="order-goods">' +
                            item.goods_name +
                            '</div><div style="color:#f21177;margin-top: .2rem;box-sizing: border-box;"><text style="font-size:.36rem;padding-top: .25rem;display: inline-block;">\xA5' +
                            item.goods_price +
                            '</text><text class="make-money">\u8D5A ' +
                            item.makemoney +
                            '</text></div></div><div class="order-make"><div class="make-num">X' +
                            item.goods_number +
                            "</div></div></div>";
                    });
                    content +=
                        '<div class="order-time  border-bottom"><div>\u652F\u4ED8\u65F6\u95F4\uFF1A' +
                        item.pay_time +
                        '</div><div style="width: 2.5rem;"><div>\u5B9E\u4ED8\u6B3E\uFF1A<text style="color:#f21177;">\xA5' +
                        item.order_amount +
                        '</text></div><div style="color:#a1a1a1;line-height: .72rem">\uFF08\u8FD0\u8D39\uFF1A\xA5' +
                        item.shipping_fee +
                        "\uFF09</div></div></div></div>";
                });
                //        res.map( item => {
                //       		item.pay_time = formatTimeSec(new Date(Number(item.pay_time)*1000))
                //       		content += `
                //       			<div class="order-box">
                // 	<div class="order-num border-bottom">
                // 		<p style="margin-left: .2rem; ">订单编号：${item.order_sn}</p>
                // 		<p style="color:#ff4242;margin-right: .2rem;">${item.status_msg}</p>	
                // 	</div>`
                // item.order_goods.map(item => {
                // 	content +=	`<div class="order-msg  border-bottom">
                // 		<img class="order-img" src="${item.goods_img}" alt="">
                // 		<div class="order-name">
                // 			<div class="order-goods">${item.goods_name}</div>
                // 			<div style="color:#ff4242;margin-top: .2rem;box-sizing: border-box;">
                // 				<text style="font-size:.36rem;padding-top: .25rem;display: inline-block;">¥${item.goods_price}</text>
                // 				<text class="make-money">赚 ${item.makemoney}</text>
                // 			</div>

                // 		</div>
                // 		<div class="order-make">
                // 			<div class="make-num">X${item.goods_number}</div>
                // 			</div>
                // 		</div>`
                // })
                // content +=`<div class="order-time  border-bottom">
                // 		<div>支付时间：${item.pay_time}</div>
                // 		<div style="width: 2.5rem;">
                // 			<div>实付款：<text style="color:#ff4242;">¥${item.order_amount}</text></div>
                // 			<div style="color:#a1a1a1;line-height: .72rem">（运费：¥${item.shipping_fee}）</div>
                // 		</div>
                // 	</div>
                // </div>`
                //        })
                $('body').append(content)
            }
        },
        function(name, err) {
            console.log(err);
        });
})