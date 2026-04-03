__d("useBookmarkFalcoFullViewLogger", ["CometPassiveGetRouterStateContext", "CometProductAttribution", "react", "react-compiler-runtime", "requireDeferred", "useFullViewImpressionLogger", "useMinifiedProductAttribution"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = s.useCallback, c = s.useContext, d = s.useRef, m = r("requireDeferred")("WebBookmarkImpressionFalcoEvent").__setRef("useBookmarkFalcoFullViewLogger"), p = 60 * 1e3;
    function _(e, t, n, a) {
        var i = o("react-compiler-runtime").c(10), l = d(0), s = c(r("CometPassiveGetRouterStateContext")), u = r("useMinifiedProductAttribution")(), _;
        i[0] !== s || i[1] !== u || i[2] !== a ? (_ = function() {
            return a === "comet_mega_menu" || a === "comet_mega_menu_recent" ? o("CometProductAttribution").getMinifiedTopMostRouteProductAttribution(s) : u
        }
        ,
        i[0] = s,
        i[1] = u,
        i[2] = a,
        i[3] = _) : _ = i[3];
        var f = _, g;
        i[4] !== f || i[5] !== t || i[6] !== n || i[7] !== a || i[8] !== e ? (g = function(o, i) {
            var r = i.getTime();
            if (r - l.current >= p && e != null) {
                l.current = r;
                var s = t == null ? void 0 : t.toString()
                  , u = n == null ? void 0 : n.toString();
                o.log(function() {
                    return {
                        interface_override: "comet_www",
                        item_rank: s,
                        pa: f(),
                        shortcut_count: u,
                        surface: a,
                        tracking_data: e
                    }
                })
            }
        }
        ,
        i[4] = f,
        i[5] = t,
        i[6] = n,
        i[7] = a,
        i[8] = e,
        i[9] = g) : g = i[9];
        var h = g;
        return r("useFullViewImpressionLogger")(m, h)
    }
    l.default = _
}
), 98);