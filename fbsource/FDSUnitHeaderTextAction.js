__d("FDSUnitHeaderTextAction.react", ["CometPressable.react", "FDSIcon.react", "FDSText.react", "FDSUnitHeaderConstants", "FDSUnitHeaderHierarchyLevelContext", "MetaConfig", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["disabled", "icon", "label", "linkProps", "numberOfLines", "onFocusVisibleChange", "onHoverIn", "onHoverOut", "onPress", "onPressIn", "onPressOut", "ref", "testid", "testOnly_actionPressed", "truncationTooltip"], s, u = s || (s = o("react")), c = s.use, d = r("MetaConfig")._("338"), m = {
        root: {
            alignItems: "x6s0dn4",
            columnGap: "x17zd0t2",
            display: "x78zum5",
            paddingTop: "xexx8yu",
            paddingInlineEnd: "xyri2b",
            paddingBottom: "x18d9i69",
            paddingInlineStart: "x1c1uobl",
            $$css: !0
        }
    };
    function p(t) {
        var n = o("react-compiler-runtime").c(42), a, i, l, s, p, _, f, g, h, y, C, b, v, S, R, L;
        n[0] !== t ? (v = t.disabled,
        i = t.icon,
        l = t.label,
        s = t.linkProps,
        p = t.numberOfLines,
        _ = t.onFocusVisibleChange,
        f = t.onHoverIn,
        g = t.onHoverOut,
        h = t.onPress,
        y = t.onPressIn,
        C = t.onPressOut,
        b = t.ref,
        R = t.testid,
        S = t.testOnly_actionPressed,
        L = t.truncationTooltip,
        a = babelHelpers.objectWithoutPropertiesLoose(t, e),
        n[0] = t,
        n[1] = a,
        n[2] = i,
        n[3] = l,
        n[4] = s,
        n[5] = p,
        n[6] = _,
        n[7] = f,
        n[8] = g,
        n[9] = h,
        n[10] = y,
        n[11] = C,
        n[12] = b,
        n[13] = v,
        n[14] = S,
        n[15] = R,
        n[16] = L) : (a = n[1],
        i = n[2],
        l = n[3],
        s = n[4],
        p = n[5],
        _ = n[6],
        f = n[7],
        g = n[8],
        h = n[9],
        y = n[10],
        C = n[11],
        b = n[12],
        v = n[13],
        S = n[14],
        R = n[15],
        L = n[16]);
        var E = v === void 0 ? !1 : v, k = c(r("FDSUnitHeaderHierarchyLevelContext")), I = E ? "disabled" : "blueLink", T = d ? E : void 0, D = d ? void 0 : E, x = d && E ? void 0 : h, $ = d && E ? void 0 : y, P = d && E ? void 0 : C, N = S != null ? S : !1, M;
        n[17] !== I || n[18] !== i ? (M = i != null && u.jsx(r("FDSIcon.react"), {
            color: I,
            icon: i,
            isDecorative: !0,
            size: 16
        }),
        n[17] = I,
        n[18] = i,
        n[19] = M) : M = n[19];
        var w = k === 2 ? "body2" : "body3", A;
        n[20] !== I || n[21] !== l || n[22] !== p || n[23] !== w || n[24] !== L ? (A = u.jsx(r("FDSText.react"), {
            color: I,
            numberOfLines: p,
            truncationTooltip: L,
            type: w,
            children: l
        }),
        n[20] = I,
        n[21] = l,
        n[22] = p,
        n[23] = w,
        n[24] = L,
        n[25] = A) : A = n[25];
        var F;
        return n[26] !== a || n[27] !== s || n[28] !== _ || n[29] !== f || n[30] !== g || n[31] !== b || n[32] !== A || n[33] !== T || n[34] !== D || n[35] !== x || n[36] !== $ || n[37] !== P || n[38] !== N || n[39] !== M || n[40] !== R ? (F = u.jsxs(r("CometPressable.react"), babelHelpers.extends({}, a, {
            "aria-disabled": T,
            disabled: D,
            linkProps: s,
            onFocusVisibleChange: _,
            onHoverIn: f,
            onHoverOut: g,
            onPress: x,
            onPressIn: $,
            onPressOut: P,
            overlayOffset: o("FDSUnitHeaderConstants").ACTION_TEXT_OVERLAY_OFFSET,
            overlayRadius: o("FDSUnitHeaderConstants").ACTION_TEXT_OVERLAY_RADIUS,
            ref: b,
            testOnly_pressed: N,
            testid: void 0,
            xstyle: m.root,
            children: [M, A]
        })),
        n[26] = a,
        n[27] = s,
        n[28] = _,
        n[29] = f,
        n[30] = g,
        n[31] = b,
        n[32] = A,
        n[33] = T,
        n[34] = D,
        n[35] = x,
        n[36] = $,
        n[37] = P,
        n[38] = N,
        n[39] = M,
        n[40] = R,
        n[41] = F) : F = n[41],
        F
    }
    l.default = p
}
), 98);