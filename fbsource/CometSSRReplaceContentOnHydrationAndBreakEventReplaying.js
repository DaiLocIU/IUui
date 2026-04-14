
__d("CometSSRReplaceContentOnHydrationAndBreakEventReplaying.react", ["CometPlaceholder.react", "CometSSRSuspendOnServer.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react"));
    function u(e) {
        var t = o("react-compiler-runtime").c(6), n = e.children, a = e.useSuspenseDirectlyForSVG, i = a === !0 ? s.Suspense : r("CometPlaceholder.react"), l;
        t[0] !== n ? (l = s.jsx(r("CometSSRSuspendOnServer.react"), {
            children: n
        }),
        t[0] = n,
        t[1] = l) : l = t[1];
        var u;
        return t[2] !== i || t[3] !== n || t[4] !== l ? (u = s.jsx(i, {
            fallback: n,
            children: l
        }),
        t[2] = i,
        t[3] = n,
        t[4] = l,
        t[5] = u) : u = t[5],
        u
    }
    l.default = u
}
), 98);