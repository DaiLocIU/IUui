__d("CometDensityModeStateProvider.react", ["CometDenseModeSetting", "CometDensityModeContext", "CometRelay", "CometRelayEnvironment", "CometSetDenseModeMutation", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = e, c = u.useCallback, d = u.useMemo, m = u.useState;
    function p(e) {
        var t = o("react-compiler-runtime").c(10), n = e.children, a = m(o("CometDenseModeSetting").initialSetting === "COMPACT"), i = a[0], l = a[1], u;
        t[0] !== i ? (u = function(t, n) {
            var e = n.onRevert
              , a = t ? "COMPACT" : "DEFAULT";
            l(a === "COMPACT");
            var s = function(t) {
                var e = t.getRoot().getLinkedRecord("viewer");
                if (e != null) {
                    var n = e.getValue("dense_mode_setting");
                    n !== a && e.setValue("dense_mode_setting", a)
                }
            };
            o("CometRelay").commitMutation(r("CometRelayEnvironment"), {
                mutation: r("CometSetDenseModeMutation"),
                onError: function() {
                    l(o("CometDenseModeSetting").initialSetting === "COMPACT"),
                    e(i)
                },
                optimisticUpdater: s,
                variables: {
                    input: {
                        density_mode: a
                    }
                }
            })
        }
        ,
        t[0] = i,
        t[1] = u) : u = t[1];
        var c = u, d;
        t[2] !== c ? (d = function(t) {
            c(t, {
                onRevert: function(t) {
                    l(t)
                }
            })
        }
        ,
        t[2] = c,
        t[3] = d) : d = t[3];
        var p = d, _;
        t[4] !== i || t[5] !== p ? (_ = [i, p],
        t[4] = i,
        t[5] = p,
        t[6] = _) : _ = t[6];
        var f = _, g;
        return t[7] !== n || t[8] !== f ? (g = s.jsx(r("CometDensityModeContext").Provider, {
            value: f,
            children: n
        }),
        t[7] = n,
        t[8] = f,
        t[9] = g) : g = t[9],
        g
    }
    l.default = p
}
), 98);


__d("CometSetDenseModeMutation", ["CometSetDenseModeMutation.graphql"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e !== void 0 ? e : e = n("CometSetDenseModeMutation.graphql");
    l.default = s
}
), 98);