var getXHR = function () {
    var c = [function () {
        return new XMLHttpRequest
    }, function () {
        return new ActiveXObject("Microsoft.XMLHTTP")
    }, function () {
        return new ActiveXObject("Msxml2.XMLHTTP")
    }, function () {
        return new ActiveXObject("Msxml3.XMLHTTP")
    }];
    var a = null;
    for (var b = 0; b < c.length; b++) {
        var f = c[b];
        try {
            a = f()
        } catch (d) {
            continue
        }
        getXHR = f;
        break
    }
    if (!a) {
        throw new Error("您的当前浏览器不支持AJAX!")
    }
    return a
};
var utils = (function () {
    var flag = "getComputedStyle" in window;

    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry, 0)
        }
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i]
        }
        return ary
    }

    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")")
    }

    function offset(curEle) {
        var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                disLeft += par.clientLeft;
                disTop += par.clientTop
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent
        }
        return {left: disLeft, top: disTop}
    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value
    }

    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null
            }
            nodeList = null
        } else {
            ary = this.listToArray(curEle.children)
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--
                }
            }
        }
        return ary
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling
        }
        return pre
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling
        }
        return nex
    }

    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre)
        }
        return ary
    }

    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex)
        }
        return ary
    }

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    function index(curEle) {
        return this.prevAll(curEle).length
    }

    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null
    }

    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null
    }

    function append(newEle, container) {
        container.appendChild(newEle)
    }

    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return
        }
        container.appendChild(newEle)
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle)
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return
        }
        oldEle.parentNode.appendChild(newEle)
    }

    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className)
    }

    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName
            }
        }
    }

    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ")
            }
        }
    }

    function getElementsByClass(strClass, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strClass))
        }
        var ary = [], strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
        var nodeList = context.getElementsByTagName("*");
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            var isOk = true;
            for (var k = 0; k < strClassAry.length; k++) {
                var reg = new RegExp("(^| +)" + strClassAry[k] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break
                }
            }
            if (isOk) {
                ary[ary.length] = curNode
            }
        }
        return ary
    }

    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr]
        } else {
            if (attr === "opacity") {
                val = this.currentStyle.filter;
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
            } else {
                val = this.currentStyle[attr]
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val
    }

    function setCss(attr, value) {
        if (attr === "float") {
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return
        }
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return
        }
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px"
            }
        }
        this["style"][attr] = value
    }

    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key])
            }
        }
    }

    function css(curEle) {
        var argTwo = arguments[1], ary = Array.prototype.slice.call(arguments, 1);
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.apply(curEle, ary)
            }
            setCss.apply(curEle, ary)
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary)
        }
    }

    function lzy(curEle) {
        for (var k = 0; k < curEle.length; k++) {
            ~function (k) {
                var curImg = curEle[k];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.style.display = "block";
                    curImg.src = this.src;
                    oImg = null
                }
            }(k)
        }
    }

    function ajax(str) {
        var jsonData = null;
        ~function () {
            var xhr = new XMLHttpRequest;
            xhr.open("get", str + "?_" + Math.random(), false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    var strs = xhr.responseText;
                    jsonData = utils.formatJSON(strs)
                }
            };
            xhr.send(null)
        }();
        return jsonData
    }

    function ajax1(apiurl, bool, callback) {
        var jsonData = null;
        if (bool != false) {
            bool = true;
            ~function () {
                var xhr = getXHR();
                apiurl += apiurl.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
                xhr.open("get", apiurl, bool);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                        var val = xhr.responseText;
                        jsonData = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                        callback(jsonData)
                    }
                };
                xhr.send(apiurl)
            }()
        } else {
            if (callback) {
                callback = null
            }
            ~function () {
                var xhr = getXHR();
                apiurl += apiurl.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
                xhr.open("get", apiurl, bool);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                        var val = xhr.responseText;
                        jsonData = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")")
                    }
                };
                xhr.send(null)
            }();
            return jsonData
        }
        console.log(bool)
    }

    return {
        win: win,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        css: css,
        getCss: getCss,
        lzy: lzy,
        ajax1: ajax1,
        ajax: ajax
    }
})();
~function () {
    var b = {
        Linear: function (f, e, h, g) {
            return h * f / g + e
        }, Bounce: {
            easeIn: function (f, e, h, g) {
                return h - b.Bounce.easeOut(g - f, 0, h, g) + e
            }, easeOut: function (f, e, h, g) {
                if ((f /= g) < (1 / 2.75)) {
                    return h * (7.5625 * f * f) + e
                } else {
                    if (f < (2 / 2.75)) {
                        return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + e
                    } else {
                        if (f < (2.5 / 2.75)) {
                            return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + e
                        } else {
                            return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + e
                        }
                    }
                }
            }, easeInOut: function (f, e, h, g) {
                if (f < g / 2) {
                    return b.Bounce.easeIn(f * 2, 0, h, g) * 0.5 + e
                }
                return b.Bounce.easeOut(f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + e
            }
        }, Quad: {
            easeIn: function (f, e, h, g) {
                return h * (f /= g) * f + e
            }, easeOut: function (f, e, h, g) {
                return -h * (f /= g) * (f - 2) + e
            }, easeInOut: function (f, e, h, g) {
                if ((f /= g / 2) < 1) {
                    return h / 2 * f * f + e
                }
                return -h / 2 * ((--f) * (f - 2) - 1) + e
            }
        }, Cubic: {
            easeIn: function (f, e, h, g) {
                return h * (f /= g) * f * f + e
            }, easeOut: function (f, e, h, g) {
                return h * ((f = f / g - 1) * f * f + 1) + e
            }, easeInOut: function (f, e, h, g) {
                if ((f /= g / 2) < 1) {
                    return h / 2 * f * f * f + e
                }
                return h / 2 * ((f -= 2) * f * f + 2) + e
            }
        }, Quart: {
            easeIn: function (f, e, h, g) {
                return h * (f /= g) * f * f * f + e
            }, easeOut: function (f, e, h, g) {
                return -h * ((f = f / g - 1) * f * f * f - 1) + e
            }, easeInOut: function (f, e, h, g) {
                if ((f /= g / 2) < 1) {
                    return h / 2 * f * f * f * f + e
                }
                return -h / 2 * ((f -= 2) * f * f * f - 2) + e
            }
        }, Quint: {
            easeIn: function (f, e, h, g) {
                return h * (f /= g) * f * f * f * f + e
            }, easeOut: function (f, e, h, g) {
                return h * ((f = f / g - 1) * f * f * f * f + 1) + e
            }, easeInOut: function (f, e, h, g) {
                if ((f /= g / 2) < 1) {
                    return h / 2 * f * f * f * f * f + e
                }
                return h / 2 * ((f -= 2) * f * f * f * f + 2) + e
            }
        }, Sine: {
            easeIn: function (f, e, h, g) {
                return -h * Math.cos(f / g * (Math.PI / 2)) + h + e
            }, easeOut: function (f, e, h, g) {
                return h * Math.sin(f / g * (Math.PI / 2)) + e
            }, easeInOut: function (f, e, h, g) {
                return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + e
            }
        }, Expo: {
            easeIn: function (f, e, h, g) {
                return (f == 0) ? e : h * Math.pow(2, 10 * (f / g - 1)) + e
            }, easeOut: function (f, e, h, g) {
                return (f == g) ? e + h : h * (-Math.pow(2, -10 * f / g) + 1) + e
            }, easeInOut: function (f, e, h, g) {
                if (f == 0) {
                    return e
                }
                if (f == g) {
                    return e + h
                }
                if ((f /= g / 2) < 1) {
                    return h / 2 * Math.pow(2, 10 * (f - 1)) + e
                }
                return h / 2 * (-Math.pow(2, -10 * --f) + 2) + e
            }
        }, Circ: {
            easeIn: function (f, e, h, g) {
                return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + e
            }, easeOut: function (f, e, h, g) {
                return h * Math.sqrt(1 - (f = f / g - 1) * f) + e
            }, easeInOut: function (f, e, h, g) {
                if ((f /= g / 2) < 1) {
                    return -h / 2 * (Math.sqrt(1 - f * f) - 1) + e
                }
                return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + e
            }
        }, Back: {
            easeIn: function (f, e, i, h, g) {
                if (g == undefined) {
                    g = 1.70158
                }
                return i * (f /= h) * f * ((g + 1) * f - g) + e
            }, easeOut: function (f, e, i, h, g) {
                if (g == undefined) {
                    g = 1.70158
                }
                return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + e
            }, easeInOut: function (f, e, i, h, g) {
                if (g == undefined) {
                    g = 1.70158
                }
                if ((f /= h / 2) < 1) {
                    return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + e
                }
                return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + e
            }
        }, Elastic: {
            easeIn: function (g, e, k, j, f, i) {
                if (g == 0) {
                    return e
                }
                if ((g /= j) == 1) {
                    return e + k
                }
                if (!i) {
                    i = j * 0.3
                }
                var h;
                !f || f < Math.abs(k) ? (f = k, h = i / 4) : h = i / (2 * Math.PI) * Math.asin(k / f);
                return -(f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i)) + e
            }, easeOut: function (g, e, k, j, f, i) {
                if (g == 0) {
                    return e
                }
                if ((g /= j) == 1) {
                    return e + k
                }
                if (!i) {
                    i = j * 0.3
                }
                var h;
                !f || f < Math.abs(k) ? (f = k, h = i / 4) : h = i / (2 * Math.PI) * Math.asin(k / f);
                return (f * Math.pow(2, -10 * g) * Math.sin((g * j - h) * (2 * Math.PI) / i) + k + e)
            }, easeInOut: function (g, e, k, j, f, i) {
                if (g == 0) {
                    return e
                }
                if ((g /= j / 2) == 2) {
                    return e + k
                }
                if (!i) {
                    i = j * (0.3 * 1.5)
                }
                var h;
                !f || f < Math.abs(k) ? (f = k, h = i / 4) : h = i / (2 * Math.PI) * Math.asin(k / f);
                if (g < 1) {
                    return -0.5 * (f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i)) + e
                }
                return f * Math.pow(2, -10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i) * 0.5 + k + e
            }
        }
    };

    function a(g, h, f, l, e) {
        var j = b.Linear;
        if (typeof l === "number") {
            switch (l) {
                case 0:
                    j = b.Linear;
                    break;
                case 1:
                    j = b.Circ.easeInOut;
                    break;
                case 2:
                    j = b.Elastic.easeOut;
                    break;
                case 3:
                    j = b.Back.easeOut;
                    break;
                case 4:
                    j = b.Bounce.easeOut;
                    break;
                case 5:
                    j = b.Expo.easeIn
            }
        } else {
            if (l instanceof Array) {
                j = l.length >= 2 ? b[l[0]][l[1]] : b[l[0]]
            } else {
                if (typeof l === "function") {
                    e = l
                }
            }
        }
        window.clearInterval(g.zhufengTimer);
        var c = {}, i = {};
        for (var k in h) {
            if (h.hasOwnProperty(k)) {
                c[k] = utils.css(g, k);
                i[k] = h[k] - c[k]
            }
        }
        var d = 0;
        g.zhufengTimer = window.setInterval(function () {
            d += 10;
            if (d >= f) {
                utils.css(g, h);
                window.clearInterval(g.zhufengTimer);
                e && e.call(g);
                return
            }
            for (var m in h) {
                if (h.hasOwnProperty(m)) {
                    var n = j(d, c[m], i[m], f);
                    utils.css(g, m, n)
                }
            }
        }, 10)
    }

    window.zhiAnimate = a
}();
var $ = utils;