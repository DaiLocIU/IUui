__d("useMBSBookmarkIntercept", ["CometRelay", "ProdashMBSEntrypointUpsellDialog.entrypoint", "goURIOnWindow", "react", "react-compiler-runtime", "useCometEntryPointDialog", "useMBSBookmarkInterceptGatingQuery.graphql"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u = s || (s = o("react")), c = u.useCallback, d = u.useRef, m = e !== void 0 ? e : e = n("useMBSBookmarkInterceptGatingQuery.graphql");
    function p(e) {
        var t = o("react-compiler-runtime").c(4), n;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (n = {},
        t[0] = n) : n = t[0];
        var a = r("useCometEntryPointDialog")(r("ProdashMBSEntrypointUpsellDialog.entrypoint"), n), i = a[0], l = d(!1), s;
        return t[1] !== e || t[2] !== i ? (s = function(n) {
            l.current || (l.current = !0,
            o("CometRelay").fetchQuery(e, m, {}).toPromise().then(function(e) {
                var t, o = (e == null || (t = e.viewer) == null || (t = t.actor) == null ? void 0 : t.should_block_mbs_redirect) === !0;
                o ? i({
                    mbsURL: n,
                    openInNewTab: !1,
                    referrerSurface: "bookmark"
                }) : r("goURIOnWindow")(window, n)
            }).catch(function() {
                r("goURIOnWindow")(window, n)
            }).finally(function() {
                l.current = !1
            }))
        }
        ,
        t[1] = e,
        t[2] = i,
        t[3] = s) : s = t[3],
        s
    }
    l.default = p
}
), 98);