__d("CometHomeLeftRailWithBlueRankingRefetchSection.react", ["CometBookmarksHeader.react", "CometClassicHomeRailSeparator.react", "CometEditShortcutsDialog.entrypoint", "CometEntryPointDialogTrigger.react", "CometFolderBookmarkListItem.react", "CometHomeLeftRailBookmarkRefetchListCell.react", "CometHomeLeftRailWithBlueRankingRefetchSection_folderBookmark.graphql", "CometRelay", "FDSListCellGlimmer.react", "FocusManager", "ODS", "react", "react-compiler-runtime", "useVisibilityObserver"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u, c = s || (s = o("react")), d = s, m = d.useCallback, p = d.useEffect, _ = d.useRef, f = d.useState;
    function g(e, t, n, o, a, i, l) {
        var s, u = e.node;
        if (!u || (e == null || (s = e.node) == null ? void 0 : s.has_user_hidden) === !0)
            return null;
        var d = u.id;
        return c.jsx(r("CometFolderBookmarkListItem.react"), {
            badgeStyle: o,
            bookmark: u,
            bookmarkSection: n,
            index: t,
            pushBookmarkRef: a,
            totalShortcutCount: i,
            useNucleusIcon: l
        }, d)
    }
    g.displayName = g.name + " [from " + i.id + "]";
    var h = 1e3;
    function y(t) {
        var a, i = t.badgeStyle, l = t.folderBookmark, s = t.identityItems, u = t.initialCount, d = u === void 0 ? 4 : u, y = t.section, b = t.sectionHeader, v = t.sectionIndex, S = t.totalShortcutCount, R = t.useNucleusIcon, L = t.withSeparator, E = L === void 0 ? !0 : L, k = f(!1), I = k[0], T = k[1], D = f(!1), x = D[0], $ = D[1], P = f(!1), N = P[0], M = P[1], w = C(), A = w[0], F = w[1], O = o("CometRelay").usePaginationFragment(e !== void 0 ? e : e = n("CometHomeLeftRailWithBlueRankingRefetchSection_folderBookmark.graphql"), l), B = O.data, W = O.hasNext, q = O.isLoadingNext, U = O.loadNext, V = y === "shortcuts" || y === "communities", H = B == null ? void 0 : B.id, G = _(null), z = f(null), j = z[0], K = z[1];
        p(function() {
            var e = G.current;
            I && e != null && o("FocusManager").focusElement(e)
        }, [I]);
        var Q = _([])
          , X = m(function(e) {
            Q.current.push(e)
        }, []);
        if (H == null)
            return null;
        var Y = []
          , J = (B == null || (a = B.bookmarks) == null ? void 0 : a.edges) || [];
        if (I && y === "explore") {
            var Z = J.slice(0, j != null ? j : d)
              , ee = J.slice(j != null ? j : d);
            ee.sort(function(e, t) {
                var n, r, o, a, i, l, s, u, c, d;
                if ((e == null || (n = e.node) == null ? void 0 : n.should_prioritize) !== (t == null || (r = t.node) == null ? void 0 : r.should_prioritize)) {
                    var m;
                    return (e == null || (m = e.node) == null ? void 0 : m.should_prioritize) === !0 ? -1 : 1
                }
                if ((e == null || (o = e.node) == null ? void 0 : o.should_demote) !== (t == null || (a = t.node) == null ? void 0 : a.should_demote)) {
                    var p;
                    return (e == null || (p = e.node) == null ? void 0 : p.should_demote) === !0 ? 1 : -1
                }
                return (e == null || (i = e.node) == null ? void 0 : i.name) == null && (t == null || (l = t.node) == null ? void 0 : l.name) == null ? 0 : (e == null || (s = e.node) == null ? void 0 : s.name) == null ? 1 : (t == null || (u = t.node) == null ? void 0 : u.name) == null ? -1 : e == null || (c = e.node) == null ? void 0 : c.name.localeCompare(t == null || (d = t.node) == null ? void 0 : d.name)
            }),
            J = Z.concat(ee)
        }
        var te = I ? J.length : Math.min(d, J.length);
        if (N)
            Y.push(c.jsx(r("FDSListCellGlimmer.react"), {
                imageSize: 36,
                imageStyle: "roundedRect",
                numberOfItems: te
            }, H + "_glimmer"));
        else {
            for (var ne = [], re = 0; re < te; re++) {
                var oe = g(J[re], re, y, i, X, S != null ? S : void 0, R);
                oe && ne.push(oe)
            }
            v === 0 && b == null && s != null && ne.unshift.apply(ne, s),
            ne.length && Y.push(c.jsx("ul", {
                children: ne
            }, "list"))
        }
        if (Y.length > 0) {
            if (b != null) {
                var ae = c.jsx(r("CometEntryPointDialogTrigger.react"), {
                    dialogEntryPoint: r("CometEditShortcutsDialog.entrypoint"),
                    otherProps: {
                        numberShortcuts: I ? h : d,
                        setIsRefetching: M
                    },
                    preloadParams: {},
                    children: function(t) {
                        return c.jsx(r("CometBookmarksHeader.react"), {
                            canEdit: V,
                            editHovered: x,
                            onActionPress: t,
                            sectionHeader: b
                        })
                    }
                });
                Y.unshift(c.jsx("div", {
                    className: "xwib8y2",
                    children: ae
                }, H + "_header")),
                v === 0 && s != null && Y.unshift.apply(Y, s)
            }
            if (!N) {
                if (I)
                    Y.push(c.jsx(r("CometHomeLeftRailBookmarkRefetchListCell.react"), {
                        onPress: function() {
                            return T(!1)
                        },
                        section: y,
                        testid: void 0,
                        type: "less"
                    }, H + "_see_less"));
                else if ((q || W || te < J.length) && (y !== "shortcuts" || S != null && S > 5)) {
                    var ie = V ? null : {
                        testid: "bookmark_seemore_explore"
                    };
                    Y.push(c.createElement(r("CometHomeLeftRailBookmarkRefetchListCell.react"), babelHelpers.extends({}, ie, {
                        impressionRef: F,
                        isLoadingNext: q,
                        key: H + "_see_more",
                        onPress: function() {
                            W ? U(h - te, {
                                onComplete: function() {
                                    return T(!0)
                                }
                            }) : T(!0);
                            var e = 0
                              , t = Q.current;
                            for (e; e < t.length; e++)
                                if (window.getComputedStyle(t[e]).display === "none") {
                                    G.current = t[e].querySelector("a");
                                    break
                                }
                            A()
                        },
                        section: y,
                        type: "more"
                    })))
                }
            }
            E && Y.push(c.jsx(r("CometClassicHomeRailSeparator.react"), {}, H + "_divider"))
        }
        return c.jsx("div", {
            onMouseEnter: function() {
                return V && $(!0)
            },
            onMouseLeave: function() {
                return V && $(!1)
            },
            children: Y
        })
    }
    y.displayName = y.name + " [from " + i.id + "]";
    function C() {
        var e = o("react-compiler-runtime").c(3), t = v, n = b, a;
        e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = {
            onVisible: n
        },
        e[0] = a) : a = e[0];
        var i = r("useVisibilityObserver")(a), l;
        return e[1] !== i ? (l = [t, i],
        e[1] = i,
        e[2] = l) : l = e[2],
        l
    }
    function b() {
        (u || (u = o("ODS"))).bumpEntityKey(3478, "comet_home_bookmarks", "see_more.impression")
    }
    function v() {
        (u || (u = o("ODS"))).bumpEntityKey(3478, "comet_home_bookmarks", "see_more.click")
    }
    l.default = y
}
), 98);