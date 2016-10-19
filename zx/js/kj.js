~function(){
    var conLeft=document.getElementById("conLeft");
    var conRight=document.getElementById("conRight");
    var oaList= $.children(conLeft,"a");
    var odList= $.children(conRight,"div");
    console.log(oaList,odList);
    function changeTab(n) {
        for (var i = 0; i < oaList.length; i++) {
            oaList[i].className = null;
            odList[i].className = "con";
        }
        oaList[n].className = "bg";
        odList[n].className = "con bg";
    }

    for (var i = 0; i < oaList.length; i++) {
        oaList[i].index = i;
        oaList[i].onclick = function () {
            changeTab(this.index);
        }
    }
}();
