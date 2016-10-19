!(function () {
    //tab->选项卡
    ~function(){
        var oTab = document.getElementById("tab");
        function tab(ele) {
            var oul = utils.children(ele, 'ul')[0];
            var box = utils.children(ele, 'div');
            var oLis = utils.children(oul, 'li');

            function changeTab(n) {
                for (var i = 0; i < oLis.length; i++) {
                    var oA = utils.children(oLis[i], 'a')[0];
                    oA.className = null;
                    box[i].className = null;
                }
                var oa = utils.children(oLis[n], 'a')[0];
                oa.className = "bg";
                box[n].className = "bg";
            }

            for (var i = 0; i < oLis.length; i++) {
                oLis[i].index = i;
                oLis[i].onmouseover = function () {
                    changeTab(this.index);
                }
            }
        }
        tab(oTab);
    }();

    //验证码
    ~function(){
        var codeDiv1 = document.getElementById("captcha1");
        var oA1= codeDiv1.getElementsByTagName('a')[0];
        var codeDiv2 = document.getElementById("captcha2");
        var oA2= codeDiv2.getElementsByTagName('a')[0];
        function getCode(ele) {
            var area = "abcdefghijklmnopqrstuvwxyz" +
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "0123456789";
            var str = "";
            while (str.length < 4) {
                var ran = Math.round(Math.random() * 61);
                var temp = area[ran];
                if (str.indexOf(temp) > -1) {
                    continue;
                }
                str += temp;
            }
            ele.innerHTML = str;
        }

        getCode(oA1);
        oA1.onclick = function(){getCode(oA1)};
        getCode(oA2);
        oA2.onclick = function(){getCode(oA2)};

        //检测输入框的内容
        var btn1= document.getElementsByName('btn1')[0];
        var btn2= document.getElementsByName('btn2')[0];
        var text1= document.getElementsByName('text1')[0];
        var text2= document.getElementsByName('text2')[0];
        btn1.onclick =function affirm1(){
            var op= utils.children(codeDiv1,'p')[0];
            var ospan= utils.children(op,'span')[0];
            var oa= utils.children(op,'a')[0];
            var val=text1.value.replace(/(^ +| +$)/g,'');
            if(val===oA1.innerHTML){
                ospan.innerHTML="验证成功！点击关闭，再次试验。";
                zhiAnimate(op,{height:'100%'},300);
            }
            else if(val.length===0){
                ospan.innerHTML="验证失败！验证不能为空。";
                zhiAnimate(op,{height:'100%'},300)
            }
            else if(val.length<=3||val.length>5){
                ospan.innerHTML="验证失败！输入的位数不对!";
                zhiAnimate(op,{height:'100%'},300)
            }
            oa.onclick=function(){
                zhiAnimate(op,{height:'0'},300);
                text1.value='';
                getCode(oA1);
            }
        };
        btn2.onclick =function affirm2(){
            var op= utils.children(codeDiv2,'p')[0];
            var ospan= utils.children(op,'span')[0];
            var oa= utils.children(op,'a')[0];
            var val=text2.value.replace(/(^ +| +$)/g,'');
            if(val.toLocaleLowerCase()==oA2.innerHTML.toLocaleLowerCase()){
                ospan.innerHTML="验证成功！点击关闭，再次试验。";
                zhiAnimate(op,{height:'100%'},300);
            }
            else if(val.length===0){
                ospan.innerHTML="验证失败！验证不能为空。";
                zhiAnimate(op,{height:'100%'},300)
            }
            else if(val.length<=3||val.length>5){
                ospan.innerHTML="验证失败！输入的位数不对!";
                zhiAnimate(op,{height:'100%'},300)
            }
            oa.onclick=function(){
                zhiAnimate(op,{height:'0'},300);
                text2.value='';
                getCode(oA2);
            }
        };
    }();
    //投票
    ~function(){
        var submitBtn = document.getElementById("submitBtn");
        var voteCount = submitBtn.getElementsByTagName("span")[0];
        voteCount.count = 100;
        submitBtn.onclick = function () {
            voteCount.count+=10;
            voteCount.innerHTML = voteCount.count;
        };
    }();

    //排序
    ~function(){
        var oTab = document.getElementById("table");
        var tHead = oTab.tHead;
        var oThs = tHead.rows[0].cells;
        var tBody = oTab.tBodies[0];
        var oRows = tBody.rows;
        ~function () {
            var xhr = new XMLHttpRequest;
            xhr.open("get", "json/userInfo.json", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    var str = xhr.responseText;
                    var jsonData = utils.formatJSON(str);
                    Data(jsonData);
                }
            };
            xhr.send(null);
        }();

        function Data(jsonData) {
            var frg = document.createDocumentFragment();
            for (var i = 0, len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                curData["sex"] = curData["sex"] == 0 ? "男" : (curData["sex"] == 1 ? "女" : "未知");

                var oTr = document.createElement("tr");
                for (var key in curData) {
                    var oTd = document.createElement("td");
                    oTd.innerHTML = curData[key];
                    oTr.appendChild(oTd);
                }
                frg.appendChild(oTr);
            }
            tBody.appendChild(frg);
            frg = null;
            changeBg();
            for (var i = 0, len = oThs.length; i < len; i++) {
                var curTh = oThs[i];
                if (curTh.className.indexOf("cursor") > -1) {
                    curTh.flag = -1;
                    curTh.index = i;
                    curTh.onclick = function () {
                        sortTab.call(this, this.index);
                    };
                }
            }
        };
        function changeBg() {
            for (var i = 0; i < oRows.length; i++) {
                oRows[i].className = i % 2 === 1 ? "bg" : null;
            }
        }
//4、实现排序
        function sortTab(n) {
            for (var k = 0; k < oThs.length; k++) {
                k != n ? oThs[k].flag = -1 : null;
            }
            var _this = this;
            _this.flag *= -1;
            var ary = utils.listToArray(oRows);
            ary.sort(function (a, b) {
                var curInn = a.cells[n].innerHTML, nexInn = b.cells[n].innerHTML, curInnNum = parseFloat(curInn), nexInnNum = parseFloat(nexInn);
                if (isNaN(curInnNum) || isNaN(nexInnNum)) {
                    return (curInn.localeCompare(nexInn)) * _this.flag;
                }
                return (curInnNum - nexInnNum) * _this.flag;
            });
            var frg = document.createDocumentFragment();
            for (var i = 0, len = ary.length; i < len; i++) {
                frg.appendChild(ary[i]);
            }
            tBody.appendChild(frg);
            changeBg();
        }
    }();

    //跑马灯
    !function(){
        var boxCon = document.getElementById("boxCon");
        var boxCon_begin = document.getElementById("boxCon_begin");
        var boxCon_begin_width = utils.css(boxCon_begin, "width");
        var timer = window.setInterval(function () {
            var curLeft = boxCon.scrollLeft;
            if (curLeft >= boxCon_begin_width) {
                boxCon.scrollLeft = 0;
                return;
            }
            boxCon.scrollLeft = ++curLeft;
        }, 10);
    }();

    //图片延迟加载
    ~function(){
        var banner = document.getElementById("imgag"), imgFir = banner.getElementsByTagName("img")[0];
        var time=null;
        time=window.setTimeout(function () {
            var oImg = new Image;
            oImg.src = imgFir.getAttribute("trueImg");
            oImg.onload = function () {
                imgFir.src = this.src;
                imgFir.style.display = "block";
                oImg = null;
            };
            window.clearInterval(time);
        }, 500);
        var button= document.getElementById("button");
        button.onclick=function(){
            imgFir.style.display='none';
            imgFir.src="";

            time=window.setTimeout(function () {
                var oImg = new Image;
                oImg.src = imgFir.getAttribute("trueImg");
                oImg.onload = function () {
                    imgFir.src = this.src;
                    imgFir.style.display = "block";
                    oImg = null;
                };
                window.clearInterval(time);
                console.log("1"+1);
            }, 500);
        };
    }();

    //图片无缝滚动
    ~function (){
        var odiv=document.getElementsByClassName("div")[0];
        var wrap=document.getElementById("div");
        var oUl=document.getElementById("ul");
        var conBegin_width=utils.css(oUl,"width");
        function move() {
            wrap.scrollLeft++;
            if (wrap.scrollLeft >= conBegin_width / 2) {
                wrap.scrollLeft = 0;
            };
        }
        var terim=window.setInterval(move,10);
        odiv.onmouseover=function(){
            window.clearInterval(terim);
        };
        odiv.onmouseout=function(){
            terim=window.setInterval(move,10);
        }
    }();

    //菜单2
    +function(){
        var nav2=document.getElementById('nav2');
        var oUl= utils.children(nav2,'ul')[0];
        nav2.onmouseover=function(){
            zhiAnimate(oUl,{height:150},300)
        };
        nav2.onmouseout=function(){
            zhiAnimate(oUl,{height:0},300)
        };
    }();
    //菜单3
    +function(){
        var nav2=document.getElementById('nav3');
        var oUl= utils.children(nav2,'ul')[0];
        nav2.onmouseover=function(){
            zhiAnimate(oUl,{width:150},300,function(){
                zhiAnimate(oUl,{height:150},300)
            });
        };
        nav2.onmouseout=function(){
            zhiAnimate(oUl,{height:50},300,function(){
                zhiAnimate(oUl,{width:0},300)
            })
        };
    }();

    //轮播图渐隐渐现
    ~function () {
            function AutoBanner(curEleId, ajaxURL, interval) {
                this.banner = document.getElementById(curEleId);
                this.bannerInner = utils.firstChild(this.banner);
                this.bannerTip = utils.children(this.banner, "ul")[0];
                this.bannerLink = utils.children(this.banner, "a");
                this.bannerLeft = this.bannerLink[0];
                this.bannerRight = this.bannerLink[1];
                this.divList = this.bannerInner.getElementsByTagName("div");
                this.imgList = this.bannerInner.getElementsByTagName("img");
                this.oLis = this.bannerTip.getElementsByTagName("li");
                this.jsonData = null;
                this.interval = interval || 3000;
                this.autoTimer = null;
                this.step = 0;
                this.ajaxURL = ajaxURL;

                return this.init();
            }

            AutoBanner.prototype = {
                constructor: AutoBanner,
                getData: function () {
                    var _this = this;
                    var xhr = new XMLHttpRequest;
                    xhr.open("get", this.ajaxURL + "?_=" + Math.random(), false);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                            _this.jsonData = utils.formatJSON(xhr.responseText);
                        }
                    };
                    xhr.send(null);
                },
                bindData: function () {
                    var str = "", str2 = "";
                    if (this.jsonData) {
                        for (var i = 0, len = this.jsonData.length; i < len; i++) {
                            var curData = this.jsonData[i];
                            str += "<div><img src='' trueImg='" + curData["img"] + "'/></div>";
                            i === 0 ? str2 += "<li class='bg'></li>" : str2 += "<li></li>";
                        }
                    }
                    this.bannerInner.innerHTML = str;
                    this.bannerTip.innerHTML = str2;
                },
                lazyImg: function () {
                    var _this = this;
                    for (var i = 0, len = this.imgList.length; i < len; i++) {
                        ~function (i) {
                            var curImg = _this.imgList[i];
                            var oImg = new Image;
                            oImg.src = curImg.getAttribute("trueImg");
                            oImg.onload = function () {
                                curImg.src = this.src;
                                curImg.style.display = "block";
                                if (i === 0) {
                                    var curDiv = curImg.parentNode;
                                    curDiv.style.zIndex = 1;
                                    zhiAnimate(curDiv, {opacity: 1}, 200);
                                }
                                oImg = null;
                            }
                        }(i);
                    }
                },
                autoMove: function () {
                    if (this.step === (this.jsonData.length - 1)) {
                        this.step = -1;
                    }
                    this.step++;
                    this.setBanner();
                },
                setBanner: function () {
                    for (var i = 0, len = this.divList.length; i < len; i++) {
                        var curDiv = this.divList[i];
                        if (i === this.step) {
                            utils.css(curDiv, "zIndex", 1);
                            zhiAnimate(curDiv, {opacity: 1}, 200, function () {
                                var curDivSib = utils.siblings(this);
                                for (var k = 0, len = curDivSib.length; k < len; k++) {
                                    utils.css(curDivSib[k], "opacity", 0);
                                }
                            });
                            continue;
                        }
                        utils.css(curDiv, "zIndex", 0);
                    }
                    for (i = 0, len = this.oLis.length; i < len; i++) {
                        var curLi = this.oLis[i];
                        i === this.step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
                    }
                },
                mouseEvent: function () {
                    var _this = this;
                    this.banner.onmouseover = function () {
                        window.clearInterval(_this.autoTimer);
                        _this.bannerLeft.style.display = _this.bannerRight.style.display = "block";
                    };
                    this.banner.onmouseout = function () {
                        _this.autoTimer = window.setInterval(function () {
                            _this.autoMove();
                        }, _this.interval);
                        _this.bannerLeft.style.display = _this.bannerRight.style.display = "none";
                    };
                },
                tipEvent: function () {
                    var _this = this;
                    for (var i = 0, len = this.oLis.length; i < len; i++) {
                        var curLi = this.oLis[i];
                        curLi.index = i;
                        curLi.onclick = function () {
                            _this.step = this.index;
                            _this.setBanner();
                        }
                    }
                },
                leftRight: function () {
                    var _this = this;
                    this.bannerRight.onclick = function () {
                        _this.autoMove();
                    };
                    this.bannerLeft.onclick = function () {
                        if (_this.step === 0) {
                            _this.step = _this.jsonData.length;
                        }
                        _this.step--;
                        _this.setBanner();
                    };
                },
                init: function () {
                    var _this = this;
                    this.getData();
                    this.bindData();

                    window.setTimeout(function () {
                        _this.lazyImg();
                    }, 500);

                    this.autoTimer = window.setInterval(function () {
                        _this.autoMove();
                    }, this.interval);

                    this.mouseEvent();
                    this.tipEvent();
                    this.leftRight();

                    return this;
                }
            };
            window.AutoBanner = AutoBanner;
        var banner1 = new AutoBanner("banner", "json/banner.txt", 2000);
        }();

    //放大镜
    -function(){
        var box = document.getElementById("box"), mark = document.getElementById("mark");
        var boxDel = document.getElementById("boxDel"), boxImg = boxDel.getElementsByTagName("img")[0];
        function computedMarkPos(e) {
            e = e || window.event;
            var curL = e.clientX - box.offsetLeft - mark.offsetWidth / 2-100;
            var curT = e.clientY - box.offsetTop - mark.offsetHeight / 2-230;
            var minL = 0, minT = 0, maxL = box.offsetWidth - mark.offsetWidth, maxT = box.offsetHeight - mark.offsetHeight;
            curL = curL <= minL ? minL : (curL >= maxL ? maxL : curL);
            curT = curT <= minT ? minT : (curT >= maxT ? maxT : curT);

            utils.css(mark, {
                left: curL,
                top: curT
            });
            utils.css(boxImg, {
                marginTop: -curT * 3,
                marginLeft: -curL * 3
            });
        }
        box.onmouseenter = function (e) {
            utils.css(mark, "display", "block");
            utils.css(boxDel, "display", "block");
            computedMarkPos(e);
        };
        box.onmousemove = computedMarkPos;
        box.onmouseleave = function (e) {
            utils.css(mark, "display", "none");
            utils.css(boxDel, "display", "none");
        };
    }();

    //照片墙
    ~function(){
        var ul=document.getElementById("photo1");
        var oLis= utils.children(ul,"li");
        console.log(ul,oLis);
        for(var i=oLis.length-1;i>=0;i--){
            var oLi=oLis[i];
            oLi.style.left=(oLi.l=oLi.offsetLeft)+"px";
            oLi.style.top=(oLi.t=oLi.offsetTop)+"px";
            oLi.style.position	="absolute";
            oLi.style.margin=0;
            new Drag(oLi).on("dragstart",increaseIndex).on("dragend",changePosition).on("dragging",test);

        }
        var zIndex=0;
        function increaseIndex(){
            this.ele.style.zIndex=++zIndex;
        }

        function goBack(){
            zhiAnimate(this.ele,{left:this.ele.l,top:this.ele.t},700,3)
        }
        function hitedTest(r,b){
            if(b.offsetLeft+b.offsetWidth<r.offsetLeft||b.offsetTop+b.offsetHeight<r.offsetTop||b.offsetLeft>r.offsetLeft+r.offsetWidth||b.offsetTop>r.offsetTop+r.offsetHeight){
                return false;
            }else{	return true;}
        }
        function test(){
            this.aHited=[];
            for(var i=0;i<oLis.length;i++){
                var oLi=oLis[i];var curEle=this.ele;
                oLi.style.background="";
                if(oLi==curEle)continue;
                if(hitedTest(curEle,oLi)	){
                    oLi.style.background="black";
                    this.aHited.push(oLi);
                }
            }

        }

        function changePosition(){
            var a=this.aHited;
            var ele=this.ele
            if(a&&a.length){
                for(var i=0;i<a.length;i++){
                    a[i].distance=Math.pow(ele.offsetLeft-a[i].offsetLeft,2)+Math.pow(ele.offsetTop-a[i].offsetTop,2);
                }
                a.sort(function(a,b){return a.distance-b.distance});

                var shortest=a[0];
                shortest.style.backgroundColor="green";
                zhiAnimate(shortest,{left:ele.l,top:ele.t},700,3);
                zhiAnimate(ele,{left:shortest.l,top:shortest.t},700,4);
                var l=ele.l,t=ele.t;
                ele.l=shortest.l;
                ele.t=shortest.t;
                shortest.l=l;
                shortest.t=t;
                this.aHited=null;
            }else{
                goBack.call(this);
            }

        }
    }();


    ~function ($) {
        function direction(pageX, pageY) {
            var $o = $(this).offset(),
                $w = $(this).outerWidth(),
                $h = $(this).outerHeight();
            var $x = (pageX - $o.left - ($w / 2)) * ($w > $h ? ($h / $w) : 1);
            var $y = (pageY - $o.top - ($h / 2)) * ($h > $w ? ($w / $h) : 1);
            return Math.round((((Math.atan2($y, $x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        }
        function mouseAnimate(interval) {
            interval = interval || 200;
            $(this).on("mouseenter mouseleave", function (e) {
                var $mark = $(this).children(".mark"), $posL = 0, $posT = 0, $tarL = 0, $tarT = 0, $dir = direction.call(this, e.pageX, e.pageY);
                if (e.type === "mouseenter") {
                    $dir === 0 ? $posT = "-100%" : null;
                    $dir === 1 ? $posL = "100%" : null;
                    $dir === 2 ? $posT = "100%" : null;
                    $dir === 3 ? $posL = "-100%" : null;
                    $mark.css({top: $posT, left: $posL, display: "block"}).stop().animate({
                        top: $tarT,
                        left: $tarL
                    }, interval);
                    return;
                }
                $dir === 0 ? $tarT = "-100%" : null;
                $dir === 1 ? $tarL = "100%" : null;
                $dir === 2 ? $tarT = "100%" : null;
                $dir === 3 ? $tarL = "-100%" : null;
                $mark.stop().animate({top: $tarT, left: $tarL}, interval, function () {
                    $mark.css({
                        display: "none"
                    });
                });
            });
        }

        $.fn.extend({mouseAnimate: mouseAnimate});
    }(jQuery);

    $(".follow .box li").mouseAnimate(300);
})();
