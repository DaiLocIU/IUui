__d("CometScrollView.react", ["BaseScrollableArea.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["ref"], s, u = s || (s = o("react")), c = {
        root: {
            position: "x1n2onr6",
            willChange: "xq1qtft",
            $$css: !0
        }
    };
    function d(t) {
        var n = o("react-compiler-runtime").c(23), a, i;
        n[0] !== t ? (a = t.ref,
        i = babelHelpers.objectWithoutPropertiesLoose(t, e),
        n[0] = t,
        n[1] = a,
        n[2] = i) : (a = n[1],
        i = n[2]);
        var l = i, s = l["aria-label"], d = l.children, m = l["data-testid"], p = l.focusable, _ = l.hasScrollChaining, f = l.hideScrollbar, g = l.onScroll, h = l.onScrollBottom, y = l.onScrollTop, C = l.showsHorizontalScrollIndicator, b = l.showsVerticalScrollIndicator, v = l.withBottomShadow, S = l.withTopShadow, R = l.xstyle, L = p === void 0 ? !1 : p, E = f === void 0 ? !1 : f, k = C === void 0 ? !0 : C, I = b === void 0 ? !0 : b, T = v === void 0 ? !1 : v, D = S === void 0 ? !1 : S, x = R === void 0 ? null : R, $;
        n[3] !== s || n[4] !== L ? ($ = L && s != null ? {
            "aria-label": s,
            tabIndex: 0
        } : {},
        n[3] = s,
        n[4] = L,
        n[5] = $) : $ = n[5];
        var P = $, N;
        n[6] !== x ? (N = [c.root, x],
        n[6] = x,
        n[7] = N) : N = n[7];
        var M;
        return n[8] !== d || n[9] !== P || n[10] !== a || n[11] !== _ || n[12] !== E || n[13] !== g || n[14] !== h || n[15] !== y || n[16] !== k || n[17] !== I || n[18] !== N || n[19] !== m || n[20] !== T || n[21] !== D ? (M = u.jsx(r("BaseScrollableArea.react"), babelHelpers.extends({}, P, {
            expanding: !0,
            hasScrollChaining: _,
            hideScrollbar: E,
            horizontal: k,
            onScroll: g,
            onScrollBottom: h,
            onScrollTop: y,
            ref: a,
            testid: void 0,
            vertical: I,
            withBottomShadow: T,
            withTopShadow: D,
            xstyle: N,
            children: d
        })),
        n[8] = d,
        n[9] = P,
        n[10] = a,
        n[11] = _,
        n[12] = E,
        n[13] = g,
        n[14] = h,
        n[15] = y,
        n[16] = k,
        n[17] = I,
        n[18] = N,
        n[19] = m,
        n[20] = T,
        n[21] = D,
        n[22] = M) : M = n[22],
        M
    }
    l.default = d
}
), 98);