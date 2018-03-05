'use strict';
var url = 'https://test20.1haomei.com/shop/',
	token;
var request = new HproseHttpClient(url+'userInfo.php', ['getUserAccountDetail'],{ timeout: 20000 });

function getLikeInfo(){
	if(window.androidJSBridge){
		var result = androidJSBridge.getClientInfo(),
			info = JSON.parse(result);
			token = info.token;
	}
}
$(function(){
	handleShowProgress();
	getLikeInfo();
	var limit = '0,20';
	request.setHeader('token',token);
    request.getUserAccountDetail('',
    function (result) {
    	handleCloseProgress();
    	console.log(result)
        if (typeof(result) === "undefined") {
            alert("接口返回错误");
        } else {
            var res = maplistToArr(result),
            	content = '',
            	status = '';
        if (res.length >0 ) {
        	for (var i =0;i<res.length; i++) {
        		res[i].time = formatTimeSec(new Date(Number(res[i].time)*1000));
				res[i].status == '0'?res[i].status='申请提现':res[i].status == '1'?res[i].status='提现成功':res[i].status='提现失败';
        		content +=
						'<div class="cash-box border-bottom">'
							+'<div class="cash-time"><p>提现时间：<text class="color">'+res[i].time+'</text></p></div>'
							+'<div class="cash-status">'
								+'<div><p>提现状态：<text class="color">'+res[i].status+'</text></p></div>'
								+'<div><p>提现金额：<text  class="color">'+res[i].amount+'</text></p></div>'
							+'</div>'
						+'</div>'
           		
        	}
      //   	res.map( item => {
      //      		item.time = formatTimeSec(new Date(Number(item.time)*1000))
      //      		content += `
						// <div class="cash-box border-bottom">
						// 	<div class="cash-time"><p>提现时间：<text class="color">${item.time}</text></p></div>
						// 	<div class="cash-status">
						// 		<div><p>提现状态：<text class="color">${item.status == '0'?'申请提现':item.status == '1'?'提现成功':'提现失败'}</text></p></div>
						// 		<div><p>提现金额：<text  class="color">${item.amount}</text></p></div>
						// 	</div>
						// </div>
      //      		`
      //      		})
           	}else {
 				content += 
						'<div class="cash-box border-bottom" style="text-align: center;background:none;">'
							+'<img class="order-img" src="../img/empty.png" alt="" style="margin-top:50%;">'
							+'<p style="margin-top:.2rem;">您还没有提现记录</p>'
						+'</div>'
						
           	}
           $('body').append(content)
        }
    }, function (name, err) {
        console.log(err);
    });
})