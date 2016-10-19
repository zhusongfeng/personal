!function(){
    var list=document.getElementById('list');
    var oDiv= $.children(list,'div')[0];
    list.onmouseover=function(){
        zhiAnimate(oDiv,{display:'block'},20,function(){
            zhiAnimate(oDiv,{height:319},300)
        })
    };
    list.onmouseout=function(){
        zhiAnimate(oDiv,{height:0},300,function(){
            zhiAnimate(oDiv,{display:"none"},20)
        })
    };
    oDiv.onclick=function(){
        this.style.display='none'
    };
    var oa= $.children(oDiv,"a");
    for(var i=0;i<oa.length;i++){
        oa[i].index=i;
        oa[i].onclick=function(){
            console.log(this.index);
            var n=this.index+1;
            var curT=scrl(n);
            $.win("scrollTop",curT-180);
        }
    }
    function scrl(n) {
        var curTop = 140;
        var oDiv = document.getElementById("con" + n);
        if(oDiv==null){
            return curTop
        }
        curTop = $.offset(oDiv).top;
        return curTop;
    }
}();
