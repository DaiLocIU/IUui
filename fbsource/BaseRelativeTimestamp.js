__d("BaseRelativeTimestamp.react", ["BaseRelativeTimestampUtils", "BaseTooltip.react", "BaseTooltipImpl.react", "BaseTooltipMultilineContent.react", "TimestampUtils", "react", "react-compiler-runtime", "useServerTime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react"));
    function u(e) {
        var t = o("react-compiler-runtime").c(24), n = e.date, a = e.delayTooltipMs, i = e.enableTooltip, l = e.format, u = e.tooltipImpl, c = e.tooltipProps, d = i === void 0 ? !1 : i, m = u === void 0 ? r("BaseTooltipImpl.react") : u, p = r("useServerTime")(), _;
        t[0] !== n || t[1] !== l || t[2] !== p ? (_ = o("BaseRelativeTimestampUtils").getRelativeTimestamp(p, n, l),
        t[0] = n,
        t[1] = l,
        t[2] = p,
        t[3] = _) : _ = t[3];
        var f = _, g;
        t[4] !== n || t[5] !== p ? (g = o("TimestampUtils").getTimestamp(p, n),
        t[4] = n,
        t[5] = p,
        t[6] = g) : g = t[6];
        var h = g, y;
        t[7] !== n || t[8] !== p ? (y = o("BaseRelativeTimestampUtils").getRelativeTimestamp(p, n, "normal"),
        t[7] = n,
        t[8] = p,
        t[9] = y) : y = t[9];
        var C = y, b = !d, v;
        t[10] !== h ? (v = s.jsx(r("BaseTooltipMultilineContent.react"), {
            children: h
        }),
        t[10] = h,
        t[11] = v) : v = t[11];
        var S;
        t[12] !== f ? (S = s.jsx("span", {
            suppressHydrationWarning: !0,
            children: f
        }),
        t[12] = f,
        t[13] = S) : S = t[13];
        var R;
        t[14] !== C || t[15] !== S ? (R = s.jsx("abbr", {
            "aria-label": C,
            suppressHydrationWarning: !0,
            children: S
        }),
        t[14] = C,
        t[15] = S,
        t[16] = R) : R = t[16];
        var L;
        return t[17] !== a || t[18] !== b || t[19] !== v || t[20] !== R || t[21] !== m || t[22] !== c ? (L = s.jsx(r("BaseTooltip.react"), babelHelpers.extends({
            delayTooltipMs: a,
            disabled: b,
            tooltip: v,
            tooltipImpl: m
        }, c, {
            children: R
        })),
        t[17] = a,
        t[18] = b,
        t[19] = v,
        t[20] = R,
        t[21] = m,
        t[22] = c,
        t[23] = L) : L = t[23],
        L
    }
    l.default = u
}
), 98);