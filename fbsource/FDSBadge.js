__d("FDSBadge.react", ["BaseStyledBadge.react", "getFDSBadgeColorStyle", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["border", "color", "colorOverride", "isProfileBadge", "wide", "children", "size"], s, u = s || (s = o("react")), c = {
        borderDark: {
            borderTopColor: "x1o7swki",
            borderInlineEndColor: "xqm0i37",
            borderBottomColor: "x1bkzgmd",
            borderInlineStartColor: "x1r0oq8m",
            $$css: !0
        },
        borderWhite: {
            borderTopColor: "x6zyg47",
            borderInlineEndColor: "x1lu4ftm",
            borderBottomColor: "xpn8fn3",
            borderInlineStartColor: "x114g2xr",
            $$css: !0
        },
        isNoneProfileBadge: {
            marginInlineEnd: "x1xegmmw",
            $$css: !0
        }
    }, d = {
        6: {
            marginInlineStart: "x7phf20",
            width: "x1wc42o8",
            $$css: !0
        },
        7: {
            marginInlineStart: "x1au3fm6",
            width: "xaw7vzs",
            $$css: !0
        },
        8: {
            marginInlineStart: "xdwrcjd",
            width: "xsmyaan",
            $$css: !0
        },
        9: {
            marginInlineStart: "x8sq2zk",
            width: "x197psvt",
            $$css: !0
        },
        10: {
            marginInlineStart: "xpcyujq",
            width: "x1a00udw",
            $$css: !0
        },
        12: {
            marginInlineStart: "xdzw4kq",
            width: "x1xp8n7a",
            $$css: !0
        },
        14: {
            marginInlineStart: "x13k8ehh",
            width: "x1kl0l3y",
            $$css: !0
        },
        15: {
            marginInlineStart: "xkqj5e5",
            width: "xpcibvc",
            $$css: !0
        },
        18: {
            marginInlineStart: "x1y3qizg",
            width: "xo7uitg",
            $$css: !0
        },
        20: {
            marginInlineStart: "x1hm9lzh",
            width: "x1849jeq",
            $$css: !0
        },
        22: {
            marginInlineStart: "x1az2cgm",
            width: "x1npj6m0",
            $$css: !0
        },
        24: {
            marginInlineStart: "x1diwwjn",
            width: "x14qfxbe",
            $$css: !0
        },
        32: {
            marginInlineStart: "xyqm7xq",
            width: "x1useyqa",
            $$css: !0
        },
        41: {
            marginInlineStart: "x1jszwkp",
            width: "x1yaf2ey",
            $$css: !0
        }
    }, m = {
        6: {
            marginInlineStart: "xdzw4kq",
            width: "xsmyaan",
            $$css: !0
        },
        7: {
            marginInlineStart: "x13k8ehh",
            width: "x6jxa94",
            $$css: !0
        },
        8: {
            marginInlineStart: "x13fj5qh",
            width: "x1kky2od",
            $$css: !0
        },
        9: {
            marginInlineStart: "x1y3qizg",
            width: "x1xp8n7a",
            $$css: !0
        },
        10: {
            marginInlineStart: "x1hm9lzh",
            width: "xw4jnvo",
            $$css: !0
        },
        12: {
            marginInlineStart: "x1diwwjn",
            width: "xvy4d1p",
            $$css: !0
        },
        14: {
            marginInlineStart: "xcev3uh",
            width: "xgd8bvy",
            $$css: !0
        },
        15: {
            marginInlineStart: "xx6jrq6",
            width: "x1849jeq",
            $$css: !0
        },
        18: {
            marginInlineStart: "xnkmj2t",
            width: "x14qfxbe",
            $$css: !0
        },
        20: {
            marginInlineStart: "xqsn43r",
            width: "x100vrsf",
            $$css: !0
        },
        22: {
            marginInlineStart: "xnzr9dm",
            width: "x187nhsf",
            $$css: !0
        },
        24: {
            marginInlineStart: "xefazk8",
            width: "x1useyqa",
            $$css: !0
        },
        32: {
            marginInlineStart: "xvc51xn",
            width: "x1fu8urw",
            $$css: !0
        },
        41: {
            marginInlineStart: "x1ka8sna",
            width: "x1pigqs1",
            $$css: !0
        }
    };
    function p(t) {
        var n = o("react-compiler-runtime").c(25), a, i, l, s, p, _, f, g;
        n[0] !== t ? (s = t.border,
        p = t.color,
        i = t.colorOverride,
        _ = t.isProfileBadge,
        f = t.wide,
        a = t.children,
        g = t.size,
        l = babelHelpers.objectWithoutPropertiesLoose(t, e),
        n[0] = t,
        n[1] = a,
        n[2] = i,
        n[3] = l,
        n[4] = s,
        n[5] = p,
        n[6] = _,
        n[7] = f,
        n[8] = g) : (a = n[1],
        i = n[2],
        l = n[3],
        s = n[4],
        p = n[5],
        _ = n[6],
        f = n[7],
        g = n[8]);
        var h = s === void 0 ? "none" : s, y = p === void 0 ? "blue" : p, C = _ === void 0 ? !1 : _, b = f === void 0 ? "normal" : f, v = g === void 0 ? 8 : g, S = h !== "none", R;
        n[9] !== y || n[10] !== i ? (R = i != null ? i : r("getFDSBadgeColorStyle")(y),
        n[9] = y,
        n[10] = i,
        n[11] = R) : R = n[11];
        var L = !C && c.isNoneProfileBadge, E = h === "white" && c.borderWhite, k = h === "dark" && c.borderDark, I = b === "wide" && d[v], T = b === "extraWide" && m[v], D;
        n[12] !== k || n[13] !== I || n[14] !== T || n[15] !== L || n[16] !== E ? (D = [L, E, k, I, T],
        n[12] = k,
        n[13] = I,
        n[14] = T,
        n[15] = L,
        n[16] = E,
        n[17] = D) : D = n[17];
        var x;
        return n[18] !== a || n[19] !== l || n[20] !== v || n[21] !== D || n[22] !== S || n[23] !== R ? (x = u.jsx(r("BaseStyledBadge.react"), babelHelpers.extends({}, l, {
            border: S,
            colorXStyle: R,
            size: v,
            xstyle: D,
            children: a
        })),
        n[18] = a,
        n[19] = l,
        n[20] = v,
        n[21] = D,
        n[22] = S,
        n[23] = R,
        n[24] = x) : x = n[24],
        x
    }
    l.default = p
}
), 98);