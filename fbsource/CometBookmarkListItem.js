__d("CometBookmarkListItem.react", ["FDSListCellPressable.react", "FDSTextPairing.react", "XPlatReactEnvironment", "react", "react-compiler-runtime", "react-strict-dom", "requireDeferred", "useBookmarkFalcoFullViewLogger", "useMergeRefs", "useMinifiedProductAttribution"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = r("requireDeferred")("WebBookmarkClickFalcoEvent").__setRef("CometBookmarkListItem.react");
    function c(e) {
        var t = o("react-compiler-runtime").c(27), n = e.addOnEnd, a = e.addOnStart, i = e.bookmarkSection, l = e.id, c = e.index, d = e.linkProps, m = e.meta, p = e.metaColor, _ = e.metaLineLimit, f = e.name, g = e.onHoverIn, h = e.onHoverOut, y = e.onPress, C = e.ref, b = e.selected, v = e.testid, S = e.totalShortcutCount, R = e.tracking, L = v === void 0 ? "" : v, E = R === void 0 ? null : R, k = r("useMinifiedProductAttribution")(), I;
        t[0] !== c || t[1] !== y || t[2] !== k || t[3] !== S || t[4] !== E ? (I = function(t) {
            y && y(t),
            u.onReady(function(e) {
                var t = c == null ? void 0 : c.toString()
                  , n = S == null ? void 0 : S.toString();
                e.log(function() {
                    return {
                        interface_override: "comet_www",
                        item_rank: t,
                        pa: k,
                        shortcut_count: n,
                        surface: "comet_lhc",
                        tracking_data: E
                    }
                })
            })
        }
        ,
        t[0] = c,
        t[1] = y,
        t[2] = k,
        t[3] = S,
        t[4] = E,
        t[5] = I) : I = t[5];
        var T = I
          , D = r("useBookmarkFalcoFullViewLogger")(E, c, S, "comet_lhc")
          , x = r("useMergeRefs")(C, D);
        if (a == null)
            return null;
        var $ = i != null ? i + "_" : "", P = $ + "bookmark_item" + (c != null ? "_" + c.toString() : ""), N;
        t[6] !== m || t[7] !== p || t[8] !== _ || t[9] !== f ? (N = s.jsx(r("FDSTextPairing.react"), {
            headline: f,
            headlineLineLimit: o("XPlatReactEnvironment").isWeb() ? 2 : 1,
            level: 4,
            meta: m,
            metaColor: p,
            metaLineLimit: _,
            reduceEmphasis: !0
        }),
        t[6] = m,
        t[7] = p,
        t[8] = _,
        t[9] = f,
        t[10] = N) : N = t[10];
        var M;
        t[11] === Symbol.for("react.memo_cache_sentinel") ? (M = o("XPlatReactEnvironment").isWeb() ? {
            paddingHorizontal: 8,
            paddingVertical: 8
        } : {
            contentPaddingHorizontal: 12,
            paddingHorizontal: 0,
            paddingVertical: 0,
            spacingVertical: 0
        },
        t[11] = M) : M = t[11];
        var w;
        t[12] !== n || t[13] !== a || t[14] !== T || t[15] !== d || t[16] !== x || t[17] !== g || t[18] !== h || t[19] !== b || t[20] !== N || t[21] !== L ? (w = s.jsx(r("FDSListCellPressable.react"), babelHelpers.extends({
            addOnEnd: n,
            addOnStart: a,
            addOnStartMarginTop: 0,
            addOnStartVerticalAlign: "center",
            content: N,
            linkProps: d,
            onHoverIn: g,
            onHoverOut: h,
            onPress: T,
            ref: x,
            selected: b,
            testid: void 0
        }, M)),
        t[12] = n,
        t[13] = a,
        t[14] = T,
        t[15] = d,
        t[16] = x,
        t[17] = g,
        t[18] = h,
        t[19] = b,
        t[20] = N,
        t[21] = L,
        t[22] = w) : w = t[22];
        var A;
        return t[23] !== l || t[24] !== P || t[25] !== w ? (A = s.jsx(o("react-strict-dom").html.li, {
            "data-testid": void 0,
            children: w
        }, l),
        t[23] = l,
        t[24] = P,
        t[25] = w,
        t[26] = A) : A = t[26],
        A
    }
    l.default = c
}
), 98);