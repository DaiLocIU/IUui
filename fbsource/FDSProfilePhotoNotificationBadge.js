__d("FDSProfilePhotoNotificationBadge.react", ["fbt", "FDSBadge.react", "FDSText.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u = e || (e = o("react"));
    function c(e) {
        var t = o("react-compiler-runtime").c(10), n = e.number, a = n > 9 ? "9+" : n, i;
        t[0] !== a || t[1] !== n ? (i = s._(/*BTDS*/
        "_j{\"*\":\"{number} notifications\",\"_1\":\"{number} notification\"}", [s._plural(n), s._param("number", a)]),
        t[0] = a,
        t[1] = n,
        t[2] = i) : i = t[2];
        var l = n > 9 ? "wide" : "normal", c;
        t[3] === Symbol.for("react.memo_cache_sentinel") ? (c = {
            className: "x6s0dn4 x78zum5 x5yr21d xl56j7k xuxw1ft xh8yej3"
        },
        t[3] = c) : c = t[3];
        var d = n > 9 ? "9+" : n, m;
        t[4] !== d ? (m = u.jsx("div", babelHelpers.extends({}, c, {
            children: u.jsx(r("FDSText.react"), {
                color: "primaryOnMedia",
                type: "body4",
                children: d
            })
        })),
        t[4] = d,
        t[5] = m) : m = t[5];
        var p;
        return t[6] !== i || t[7] !== l || t[8] !== m ? (p = u.jsx(r("FDSBadge.react"), {
            accessibilityText: i,
            color: "red",
            isProfileBadge: !0,
            size: 18,
            wide: l,
            children: m
        }),
        t[6] = i,
        t[7] = l,
        t[8] = m,
        t[9] = p) : p = t[9],
        p
    }
    l.default = c
}
), 226);