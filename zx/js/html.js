
!(function(){
    var cons=document.getElementById('cons');
    var list=document.getElementById('list');

    var oA=list.getElementsByTagName("li");
    var oBox=utils.children(cons,'div');
    for(var i=0;i<oA.length;i++){
        oA[i].i=i;
        var oa=oA[i];
        oa.onclick=function(){
            if(this.className=='bg'){
                return
            }
            this.className='bg';
            var box=oBox[this.i];
            box.style.display='block';
            var oas=utils.siblings(this);
            var boxs=utils.siblings(box);
            for(var i=0;i<oas.length;i++){
                oas[i].className='';
                boxs[i].style.display="none"
                console.log(boxs[i],oas[i])
            }
            utils.win("scrollTop",0)
        }
    }
})();
