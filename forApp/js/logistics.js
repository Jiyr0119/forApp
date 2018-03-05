var url = 'https://test20.1haomei.com/shop/',
	token,
	id;
var request = new HproseHttpClient(url+'Logistics.php', ['getLogisticsInfo'],{ timeout: 20000 });
function getLikeInfo(){
	if(window.androidJSBridge){
		var result = androidJSBridge.getClientInfo(),
			info = JSON.parse(result);
			token = info.token;
			id = info.invoice_no;
		}
}

$(function(){
	handleShowProgress();
	getLikeInfo();
    request.setHeader('token',token);
    request.getLogisticsInfo(id,
    	function (result) {
    		handleCloseProgress();
            if (typeof(result) === "undefined") {
                alert("接口返回错误");
            } else {
                let res = JSON.parse(result),
                    content = '',
                    items = '',
                    list =res.data.reverse();
    //             content = `
			 //        <ul class="log-name">
				// 		<li>承运公司：${res.ShipperName}</li>
				// 		<li>快递单号：${id}</li>
				// 	</ul>
				// `
				content =
				  '<ul class="log-name"><li>\u627F\u8FD0\u516C\u53F8\uFF1A' +
				  res.ShipperName +
				  "</li><li>\u5FEB\u9012\u5355\u53F7\uFF1A" +
				  id +
				  "</li></ul>";
                $('.log-header').append(content)
        
        //         list.map( (item,index) => {
        //         		index == 0 ?items += `
								// 	<li class="log-item" id="text-color">
								// 		<div class="log-line border-right"></div>
								// 		<div class="log-text border-bottom">
								// 			<div class="bottom-tab" style="background-color: #f2505d;"></div>
								// 			${item.AcceptStation}
								// 			<div class="bottom-time">
								// 			${item.AcceptTime}
								// 			</div>
								// 		</div>
								// 	</li>
								// `:items += `<li class="log-item">
								// 		<div class="log-line border-right"></div>
								// 		<div class="log-text border-bottom">
								// 		<div class="bottom-tab"></div>
								// 			${item.AcceptStation}
								// 			<div class="bottom-time">
								// 			${item.AcceptTime}
								// 			</div>
								// 		</div>
								// 	</li>
								// `;

	       //      })
	       list.map(function(item, index) {
			  index == 0
			    ? (items +=
			        '<li class="log-item" id="text-color"><div class="log-line border-right"></div><div class="log-text border-bottom"><div class="bottom-tab" style="background-color: #f2505d;"></div>' +
			        item.AcceptStation +
			        '<div class="bottom-time">' +
			        item.AcceptTime +
			        "</div></div></li>\n\t\t\t\t\t\t\t\t")
			    : (items +=
			        '<li class="log-item"><div class="log-line border-right"></div><div class="log-text border-bottom"><div class="bottom-tab"></div>' +
			        item.AcceptStation +
			        '<div class="bottom-time">' +
			        item.AcceptTime +
			        "</div></div></li>");
			});
                $('.log-msg').append(items)
            }
        }, function (name, err) {
            console.log('err'+err);
        });
})
