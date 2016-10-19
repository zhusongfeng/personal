
!(function(){
    var list=document.getElementById("list");
    var rights=document.getElementById("rights");
    var oA= $.children(rights,"a");
    list.onclick=function(){
        if(list.innerHTML==="显示列表"){
            zhiAnimate(rights,{right:0},300,function(){
                list.innerHTML="隐藏列表";
            });
            list.className="list bg"
        }
        if(list.innerHTML==="隐藏列表"){
            zhiAnimate(rights,{right:-100},300,function(){
                list.innerHTML="显示列表";
            })
            list.className="list"
        }
    }
    for(var i=0;i<oA.length;i++){
        var oa=oA[i];
        oa.index=i;
        oa.onclick=function(){
            var n=this.index+1;
            var curTop= scrl(n);
            var _this=this;
            window.onscroll=$.win("scrollTop",curTop-150);
            var cur=$.win("scrollTop");
            if(cur==curTop-150){
                _this.className="bg";
                var oas= $.siblings(this);
                for(var k=0;k<oas.length;k++){
                    oas[k].className=""
                }
            }
        }
    }
    function scrl(n) {
        var curTop = 170;
        var oDiv = document.getElementById("con" + n);
        if(oDiv==null){
            return curTop
        }
        curTop = $.offset(oDiv).top;
        return curTop;
    }
    if("getComputedStyle" in window){
        document.body.addEventListener("click",fn,true);

        document.body.addEventListener("mousewheel",fn,true);
        document.body.addEventListener("keydown",fn,true);
    }else{
        document.body.attachEvent("onclick",fn,true);

        document.body.attachEvent("onmousewheel",fn,true);
        document.body.attachEvent("onkeydown",fn,true);
    }
    function fn(e){
        e=e||window.event;
        var tar= e.target;
        if(tar.id=="rights"){
            zhiAnimate(rights,{right:0},300,function(){
                list.innerHTML="隐藏列表";
            });
            list.className="list bg"
        }else if(tar.id=="list"){
            console.log("ok2");
        }else{
            console.log("no");
            zhiAnimate(rights,{right:-100},300,function(){
                list.innerHTML="显示列表";
                for(var i=0;i<oA.length;i++){
                    oA[i].className="";
                }
            });
            list.className="list"

        }
    }
})();
