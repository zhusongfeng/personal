!function () {
    ~function () {
        function a(a) {
            function b(a) {
                var b, c, d;
                for (b = 0; b < f.length; b++)c = utils.children(f[b], "a")[0], c.className = null, e[b].className = null;
                d = utils.children(f[a], "a")[0], d.className = "bg", e[a].className = "bg"
            }

            var c, d = utils.children(a, "ul")[0], e = utils.children(a, "div"), f = utils.children(d, "li");
            for (c = 0; c < f.length; c++)f[c].index = c, f[c].onmouseover = function () {
                b(this.index)
            }
        }

        var b = document.getElementById("tab");
        a(b)
    }(), ~function () {
        function a(a) {
            for (var b, c, d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", e = ""; e.length < 4;)b = Math.round(61 * Math.random()), c = d[b], e.indexOf(c) > -1 || (e += c);
            a.innerHTML = e
        }

        var b, c, d, e, f = document.getElementById("captcha1"), g = f.getElementsByTagName("a")[0], h = document.getElementById("captcha2"), i = h.getElementsByTagName("a")[0];
        a(g), g.onclick = function () {
            a(g)
        }, a(i), i.onclick = function () {
            a(i)
        }, b = document.getElementsByName("btn1")[0], c = document.getElementsByName("btn2")[0], d = document.getElementsByName("text1")[0], e = document.getElementsByName("text2")[0], b.onclick = function () {
            var b = utils.children(f, "p")[0], c = utils.children(b, "span")[0], e = utils.children(b, "a")[0], h = d.value.replace(/(^ +| +$)/g, "");
            h === g.innerHTML ? (c.innerHTML = "验证成功！点击关闭，再次试验。", zhiAnimate(b, {height: "100%"}, 300)) : 0 === h.length ? (c.innerHTML = "验证失败！验证不能为空。", zhiAnimate(b, {height: "100%"}, 300)) : h.length <= 3 || h.length > 5 ? (c.innerHTML = "验证失败！输入的位数不对!", zhiAnimate(b, {height: "100%"}, 300)) : h != g.innerHTML && (c.innerHTML = "验证失败！输入不正确。", zhiAnimate(b, {height: "100%"}, 300)), e.onclick = function () {
                zhiAnimate(b, {height: "0"}, 300), d.value = "", a(g)
            }
        }, c.onclick = function () {
            var b = utils.children(h, "p")[0], c = utils.children(b, "span")[0], d = utils.children(b, "a")[0], f = e.value.replace(/(^ +| +$)/g, "");
            f.toLocaleLowerCase() == i.innerHTML.toLocaleLowerCase() ? (c.innerHTML = "验证成功！点击关闭，再次试验。", zhiAnimate(b, {height: "100%"}, 300)) : f.toLocaleLowerCase() != i.innerHTML.toLocaleLowerCase() ? (c.innerHTML = "验证失败！输入不正确。", zhiAnimate(b, {height: "100%"}, 300)) : 0 === f.length ? (c.innerHTML = "验证失败！验证不能为空。", zhiAnimate(b, {height: "100%"}, 300)) : (f.length <= 3 || f.length > 5) && (c.innerHTML = "验证失败！输入的位数不对!", zhiAnimate(b, {height: "100%"}, 300)), d.onclick = function () {
                zhiAnimate(b, {height: "0"}, 300), e.value = "", a(i)
            }
        }
    }(), ~function () {
        var a = document.getElementById("submitBtn"), b = a.getElementsByTagName("span")[0];
        b.count = 100, a.onclick = function () {
            b.count += 10, b.innerHTML = b.count
        }
    }(), ~function () {
        function a(a) {
            var d, e, h, i, j, k, l, m = document.createDocumentFragment();
            for (d = 0, e = a.length; e > d; d++) {
                h = a[d], h["sex"] = 0 == h["sex"] ? "男" : 1 == h["sex"] ? "女" : "未知", i = document.createElement("tr");
                for (j in h)k = document.createElement("td"), k.innerHTML = h[j], i.appendChild(k);
                m.appendChild(i)
            }
            for (g.appendChild(m), m = null, b(), d = 0, e = f.length; e > d; d++)l = f[d], l.className.indexOf("cursor") > -1 && (l.flag = -1, l.index = d, l.onclick = function () {
                c.call(this, this.index)
            })
        }

        function b() {
            for (var a = 0; a < h.length; a++)h[a].className = 1 === a % 2 ? "bg" : null
        }

        function c(a) {
            var c, d, e, i, j, k;
            for (c = 0; c < f.length; c++)c != a ? f[c].flag = -1 : null;
            for (d = this, d.flag *= -1, e = utils.listToArray(h), e.sort(function (b, c) {
                var e = b.cells[a].innerHTML, f = c.cells[a].innerHTML, g = parseFloat(e), h = parseFloat(f);
                return isNaN(g) || isNaN(h) ? e.localeCompare(f) * d.flag : (g - h) * d.flag
            }), i = document.createDocumentFragment(), j = 0, k = e.length; k > j; j++)i.appendChild(e[j]);
            g.appendChild(i), b()
        }

        var d = document.getElementById("table"), e = d.tHead, f = e.rows[0].cells, g = d.tBodies[0], h = g.rows;
        ~function () {
            var b = new XMLHttpRequest;
            b.open("get", "json/userInfo.json", !0), b.onreadystatechange = function () {
                var c, d;
                4 === b.readyState && /^2\d{2}$/.test(b.status) && (c = b.responseText, d = utils.formatJSON(c), a(d))
            }, b.send(null)
        }()
    }(), !function () {
        var a = document.getElementById("boxCon"), b = document.getElementById("boxCon_begin"), c = utils.css(b, "width");
        window.setInterval(function () {
            var b = a.scrollLeft;
            return b >= c ? (a.scrollLeft = 0, void 0) : (a.scrollLeft = ++b, void 0)
        }, 10)
    }(), ~function () {
        var a, b = document.getElementById("imgag"), c = b.getElementsByTagName("img")[0], d = null;
        d = window.setTimeout(function () {
            var a = new Image;
            a.src = c.getAttribute("trueImg"), a.onload = function () {
                c.src = this.src, c.style.display = "block", a = null
            }, window.clearInterval(d)
        }, 500), a = document.getElementById("button"), a.onclick = function () {
            c.style.display = "none", c.src = "", d = window.setTimeout(function () {
                var a = new Image;
                a.src = c.getAttribute("trueImg"), a.onload = function () {
                    c.src = this.src, c.style.display = "block", a = null
                }, window.clearInterval(d), console.log("11")
            }, 500)
        }
    }(), ~function () {
        function a() {
            c.scrollLeft++, c.scrollLeft >= e / 2 && (c.scrollLeft = 0)
        }

        var b = document.getElementsByClassName("div")[0], c = document.getElementById("div"), d = document.getElementById("ul"), e = utils.css(d, "width"), f = window.setInterval(a, 10);
        b.onmouseover = function () {
            window.clearInterval(f)
        }, b.onmouseout = function () {
            f = window.setInterval(a, 10)
        }
    }(), +function () {
        var a = document.getElementById("nav2"), b = utils.children(a, "ul")[0];
        a.onmouseover = function () {
            zhiAnimate(b, {height: 150}, 300)
        }, a.onmouseout = function () {
            zhiAnimate(b, {height: 0}, 300)
        }
    }(), +function () {
        var a = document.getElementById("nav3"), b = utils.children(a, "ul")[0];
        a.onmouseover = function () {
            zhiAnimate(b, {width: 150}, 300, function () {
                zhiAnimate(b, {height: 150}, 300)
            })
        }, a.onmouseout = function () {
            zhiAnimate(b, {height: 50}, 300, function () {
                zhiAnimate(b, {width: 0}, 300)
            })
        }
    }(), ~function () {
        function a(a, b, c) {
            return this.banner = document.getElementById(a), this.bannerInner = utils.firstChild(this.banner), this.bannerTip = utils.children(this.banner, "ul")[0], this.bannerLink = utils.children(this.banner, "a"), this.bannerLeft = this.bannerLink[0], this.bannerRight = this.bannerLink[1], this.divList = this.bannerInner.getElementsByTagName("div"), this.imgList = this.bannerInner.getElementsByTagName("img"), this.oLis = this.bannerTip.getElementsByTagName("li"), this.jsonData = null, this.interval = c || 3e3, this.autoTimer = null, this.step = 0, this.ajaxURL = b, this.init()
        }

        a.prototype = {
            constructor: a, getData: function () {
                var a = this, b = new XMLHttpRequest;
                b.open("get", this.ajaxURL + "?_=" + Math.random(), !1), b.onreadystatechange = function () {
                    4 === b.readyState && /^2\d{2}$/.test(b.status) && (a.jsonData = utils.formatJSON(b.responseText))
                }, b.send(null)
            }, bindData: function () {
                var a, b, c, d = "", e = "";
                if (this.jsonData)for (a = 0, b = this.jsonData.length; b > a; a++)c = this.jsonData[a], d += "<div><img src='' trueImg='" + c["img"] + "'/></div>", e += 0 === a ? "<li class='bg'></li>" : "<li></li>";
                this.bannerInner.innerHTML = d, this.bannerTip.innerHTML = e
            }, lazyImg: function () {
                var a, b, c = this;
                for (a = 0, b = this.imgList.length; b > a; a++)~function (a) {
                    var b = c.imgList[a], d = new Image;
                    d.src = b.getAttribute("trueImg"), d.onload = function () {
                        if (b.src = this.src, b.style.display = "block", 0 === a) {
                            var c = b.parentNode;
                            c.style.zIndex = 1, zhiAnimate(c, {opacity: 1}, 200)
                        }
                        d = null
                    }
                }(a)
            }, autoMove: function () {
                this.step === this.jsonData.length - 1 && (this.step = -1), this.step++, this.setBanner()
            }, setBanner: function () {
                var a, b, c, d;
                for (a = 0, b = this.divList.length; b > a; a++)c = this.divList[a], a !== this.step ? utils.css(c, "zIndex", 0) : (utils.css(c, "zIndex", 1), zhiAnimate(c, {opacity: 1}, 200, function () {
                    var a, b, c = utils.siblings(this);
                    for (a = 0, b = c.length; b > a; a++)utils.css(c[a], "opacity", 0)
                }));
                for (a = 0, b = this.oLis.length; b > a; a++)d = this.oLis[a], a === this.step ? utils.addClass(d, "bg") : utils.removeClass(d, "bg")
            }, mouseEvent: function () {
                var a = this;
                this.banner.onmouseover = function () {
                    window.clearInterval(a.autoTimer), a.bannerLeft.style.display = a.bannerRight.style.display = "block"
                }, this.banner.onmouseout = function () {
                    a.autoTimer = window.setInterval(function () {
                        a.autoMove()
                    }, a.interval), a.bannerLeft.style.display = a.bannerRight.style.display = "none"
                }
            }, tipEvent: function () {
                var a, b, c, d = this;
                for (a = 0, b = this.oLis.length; b > a; a++)c = this.oLis[a], c.index = a, c.onclick = function () {
                    d.step = this.index, d.setBanner()
                }
            }, leftRight: function () {
                var a = this;
                this.bannerRight.onclick = function () {
                    a.autoMove()
                }, this.bannerLeft.onclick = function () {
                    0 === a.step && (a.step = a.jsonData.length), a.step--, a.setBanner()
                }
            }, init: function () {
                var a = this;
                return this.getData(), this.bindData(), window.setTimeout(function () {
                    a.lazyImg()
                }, 500), this.autoTimer = window.setInterval(function () {
                    a.autoMove()
                }, this.interval), this.mouseEvent(), this.tipEvent(), this.leftRight(), this
            }
        }, window.AutoBanner = a, new a("banner", "json/banner.txt", 2e3)
    }(), -function () {
        function a(a) {
            var d, f, g, h, i, j;
            a = a || window.event, d = a.clientX - b.offsetLeft - c.offsetWidth / 2 - 100, f = a.clientY - b.offsetTop - c.offsetHeight / 2 - 230, g = 0, h = 0, i = b.offsetWidth - c.offsetWidth, j = b.offsetHeight - c.offsetHeight, d = g >= d ? g : d >= i ? i : d, f = h >= f ? h : f >= j ? j : f, utils.css(c, {
                left: d,
                top: f
            }), utils.css(e, {marginTop: 3 * -f, marginLeft: 3 * -d})
        }

        var b = document.getElementById("box"), c = document.getElementById("mark"), d = document.getElementById("boxDel"), e = d.getElementsByTagName("img")[0];
        b.onmouseenter = function (b) {
            utils.css(c, "display", "block"), utils.css(d, "display", "block"), a(b)
        }, b.onmousemove = a, b.onmouseleave = function () {
            utils.css(c, "display", "none"), utils.css(d, "display", "none")
        }
    }(), ~function () {
        function a() {
            this.ele.style.zIndex = ++h
        }

        function b() {
            zhiAnimate(this.ele, {left: this.ele.l, top: this.ele.t}, 700, 3)
        }

        function c(a, b) {
            return b.offsetLeft + b.offsetWidth < a.offsetLeft || b.offsetTop + b.offsetHeight < a.offsetTop || b.offsetLeft > a.offsetLeft + a.offsetWidth || b.offsetTop > a.offsetTop + a.offsetHeight ? !1 : !0
        }

        function d() {
            var a, b, d;
            for (this.aHited = [], a = 0; a < j.length; a++)b = j[a], d = this.ele, b.style.background = "", b != d && c(d, b) && (b.style.background = "black", this.aHited.push(b))
        }

        function e() {
            var a, c, d, e, f = this.aHited, g = this.ele;
            if (f && f.length) {
                for (a = 0; a < f.length; a++)f[a].distance = Math.pow(g.offsetLeft - f[a].offsetLeft, 2) + Math.pow(g.offsetTop - f[a].offsetTop, 2);
                f.sort(function (a, b) {
                    return a.distance - b.distance
                }), c = f[0], c.style.backgroundColor = "green", zhiAnimate(c, {
                    left: g.l,
                    top: g.t
                }, 700, 3), zhiAnimate(g, {
                    left: c.l,
                    top: c.t
                }, 700, 4), d = g.l, e = g.t, g.l = c.l, g.t = c.t, c.l = d, c.t = e, this.aHited = null
            } else b.call(this)
        }

        var f, g, h, i = document.getElementById("photo1"), j = utils.children(i, "li");
        for (f = j.length - 1; f >= 0; f--)g = j[f], g.style.left = (g.l = g.offsetLeft) + "px", g.style.top = (g.t = g.offsetTop) + "px", g.style.position = "absolute", g.style.margin = 0, new Drag(g).on("dragstart", a).on("dragend", e).on("dragging", d);
        h = 0
    }(), ~function (a) {
        function b(b, c) {
            var d = a(this).offset(), e = a(this).outerWidth(), f = a(this).outerHeight(), g = (b - d.left - e / 2) * (e > f ? f / e : 1), h = (c - d.top - f / 2) * (f > e ? e / f : 1);
            return Math.round((Math.atan2(h, g) * (180 / Math.PI) + 180) / 90 + 3) % 4
        }

        function c(c) {
            c = c || 200, a(this).on("mouseenter mouseleave", function (d) {
                var e = a(this).children(".mark"), f = 0, g = 0, h = 0, i = 0, j = b.call(this, d.pageX, d.pageY);
                return "mouseenter" === d.type ? (0 === j ? g = "-100%" : null, 1 === j ? f = "100%" : null, 2 === j ? g = "100%" : null, 3 === j ? f = "-100%" : null, e.css({
                    top: g,
                    left: f,
                    display: "block"
                }).stop().animate({
                    top: i,
                    left: h
                }, c), void 0) : (0 === j ? i = "-100%" : null, 1 === j ? h = "100%" : null, 2 === j ? i = "100%" : null, 3 === j ? h = "-100%" : null, e.stop().animate({
                    top: i,
                    left: h
                }, c, function () {
                    e.css({display: "none"})
                }), void 0)
            })
        }

        a.fn.extend({mouseAnimate: c})
    }(jQuery), $(".follow .box li").mouseAnimate(300)
}();