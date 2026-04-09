__d("CometHomeLeftRailBookmarkRefetchListCell.react", ["fbt", "ChevronDownFilled16IconSvg.react", "ChevronUpFilled20IconSvg.react", "CometListCellStrict_DEPRECATED.react", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u = e || (e = o("react"));
    function c(e) {
        var t = o("react-compiler-runtime").c(18), n = e.impressionRef, a = e.isLoadingNext, i = e.onPress, l = e.section, c = e.testid, d = e.type, m = a === void 0 ? !1 : a, p, _ = "", f = void 0;
        e: switch (d) {
        case "more":
            {
                var g;
                t[0] !== m ? (g = m ? {
                    type: "contained-progress-ring-indeterminate"
                } : {
                    icon: r("ChevronDownFilled16IconSvg.react"),
                    size: 36,
                    type: "contained-icon"
                },
                t[0] = m,
                t[1] = g) : g = t[1],
                p = g;
                var h;
                if (t[2] === Symbol.for("react.memo_cache_sentinel") ? (h = s._(/*BTDS*/
                "See more"),
                t[2] = h) : h = t[2],
                _ = h,
                l === "shortcuts") {
                    var y;
                    t[3] === Symbol.for("react.memo_cache_sentinel") ? (y = s._(/*BTDS*/
                    "See more shortcuts"),
                    t[3] = y) : y = t[3],
                    f = y
                } else if (l === "communities") {
                    var C;
                    t[4] === Symbol.for("react.memo_cache_sentinel") ? (C = s._(/*BTDS*/
                    "See more communities"),
                    t[4] = C) : C = t[4],
                    f = C
                } else if (l === "explore") {
                    var b;
                    t[5] === Symbol.for("react.memo_cache_sentinel") ? (b = s._(/*BTDS*/
                    "See more explore items"),
                    t[5] = b) : b = t[5],
                    f = b
                }
                break e
            }
        case "less":
            {
                var v;
                t[6] === Symbol.for("react.memo_cache_sentinel") ? (v = {
                    icon: r("ChevronUpFilled20IconSvg.react"),
                    size: 36,
                    type: "contained-icon"
                },
                t[6] = v) : v = t[6],
                p = v;
                var S;
                if (t[7] === Symbol.for("react.memo_cache_sentinel") ? (S = s._(/*BTDS*/
                "See less"),
                t[7] = S) : S = t[7],
                _ = S,
                l === "shortcuts") {
                    var R;
                    t[8] === Symbol.for("react.memo_cache_sentinel") ? (R = s._(/*BTDS*/
                    "See less shortcuts"),
                    t[8] = R) : R = t[8],
                    f = R
                } else if (l === "communities") {
                    var L;
                    t[9] === Symbol.for("react.memo_cache_sentinel") ? (L = s._(/*BTDS*/
                    "See less communities"),
                    t[9] = L) : L = t[9],
                    f = L
                } else if (l === "explore") {
                    var E;
                    t[10] === Symbol.for("react.memo_cache_sentinel") ? (E = s._(/*BTDS*/
                    "See less explore items"),
                    t[10] = E) : E = t[10],
                    f = E
                }
            }
        }
        var k = f != null ? f : void 0, I;
        return t[11] !== p || t[12] !== _ || t[13] !== n || t[14] !== i || t[15] !== k || t[16] !== c ? (I = u.jsx(r("CometListCellStrict_DEPRECATED.react"), {
            addOnStart: p,
            addOnStartVerticalAlign: "center",
            "aria-label": k,
            headline: _,
            headlineLineLimit: 1,
            level: 4,
            onPress: i,
            ref: n,
            testid: void 0
        }),
        t[11] = p,
        t[12] = _,
        t[13] = n,
        t[14] = i,
        t[15] = k,
        t[16] = c,
        t[17] = I) : I = t[17],
        I
    }
    l.default = c
}
), 226);