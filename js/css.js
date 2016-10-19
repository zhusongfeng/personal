!function () {
    var e = document.getElementById("list");
    var b = $.children(e, "div")[0];
    e.onmouseover = function () {
        zhiAnimate(b, {display: "block"}, 20, function () {
            zhiAnimate(b, {height: 319}, 300)
        })
    };
    e.onmouseout = function () {
        zhiAnimate(b, {height: 0}, 300, function () {
            zhiAnimate(b, {display: "none"}, 20)
        })
    };
    b.onclick = function () {
        this.style.display = "none"
    };
    var a = $.children(b, "a");
    for (var c = 0; c < a.length; c++) {
        a[c].index = c;
        a[c].onclick = function () {
            console.log(this.index);
            var g = this.index + 1;
            var f = d(g);
            $.win("scrollTop", f - 180)
        }
    }
    function d(h) {
        var g = 140;
        var f = document.getElementById("con" + h);
        if (f == null) {
            return g
        }
        g = $.offset(f).top;
        return g
    }
}();