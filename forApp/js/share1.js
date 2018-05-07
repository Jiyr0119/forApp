var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1,
            weixin: u.indexOf('MicroMessenger') > -1,
            qq: u.match(/\sQQ/i) == "qq",
            weibo: u.indexOf('Weibo') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
var urlRequest = new Object();
urlRequest = GetRequest();

function openApp(paramsArr) {
    if (browser.versions.ios) {
        if (browser.versions.weixin) {
            var content = '<div class="mask"><img class="mask-img" src="../img/Safari.png" alt=""></div>';
            $('body').append(content);
            // var appUrl = "http://t.cn/R7COgYb";
        } else if (browser.versions.weibo) {
            // var appUrl = "https://attopstar.com/starRank/applinks/index.html";
        } else {
            var appUrl = '://goodsId:'+ paramsArr +'';
            window.location.href = appUrl;
        }
            // var appUrl = "https://attopstar.com/starRank/applinks/index.html?data=" + params;
    } else if (browser.versions.android) {
        if (browser.versions.weixin) {
            var content = '<div class="mask"><img class="mask-img" src="../img/Browser.png" alt=""></div>';
            $('body').append(content);
            // var appUrl = "http://t.cn/R7COgYb";
        } else if (browser.versions.weibo) {
            // var appUrl = "https://attopstar.com/starRank/applinks/index.html";
        } else {
            var appUrl = '://com.yhm.wst/action?action={"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"' + paramsArr + '"}, "authRequired":"2"}';

            // var timeout, t = 3000, hasApp = true;  
            //  	setTimeout(function () {  
            // 	    if (hasApp) {  
            // 	      alert('安装了app');  
            // 	    } else {  
            // 	      alert('未安装app');  
            // 	    }  
            // 	    document.body.removeChild(ifr);  
            // }, 6000) 
            // var t1 = Date.now();   
            // var ifr = document.createElement("iframe");    
            // ifr.setAttribute('src', appUrl);    
            // ifr.setAttribute('style', 'display:none');    
            // document.body.appendChild(ifr);    
            // timeout = setTimeout(function () {       
            // 	var t2 = Date.now();       
            // 	if (!t1 || t2 - t1 < t + 100) 
            // 		{         
            // 			hasApp = false;       
            // 		}    
            // 	}, t); 
            window.location.href = appUrl;
        }
    } else {
        // var appUrl = "https://attopstar.com/applinks/index.html";
    }
}


$(".open-app").on("click", function() {
    openApp(urlRequest.goodsId);
});
$("#go-cart").on("click", function() {
    openApp(urlRequest.goodsId);
});
$("#go-buy").on("click", function() {
    openApp(urlRequest.goodsId);
});
