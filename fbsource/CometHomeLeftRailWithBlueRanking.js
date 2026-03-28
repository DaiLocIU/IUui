__d("CometHomeLeftRailWithBlueRanking.react", ["fbt", "CometFolderBookmarkListItem.react", "CometHomeLeftRailWithBlueRankingRefetchSection.react", "CometHomeLeftRailWithBlueRanking_viewer.graphql", "CometLegalFooter.react", "CometPlaceholder.react", "CometProductAttributionContextProvider.react", "CometRelay", "CometVisualCompletionAttributes", "FDSListCellGlimmer.react", "gkx", "react", "react-compiler-runtime", "useCometHomeModernizationGating"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u, c = u || (u = o("react"));
    function d(e, t, n) {
        var r = e != null ? e : 5
          , o = t != null ? Math.max(t - r, n) : n;
        return {
            exploreCount: o,
            shortcutCount: r
        }
    }
    function m(t) {
        var a, l, u, m, p, _, f, g, h, y, C, b, v = o("react-compiler-runtime").c(44), S = t.viewer, R = o("CometRelay").useFragment(e !== void 0 ? e : e = n("CometHomeLeftRailWithBlueRanking_viewer.graphql"), S), L;
        v[0] === Symbol.for("react.memo_cache_sentinel") ? (L = o("useCometHomeModernizationGating").getShouldEnableSimplifiedSidebarIcons(),
        v[0] = L) : L = v[0];
        var E = L, k = R == null || (a = R.comet_classic_identity) == null || (a = a.bookmarks) == null ? void 0 : a.edges, I = R == null || (l = R.shortcut_bookmarks) == null || (l = l.shortcut_bookmark) == null ? void 0 : l.count, T;
        v[1] !== k || v[2] !== I ? (T = k == null ? [] : k.map(function(e) {
            var t = e.node;
            if (!t || t.has_user_hidden === !0)
                return null;
            var n = t.id;
            return c.jsx(r("CometFolderBookmarkListItem.react"), {
                badgeStyle: "dot",
                bookmark: t,
                index: 0,
                totalShortcutCount: I != null ? I : void 0,
                useNucleusIcon: E
            }, n)
        }).filter(Boolean),
        v[1] = k,
        v[2] = I,
        v[3] = T) : T = v[3];
        var D = T, x = null, $ = null, P = null, N = R == null ? void 0 : R.shortcut_bookmarks, M = R == null ? void 0 : R.explore_bookmarks, w = R == null ? void 0 : R.professional_tools, A, F, O, B = 5;
        if ((w == null || (u = w.professional_bookmark) == null ? void 0 : u.edges.length) != null && (w == null || (m = w.professional_bookmark) == null ? void 0 : m.edges.length) > 0)
            B = 3;
        else {
            var W = !r("gkx")("11489");
            W && (B = 7)
        }
        var q = N == null || (p = N.shortcut_bookmark) == null ? void 0 : p.edges.length, U = M == null || (_ = M.explore_bookmark) == null ? void 0 : _.edges.length, V;
        v[4] !== B || v[5] !== q || v[6] !== U ? (V = d(q, U, B),
        v[4] = B,
        v[5] = q,
        v[6] = U,
        v[7] = V) : V = v[7],
        O = V,
        A = O.exploreCount,
        F = O.shortcutCount;
        var H = 0
          , G = w != null && (w == null || (f = w.professional_bookmark) == null ? void 0 : f.edges.length) != null && (w == null || (g = w.professional_bookmark) == null ? void 0 : g.edges.length) > 0;
        if (G && w != null) {
            var z, j;
            v[8] === Symbol.for("react.memo_cache_sentinel") ? (j = c.jsx(r("FDSListCellGlimmer.react"), {
                imageSize: 36,
                imageStyle: "roundedRect",
                numberOfItems: 4
            }, "shortcut_glimmer"),
            v[8] = j) : j = v[8];
            var K = w == null || (z = w.professional_bookmark) == null ? void 0 : z.edges.length, Q = A !== 0, X;
            v[9] !== D || v[10] !== w || v[11] !== K || v[12] !== Q || v[13] !== I ? (X = c.jsx(r("CometPlaceholder.react"), {
                fallback: j,
                name: i.id,
                children: c.jsx(r("CometHomeLeftRailWithBlueRankingRefetchSection.react"), {
                    badgeStyle: "string",
                    folderBookmark: w,
                    identityItems: D,
                    initialCount: K,
                    section: "professional_tools",
                    sectionIndex: 0,
                    totalShortcutCount: I,
                    useNucleusIcon: E,
                    withSeparator: Q
                })
            }),
            v[9] = D,
            v[10] = w,
            v[11] = K,
            v[12] = Q,
            v[13] = I,
            v[14] = X) : X = v[14],
            P = X,
            H++
        }
        if (M != null && (M == null || (h = M.explore_bookmark) == null || (h = h.edges) == null ? void 0 : h.length) != null && (M == null || (y = M.explore_bookmark) == null || (y = y.edges) == null ? void 0 : y.length) > 0) {
            var Y;
            v[15] === Symbol.for("react.memo_cache_sentinel") ? (Y = c.jsx(r("FDSListCellGlimmer.react"), {
                imageSize: 36,
                imageStyle: "roundedRect",
                numberOfItems: 4
            }, "shortcut_glimmer"),
            v[15] = Y) : Y = v[15];
            var J;
            v[16] !== G ? (J = G ? s._(/*BTDS*/
            "Suggested") : void 0,
            v[16] = G,
            v[17] = J) : J = v[17];
            var Z = F !== 0, ee;
            v[18] !== M || v[19] !== D || v[20] !== A || v[21] !== H || v[22] !== J || v[23] !== Z || v[24] !== I ? (ee = c.jsx(r("CometPlaceholder.react"), {
                fallback: Y,
                name: i.id,
                children: c.jsx(r("CometHomeLeftRailWithBlueRankingRefetchSection.react"), {
                    badgeStyle: "string",
                    folderBookmark: M,
                    identityItems: D,
                    initialCount: A,
                    section: "explore",
                    sectionHeader: J,
                    sectionIndex: H,
                    totalShortcutCount: I,
                    useNucleusIcon: E,
                    withSeparator: Z
                })
            }),
            v[18] = M,
            v[19] = D,
            v[20] = A,
            v[21] = H,
            v[22] = J,
            v[23] = Z,
            v[24] = I,
            v[25] = ee) : ee = v[25],
            $ = ee,
            H++
        }
        if (N != null && (N == null || (C = N.shortcut_bookmark) == null || (C = C.edges) == null ? void 0 : C.length) != null && (N == null || (b = N.shortcut_bookmark) == null || (b = b.edges) == null ? void 0 : b.length) > 0) {
            var te;
            v[26] === Symbol.for("react.memo_cache_sentinel") ? (te = c.jsx(r("FDSListCellGlimmer.react"), {
                imageSize: 36,
                imageStyle: "roundedRect",
                numberOfItems: 4
            }, "shortcut_glimmer"),
            v[26] = te) : te = v[26];
            var ne;
            v[27] === Symbol.for("react.memo_cache_sentinel") ? (ne = s._(/*BTDS*/
            "Your shortcuts"),
            v[27] = ne) : ne = v[27];
            var re;
            v[28] !== F || v[29] !== H || v[30] !== N || v[31] !== I ? (re = c.jsx(r("CometPlaceholder.react"), {
                fallback: te,
                name: i.id,
                children: c.jsx(r("CometHomeLeftRailWithBlueRankingRefetchSection.react"), {
                    badgeStyle: "string",
                    folderBookmark: N,
                    initialCount: F,
                    section: "shortcuts",
                    sectionHeader: ne,
                    sectionIndex: H,
                    totalShortcutCount: I,
                    useNucleusIcon: E,
                    withSeparator: !1
                })
            }),
            v[28] = F,
            v[29] = H,
            v[30] = N,
            v[31] = I,
            v[32] = re) : re = v[32],
            x = re
        }
        var oe;
        v[33] === Symbol.for("react.memo_cache_sentinel") ? (oe = "x78zum5 xdt5ytf x1iyjqo2 x1us19tq",
        v[33] = oe) : oe = v[33];
        var ae;
        v[34] === Symbol.for("react.memo_cache_sentinel") ? (ae = {
            className: "x1iyjqo2"
        },
        v[34] = ae) : ae = v[34];
        var ie;
        v[35] !== x ? (ie = x && c.jsx(r("CometProductAttributionContextProvider.react"), {
            value: "shortcuts",
            children: x
        }),
        v[35] = x,
        v[36] = ie) : ie = v[36];
        var le;
        v[37] !== $ || v[38] !== P || v[39] !== ie ? (le = c.jsx(r("CometProductAttributionContextProvider.react"), {
            value: "bookmarks",
            children: c.jsxs("div", babelHelpers.extends({}, ae, {
                "data-testid": void 0,
                children: [P, $, ie]
            }))
        }),
        v[37] = $,
        v[38] = P,
        v[39] = ie,
        v[40] = le) : le = v[40];
        var se;
        v[41] === Symbol.for("react.memo_cache_sentinel") ? (se = c.jsx("div", {
            className: "x2lah0s xyamay9 xv54qhq x1l90r2v xf7dkkf",
            children: c.jsx(r("CometLegalFooter.react"), {})
        }),
        v[41] = se) : se = v[41];
        var ue;
        return v[42] !== le ? (ue = c.jsxs("div", babelHelpers.extends({
            className: oe
        }, r("CometVisualCompletionAttributes").IGNORE_DYNAMIC, {
            children: [le, se]
        })),
        v[42] = le,
        v[43] = ue) : ue = v[43],
        ue
    }
    l.default = m
}
), 226);