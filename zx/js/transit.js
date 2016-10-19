
!function(){
    var har=document.getElementsByTagName("head");
    har.id="bg0";
    //rul
    function urls(){
        var navList=document.getElementById("navList");
        var navListLi=utils.children(navList,"li");
        var a=navListLi.length-2;
        for(var i=0;i<a;i++){
            var id=har.id;
            if(id=="undefined"){
                id="bg0";
            }
            var oLi=navListLi[i];
            var oA=utils.children(oLi,"a")[0];
            oA.index=i;
            if(oA.index==0){
                oA.href="index.html#id="+id;
            }else if(oA.index==1){
                oA.href="html.html#id="+id;
                var curUrl=window.location.href;
            }else if(oA.index==2){
                oA.href="css.html#id="+id;
            }else if(oA.index==3){
                oA.href="js.html#id="+id;
            }else if(oA.index==4){
                oA.href="node.html#id="+id;
            }else if(oA.index==5){
                oA.href="kj.html#id="+id;
            }else if(oA.index==6){
                oA.href="dome.html#id="+id;
            }
        };
        var logo=document.getElementById("logo");
        console.log(logo)
        logo.onclick=function(){
            var id=har.id;
            if(id=="undefined"){
                id="bg0";
            }
            console.log(id);
            logo.href="index.html#id="+id;
        };
    }
    urls();


    //获取url
    var curUrl=window.location.href;
    function pueryUrlP(url){
        var obj={};
        var reg=/([^?=&|#]+)=([^?=&|#]+)/g;
        url.replace(reg,function(){
            obj[arguments[1]]=arguments[2];
        });
        return obj;
    }
    var url= pueryUrlP(curUrl);

    //时间
    !function(){
       var timeDiv = document.getElementById("deta");
       var  b=utils.children(timeDiv,"b")[0];
       function addZero(value) {
           return value < 10 ? "0" + value : value;
       }
       function getTime() {
           var time = new Date();
           var year = time.getFullYear();
           var month = time.getMonth() + 1;
           var day = time.getDate();
           var hour = time.getHours();
           var minute = time.getMinutes();
           var second = time.getSeconds();

           var week = time.getDay();
           var area = "日一二三四五六";
           b.innerHTML = year + "年" + addZero(month) + "月" + addZero(day) + "日 星期" + area[week] + " " + addZero(hour) + "时" + addZero(minute) + "分" + addZero(second) + "秒";
       }
       getTime();
       window.setInterval(getTime, 1000);

   }();
    //导航
    ~function(){
        var xiaList1=document.getElementById("xiaList1"),xiaList2=document.getElementById("xiaList2");
        tab(xiaList1);
        tab(xiaList2);
        function tab(ele){
            var odiv=utils.children(ele,"div")[0];
            ele.onmouseover=function(){
                var oa=utils.children(odiv,"a");
                n=Number(oa.length)*43;
                zhiAnimate(odiv,{height:n},350)
            };
            ele.onmouseout=function(){
                zhiAnimate(odiv,{height:0},350)
            };
        }
    }();

    //导航跳转
    ;(function(){
        var clList=document.getElementById("clList"),title=document.getElementById("title"),body=document.getElementById("body");
        var id=url.id;
        har.id=id;
        console.log(id);
        title.className="min_width title "+id;
        body.className=id;
        urls();
        var li=utils.children(clList);
        for(var i=0;i<li.length;i++){
            li[i].indexs=i;
            var oLi=li[i];
            if(li[i].className==url.id){
                li[i].style.borderColor='yellow';
            }else{
                li[i].style.borderColor='#cccccc';
            }
            oLi.onclick=function(){
               this.style.borderColor='yellow';
                body.className="bg"+Number(this.indexs);
                har.id="bg"+Number(this.indexs);
                title.className="min_width title"+(" bg"+Number(this.indexs));
               var si=utils.siblings(this);
                for(var i=0;i<si.length;i++){
                    var A=si[i];
                    A.style.borderColor='#cccccc';
                }
                urls();
            };
        }
    })();

    //回到顶部
    window.onload=function(){
        //回到顶部
        ~function () {
            var linkTo = document.getElementById("linkTo");
            if(linkTo){
                var clientH = utils.win("clientHeight");
                function windowScroll() {
                    var curTop =utils.win("scrollTop");
                    linkTo.style.display = curTop >= clientH ? "block" : "none";
                }

                window.onscroll = windowScroll;
                linkTo.onclick = function () {
                    this.style.display = "none";
                    window.onscroll = null;
                    var target = utils.win("scrollTop"), duration = 500, interval = 10, step = (target / duration) * interval;
                    var timer = window.setInterval(function () {
                        var nowTop = utils.win("scrollTop");
                        if (nowTop <= 0) {
                            window.clearInterval(timer);
                            window.onscroll = windowScroll;
                            return;
                        }
                        utils.win("scrollTop", nowTop - step);
                    }, interval);
                }
            }
        }();
        ~function () {
            if(linkTo){
                var linkTo = document.getElementById("linkTo1");
                var clientH = utils.win("clientHeight");
                function windowScroll() {
                    var curTop =utils.win("scrollTop");
                    //linkTo.style.display = curTop >= clientH ? "block" : "none";
                }

                window.onscroll = windowScroll;
                linkTo.onclick = function () {
                    //this.style.display = "none";
                    window.onscroll = null;
                    var target = utils.win("scrollTop"), duration = 500, interval = 10, step = (target / duration) * interval;
                    var timer = window.setInterval(function () {
                        var nowTop = utils.win("scrollTop");
                        if (nowTop <= 0) {
                            window.clearInterval(timer);
                            window.onscroll = windowScroll;
                            return;
                        }
                        utils.win("scrollTop", nowTop - step);
                    }, interval);
                }
            }
        }();

        //轻松一刻
        ;(function(){
            var lefts=document.getElementById("lefts");
            var H3=utils.children(lefts,"h3")[0],ul=utils.children(lefts,"ul")[0];
            H3.onclick=function(){
                if(this.innerHTML=="点击显示"){
                    zhiAnimate(H3,{left:0},300,function(){zhiAnimate(ul,{left:0},330,function(){zhiAnimate(ul,{height:200},300,function(){H3.innerHTML="点击隐藏";})})});
                    return
                }
                if(this.innerHTML=="点击隐藏"){
                    zhiAnimate(ul,{height:40},300,function(){zhiAnimate(ul,{left:-80},330,function(){zhiAnimate(H3,{left:-40},330,function(){H3.innerHTML="点击显示";})})});
                    return
                }
            };
        })();

        //底部颜色
        !function (){
            var curUrl=window.location.href;
            function pueryUrlP(url){
                var obj={};
                var reg=/([^?=&|#]+)=([^?=&|#]+)/g;
                url.replace(reg,function(){
                    obj[arguments[1]]=arguments[2];
                });
                return obj;
            }
            var url= pueryUrlP(curUrl);
            var har=document.getElementsByTagName("head");

            var bottmS=document.getElementById("bottmS");
            document.onclick=function(){
                var id=har.id;
                if(id=="bg0"){
                    bottmS.style.background="#ffffff"
                }else if(id=="bg1"){
                    bottmS.style.background="aliceblue"
                }else if(id=="bg2"){
                    bottmS.style.background="#DDEDFB"
                }else if(id=="bg3"){
                    bottmS.style.background="pink"
                }else if(id=="bg4"){
                    bottmS.style.background="#e1e1e1"
                }else if(id=="bg5"){
                    bottmS.style.background="peachpuff"
                }
            }

        }();
    }

}();



