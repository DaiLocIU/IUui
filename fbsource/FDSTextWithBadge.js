__d("FDSTextWithBadge.react", ["FDSTextWithIcon.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["badgeAfter", "badgeBefore", "badgeOverrideVerticalStyle"], s, u = s || (s = o("react"));
    function c(t) {
        var n = o("react-compiler-runtime").c(10), a, i, l, s;
        n[0] !== t ? (a = t.badgeAfter,
        i = t.badgeBefore,
        l = t.badgeOverrideVerticalStyle,
        s = babelHelpers.objectWithoutPropertiesLoose(t, e),
        n[0] = t,
        n[1] = a,
        n[2] = i,
        n[3] = l,
        n[4] = s) : (a = n[1],
        i = n[2],
        l = n[3],
        s = n[4]);
        var c;
        return n[5] !== a || n[6] !== i || n[7] !== l || n[8] !== s ? (c = u.jsx(r("FDSTextWithIcon.react"), babelHelpers.extends({}, s, {
            iconAfter: a,
            iconBefore: i,
            iconOverrideVerticalStyle: l,
            observeDirectionality: !0
        })),
        n[5] = a,
        n[6] = i,
        n[7] = l,
        n[8] = s,
        n[9] = c) : c = n[9],
        c
    }
    l.default = c
}
), 98);