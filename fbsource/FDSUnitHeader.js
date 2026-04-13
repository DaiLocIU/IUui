__d("FDSUnitHeader.react", ["BaseView.react", "CometColumn.react", "CometColumnItem.react", "CometFocusTableContext", "FDSIcon.react", "FDSPressable.react", "FDSText.react", "FDSTextPairing.react", "FDSUnitHeaderHierarchyLevelContextProvider", "IconSource", "SVGIcon", "react", "react-compiler-runtime", "react-strict-dom"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["action", "action_DEPRECATED", "actionAccessibilityLabel", "actionAddOn", "actionDisabled", "actionHidden", "actionIcon", "actionLabel", "actionLinkProps", "actionRef", "actiontestid", "actionWrapper", "addOn_DEPRECATED", "body", "bodyColor", "bodyLineLimit", "disabled", "hasTopDivider", "headline", "headlineColor", "headlineId", "iconColor", "iconSize", "isSemanticHeading", "level", "meta", "metaColor", "metaLocation", "metaTestID", "onActionHoverIn", "onActionHoverOut", "onActionPress", "onActionPressIn", "onActionPressOut", "paddingHorizontal", "paddingTop", "showActionOnHover", "testOnly_actionPressed", "testOnly_pressed", "useFocusCell"], s, u = s || (s = o("react")), c = s, d = c.useContext, m = c.useState, p = 8, _ = {
        action: {
            backgroundColor: null,
            borderTopStyle: "x1ejq31n",
            borderInlineEndStyle: "x18oe1m7",
            borderBottomStyle: "x1sy0etr",
            borderInlineStartStyle: "xstzfhl",
            display: "x1rg5ohu",
            marginTop: "xdj266r",
            marginInlineEnd: "x14z9mp",
            marginBottom: "xat24cr",
            marginInlineStart: "x1lziwak",
            paddingTop: "xexx8yu",
            paddingInlineEnd: "xyri2b",
            paddingBottom: "x18d9i69",
            paddingInlineStart: "x1c1uobl",
            position: "x1n2onr6",
            verticalAlign: "x3ajldb",
            $$css: !0
        },
        actionButton: {
            color: "x1fey0fg",
            cursor: "x1ypdohk",
            $$css: !0
        },
        actionHidden: {
            opacity: "xg01cxk",
            $$css: !0
        },
        hairline: {
            backgroundColor: "x14nfmen",
            height: "xjm9jq1",
            marginBottom: "x1jyxor1",
            $$css: !0
        },
        root: {
            paddingBottom: "xjkvuk6",
            $$css: !0
        },
        showActionOnHover: {
            visibility: "xlshs6z",
            "@media (pointer: coarse)_visibility": "xwtlbus",
            $$css: !0
        }
    }, f = {
        0: {
            paddingTop: "xexx8yu",
            $$css: !0
        },
        8: {
            paddingTop: "x1y1aw1k",
            $$css: !0
        },
        12: {
            paddingTop: "xz9dl7a",
            $$css: !0
        },
        16: {
            paddingTop: "xyamay9",
            $$css: !0
        },
        20: {
            paddingTop: "x1cnzs8",
            $$css: !0
        }
    };
    function g(t) {
        var n = o("react-compiler-runtime").c(134), a, i, l, s, c, g, h, y, C, b, v, S, R, L, E, k, I, T, D, x, $, P, N, M, w, A, F, O, B, W, q, U, V, H, G, z, j, K, Q;
        if (n[0] !== t) {
            var X = t.action
              , Y = t.action_DEPRECATED
              , J = t.actionAccessibilityLabel
              , Z = t.actionAddOn
              , ee = t.actionDisabled
              , te = t.actionHidden
              , ne = t.actionIcon
              , re = t.actionLabel
              , oe = t.actionLinkProps
              , ae = t.actionRef
              , ie = t.actiontestid
              , le = t.actionWrapper
              , se = t.addOn_DEPRECATED
              , ue = t.body
              , ce = t.bodyColor
              , de = t.bodyLineLimit
              , me = t.disabled
              , pe = t.hasTopDivider
              , _e = t.headline
              , fe = t.headlineColor
              , ge = t.headlineId
              , he = t.iconColor
              , ye = t.iconSize
              , Ce = t.isSemanticHeading
              , be = t.level
              , ve = t.meta
              , Se = t.metaColor
              , Re = t.metaLocation
              , Le = t.metaTestID
              , Ee = t.onActionHoverIn
              , ke = t.onActionHoverOut
              , Ie = t.onActionPress
              , Te = t.onActionPressIn
              , De = t.onActionPressOut
              , xe = t.paddingHorizontal
              , $e = t.paddingTop
              , Pe = t.showActionOnHover
              , Ne = t.testOnly_actionPressed
              , Me = t.testOnly_pressed
              , we = t.useFocusCell
              , Ae = babelHelpers.objectWithoutPropertiesLoose(t, e);
            a = X,
            C = Y,
            i = J,
            l = Z,
            w = ee,
            q = te,
            s = ne,
            c = re,
            g = oe,
            h = ae,
            b = ie,
            y = le,
            v = se,
            S = ue,
            U = ce,
            V = de,
            H = pe,
            L = _e,
            G = fe,
            E = ge,
            z = he,
            j = ye,
            K = Ce,
            k = be,
            I = ve,
            A = Se,
            T = Re,
            D = Le,
            x = Ee,
            $ = ke,
            P = Ie,
            N = Te,
            M = De,
            F = xe,
            O = $e,
            B = Pe,
            Q = Ne,
            W = we,
            R = Ae,
            n[0] = t,
            n[1] = a,
            n[2] = i,
            n[3] = l,
            n[4] = s,
            n[5] = c,
            n[6] = g,
            n[7] = h,
            n[8] = y,
            n[9] = C,
            n[10] = b,
            n[11] = v,
            n[12] = S,
            n[13] = R,
            n[14] = L,
            n[15] = E,
            n[16] = k,
            n[17] = I,
            n[18] = T,
            n[19] = D,
            n[20] = x,
            n[21] = $,
            n[22] = P,
            n[23] = N,
            n[24] = M,
            n[25] = w,
            n[26] = A,
            n[27] = F,
            n[28] = O,
            n[29] = B,
            n[30] = W,
            n[31] = q,
            n[32] = U,
            n[33] = V,
            n[34] = H,
            n[35] = G,
            n[36] = z,
            n[37] = j,
            n[38] = K,
            n[39] = Q
        } else
            a = n[1],
            i = n[2],
            l = n[3],
            s = n[4],
            c = n[5],
            g = n[6],
            h = n[7],
            y = n[8],
            C = n[9],
            b = n[10],
            v = n[11],
            S = n[12],
            R = n[13],
            L = n[14],
            E = n[15],
            k = n[16],
            I = n[17],
            T = n[18],
            D = n[19],
            x = n[20],
            $ = n[21],
            P = n[22],
            N = n[23],
            M = n[24],
            w = n[25],
            A = n[26],
            F = n[27],
            O = n[28],
            B = n[29],
            W = n[30],
            q = n[31],
            U = n[32],
            V = n[33],
            H = n[34],
            G = n[35],
            z = n[36],
            j = n[37],
            K = n[38],
            Q = n[39];
        var Fe = w === void 0 ? !1 : w, Oe = q === void 0 ? !1 : q, Be = U === void 0 ? "secondary" : U, We = V === void 0 ? 3 : V, qe = H === void 0 ? !1 : H, Ue = G === void 0 ? "primary" : G, Ve = z === void 0 ? "primary" : z, He = j === void 0 ? 16 : j, Ge = K === void 0 ? !0 : K, ze = A === void 0 ? "secondary" : A, je = F === void 0 ? 16 : F, Ke = O === void 0 ? 20 : O, Qe = B === void 0 ? !1 : B, Xe = W === void 0 ? !1 : W, Ye = m(!1), Je = Ye[0], Ze = Ye[1], et = d(r("CometFocusTableContext")), tt = et.FocusCell, nt, rt = Q != null ? Q : !1, ot;
        n[40] !== Fe || n[41] !== g || n[42] !== b || n[43] !== x || n[44] !== $ || n[45] !== P || n[46] !== N || n[47] !== M || n[48] !== rt ? (ot = {
            disabled: Fe,
            linkProps: g,
            onHoverIn: x,
            onHoverOut: $,
            onPress: P,
            onPressIn: N,
            onPressOut: M,
            testid: b,
            testOnly_pressed: rt
        },
        n[40] = Fe,
        n[41] = g,
        n[42] = b,
        n[43] = x,
        n[44] = $,
        n[45] = P,
        n[46] = N,
        n[47] = M,
        n[48] = rt,
        n[49] = ot) : ot = n[49];
        var at = ot;
        if (a != null)
            nt = a;
        else {
            if (l != null)
                nt = l;
            else if (s != null) {
                var it;
                n[50] !== i || n[51] !== s || n[52] !== at || n[53] !== h || n[54] !== Ve ? (it = u.jsx(r("FDSIcon.react"), babelHelpers.extends({}, at, {
                    "aria-label": i,
                    color: Ve,
                    icon: s,
                    ref: h
                })),
                n[50] = i,
                n[51] = s,
                n[52] = at,
                n[53] = h,
                n[54] = Ve,
                n[55] = it) : it = n[55],
                nt = it
            } else if (c != null) {
                var lt = i != null ? i : c, st = Oe && !Je && _.actionHidden, ut = Qe && _.showActionOnHover, ct;
                n[56] !== st || n[57] !== ut ? (ct = [_.actionButton, _.action, st, ut],
                n[56] = st,
                n[57] = ut,
                n[58] = ct) : ct = n[58];
                var dt = Fe ? "disabled" : "blueLink", mt = k === 2 ? "body2" : "body3", pt;
                n[59] !== c || n[60] !== dt || n[61] !== mt ? (pt = u.jsx(r("FDSText.react"), {
                    color: dt,
                    numberOfLines: 1,
                    type: mt,
                    children: c
                }),
                n[59] = c,
                n[60] = dt,
                n[61] = mt,
                n[62] = pt) : pt = n[62];
                var _t;
                n[63] !== at || n[64] !== h || n[65] !== lt || n[66] !== ct || n[67] !== pt ? (_t = u.jsx(r("FDSPressable.react"), babelHelpers.extends({}, at, {
                    "aria-label": lt,
                    onFocusVisibleChange: Ze,
                    overlayOffset: p,
                    overlayRadius: 4,
                    ref: h,
                    xstyle: ct,
                    children: pt
                })),
                n[63] = at,
                n[64] = h,
                n[65] = lt,
                n[66] = ct,
                n[67] = pt,
                n[68] = _t) : _t = n[68],
                nt = _t
            } else if (C != null)
                if (C instanceof r("IconSource")) {
                    var ft;
                    n[69] !== i || n[70] !== at || n[71] !== h || n[72] !== C || n[73] !== Ve ? (ft = u.jsx(r("FDSIcon.react"), babelHelpers.extends({}, at, {
                        "aria-label": i,
                        color: Ve,
                        icon: C,
                        ref: h
                    })),
                    n[69] = i,
                    n[70] = at,
                    n[71] = h,
                    n[72] = C,
                    n[73] = Ve,
                    n[74] = ft) : ft = n[74],
                    nt = ft
                } else if (C instanceof o("SVGIcon").SVGIcon) {
                    var gt;
                    n[75] !== i || n[76] !== at || n[77] !== h || n[78] !== C || n[79] !== Ve || n[80] !== He ? (gt = u.jsx(r("FDSIcon.react"), babelHelpers.extends({}, at, {
                        "aria-label": i,
                        color: Ve,
                        icon: C,
                        ref: h,
                        size: He
                    })),
                    n[75] = i,
                    n[76] = at,
                    n[77] = h,
                    n[78] = C,
                    n[79] = Ve,
                    n[80] = He,
                    n[81] = gt) : gt = n[81],
                    nt = gt
                } else {
                    var ht = i != null ? i : C, yt = Oe && !Je && _.actionHidden, Ct = Qe && _.showActionOnHover, bt;
                    n[82] !== yt || n[83] !== Ct ? (bt = [_.actionButton, _.action, yt, Ct],
                    n[82] = yt,
                    n[83] = Ct,
                    n[84] = bt) : bt = n[84];
                    var vt = Fe ? "disabled" : "blueLink", St = k === 2 ? "body2" : "body3", Rt;
                    n[85] !== C || n[86] !== vt || n[87] !== St ? (Rt = u.jsx(r("FDSText.react"), {
                        color: vt,
                        numberOfLines: 1,
                        type: St,
                        children: C
                    }),
                    n[85] = C,
                    n[86] = vt,
                    n[87] = St,
                    n[88] = Rt) : Rt = n[88];
                    var Lt;
                    n[89] !== at || n[90] !== h || n[91] !== ht || n[92] !== bt || n[93] !== Rt ? (Lt = u.jsx(r("FDSPressable.react"), babelHelpers.extends({}, at, {
                        "aria-label": ht,
                        onFocusVisibleChange: Ze,
                        overlayOffset: p,
                        overlayRadius: 4,
                        ref: h,
                        xstyle: bt,
                        children: Rt
                    })),
                    n[89] = at,
                    n[90] = h,
                    n[91] = ht,
                    n[92] = bt,
                    n[93] = Rt,
                    n[94] = Lt) : Lt = n[94],
                    nt = Lt
                }
            else if (v != null) {
                var Et;
                n[95] !== v ? (Et = u.jsx(o("react-strict-dom").html.div, {
                    style: _.action,
                    children: v
                }),
                n[95] = v,
                n[96] = Et) : Et = n[96],
                nt = Et
            }
            if (y != null) {
                var kt = y.component, It = nt, Tt;
                n[97] !== kt || n[98] !== y.props || n[99] !== It ? (Tt = u.jsx(kt, babelHelpers.extends({}, y.props, {
                    children: It
                })),
                n[97] = kt,
                n[98] = y.props,
                n[99] = It,
                n[100] = Tt) : Tt = n[100],
                nt = Tt
            }
        }
        if (Xe === !0 && tt != null) {
            var Dt;
            n[101] !== tt || n[102] !== nt ? (Dt = u.jsx(tt, {
                children: nt
            }),
            n[101] = tt,
            n[102] = nt,
            n[103] = Dt) : Dt = n[103],
            nt = Dt
        }
        var xt;
        n[104] !== nt || n[105] !== k ? (xt = u.jsx(r("FDSUnitHeaderHierarchyLevelContextProvider"), {
            level: k,
            children: nt
        }),
        n[104] = nt,
        n[105] = k,
        n[106] = xt) : xt = n[106];
        var $t = T != null ? T : "below", Pt;
        n[107] !== S || n[108] !== Be || n[109] !== We || n[110] !== L || n[111] !== Ue || n[112] !== E || n[113] !== Ge || n[114] !== k || n[115] !== I || n[116] !== ze || n[117] !== D || n[118] !== xt || n[119] !== $t ? (Pt = u.jsx(r("FDSTextPairing.react"), {
            body: S,
            bodyColor: Be,
            bodyLineLimit: We,
            headline: L,
            headlineAddOn: xt,
            headlineColor: Ue,
            headlineId: E,
            headlineLineLimit: 2,
            isSemanticHeading: Ge,
            level: k,
            meta: I,
            metaColor: ze,
            metaLineLimit: 1,
            metaLocation: $t,
            metaTestID: D
        }),
        n[107] = S,
        n[108] = Be,
        n[109] = We,
        n[110] = L,
        n[111] = Ue,
        n[112] = E,
        n[113] = Ge,
        n[114] = k,
        n[115] = I,
        n[116] = ze,
        n[117] = D,
        n[118] = xt,
        n[119] = $t,
        n[120] = Pt) : Pt = n[120];
        var Nt = Pt, Mt = qe ? 0 : je, wt = f[Ke], At;
        n[121] !== wt ? (At = [_.root, wt],
        n[121] = wt,
        n[122] = At) : At = n[122];
        var Ft;
        n[123] !== Nt ? (Ft = u.jsx(r("CometColumnItem.react"), {
            children: Nt
        }),
        n[123] = Nt,
        n[124] = Ft) : Ft = n[124];
        var Ot;
        n[125] !== R || n[126] !== Mt || n[127] !== At || n[128] !== Ft ? (Ot = u.jsx(r("CometColumn.react"), babelHelpers.extends({}, R, {
            paddingHorizontal: Mt,
            xstyle: At,
            children: Ft
        })),
        n[125] = R,
        n[126] = Mt,
        n[127] = At,
        n[128] = Ft,
        n[129] = Ot) : Ot = n[129];
        var Bt = Ot;
        if (qe) {
            var Wt;
            n[130] === Symbol.for("react.memo_cache_sentinel") ? (Wt = u.jsx(r("CometColumnItem.react"), {
                children: u.jsx(r("BaseView.react"), {
                    xstyle: _.hairline
                })
            }),
            n[130] = Wt) : Wt = n[130];
            var qt;
            return n[131] !== Bt || n[132] !== je ? (qt = u.jsxs(r("CometColumn.react"), {
                paddingHorizontal: je,
                children: [Wt, Bt]
            }),
            n[131] = Bt,
            n[132] = je,
            n[133] = qt) : qt = n[133],
            qt
        }
        return Bt
    }
    l.default = g
}
), 98);