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

function testApp(url) {
  var timeout, t = 1000, hasApp = true; 
  setTimeout(function () { 
    if (hasApp) { 
      console.log(1)
    } else {
      document.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yhm.wst";
    } 
    document.body.removeChild(ifr); 
  }, 2000) 
  
  var t1 = Date.now(); 
  var ifr = document.createElement("iframe"); 
  ifr.setAttribute('src', url); 
  ifr.setAttribute('style', 'display:none'); 
  document.body.appendChild(ifr); 
  timeout = setTimeout(function () { 
     var t2 = Date.now(); 
     if (!t1 || t2 - t1 < t + 100) { 
       hasApp = false; 
     } 
  }, t); 
}

function openApp(paramsArr) {
    if (browser.versions.ios) {
        // ios环境下
        var appUrl = 'wst://goodsId:'+ paramsArr +'';
        console.log(appUrl)
        window.location.href = appUrl;
        testApp(appUrl);
        // if (browser.versions.weixin) {
        //     //微信浏览器
        //     var content = '<div class="mask"><img class="mask-img" src="../img/Safari.png" alt=""></div>';
        //     $('body').append(content);
        // } else if (browser.versions.weibo) {
        // } else {
        //     //打开 ios App scheme 协议
        //     var appUrl = 'wst://goodsId:'+ paramsArr +'';
        //     console.log(appUrl)
        //     window.location.href = appUrl;
        //     // testApp();
        // }
    } else if (browser.versions.android) {
        // android环境下
        var appUrl = 'wst://com.yhm.wst/action?action={"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"' + paramsArr + '"}, "authRequired":"2"}';
        window.location.href = appUrl;
        testApp(appUrl);
        // if (browser.versions.weixin) {
        //     //微信浏览器
        //     var content = '<div class="mask"><img class="mask-img" src="../img/Browser.png" alt=""></div>';
        //     $('body').append(content);
        // } else if (browser.versions.weibo) {

        // } else {
        //     //打开 android App scheme 协议
        //     // var url = baseURI + "forApp/html/down.html";
          
        //     // window.location.href = baseURI + "forApp/html/down.html";
        //     var appUrl = 'wst://com.yhm.wst/action?action={"target":"com.yhm.wst.detail.GoodsDetailActivity", "params":{"extra_goods_id":"' + paramsArr + '"}, "authRequired":"2"}';
        //     window.location.href = appUrl;
        //     testApp(appUrl);
        // }
    } else {
        // var appUrl = "https://attopstar.com/applinks/index.html";
    }
}

$(".open-app").on("click", function() {
    openApp(urlRequest.goodsId);
    var clipboard = new ClipboardJS(".open-app");
    clipboard.on('success', function(e) {
                console.log(e);
    });
    clipboard.on('error', function(e) {
                console.log(e);
    });
});
$(".download").on("click", function() {
    openApp();
});
$("#go-cart").on("click", function() {
    openApp(urlRequest.goodsId);
    var clipboard = new ClipboardJS("#go-cart");
    clipboard.on('success', function(e) {
                console.log(e);
    });
    clipboard.on('error', function(e) {
                console.log(e);
    });
});
$("#go-buy").on("click", function() {
    openApp(urlRequest.goodsId);
    var clipboard = new ClipboardJS("#go-buy");
    clipboard.on('success', function(e) {
                console.log(e);
    });
    clipboard.on('error', function(e) {
                console.log(e);
    });
});
