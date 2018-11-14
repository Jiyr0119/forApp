var url = baseURI,
    token;
var request = new HproseHttpClient(url + 'Distribution.php', ['wapForProfit'], {
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
    request.wapForProfit(
        function(result) {
            handleCloseProgress();
            if (typeof(result) === "undefined") {
                alert("接口返回错误");
            } else {
                console.log(result[0].day_money + result[0].day_money_special)
                var content = '';
                content =
                    '<div class="will-header"><p>\xA5 ' +
                    result[1].data[0].readyMoney +
                    '</p></div><ul class="will-item"><li class="border-top"><div>\u4ECA\u65E5\u6536\u76CA\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    (result[0].day_money + result[0].day_money_special) +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u5546\u54C1</div><div style="color: #f21177">\xA5 ' +
                    result[0].day_money +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u8F6F\u4EF6\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].day_money_special +
                    '</div></li></ul><ul class="will-item"><li class="border-top"><div>\u672C\u5468\u6536\u76CA\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    (result[0].week_money + result[0].week_money_special) +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u5546\u54C1\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].week_money +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u8F6F\u4EF6\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].week_money_special +
                    '</div></li></ul><ul class="will-item"><li class="border-top"><div>\u672C\u6708\u6536\u76CA\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    (result[0].month_money + result[0].month_money_special) +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u5546\u54C1\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].month_money +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u8F6F\u4EF6\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].month_money_special +
                    '</div></li></ul><ul class="will-item"><li class="border-top"><div>\u4E0A\u5468\u6536\u76CA\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    (result[0].last_week_money + result[0].last_week_money_special) +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u5546\u54C1\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].last_week_money +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u8F6F\u4EF6\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].last_week_money_special +
                    '</div></li></ul><ul class="will-item"><li class="border-top"><div>\u4E0A\u6708\u6536\u76CA\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    (result[0].last_month_money + result[0].last_month_money_special) +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u5546\u54C1\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].last_month_money +
                    '</div></li><li class="border-top"><div style="color: #a1a1a1">\u8F6F\u4EF6\uFF1A</div><div style="color: #f21177">\xA5 ' +
                    result[0].last_month_money_special +
                    "</div></li></ul>";

                //           content = `<div class="will-header">
                // 	<p>¥ ${result[1].data[0].readyMoney}</p>
                // </div>
                // <ul class="will-item">
                // 	<li class="border-top">
                // 		<div>
                // 			今日收益：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].day_money+result[0].day_money_special}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			商品：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].day_money}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			软件：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].day_money_special}
                // 		</div>
                // 	</li>
                // </ul>
                // <ul class="will-item">
                // 	<li class="border-top">
                // 		<div>
                // 			本周收益：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].week_money+result[0].week_money_special}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			商品：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].week_money}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			软件：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].week_money_special}
                // 		</div>
                // 	</li>
                // </ul>
                // <ul class="will-item">
                // 	<li class="border-top">
                // 		<div>
                // 			本月收益：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].month_money+result[0].month_money_special}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			商品：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].month_money}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			软件：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].month_money_special}
                // 		</div>
                // 	</li>
                // </ul>
                // <ul class="will-item">
                // 	<li class="border-top">
                // 		<div>
                // 			上周收益：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].last_week_money+result[0].last_week_money_special}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			商品：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].last_week_money}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			软件：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].last_week_money_special}
                // 		</div>
                // 	</li>
                // </ul>
                // <ul class="will-item">
                // 	<li class="border-top">
                // 		<div>
                // 			上月收益：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].last_month_money+result[0].last_month_money_special}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			商品：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].last_month_money}
                // 		</div>
                // 	</li>
                // 	<li class="border-top">
                // 		<div style="color: #a1a1a1">
                // 			软件：
                // 		</div>
                // 		<div style="color: #ff4242">
                // 			¥ ${result[0].last_month_money_special}
                // 		</div>
                // 	</li>
                // </ul>

                // `;
                $('.will').append(content)
            }
        },
        function(name, err) {
            console.log('err' + err);
        });
})