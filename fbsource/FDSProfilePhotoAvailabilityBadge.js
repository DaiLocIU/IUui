__d("FDSProfilePhotoAvailabilityBadge.react", ["fbt", "BaseView.react", "CometPressableChildrenWithOverlay_DEPRECATED.react", "CometPressableOverlay.react", "FDSBadge.react", "ScreenReaderText.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u = e || (e = o("react")), c = {
        availabilityBadge: {
            borderStartStartRadius: "x1c9tyrk",
            borderStartEndRadius: "xeusxvb",
            borderEndEndRadius: "x1pahc9y",
            borderEndStartRadius: "x1ertn4p",
            display: "x78zum5",
            overflowX: "x6ikm8r",
            overflowY: "x10wlt62",
            position: "x1n2onr6",
            $$css: !0
        }
    }, d = s._(/*BTDS*/
    "Active");
    function m(e) {
        var t = o("react-compiler-runtime").c(12), n = e.isDecorative, a = e.pressed, i = e.size, l = n === void 0 ? !1 : n, m;
        t[0] !== a ? (m = u.jsx(r("CometPressableOverlay.react"), {
            pressed: a,
            radius: "50%"
        }),
        t[0] = a,
        t[1] = m) : m = t[1];
        var p;
        t[2] === Symbol.for("react.memo_cache_sentinel") ? (p = s._(/*BTDS*/
        "Online status indicator"),
        t[2] = p) : p = t[2];
        var _;
        t[3] !== i ? (_ = u.jsx(r("FDSBadge.react"), {
            accessibilityText: p,
            color: "green",
            isProfileBadge: !0,
            size: i
        }),
        t[3] = i,
        t[4] = _) : _ = t[4];
        var f;
        t[5] !== m || t[6] !== _ ? (f = u.jsx(r("CometPressableChildrenWithOverlay_DEPRECATED.react"), {
            overlay: m,
            children: _
        }),
        t[5] = m,
        t[6] = _,
        t[7] = f) : f = t[7];
        var g;
        t[8] === Symbol.for("react.memo_cache_sentinel") ? (g = u.jsx(r("ScreenReaderText.react"), {
            text: d
        }),
        t[8] = g) : g = t[8];
        var h;
        return t[9] !== l || t[10] !== f ? (h = u.jsxs(r("BaseView.react"), {
            "aria-hidden": l,
            xstyle: c.availabilityBadge,
            children: [f, g]
        }),
        t[9] = l,
        t[10] = f,
        t[11] = h) : h = t[11],
        h
    }
    l.default = m
}
), 226);