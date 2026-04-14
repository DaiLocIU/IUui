__d("FDSProfilePhotoLastActiveTimeBadge.react", ["fbt", "FDSProfilePhotoActivePill.react", "FDSRelativeTimestamp.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u = e || (e = o("react"));
    function c(e) {
        var t = o("react-compiler-runtime").c(9), n = e.border, a = e.pressed, i = e.time, l = n === void 0 ? "card-background" : n, c;
        t[0] === Symbol.for("react.memo_cache_sentinel") ? (c = s._(/*BTDS*/
        "Last active time:"),
        t[0] = c) : c = t[0];
        var d = c, m = i * 1e3, p;
        t[1] !== m ? (p = new Date(m),
        t[1] = m,
        t[2] = p) : p = t[2];
        var _;
        t[3] !== p ? (_ = u.jsx(r("FDSRelativeTimestamp.react"), {
            date: p,
            format: "minimized"
        }),
        t[3] = p,
        t[4] = _) : _ = t[4];
        var f;
        return t[5] !== l || t[6] !== a || t[7] !== _ ? (f = u.jsx(r("FDSProfilePhotoActivePill.react"), {
            "aria-label": d,
            border: l,
            pressed: a,
            children: _
        }),
        t[5] = l,
        t[6] = a,
        t[7] = _,
        t[8] = f) : f = t[8],
        f
    }
    l.default = c
}
), 226);