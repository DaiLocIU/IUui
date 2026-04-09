__d("FDSListCellGlimmer.react", ["BaseListCell.react", "BaseLoadingStateElement.react", "CometColumn.react", "CometColumnItem.react", "FDSGlimmer.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = e.useMemo, c = {
        firstItem: {
            paddingTop: "xexx8yu",
            $$css: !0
        },
        image: {
            marginInlineEnd: "xbmvrgn",
            $$css: !0
        },
        imageSize20: {
            height: "x1qx5ct2",
            width: "xw4jnvo",
            $$css: !0
        },
        imageSize36: {
            height: "xc9qbxq",
            width: "x14qfxbe",
            $$css: !0
        },
        imageSize40: {
            height: "x1vqgdyp",
            width: "x100vrsf",
            $$css: !0
        },
        imageSize48: {
            height: "xsdox4t",
            width: "x1useyqa",
            $$css: !0
        },
        imageSize56: {
            height: "xnnlda6",
            width: "x15yg21f",
            $$css: !0
        },
        imageSize60: {
            height: "xng8ra",
            width: "x1247r65",
            $$css: !0
        },
        imageStyleCircle: {
            borderStartStartRadius: "x1c9tyrk",
            borderStartEndRadius: "xeusxvb",
            borderEndEndRadius: "x1pahc9y",
            borderEndStartRadius: "x1ertn4p",
            $$css: !0
        },
        imageStyleRoundedRect: {
            borderStartStartRadius: "x1obq294",
            borderStartEndRadius: "x5a5i1n",
            borderEndEndRadius: "xde0f50",
            borderEndStartRadius: "x15x8krk",
            $$css: !0
        },
        item: {
            paddingBottom: "xwib8y2",
            paddingTop: "x1y1aw1k",
            $$css: !0
        },
        textGlimmer: {
            borderStartStartRadius: "x1obq294",
            borderStartEndRadius: "x5a5i1n",
            borderEndEndRadius: "xde0f50",
            borderEndStartRadius: "x15x8krk",
            height: "xx3o462",
            $$css: !0
        },
        textGlimmerWidth100: {
            width: "xh8yej3",
            $$css: !0
        },
        textGlimmerWidth50: {
            width: "x3hqpx7",
            $$css: !0
        },
        textGlimmerWidth67: {
            width: "xgkjt62",
            $$css: !0
        },
        textGlimmerWidth83: {
            width: "x1l3jyfm",
            $$css: !0
        }
    };
    function d(e) {
        var t = o("react-compiler-runtime").c(15), n = e.imageSize, a = e.imageStyle, i = e.numberOfItems, l = e.paddingHorizontal, u = e.removeFirstItemPadding, d = e.spacing, p = n === void 0 ? 36 : n, _ = a === void 0 ? "none" : a, f = i === void 0 ? 1 : i, g = l === void 0 ? 16 : l, h = u === void 0 ? !0 : u, y;
        t[0] !== f ? (y = Array(f).fill().map(m),
        t[0] = f,
        t[1] = y) : y = t[1];
        var C = y, b;
        if (t[2] !== p || t[3] !== _ || t[4] !== C || t[5] !== h) {
            var v;
            t[7] !== p || t[8] !== _ || t[9] !== h ? (v = function(t, n) {
                return s.jsx(r("CometColumnItem.react"), {
                    children: s.jsx(r("BaseListCell.react"), {
                        addOnStart: _ !== "none" ? s.jsx(r("FDSGlimmer.react"), {
                            index: n,
                            xstyle: [c.image, p === 20 && c.imageSize20, p === 36 && c.imageSize36, p === 40 && c.imageSize40, p === 48 && c.imageSize48, p === 56 && c.imageSize56, p === 60 && c.imageSize60, _ === "circle" && c.imageStyleCircle, _ === "roundedRect" && c.imageStyleRoundedRect]
                        }) : void 0,
                        content: s.jsx(r("FDSGlimmer.react"), {
                            index: n,
                            xstyle: [c.textGlimmer, t === 0 && c.textGlimmerWidth50, t === 1 && c.textGlimmerWidth67, t === 2 && c.textGlimmerWidth83, t === 3 && c.textGlimmerWidth100]
                        }),
                        xstyle: [c.item, n === 0 && h && c.firstItem]
                    })
                }, n)
            }
            ,
            t[7] = p,
            t[8] = _,
            t[9] = h,
            t[10] = v) : v = t[10],
            b = C.map(v),
            t[2] = p,
            t[3] = _,
            t[4] = C,
            t[5] = h,
            t[6] = b
        } else
            b = t[6];
        var S;
        return t[11] !== g || t[12] !== d || t[13] !== b ? (S = s.jsx(r("BaseLoadingStateElement.react"), {
            children: s.jsx(r("CometColumn.react"), {
                paddingHorizontal: g,
                spacing: d,
                children: b
            })
        }),
        t[11] = g,
        t[12] = d,
        t[13] = b,
        t[14] = S) : S = t[14],
        S
    }
    function m(e, t) {
        return Math.floor(Math.PI * Math.pow(10, t % 10) % 4)
    }
    l.default = d
}
), 98);