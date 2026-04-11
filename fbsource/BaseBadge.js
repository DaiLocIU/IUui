__d("BaseBadge.react", ["fbt", "CometVisualCompletionAttributes", "ScreenReaderText.react", "react", "react-compiler-runtime", "stylex", "testID"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e = ["accessibilityText", "children", "testid", "xstyle"], u, c, d = c || (c = o("react")), m = {
        root: {
            alignItems: "x6s0dn4",
            borderStartStartRadius: "x1iwo8zk",
            borderStartEndRadius: "x1033uif",
            borderEndEndRadius: "x179ill4",
            borderEndStartRadius: "x1b60jn0",
            boxSizing: "x9f619",
            display: "x3nfvp2",
            justifyContent: "xl56j7k",
            $$css: !0
        }
    };
    function p(t) {
        var n = o("react-compiler-runtime").c(18), a, i, l, c, p;
        n[0] !== t ? (a = t.accessibilityText,
        l = t.children,
        c = t.testid,
        p = t.xstyle,
        i = babelHelpers.objectWithoutPropertiesLoose(t, e),
        n[0] = t,
        n[1] = a,
        n[2] = i,
        n[3] = l,
        n[4] = c,
        n[5] = p) : (a = n[1],
        i = n[2],
        l = n[3],
        c = n[4],
        p = n[5]);
        var _;
        n[6] !== p ? (_ = (u || (u = r("stylex")))([m.root, p]),
        n[6] = p,
        n[7] = _) : _ = n[7];
        var f;
        n[8] !== c ? (f = r("testID")(c),
        n[8] = c,
        n[9] = f) : f = n[9];
        var g;
        n[10] !== a ? (g = (typeof a == "string" || s.isFbtInstance(a)) && d.jsx(r("ScreenReaderText.react"), {
            text: a
        }),
        n[10] = a,
        n[11] = g) : g = n[11];
        var h;
        return n[12] !== i || n[13] !== l || n[14] !== _ || n[15] !== f || n[16] !== g ? (h = d.jsxs("span", babelHelpers.extends({}, i, {
            className: _
        }, f, r("CometVisualCompletionAttributes").IGNORE, {
            children: [g, l]
        })),
        n[12] = i,
        n[13] = l,
        n[14] = _,
        n[15] = f,
        n[16] = g,
        n[17] = h) : h = n[17],
        h
    }
    l.default = p
}
), 98);