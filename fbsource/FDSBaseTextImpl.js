__d("FDSBaseTextImpl.react", ["BaseTextV2.react", "BaseTextV2FontMetrics", "CometDensityModeContext", "FDSTextContext", "JSResourceForInteraction", "MetaConfig", "XPlatReactEnvironment", "XPlatReactUserAgent", "react"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = e.useContext, c = {
        bold: {
            fontWeight: "x1xlr1w8",
            $$css: !0
        },
        medium: {
            fontWeight: "xk50ysn",
            $$css: !0
        },
        normal: {
            fontWeight: "xo1l8bm",
            $$css: !0
        },
        semibold: {
            fontWeight: "x1s688f",
            $$css: !0
        },
        systemFontFamily: {
            MozOsxFontSmoothing: "xlh3980",
            WebkitFontSmoothing: "xvmahel",
            fontFamily: "x1x9mg3",
            $$css: !0
        }
    }, d = function(t, n) {
        var e = {
            body1: {
                fontSize: 20,
                fontWeight: "normal"
            },
            body2: {
                fontSize: n ? 16 : 17,
                fontWeight: "normal"
            },
            body3: {
                fontSize: n ? 14 : 15,
                fontWeight: "normal"
            },
            body4: {
                fontSize: n ? 12 : 13,
                fontWeight: "normal"
            },
            bodyLink1: {
                fontSize: 20,
                fontWeight: "semibold"
            },
            bodyLink2: {
                fontSize: n ? 16 : 17,
                fontWeight: "semibold"
            },
            bodyLink3: {
                fontSize: n ? 14 : 15,
                fontWeight: "semibold"
            },
            bodyLink4: {
                fontSize: n ? 12 : 13,
                fontWeight: "semibold"
            },
            bodyMeta: {
                defaultColor: "secondary",
                fontSize: n ? 12 : 13,
                fontWeight: "normal"
            },
            button1: {
                fontSize: n ? 16 : 17,
                fontWeight: "semibold"
            },
            button2: {
                fontSize: n ? 14 : 15,
                fontWeight: "semibold"
            },
            entityHeaderHeadline1: {
                fontSize: 32,
                fontWeight: "bold"
            },
            entityHeaderHeadline2: {
                fontSize: 28,
                fontWeight: "bold"
            },
            entityHeaderMeta1: {
                defaultColor: "secondary",
                fontSize: n ? 14 : 15,
                fontWeight: "bold"
            },
            entityHeaderMeta2: {
                defaultColor: "secondary",
                fontSize: n ? 14 : 15,
                fontWeight: "bold"
            },
            headline1: {
                fontSize: 24,
                fontWeight: "bold",
                lineGap: 10
            },
            headline2: {
                fontSize: 20,
                fontWeight: "bold"
            },
            headline3: {
                fontSize: n ? 16 : 17,
                fontWeight: "medium"
            },
            headline4: {
                fontSize: n ? 14 : 15,
                fontWeight: "medium"
            },
            headlineDeemphasized3: {
                fontSize: n ? 16 : 17,
                fontWeight: "normal"
            },
            headlineDeemphasized4: {
                fontSize: n ? 14 : 15,
                fontWeight: "normal"
            },
            headlineEmphasized1: {
                fontSize: 24,
                fontWeight: "bold",
                lineGap: 10
            },
            headlineEmphasized2: {
                fontSize: 20,
                fontWeight: "bold"
            },
            headlineEmphasized3: {
                fontSize: n ? 16 : 17,
                fontWeight: "semibold"
            },
            headlineEmphasized4: {
                fontSize: n ? 14 : 15,
                fontWeight: "semibold"
            },
            meta1: {
                defaultColor: "secondary",
                fontSize: n ? 12 : 13,
                fontWeight: "semibold"
            },
            meta2: {
                defaultColor: "secondary",
                fontSize: n ? 12 : 13,
                fontWeight: "semibold"
            },
            meta3: {
                defaultColor: "secondary",
                fontSize: n ? 12 : 13,
                fontWeight: "normal"
            },
            meta4: {
                defaultColor: "secondary",
                fontSize: 12,
                fontWeight: "normal"
            }
        };
        return e[t]
    }, m = {
        blueLink: {
            color: "x1fey0fg",
            $$css: !0
        },
        disabled: {
            color: "x1dntmbh",
            $$css: !0
        },
        disabledButton: {
            color: "x1x80s81",
            $$css: !0
        },
        highlight: {
            color: "x1qq9wsj",
            $$css: !0
        },
        linkOnMedia: {
            color: "x9kptjx",
            $$css: !0
        },
        negative: {
            color: "x1a1m0xk",
            $$css: !0
        },
        placeholder: {
            color: "x12scifz",
            $$css: !0
        },
        positive: {
            color: "x6u5lvz",
            $$css: !0
        },
        primary: {
            color: "xzsf02u",
            $$css: !0
        },
        primaryButton: {
            color: "xtk6v10",
            $$css: !0
        },
        primaryButtonTextOnMedia: {
            color: "x1yeb1j6",
            $$css: !0
        },
        primaryDeemphasizedButton: {
            color: "x1mvi0mv",
            $$css: !0
        },
        primaryOnColor: {
            color: "x1ko2xvj",
            $$css: !0
        },
        primaryOnMedia: {
            color: "x17z8epw",
            $$css: !0
        },
        secondary: {
            color: "xi81zsa",
            $$css: !0
        },
        secondaryButton: {
            color: "x1dem4cn",
            $$css: !0
        },
        secondaryOnColor: {
            color: "xj0d7sl",
            $$css: !0
        },
        secondaryOnMedia: {
            color: "xkxfvhb",
            $$css: !0
        },
        selectedOption: {
            color: "x1qoxp87",
            $$css: !0
        },
        tertiary: {
            color: "x12scifz",
            $$css: !0
        },
        tooltip: {
            color: "xzsf02u",
            $$css: !0
        },
        white: {
            color: "x14ctfv",
            $$css: !0
        }
    }, p = {
        disabled: "disabledButton",
        highlight: "primaryDeemphasizedButton",
        secondary: "secondaryButton",
        white: "primaryButton"
    };
    function _(e, t) {
        var n, o = t && (n = p[e]) != null ? n : e;
        return o === "highlight" && r("MetaConfig")._("73") ? "blueLink" : o
    }
    var f = r("JSResourceForInteraction")("FDSTooltipImpl.react").__setRef("FDSBaseTextImpl.react");
    function g(e) {
        "use no forget";
        var t = e.ref
          , n = e.align
          , a = n === void 0 ? "auto" : n
          , i = e.children
          , l = e.color
          , p = e.dir
          , g = p === void 0 ? "auto" : p
          , h = e.hyphens
          , y = h === void 0 ? "none" : h
          , C = e.id
          , b = e.isPrimaryHeading
          , v = b === void 0 ? !1 : b
          , S = e.isSemanticHeading
          , R = S === void 0 ? !1 : S
          , L = e.numberOfLines
          , E = e.preserveNewLines
          , k = E === void 0 ? !1 : E
          , I = e.suppressHydrationWarning
          , T = e.testid
          , D = e.truncationTooltip
          , x = e.type
          , $ = u(r("CometDensityModeContext"))
          , P = $[0]
          , N = d(x, P)
          , M = N.defaultColor
          , w = M === void 0 ? "primary" : M
          , A = N.fontSize
          , F = N.fontWeight
          , O = N.lineGap
          , B = _(l != null ? l : w, x === "button1" || x === "button2")
          , W = o("XPlatReactEnvironment").isWeb() ? {
            truncationTooltip: {
                tooltipImpl: f,
                tooltipProps: {
                    tooltip: D
                }
            }
        } : {};
        return s.jsx(o("FDSTextContext").FDSTextContextProviderNonNull, {
            color: B,
            type: x,
            children: s.jsx(r("BaseTextV2.react"), babelHelpers.extends({}, W, {
                colorVariant: {
                    xstyleConfig: {
                        textColor: m[B != null ? B : "primary"]
                    }
                },
                dir: g,
                fontMetrics: r("XPlatReactUserAgent").isPlatform("Mac OS X") ? o("BaseTextV2FontMetrics").AppleSystemFontMetrics : o("BaseTextV2FontMetrics").WindowsSystemFontMetrics,
                hyphens: y,
                id: C,
                isPrimaryHeading: v,
                isSemanticHeading: R,
                maxLines: L != null ? L : 0,
                preserveNewLines: k,
                ref: t,
                suppressHydrationWarning: I,
                testid: void 0,
                textAlign: a,
                typeVariant: {
                    fontSize: A,
                    lineGap: O != null ? O : 9,
                    xstyleConfig: {
                        textType: babelHelpers.extends({}, c.systemFontFamily, c[F])
                    }
                },
                children: i
            }))
        })
    }
    g.displayName = g.name + " [from " + i.id + "]",
    l.default = g
}
), 98);