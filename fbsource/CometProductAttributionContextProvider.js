__d("CometProductAttributionContextProvider.react", ["CometProductAttributionContext", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = e, c = u.useContext, d = u.useMemo;
    function m(e) {
        var t = o("react-compiler-runtime").c(8), n = e.children, a = e.value, i = c(r("CometProductAttributionContext")), l;
        e: {
            if (i != null && i.length > 0) {
                var u;
                t[0] !== i || t[1] !== a ? (u = [].concat(i, [a]),
                t[0] = i,
                t[1] = a,
                t[2] = u) : u = t[2],
                l = u;
                break e
            }
            var d;
            t[3] !== a ? (d = [a],
            t[3] = a,
            t[4] = d) : d = t[4],
            l = d
        }
        var m = l, p;
        return t[5] !== n || t[6] !== m ? (p = s.jsx(r("CometProductAttributionContext").Provider, {
            value: m,
            children: n
        }),
        t[5] = n,
        t[6] = m,
        t[7] = p) : p = t[7],
        p
    }
    l.default = m
}
), 98);