!function () {
    var b = document.getElementsByTagName("head");
    b.id = "bg0";
    function d() {
        var f = document.getElementById("navList");
        var l = utils.children(f, "li");
        var p = l.length - 2;
        for (var k = 0; k < p; k++) {
            var g = b.id;
            if (g == "undefined") {
                g = "bg0"
            }
            var h = l[k];
            var m = utils.children(h, "a")[0];
            m.index = k;
            if (m.index == 0) {
                m.href = "index.html#id=" + g
            } else {
                if (m.index == 1) {
                    m.href = "html.html#id=" + g;
                    var o = window.location.href
                } else {
                    if (m.index == 2) {
                        m.href = "css.html#id=" + g
                    } else {
                        if (m.index == 3) {
                            m.href = "js.html#id=" + g
                        } else {
                            if (m.index == 4) {
                                m.href = "node.html#id=" + g
                            } else {
                                if (m.index == 5) {
                                    m.href = "kj.html#id=" + g
                                } else {
                                    if (m.index == 6) {
                                        m.href = "dome.html#id=" + g
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var j = document.getElementById("logo");
        j.onclick = function () {
            var i = b.id;
            if (i == "undefined") {
                i = "bg0"
            }
            console.log(i);
            j.href = "index.html#id=" + i
        }
    }

    d();
    var e = window.location.href;

    function c(f) {
        var h = {};
        var g = /([^?=&|#]+)=([^?=&|#]+)/g;
        f.replace(g, function () {
            h[arguments[1]] = arguments[2]
        });
        return h
    }

    var a = c(e);
    !function () {
        var i = document.getElementById("deta");
        var f = utils.children(i, "b")[0];

        function h(j) {
            return j < 10 ? "0" + j : j
        }

        function g() {
            var m = new Date();
            var r = m.getFullYear();
            var q = m.getMonth() + 1;
            var s = m.getDate();
            var p = m.getHours();
            var o = m.getMinutes();
            var l = m.getSeconds();
            var k = m.getDay();
            var j = "日一二三四五六";
            f.innerHTML = r + "年" + h(q) + "月" + h(s) + "日 星期" + j[k] + " " + h(p) + "时" + h(o) + "分" + h(l) + "秒"
        }

        g();
        window.setInterval(g, 1000)
    }();
    ~function () {
        var h = document.getElementById("xiaList1"), g = document.getElementById("xiaList2");
        f(h);
        f(g);
        function f(j) {
            var i = utils.children(j, "div")[0];
            j.onmouseover = function () {
                var k = utils.children(i, "a");
                n = Number(k.length) * 43;
                zhiAnimate(i, {height: n}, 350)
            };
            j.onmouseout = function () {
                zhiAnimate(i, {height: 0}, 350)
            }
        }
    }();
    (function () {
        var j = document.getElementById("clList"), l = document.getElementById("title"), g = document.getElementById("body");
        var m = a.id;
        b.id = m;
        l.className = "min_width title " + m;
        g.className = m;
        d();
        var f = utils.children(j);
        for (var h = 0; h < f.length; h++) {
            f[h].indexs = h;
            var k = f[h];
            if (f[h].className == a.id) {
                f[h].style.borderColor = "yellow"
            } else {
                f[h].style.borderColor = "#cccccc"
            }
            k.onclick = function () {
                this.style.borderColor = "yellow";
                g.className = "bg" + Number(this.indexs);
                b.id = "bg" + Number(this.indexs);
                l.className = "min_width title" + (" bg" + Number(this.indexs));
                var p = utils.siblings(this);
                for (var q = 0; q < p.length; q++) {
                    var o = p[q];
                    o.style.borderColor = "#cccccc"
                }
                d()
            }
        }
    })();
    window.onload = function () {
        ~function () {
            var g = document.getElementById("linkTo");
            if (g) {
                var f = utils.win("clientHeight");

                function h() {
                    var i = utils.win("scrollTop");
                    g.style.display = i >= f ? "block" : "none"
                }

                window.onscroll = h;
                g.onclick = function () {
                    this.style.display = "none";
                    window.onscroll = null;
                    var l = utils.win("scrollTop"), k = 500, i = 10, j = (l / k) * i;
                    var m = window.setInterval(function () {
                        var o = utils.win("scrollTop");
                        if (o <= 0) {
                            window.clearInterval(m);
                            window.onscroll = h;
                            return
                        }
                        utils.win("scrollTop", o - j)
                    }, i)
                }
            }
        }();
        ~function () {
            if (g) {
                var g = document.getElementById("linkTo1");
                var f = utils.win("clientHeight");

                function h() {
                    var i = utils.win("scrollTop")
                }

                window.onscroll = h;
                g.onclick = function () {
                    window.onscroll = null;
                    var l = utils.win("scrollTop"), k = 500, i = 10, j = (l / k) * i;
                    var m = window.setInterval(function () {
                        var o = utils.win("scrollTop");
                        if (o <= 0) {
                            window.clearInterval(m);
                            window.onscroll = h;
                            return
                        }
                        utils.win("scrollTop", o - j)
                    }, i)
                }
            }
        }();
        (function () {
            var h = document.getElementById("lefts");
            var g = utils.children(h, "h3")[0], f = utils.children(h, "ul")[0];
            g.onclick = function () {
                if (this.innerHTML == "点击显示") {
                    zhiAnimate(g, {left: 0}, 300, function () {
                        zhiAnimate(f, {left: 0}, 330, function () {
                            zhiAnimate(f, {height: 200}, 300, function () {
                                g.innerHTML = "点击隐藏"
                            })
                        })
                    });
                    return
                }
                if (this.innerHTML == "点击隐藏") {
                    zhiAnimate(f, {height: 40}, 300, function () {
                        zhiAnimate(f, {left: -80}, 330, function () {
                            zhiAnimate(g, {left: -40}, 330, function () {
                                g.innerHTML = "点击显示"
                            })
                        })
                    });
                    return
                }
            }
        })();
        !function () {
            var j = window.location.href;

            function i(k) {
                var m = {};
                var l = /([^?=&|#]+)=([^?=&|#]+)/g;
                k.replace(l, function () {
                    m[arguments[1]] = arguments[2]
                });
                return m
            }

            var g = i(j);
            var h = document.getElementsByTagName("head");
            var f = document.getElementById("bottmS");
            document.onclick = function () {
                var k = h.id;
                if (k == "bg0") {
                    f.style.background = "#ffffff"
                } else {
                    if (k == "bg1") {
                        f.style.background = "aliceblue"
                    } else {
                        if (k == "bg2") {
                            f.style.background = "#DDEDFB"
                        } else {
                            if (k == "bg3") {
                                f.style.background = "pink"
                            } else {
                                if (k == "bg4") {
                                    f.style.background = "#e1e1e1"
                                } else {
                                    if (k == "bg5") {
                                        f.style.background = "peachpuff"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }()
    }
}();



