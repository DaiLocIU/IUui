__d("CometBookmarksHeader.react", ["fbt", "FDSUnitHeader.react", "FDSUnitHeaderTextAction.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u = e || (e = o("react"));
    function c(e) {
        var t = o("react-compiler-runtime").c(7), n = e.canEdit, a = e.editHovered, i = e.onActionPress, l = e.sectionHeader, c;
        t[0] !== n || t[1] !== a || t[2] !== i ? (c = n === !0 && a ? u.jsx(r("FDSUnitHeaderTextAction.react"), {
            "aria-label": s._(/*BTDS*/
            "Edit Shortcuts"),
            label: s._(/*BTDS*/
            "Edit"),
            onPress: i
        }) : null,
        t[0] = n,
        t[1] = a,
        t[2] = i,
        t[3] = c) : c = t[3];
        var d;
        return t[4] !== l || t[5] !== c ? (d = u.jsx(r("FDSUnitHeader.react"), {
            action: c,
            headline: l,
            headlineColor: "secondary",
            level: 3
        }),
        t[4] = l,
        t[5] = c,
        t[6] = d) : d = t[6],
        d
    }
    l.default = c
}
), 226);