__d("useServerTime", ["JSScheduler", "ServerTime", "clearInterval", "react", "react-compiler-runtime", "setInterval"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u = s || (s = o("react")), c = u.useEffect, d = u.useState, m = 6e4, p = new Set, _ = null, f = !1;
    function g() {
        p.forEach(function(e) {
            return e()
        }),
        f = !1
    }
    function h(t) {
        t === void 0 && (t = m),
        _ = r("setInterval")(function() {
            f || (f = !0,
            (e || (e = r("JSScheduler"))).scheduleSpeculativeCallback(g))
        }, t)
    }
    function y() {
        p.size === 0 && (r("clearInterval")(_),
        _ = null)
    }
    function C(e, t) {
        return t === void 0 && (t = m),
        p.add(e),
        _ == null && h(t),
        function() {
            p.delete(e),
            y()
        }
    }
    function b() {
        return new Date(o("ServerTime").getMillis())
    }
    function v(e) {
        var t = o("react-compiler-runtime").c(4), n = e === void 0 ? m : e, r = d(S), a = r[0], i = r[1], l;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (l = function() {
            return i(b())
        }
        ,
        t[0] = l) : l = t[0];
        var s = l, u, p;
        return t[1] !== n ? (u = function() {
            return C(s, n)
        }
        ,
        p = [n],
        t[1] = n,
        t[2] = u,
        t[3] = p) : (u = t[2],
        p = t[3]),
        c(u, p),
        a
    }
    function S() {
        return b()
    }
    l.default = v
}
), 98);