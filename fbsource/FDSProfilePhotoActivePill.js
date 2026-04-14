__d("FDSProfilePhotoActivePill.react", ["CometPressableChildrenWithOverlay_DEPRECATED.react", "CometPressableOverlay.react", "gkx", "react", "react-compiler-runtime", "stylex"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u = s || (s = o("react")), c = {
        badge: {
            borderStartStartRadius: "x12l2aii",
            borderStartEndRadius: "x1mbk4o",
            borderEndEndRadius: "x14vvt0a",
            borderEndStartRadius: "x1w3ol1v",
            borderTopStyle: "x13fuv20",
            borderInlineEndStyle: "x18b5jzi",
            borderBottomStyle: "x1q0q8m5",
            borderInlineStartStyle: "x1t7ytsu",
            borderTopWidth: "xamhcws",
            borderInlineEndWidth: "x1alpsbp",
            borderBottomWidth: "xlxy82",
            borderInlineStartWidth: "xyumdvf",
            boxSizing: "x9f619",
            display: "x78zum5",
            fontWeight: "x117nqv4",
            justifyContent: "xl56j7k",
            marginTop: "x1kgmq87",
            marginInlineEnd: "x11lt19s",
            marginBottom: "xmgb6t1",
            marginInlineStart: "xe9ewy2",
            paddingInlineStart: "xyiysdx",
            paddingInlineEnd: "x14vy60q",
            $$css: !0
        },
        badgeBackground: {
            backgroundColor: "x4cor85",
            $$css: !0
        },
        badgeBackground_DEPRECATED: {
            backgroundColor: "xbb192p",
            $$css: !0
        }
    }, d = {
        "card-background": {
            borderTopColor: "x6zyg47",
            borderInlineEndColor: "x1lu4ftm",
            borderBottomColor: "xpn8fn3",
            borderInlineStartColor: "x114g2xr",
            $$css: !0
        },
        "secondary-button-background-floating": {
            borderTopColor: "x1bmsi4x",
            borderInlineEndColor: "x146t3o",
            borderBottomColor: "x17j0sh5",
            borderInlineStartColor: "x18r8ynu",
            $$css: !0
        },
        "web-wash": {
            borderTopColor: "x1516sgx",
            borderInlineEndColor: "x1xachar",
            borderBottomColor: "x1khxuxv",
            borderInlineStartColor: "x1lkg39s",
            $$css: !0
        }
    };
    function m(t) {
        var n = o("react-compiler-runtime").c(17), a = t["aria-label"], i = t.border, l = t.children, s = t.pressed, m = i === void 0 ? "card-background" : i, p;
        n[0] === Symbol.for("react.memo_cache_sentinel") ? (p = {
            className: "x78zum5 xl56j7k x193iq5w"
        },
        n[0] = p) : p = n[0];
        var _;
        n[1] !== s ? (_ = u.jsx(r("CometPressableOverlay.react"), {
            pressed: s,
            radius: 7
        }),
        n[1] = s,
        n[2] = _) : _ = n[2];
        var f;
        n[3] !== m ? (f = (e || (e = r("stylex"))).props(c.badge, d[m], r("gkx")("6275") || r("gkx")("23219") ? c.badgeBackground : c.badgeBackground_DEPRECATED),
        n[3] = m,
        n[4] = f) : f = n[4];
        var g;
        n[5] === Symbol.for("react.memo_cache_sentinel") ? (g = {
            0: {
                className: "x190qgfh x132q4wb xuxw1ft x6u5lvz"
            },
            1: {
                className: "x190qgfh x132q4wb xuxw1ft x31nisg"
            }
        }[!!(r("gkx")("6275") || r("gkx")("23219")) << 0],
        n[5] = g) : g = n[5];
        var h;
        n[6] !== l ? (h = u.jsx("span", babelHelpers.extends({}, g, {
            children: l
        })),
        n[6] = l,
        n[7] = h) : h = n[7];
        var y;
        n[8] !== f || n[9] !== h ? (y = u.jsx("div", babelHelpers.extends({}, f, {
            children: h
        })),
        n[8] = f,
        n[9] = h,
        n[10] = y) : y = n[10];
        var C;
        n[11] !== _ || n[12] !== y ? (C = u.jsx(r("CometPressableChildrenWithOverlay_DEPRECATED.react"), {
            overlay: _,
            children: y
        }),
        n[11] = _,
        n[12] = y,
        n[13] = C) : C = n[13];
        var b;
        return n[14] !== a || n[15] !== C ? (b = u.jsx("div", babelHelpers.extends({}, p, {
            "aria-label": a,
            children: C
        })),
        n[14] = a,
        n[15] = C,
        n[16] = b) : b = n[16],
        b
    }
    l.default = m
}
), 98);