__d("CometBookmarkListItemWrapper.react", ["CometBookmarkListItem.react", "CometBookmarkListItemWrapperManusAISanctionsCheckQuery.graphql", "CometBookmarkListItemWrapper_bookmark.graphql", "CometBookmarksAddOnUtils", "CometRelay", "FBLogger", "XPlatReactEnvironment", "gkx", "goUriOnNewWindow", "logAdsManagerBookmarkExposure", "react", "requireDeferred", "useCurrentRoute", "useMBSBookmarkIntercept", "useShouldPrefetchQueriesBasedOnLastUsedTimestamp"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u, c = u || (u = o("react")), d = u, m = d.useEffect, p = d.useMemo, _ = d.useRef, f = r("requireDeferred")("CometBookmarkLoggingUtils").__setRef("CometBookmarkListItemWrapper.react"), g = r("requireDeferred")("CometRecordProductUsageMutation").__setRef("CometBookmarkListItemWrapper.react"), h = "305005395263696", y = "25738462982460769", C = "390582448014347";
    function b() {
        return r("gkx")("12430")
    }
    function v(t) {
        var a, i, l = t.addOnEnd, u = t.bookmark, d = t.bookmarkSection, v = t.hasBadgeCount, S = t.index, R = t.meta, L = t.metaColor, E = t.metaLineLimit, k = t.onExpand, I = t.ref, T = t.totalShortcutCount, D = t.useNucleusIcon, x = e !== void 0 ? e : e = n("CometBookmarkListItemWrapperManusAISanctionsCheckQuery.graphql"), $ = o("CometRelay").useFragment(s !== void 0 ? s : s = n("CometBookmarkListItemWrapper_bookmark.graphql"), u), P = $.bookmark_icon_sprite, N = $.has_user_hidden, M = $.image, w = $.is_news_feed, A = $.last_used_timestamp, F = $.name, O = $.query_prefetching_eligible, B = $.section, W = $.tracking, q = $.url, U = o("CometRelay").useRelayEnvironment(), V = r("useShouldPrefetchQueriesBasedOnLastUsedTimestamp")(O, A), H = r("useCurrentRoute")(), G = $ == null || (a = $.bookmarked_node) == null ? void 0 : a.id, z = p(function() {
            return G === y
        }, [G]), j = p(function() {
            return G === C
        }, [G]), K = r("useMBSBookmarkIntercept")(U), Q = _(!1);
        m(function() {
            G === h && b() && f.onReadyImmediately(function(e) {
                var t = e.logCometBookmarkListItemImpression;
                return t(G)
            }),
            z && !Q.current && (f.onReadyImmediately(function(e) {
                var t = e.logCometBookmarkListItemImpression;
                return t(G)
            }),
            Q.current = !0)
        }, [G, z]);
        var X = H == null ? void 0 : H.tabKey;
        if (N === !0)
            return null;
        var Y = null
          , J = null;
        if (W != null)
            try {
                var Z = JSON.parse(W);
                Y = Z == null ? void 0 : Z.bmid,
                J = Z == null ? void 0 : Z.bookmark_type
            } catch (e) {
                r("FBLogger")("comet_infra").mustfix('Unable to parse bookmark tracking field "%s", %s', W, e)
            }
        var ee = o("CometBookmarksAddOnUtils").getFDSBookmarkAddOnStart(null, M == null ? void 0 : M.uri, M == null ? void 0 : M.is_silhouette, B, o("XPlatReactEnvironment").isWeb() ? 36 : 32, o("XPlatReactEnvironment").isWeb() ? 36 : 32, P, D);
        if (ee == null || F == null || q == null && l == null)
            return null;
        var te = w === !0 && X === "home";
        if (G = $ == null || (i = $.bookmarked_node) == null ? void 0 : i.id,
        G === h && !b())
            return null;
        var ne = O === !0;
        J === "type_group" && (ne = V);
        var re = {
            linkProps: {
                passthroughProps: {
                    ref: "bookmark"
                },
                prefetchQueriesOnHover: ne,
                productAttribution: {
                    bookmark_id: Y,
                    bookmark_type_name: J,
                    tap_point: "tap_bookmark"
                },
                traceParams: {
                    navigation_source: "bookmark_click"
                },
                url: z || j && K != null ? null : q
            },
            onPress: q == null ? k : function() {
                f.onReadyImmediately(function(e) {
                    var t = e.logCometBookmarkListItemPressed;
                    return t(B, q, G, v)
                }),
                g.onReady(function(e) {
                    Y != null && e.updateProductUsage(U, Y)
                }),
                z && o("CometRelay").fetchQuery(U, x, {}).toPromise().then(function(e) {
                    var t, n = (e == null || (t = e.manus_ai_sanctions_check) == null ? void 0 : t.is_manus_sanctioned) === !0;
                    !n && q != null && r("goUriOnNewWindow")(q)
                }).catch(function() {}),
                Y === 6802152230 && r("logAdsManagerBookmarkExposure")(),
                j && K != null && K(q)
            }
        };
        return c.jsx(r("CometBookmarkListItem.react"), babelHelpers.extends({
            addOnStart: ee,
            bookmarkSection: d,
            index: S,
            meta: R,
            metaColor: L,
            metaLineLimit: E,
            name: F,
            ref: I,
            selected: te,
            testid: void 0,
            totalShortcutCount: T,
            tracking: W
        }, re))
    }
    v.displayName = v.name + " [from " + i.id + "]",
    l.default = v
}
), 98);