__d("FDSProfilePhotoContent.react", ["BaseSvgImage.react", "CometImage.react", "CometSSRReplaceContentOnHydrationAndBreakEventReplaying.react", "CometVisualCompletionAttributes", "FDSLoadingAnimation.react", "FDSProfilePhotoAddOn.react", "FDSProfilePhotoNotificationBadge.react", "getBadgePosition", "gkx", "profilePhotoUtils", "react", "react-compiler-runtime", "stylex", "useSetAttributeRef"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u = s || (s = o("react")), c = s.useId, d = {
        photo: {
            verticalAlign: "x3ajldb",
            $$css: !0
        },
        photoCircle: {
            borderStartStartRadius: "x1c9tyrk",
            borderStartEndRadius: "xeusxvb",
            borderEndEndRadius: "x1pahc9y",
            borderEndStartRadius: "x1ertn4p",
            $$css: !0
        },
        photoRoundedRect: {
            borderStartStartRadius: "x1obq294",
            borderStartEndRadius: "x5a5i1n",
            borderEndEndRadius: "xde0f50",
            borderEndStartRadius: "x15x8krk",
            $$css: !0
        },
        photoRoundedRectLarge: {
            borderStartStartRadius: "xbjudin",
            borderStartEndRadius: "xnlwouz",
            borderEndEndRadius: "xpp8er5",
            borderEndStartRadius: "xs9wviy",
            $$css: !0
        },
        storyRingBlue: {
            stroke: "xauuydb",
            $$css: !0
        },
        storyRingBlueLegacy: {
            stroke: "x1p5r69i",
            $$css: !0
        },
        storyRingGray: {
            stroke: "xgzcv5c",
            $$css: !0
        },
        storyRingGrayLegacy: {
            stroke: "x1tbtn3x",
            $$css: !0
        },
        storyRingGreen: {
            stroke: "x1bqms5s",
            $$css: !0
        },
        storyRingRed: {
            stroke: "x1t6d43z",
            $$css: !0
        },
        storyRingSize2: {
            strokeWidth: "xvlca1e",
            $$css: !0
        },
        storyRingSize3: {
            strokeWidth: "xqjr0vm",
            $$css: !0
        },
        storyRingSize4: {
            strokeWidth: "x17ld789",
            $$css: !0
        }
    }, m = function(t) {
        return t === "circle" ? "50%" : t === "roundedRect" ? 8 : t === "roundedRectLarge" ? 16 : 0
    };
    function p(t) {
        var n = o("react-compiler-runtime").c(73), a = t.addOn, i = t.addOnTopEnd, l = t.alt, s = t.children, p = t.forwardRef, _ = t.hovered, f = t.isOverlapped, g = t.overlay, h = t.pressed, y = t.profileVideo, C = t.shape, b = t.shouldShowCloseFriendsBadge, v = t.size, S = t.source, R = t.storyStatus, L = t.testid, E = c(), k = r("useSetAttributeRef")("id", E), I = "url(#" + E + ")", T = r("useSetAttributeRef")("mask", I), D = o("profilePhotoUtils").getStoryRingSize(v, R), x = v / 2, $;
        n[0] !== x ? ($ = o("getBadgePosition").getBadgePosition(x, !0),
        n[0] = x,
        n[1] = $) : $ = n[1];
        var P = $, N = a == null ? void 0 : a.type, M;
        n[2] !== v || n[3] !== N ? (M = o("profilePhotoUtils").getBadgeSizeAndStrokeWidth(v, N),
        n[2] = v,
        n[3] = N,
        n[4] = M) : M = n[4];
        var w = M, A = w[0], F = w[1], O = (a == null ? void 0 : a.type) === "lastActiveTimeBadge" && v > 28, B;
        n[5] !== v || n[6] !== O ? (B = O ? {} : o("getBadgePosition").getBadgePosition(v / 2, !1),
        n[5] = v,
        n[6] = O,
        n[7] = B) : B = n[7];
        var W = B, q;
        n[8] !== a || n[9] !== W || n[10] !== h || n[11] !== y || n[12] !== v || n[13] !== F || n[14] !== O ? (q = a != null ? u.jsx("div", babelHelpers.extends({
            className: {
                0: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo",
                4: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x1ey2m1c x78zum5 xtijo5x x1o0tod x13a6bvl",
                2: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x14ihvte",
                6: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x1ey2m1c x78zum5 xtijo5x x1o0tod x13a6bvl x14ihvte",
                1: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x1aoij9j x5eh17s x2e7n7m xk1cdbz x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu",
                5: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x1ey2m1c x78zum5 xtijo5x x1o0tod x13a6bvl x1aoij9j x5eh17s x2e7n7m xk1cdbz x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu",
                3: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x14ihvte x1aoij9j x5eh17s x2e7n7m xk1cdbz x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu",
                7: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo x1ey2m1c x78zum5 xtijo5x x1o0tod x13a6bvl x14ihvte x1aoij9j x5eh17s x2e7n7m xk1cdbz x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu"
            }[!!O << 2 | (v === 60 && a.type === "activityBadge") << 1 | (a.type === "activityBadge" && (y != null || a.withBorder === !0)) << 0]
        }, r("CometVisualCompletionAttributes").IGNORE, {
            style: babelHelpers.extends({}, W, {
                borderWidth: y != null ? F : void 0
            }),
            children: u.jsx(r("FDSProfilePhotoAddOn.react"), {
                addOn: a,
                pressed: h,
                size: v
            })
        })) : null,
        n[8] = a,
        n[9] = W,
        n[10] = h,
        n[11] = y,
        n[12] = v,
        n[13] = F,
        n[14] = O,
        n[15] = q) : q = n[15];
        var U = q, V;
        n[16] !== i || n[17] !== P ? (V = i != null ? u.jsx("div", {
            className: "x1c9tyrk xeusxvb x1pahc9y x1ertn4p x10l6tqk xhtitgo",
            "data-testid": void 0,
            style: babelHelpers.extends({}, P),
            children: u.jsx(r("FDSProfilePhotoNotificationBadge.react"), {
                number: i.number
            })
        }) : null,
        n[16] = i,
        n[17] = P,
        n[18] = V) : V = n[18];
        var H = V, G;
        n[19] !== l || n[20] !== D || n[21] !== C || n[22] !== v || n[23] !== S.uri ? (G = typeof S.uri == "string" ? u.jsx(r("BaseSvgImage.react"), {
            src: S.uri,
            style: {
                height: v - D * 4,
                width: v - D * 4
            },
            x: 2 * D,
            y: 2 * D
        }) : u.jsx(r("CometImage.react"), {
            alt: l,
            height: v - 4 * D,
            src: S.uri,
            testid: void 0,
            width: v - 4 * D,
            xstyle: [d.photo, C === "circle" && d.photoCircle, C === "roundedRect" && d.photoRoundedRect, C === "roundedRectLarge" && d.photoRoundedRectLarge]
        }),
        n[19] = l,
        n[20] = D,
        n[21] = C,
        n[22] = v,
        n[23] = S.uri,
        n[24] = G) : G = n[24];
        var z = G, j;
        n[25] !== C ? (j = m(C),
        n[25] = C,
        n[26] = j) : j = n[26];
        var K = j, Q;
        if (y != null) {
            var X = y.ProfileVideoSection, Y = y.profileVideoFragment, J = _ != null ? _ : !1, Z;
            n[27] !== X || n[28] !== z || n[29] !== Y || n[30] !== D || n[31] !== C || n[32] !== v || n[33] !== S.uri || n[34] !== J ? (Z = u.jsx(X, {
                hovered: J,
                image: z,
                profileVideo: Y,
                ringSize: D,
                shape: C,
                size: v,
                thumbnailUri: S.uri
            }),
            n[27] = X,
            n[28] = z,
            n[29] = Y,
            n[30] = D,
            n[31] = C,
            n[32] = v,
            n[33] = S.uri,
            n[34] = J,
            n[35] = Z) : Z = n[35],
            Q = Z
        }
        var ee;
        if (n[36] !== (a == null ? void 0 : a.backgroundColor) || n[37] !== (a == null ? void 0 : a.type) || n[38] !== i || n[39] !== l || n[40] !== U || n[41] !== W || n[42] !== H || n[43] !== P || n[44] !== A || n[45] !== K || n[46] !== T || n[47] !== z || n[48] !== f || n[49] !== I || n[50] !== E || n[51] !== k || n[52] !== h || n[53] !== Q || n[54] !== D || n[55] !== C || n[56] !== b || n[57] !== v || n[58] !== S.uri || n[59] !== R || n[60] !== F || n[61] !== L) {
            var te, ne, re, oe, ae, ie;
            ee = typeof S.uri == "string" ? u.jsxs("svg", babelHelpers.extends({
                "aria-hidden": l == null ? !0 : void 0,
                "aria-label": l,
                className: "x3ajldb"
            }, r("CometVisualCompletionAttributes").IGNORE_DYNAMIC, {
                "data-testid": void 0,
                role: l != null ? "img" : "none",
                style: {
                    height: v,
                    width: v
                },
                children: [u.jsxs("mask", {
                    id: E,
                    ref: k,
                    suppressHydrationWarning: !0,
                    children: [C === "circle" ? u.jsx("circle", {
                        cx: v / 2,
                        cy: v / 2,
                        fill: "white",
                        r: v / 2
                    }) : u.jsx("rect", {
                        cy: v / 2,
                        fill: "white",
                        height: v,
                        rx: K,
                        ry: K,
                        width: v,
                        x: 0,
                        y: 0
                    }), u.jsx(r("CometSSRReplaceContentOnHydrationAndBreakEventReplaying.react"), {
                        useSuspenseDirectlyForSVG: !0,
                        children: U != null && (a == null ? void 0 : a.type) !== "trigger" && (a == null ? void 0 : a.type) !== "lastActiveTimeBadge" && (a == null ? void 0 : a.backgroundColor) !== "none" && u.jsx("circle", babelHelpers.extends({
                            cx: (te = W.left) != null ? te : v - ((ne = W.right) != null ? ne : 0),
                            cy: (re = W.top) != null ? re : v - ((oe = W.bottom) != null ? oe : 0)
                        }, r("CometVisualCompletionAttributes").IGNORE, {
                            fill: "black",
                            r: Math.max((a == null ? void 0 : a.type) === "activityBadge" ? 8 : 0, A / 2 + F)
                        }))
                    }), H != null && i != null && i.type === "notificationBadge" && u.jsx("rect", {
                        height: 22,
                        rx: 11,
                        ry: 11,
                        width: i.number <= 9 ? 22 : i.number <= 99 ? 33 : 44,
                        x: P.left != null ? P.left - (i.number <= 9 ? 11 : i.number <= 99 ? 22 : 33) : v - ((ae = P.right) != null ? ae : 0) - 11,
                        y: P.top != null ? P.top - 11 : v - ((ie = P.bottom) != null ? ie : 0) - 11
                    }), R === "uploading" && (v === 36 || v === 40 || v === 60) ? u.jsx("circle", {
                        cx: v / 2,
                        cy: v / 2,
                        fill: "transparent",
                        r: v / 2 - 1 * D,
                        stroke: "black",
                        strokeWidth: D * 2
                    }) : R !== "none" && D > 0 && u.jsx("circle", {
                        cx: v / 2,
                        cy: v / 2,
                        fill: "transparent",
                        r: v / 2 - 1.5 * D,
                        stroke: "black",
                        strokeWidth: D
                    }), f === !0 && u.jsx("circle", {
                        cx: -v / 2 + 4,
                        cy: v / 2,
                        fill: "black",
                        r: v / 2 + 2
                    })]
                }), u.jsxs("g", {
                    mask: I,
                    ref: T,
                    suppressHydrationWarning: !0,
                    children: [Q != null ? Q : z, C === "circle" ? u.jsx("circle", babelHelpers.extends({}, {
                        0: {
                            className: "xbh8q5q x1pwv2dq xvlca1e"
                        },
                        1: {
                            className: "x1pwv2dq xvlca1e x1tgjyoi"
                        }
                    }[!!h << 0], {
                        cx: v / 2,
                        cy: v / 2,
                        r: v / 2
                    })) : u.jsx("rect", babelHelpers.extends({}, {
                        0: {
                            className: "xbh8q5q x1pwv2dq xvlca1e"
                        },
                        1: {
                            className: "x1pwv2dq xvlca1e x1tgjyoi"
                        }
                    }[!!h << 0], {
                        cy: v / 2,
                        fill: "white",
                        height: v,
                        rx: K,
                        ry: K,
                        width: v,
                        x: 0,
                        y: 0
                    })), R === "uploading" && (v === 36 || v === 40 || v === 60) ? null : R !== "none" && D > 0 && u.jsx("circle", babelHelpers.extends({}, (e || (e = r("stylex"))).props(R === "unseen" && (b === !0 ? d.storyRingGreen : r("gkx")("6275") ? d.storyRingBlue : d.storyRingBlueLegacy), R === "seen" && (r("gkx")("6275") ? d.storyRingGray : d.storyRingGrayLegacy), R === "live" && d.storyRingRed, D === 4 && d.storyRingSize4, D === 3 && d.storyRingSize3, D === 2 && d.storyRingSize2), {
                        cx: v / 2,
                        cy: v / 2,
                        fill: "transparent",
                        r: v / 2 - D / 2,
                        strokeWidth: D
                    }))]
                }), R === "uploading" && (v === 36 || v === 40 || v === 60) && u.jsx("g", {
                    style: {
                        transform: "scale(" + (v - Math.floor(v / 30)) / v + ")"
                    },
                    children: u.jsx(r("FDSLoadingAnimation.react"), {
                        size: v
                    })
                })]
            })) : z,
            n[36] = a == null ? void 0 : a.backgroundColor,
            n[37] = a == null ? void 0 : a.type,
            n[38] = i,
            n[39] = l,
            n[40] = U,
            n[41] = W,
            n[42] = H,
            n[43] = P,
            n[44] = A,
            n[45] = K,
            n[46] = T,
            n[47] = z,
            n[48] = f,
            n[49] = I,
            n[50] = E,
            n[51] = k,
            n[52] = h,
            n[53] = Q,
            n[54] = D,
            n[55] = C,
            n[56] = b,
            n[57] = v,
            n[58] = S.uri,
            n[59] = R,
            n[60] = F,
            n[61] = L,
            n[62] = ee
        } else
            ee = n[62];
        var le = ee, se;
        n[63] === Symbol.for("react.memo_cache_sentinel") ? (se = {
            className: "x1rg5ohu x1n2onr6 x3ajldb x1ja2u2z"
        },
        n[63] = se) : se = n[63];
        var ue;
        n[64] !== U ? (ue = u.jsx(r("CometSSRReplaceContentOnHydrationAndBreakEventReplaying.react"), {
            children: U
        }),
        n[64] = U,
        n[65] = ue) : ue = n[65];
        var ce;
        return n[66] !== H || n[67] !== s || n[68] !== p || n[69] !== g || n[70] !== le || n[71] !== ue ? (ce = u.jsxs("div", babelHelpers.extends({}, se, {
            ref: p,
            children: [le, s, g, ue, H]
        })),
        n[66] = H,
        n[67] = s,
        n[68] = p,
        n[69] = g,
        n[70] = le,
        n[71] = ue,
        n[72] = ce) : ce = n[72],
        ce
    }
    l.default = p
}
), 98);