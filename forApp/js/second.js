var url = baseURI,
    token;
var request = new HproseHttpClient(url + 'NewSonDecoration.php', ['SelectSonTemplateForId'], {
        timeout: 20000
    }),
    listView = new HproseHttpClient(url + 'NewDecoration.php', ['GetGoodsInfo'], {
        timeout: 20000
    });

function getLikeInfo() {
    if (window.androidJSBridge) {
        var result = androidJSBridge.getClientInfo(),
            info = JSON.parse(result);
        token = info.token;
    }
}

function bindEvents() {
    $(".secondSet").on("click", ".set-img", function() {
        alert($(this).attr('data-setid'))
            // alert(111)

    });
    $(".secondSet").on("click", ".scroll-items", function() {
        alert($(this).attr('data-goodsid') != undefined ? $(this).attr('data-goodsid') : $(this).attr('data-setid'))
            // alert(111)

    });
    $(".secondList").on("click", ".newGoodslist", function(e) {
        // alert($(this).attr('data-id'))
        // alert(111)
        // window.location.href = '';
        window.location.href = "shareClip.html?goodsId=" + $(this).attr('data-id');


    });

}
$(function() {
    bindEvents();
    var screenWidth = $(window).width();
    //二级页面装修
    request.SelectSonTemplateForId('129', '', function(res) {
        if (res.error == 0) {
            var list = res.data;
            for (var i = 0; i < list.length; i++) {
                //定义一个变量 把 imgs 里面的每一条的宽度相加的和 除以 屏幕宽度  做比例    
                var allWidth = 0, //每条图片宽度相加的和
                    useWidth = 0, //使用的宽度
                    scale = 0; // 比例
                if (list[i].type === 1) {
                    var imgList = list[i].subject;
                    for (var j = 0; j < imgList.length; j++) {
                        allWidth += imgList[j].width;
                    };
                    for (var j = 0; j < imgList.length; j++) {
                        // 然后循环set 每条数据宽度*比例  
                        scale = screenWidth / allWidth;
                        var width = imgList[j].width,
                            height = imgList[j].height,
                            scaleWidth = Math.round(width * scale),
                            scaleHeight = height * scale;
                        // 如果是多条数据的话把 最后一条 是屏幕宽度-前面几张宽度 = 宽的值
                        if (j != imgList.length - 1) { // 如果不是最后一张图片
                            useWidth += scaleWidth;
                        } else { // 如果是最后一张图片
                            scaleWidth = screenWidth - useWidth; // 图片宽度为屏幕宽度减屏幕已使用宽度
                        }
                        imgList[j].width = scaleWidth;
                        imgList[j].height = scaleHeight;
                    };
                };
            };
            var str = '',
                ul = '';
            for (var i = 0; i < list.length; i++) {
                var subject = list[i].subject;
                var goods = list[i].goods;
                if (list[i].type === 1) {
                    str += '<div class="new-set">'
                    for (var j = 0; j < subject.length; j++) {
                        str += '<image style="height:' + subject[j].height + 'px;width:' + subject[j].width + 'px;" src="' + subject[j].img + '" class="set-img" data-setid="' + subject[j].id + '"/>'
                    }
                    str += '</div>';
                }
                if (list[i].type === 2) {
                    ul += '<ul class="scroll-box">'
                    for (var k = 0; k < goods.length; k++) {
                        console.log(goods[k])
                        if (goods[k].id != undefined) {
                            ul += '<li class="scroll-items" data-goodsid="' + goods[k].id + '">' +
                                '<image src="' + goods[k].img + '" class="scroll-image border" data-goodsid="' + goods[k].id + '"/>' +
                                '<div style="width:100%;" data-goodsid="' + goods[k].id + '" class="scroll-name">' + goods[k].name + '</div>' +
                                '<div style="display: flex;">' +
                                '<div class="new-price letf" style="color:#f21177;margin-top:.1rem">￥' + goods[k].shopPrice + '</div>' +
                                '<div class="old-price letf" style="margin-top:.1rem">￥' + goods[k].marketPrice + '</div>' +
                                '</div>' +
                                '</li>'
                        } else {
                            ul += '<li class="scroll-items last" data-setid="' + goods[k].subjectId + '"><image style="margin-right:.2rem" src="' + goods[k].img + '" class="scroll-image last" data-setid="' + goods[k].subjectId + '"/></li>'
                        }
                    }
                    ul += '</ul>'
                }

            }
            $('.secondSet').append(str)
            $('.secondSet').append(ul)
        } else {
            alert(res.err_msg)
        }
        //二级页面列表
        listView.GetGoodsInfo('129', '', function(result) {
            if (result.error == 0) {
                console.log(result)
                var res = maplistToArr(result.data.goods);
                console.log(res)
                var list = '';
                for (var i = 0; i < res.length; i++) {
                    list += '<div class="newGoodslist border-bottom" data-id="' + res[i].id + '">' +
                        '<image src="' + res[i].goods_img + '" class="newGoodsImage" />' +
                        '<div class="newGoodsInfo">' +
                        '<div class="like-title">' + res[i].name + '</div>' +
                        '<div class="newGoodsPrice">' +
                        '<div class="left" style="color:#f21177;">￥' + res[i].shopprice + '</div>' +
                        '</div>' +
                        '<div class="newGoodsPrice">' +
                        '<div class="old-price  left">市场价：￥' + res[i].market_price + '</div>' +
                        '<image src="../img/cart.png" class="add-goods right middle top"/>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
                $('.secondList').append(list)

            } else {
                alert(result.err_msg)
            }
        })

    }, function(name, err) {
        console.log(err);
    });
})