__d("FDSListCellImpl.react", ["cr:8666", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["ref"], s, u = s || (s = o("react"));
    function c(t) {
        var r = o("react-compiler-runtime").c(6), a, i;
        r[0] !== t ? (i = t.ref,
        a = babelHelpers.objectWithoutPropertiesLoose(t, e),
        r[0] = t,
        r[1] = a,
        r[2] = i) : (a = r[1],
        i = r[2]);
        var l;
        return r[3] !== a || r[4] !== i ? (l = u.jsx(n("cr:8666"), babelHelpers.extends({}, a, {
            ref: i
        })),
        r[3] = a,
        r[4] = i,
        r[5] = l) : l = r[5],
        l
    }
    l.default = c
}
), 98);