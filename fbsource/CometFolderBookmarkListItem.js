__d("CometFolderBookmarkListItem.react", ["fbt", "CometBookmarkListItemWrapper.react", "CometFolderBookmarkListItem_bookmark.graphql", "CometRelay", "CometTextWithEntitiesRelay.react", "FBNucleusCircleFullFilled12Icon.react", "FDSBadge.react", "FDSIcon.react", "FDSTextWithBadge.react", "emptyFunction", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u, c = u || (u = o("react")), d = u, m = d.useEffect, p = d.useRef;
    function _(t) {
        var a, i = o("react-compiler-runtime").c(20), l = t.badgeStyle, u = t.bookmark, d = t.bookmarkSection, _ = t.index, f = t.pushBookmarkRef, g = t.totalShortcutCount, h = t.useNucleusIcon, y = o("CometRelay").useFragment(e !== void 0 ? e : e = n("CometFolderBookmarkListItem_bookmark.graphql"), u), C = p(null), b, v;
        i[0] !== f ? (b = function() {
            C.current != null && f != null && f(C.current)
        }
        ,
        v = [f],
        i[0] = f,
        i[1] = b,
        i[2] = v) : (b = i[1],
        v = i[2]),
        m(b, v);
        var S = void 0, R = void 0, L = void 0, E = 1, k = (a = y.unread_count) != null ? a : 0, I = y.unread_count_string, T = y == null ? void 0 : y.context_sentence, D;
        if (T != null) {
            L = "secondary";
            var x;
            i[3] !== T ? (x = c.jsx(r("CometTextWithEntitiesRelay.react"), {
                textWithEntities: T
            }),
            i[3] = T,
            i[4] = x) : x = i[4],
            R = x,
            E = 2
        } else if (I != null || k > 0) {
            if (l === "dot") {
                var $;
                i[5] === Symbol.for("react.memo_cache_sentinel") ? ($ = c.jsx(r("FDSIcon.react"), {
                    color: "negative",
                    icon: r("FBNucleusCircleFullFilled12Icon.react"),
                    size: 8
                }),
                i[5] = $) : $ = i[5],
                S = $,
                D = !0
            } else if (l === "string" && I != null) {
                L = "highlight";
                var P;
                i[6] === Symbol.for("react.memo_cache_sentinel") ? (P = c.jsx(r("FDSBadge.react"), {
                    accessibilityText: s._(/*BTDS*/
                    "Unread items indicator"),
                    isProfileBadge: !0,
                    size: 7
                }),
                i[6] = P) : P = i[6];
                var N;
                i[7] !== I ? (N = c.jsx(r("FDSTextWithBadge.react"), {
                    badgeBefore: P,
                    children: I
                }),
                i[7] = I,
                i[8] = N) : N = i[8],
                R = N,
                D = !0
            }
        }
        var M = D === !0 ? I != null || k > 0 : !1, w;
        return i[9] !== S || i[10] !== d || i[11] !== y || i[12] !== _ || i[13] !== R || i[14] !== L || i[15] !== E || i[16] !== M || i[17] !== g || i[18] !== h ? (w = c.jsx(r("CometBookmarkListItemWrapper.react"), {
            addOnEnd: S,
            bookmark: y,
            bookmarkSection: d,
            hasBadgeCount: M,
            index: _,
            meta: R,
            metaColor: L,
            metaLineLimit: E,
            onExpand: r("emptyFunction"),
            ref: C,
            totalShortcutCount: g,
            useNucleusIcon: h
        }),
        i[9] = S,
        i[10] = d,
        i[11] = y,
        i[12] = _,
        i[13] = R,
        i[14] = L,
        i[15] = E,
        i[16] = M,
        i[17] = g,
        i[18] = h,
        i[19] = w) : w = i[19],
        w
    }
    l.default = _
}
), 226);