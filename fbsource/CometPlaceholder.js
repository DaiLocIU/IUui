__d("CometPlaceholder.react", ["react", "useCometPlaceholderImpl"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react"));
    function u(e) {
        "use no forget";
        return r("useCometPlaceholderImpl")(e)
    }
    u.displayName = u.name + " [from " + i.id + "]",
    l.default = u
}
), 98);

__d("HeroPlaceholder.react", ["HeroFallbackTracker.react", "HeroInteractionContext", "HeroInteractionIDContext", "HeroPlaceholderUtils", "react", "react-compiler-runtime", "useStable"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = e, c = u.useCallback, d = u.useContext, m = u.useLayoutEffect, p = u.useRef, _ = function(t) {
        var e = t.children;
        return e
    };
    function f(e) {
        var t = o("react-compiler-runtime").c(2), n = e.cb, r = p(!1), a;
        return t[0] !== n ? (a = function() {
            r.current || (n(),
            r.current = !0)
        }
        ,
        t[0] = n,
        t[1] = a) : a = t[1],
        m(a),
        null
    }
    function g(e) {
        var t, n = o("react-compiler-runtime").c(37), a = e.children, i = e.fallback, l = e.name, u = e.unstable_avoidThisFallback, c = e.unstable_defer, _ = e.unstable_onSuspense, g = d(o("HeroInteractionContext").Context), h = d(r("HeroInteractionIDContext")), y = r("useStable")(o("HeroPlaceholderUtils").getSimpleUUID), C = (t = e.placeholderUUID) != null ? t : y, b = r("useStable")(o("HeroPlaceholderUtils").getSimpleUUID), v = p(!1), S = a, R;
        n[3] !== g || n[4] !== h || n[5] !== l || n[6] !== C || n[7] !== _ ? (R = function(t) {
            if (h != null && g.suspenseCallback(h, C, g.pageletStack, t, l != null ? l : "Unnamed Suspense"),
            _) {
                var e, n = (e = o("HeroPlaceholderUtils").createThenableDescription(t)) != null ? e : "";
                _(n, l != null ? l : "Unnamed Suspense")
            }
        }
        ,
        n[3] = g,
        n[4] = h,
        n[5] = l,
        n[6] = C,
        n[7] = _,
        n[8] = R) : R = n[8];
        var L = R, E, k;
        n[9] !== g || n[10] !== h || n[11] !== l || n[12] !== b ? (E = function() {
            if (v.current === !1 && h != null && h != null)
                return g.hold(h, g.pageletStack, "Hydration", b, l),
                (function() {
                    return g.unhold(h, b)
                }
                )
        }
        ,
        k = [g, h, l, b],
        n[9] = g,
        n[10] = h,
        n[11] = l,
        n[12] = b,
        n[13] = E,
        n[14] = k) : (E = n[13],
        k = n[14]),
        m(E, k);
        var I;
        n[15] !== g || n[16] !== h || n[17] !== b ? (I = function() {
            v.current = !0,
            h != null && g.unhold(h, b)
        }
        ,
        n[15] = g,
        n[16] = h,
        n[17] = b,
        n[18] = I) : I = n[18];
        var T = I, D;
        n[19] !== T ? (D = s.jsx(f, {
            cb: T
        }),
        n[19] = T,
        n[20] = D) : D = n[20];
        var x;
        n[21] !== C ? (x = s.jsx(r("HeroFallbackTracker.react"), {
            uuid: C
        }),
        n[21] = C,
        n[22] = x) : x = n[22];
        var $;
        n[23] !== i || n[24] !== D || n[25] !== x ? ($ = s.jsxs(s.Fragment, {
            children: [i, D, x]
        }),
        n[23] = i,
        n[24] = D,
        n[25] = x,
        n[26] = $) : $ = n[26];
        var P;
        n[27] !== T ? (P = s.jsx(f, {
            cb: T
        }),
        n[27] = T,
        n[28] = P) : P = n[28];
        var N;
        return n[29] !== l || n[30] !== L || n[31] !== $ || n[32] !== P || n[33] !== u || n[34] !== c || n[35] !== S ? (N = s.jsxs(s.Suspense, {
            defer: c,
            fallback: $,
            name: l,
            suspenseCallback: L,
            unstable_avoidThisFallback: u,
            children: [P, S]
        }),
        n[29] = l,
        n[30] = L,
        n[31] = $,
        n[32] = P,
        n[33] = u,
        n[34] = c,
        n[35] = S,
        n[36] = N) : N = n[36],
        N
    }
    g.displayName = "HeroPlaceholder",
    l.default = g
}
), 98);
__d("hero-tracing-placeholder", ["HeroComponent.react", "HeroCurrentInteractionForLoggingContext", "HeroHoldTrigger.react", "HeroInteractionContext", "HeroInteractionContextPassthrough.react", "HeroInteractionIDContext", "HeroPendingPlaceholderTracker", "HeroPlaceholder.react", "HeroPlaceholderUtils"], (function(t, n, r, o, a, i, l) {
    "use strict";
    l.HeroComponent = r("HeroComponent.react"),
    l.HeroHoldTrigger = r("HeroHoldTrigger.react"),
    l.HeroInteractionContext = o("HeroInteractionContext"),
    l.HeroInteractionContextPassthrough = r("HeroInteractionContextPassthrough.react"),
    l.HeroInteractionIDContext = r("HeroInteractionIDContext"),
    l.HeroCurrentInteractionForLoggingContext = r("HeroCurrentInteractionForLoggingContext"),
    l.HeroPendingPlaceholderTracker = o("HeroPendingPlaceholderTracker"),
    l.HeroPlaceholder = r("HeroPlaceholder.react"),
    l.HeroPlaceholderUtils = o("HeroPlaceholderUtils")
}
), 98);


__d("useCometPlaceholderImpl", ["CometSSRHydrationMarkerUtils", "CometSuspenseContext_DO_NOT_USE.react", "CometSuspenseHUD.react", "ExecutionEnvironment", "cr:22912", "cr:5128", "gkx", "hero-tracing-placeholder", "react", "useStable"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u = s || (s = o("react")), c = s, d = c.useCallback, m = c.useMemo, p = c.useRef, _ = c.useState, f = n("cr:22912") || n("cr:5128"), g = r("gkx")("5486");
    function h(n) {
        var a = n.children
          , i = n.fallback
          , l = n.name
          , s = n.unstable_avoidThisFallback
          , c = n.unstable_defer
          , h = n.unstable_onSuspense
          , y = r("useStable")(function() {
            return r("CometSuspenseHUD.react") && (e || (e = r("ExecutionEnvironment"))).canUseDOM ? t.document.createElement("div") : null
        })
          , C = p(null)
          , b = r("useStable")(o("hero-tracing-placeholder").HeroPlaceholderUtils.getSimpleUUID)
          , v = _(null)
          , S = v[0]
          , R = v[1]
          , L = a
          , E = i;
        o("CometSSRHydrationMarkerUtils").addMarkersToChildren != null && o("CometSSRHydrationMarkerUtils").addMarkersToFallback != null && (L = o("CometSSRHydrationMarkerUtils").addMarkersToChildren(L),
        E = o("CometSSRHydrationMarkerUtils").addMarkersToFallback(E));
        var k = d(function(e, t) {
            g && R(e),
            y != null && (y.textContent = e),
            C.current = e,
            f == null || f.trackSuspendedComponent == null || f.trackSuspendedComponent(e, b, t),
            h && h(e)
        }, [y, h, b])
          , I = m(function() {
            return {
                isFallback: !0,
                suspendedPromiseName: S
            }
        }, [S])
          , T = null;
        y != null && r("CometSuspenseHUD.react") != null && (T = u.jsx(r("CometSuspenseHUD.react"), {
            desc: y
        }));
        var D = u.jsxs(r("CometSuspenseContext_DO_NOT_USE.react").Provider, {
            value: I,
            children: [E, T]
        })
          , x = L;
        return u.jsx(o("hero-tracing-placeholder").HeroPlaceholder, {
            fallback: D,
            name: l,
            placeholderUUID: b,
            unstable_avoidThisFallback: s,
            unstable_defer: c,
            unstable_onSuspense: k,
            children: x
        })
    }
    h.displayName = h.name + " [from " + i.id + "]",
    l.default = h
}
), 98);


__d("CometSSRHydrationMarkerUtils", ["cr:1106516"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = n("cr:1106516") == null ? void 0 : n("cr:1106516").addMarkersToChildren
      , s = n("cr:1106516") == null ? void 0 : n("cr:1106516").addMarkersToFallback;
    l.addMarkersToChildren = e,
    l.addMarkersToFallback = s
}
), 98);


__d("CometSuspenseContext_DO_NOT_USE.react", ["react"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = s.createContext({
        isFallback: !1
    });
    l.default = u
}
), 98);
__d("CometSuspenseHUD.react", ["cr:21238"], (function(t, n, r, o, a, i, l) {
    "use strict";
    l.default = n("cr:21238")
}
), 98);

__d("ExecutionEnvironment", [], (function(t, n, r, o, a, i) {
    "use strict";
    var e = !!(t !== void 0 && t.document && t.document.createElement)
      , l = typeof WorkerGlobalScope == "function"
      , s = typeof SharedWorkerGlobalScope == "function" && self instanceof SharedWorkerGlobalScope
      , u = !l && e
      , c = {
        canUseDOM: e,
        canUseEventListeners: e && !!(t.addEventListener || t.attachEvent),
        canUseViewport: e && !!window.screen,
        canUseWorkers: typeof Worker != "undefined",
        isInBrowser: e || l,
        isInMainThread: u,
        isInSharedWorker: s,
        isInWorker: l
    }
      , d = c;
    i.default = d
}
), 66);



__d("HeroPlaceholder.react", ["HeroFallbackTracker.react", "HeroInteractionContext", "HeroInteractionIDContext", "HeroPlaceholderUtils", "react", "react-compiler-runtime", "useStable"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react")), u = e, c = u.useCallback, d = u.useContext, m = u.useLayoutEffect, p = u.useRef, _ = function(t) {
        var e = t.children;
        return e
    };
    function f(e) {
        var t = o("react-compiler-runtime").c(2), n = e.cb, r = p(!1), a;
        return t[0] !== n ? (a = function() {
            r.current || (n(),
            r.current = !0)
        }
        ,
        t[0] = n,
        t[1] = a) : a = t[1],
        m(a),
        null
    }
    function g(e) {
        var t, n = o("react-compiler-runtime").c(37), a = e.children, i = e.fallback, l = e.name, u = e.unstable_avoidThisFallback, c = e.unstable_defer, _ = e.unstable_onSuspense, g = d(o("HeroInteractionContext").Context), h = d(r("HeroInteractionIDContext")), y = r("useStable")(o("HeroPlaceholderUtils").getSimpleUUID), C = (t = e.placeholderUUID) != null ? t : y, b = r("useStable")(o("HeroPlaceholderUtils").getSimpleUUID), v = p(!1), S = a, R;
        n[3] !== g || n[4] !== h || n[5] !== l || n[6] !== C || n[7] !== _ ? (R = function(t) {
            if (h != null && g.suspenseCallback(h, C, g.pageletStack, t, l != null ? l : "Unnamed Suspense"),
            _) {
                var e, n = (e = o("HeroPlaceholderUtils").createThenableDescription(t)) != null ? e : "";
                _(n, l != null ? l : "Unnamed Suspense")
            }
        }
        ,
        n[3] = g,
        n[4] = h,
        n[5] = l,
        n[6] = C,
        n[7] = _,
        n[8] = R) : R = n[8];
        var L = R, E, k;
        n[9] !== g || n[10] !== h || n[11] !== l || n[12] !== b ? (E = function() {
            if (v.current === !1 && h != null && h != null)
                return g.hold(h, g.pageletStack, "Hydration", b, l),
                (function() {
                    return g.unhold(h, b)
                }
                )
        }
        ,
        k = [g, h, l, b],
        n[9] = g,
        n[10] = h,
        n[11] = l,
        n[12] = b,
        n[13] = E,
        n[14] = k) : (E = n[13],
        k = n[14]),
        m(E, k);
        var I;
        n[15] !== g || n[16] !== h || n[17] !== b ? (I = function() {
            v.current = !0,
            h != null && g.unhold(h, b)
        }
        ,
        n[15] = g,
        n[16] = h,
        n[17] = b,
        n[18] = I) : I = n[18];
        var T = I, D;
        n[19] !== T ? (D = s.jsx(f, {
            cb: T
        }),
        n[19] = T,
        n[20] = D) : D = n[20];
        var x;
        n[21] !== C ? (x = s.jsx(r("HeroFallbackTracker.react"), {
            uuid: C
        }),
        n[21] = C,
        n[22] = x) : x = n[22];
        var $;
        n[23] !== i || n[24] !== D || n[25] !== x ? ($ = s.jsxs(s.Fragment, {
            children: [i, D, x]
        }),
        n[23] = i,
        n[24] = D,
        n[25] = x,
        n[26] = $) : $ = n[26];
        var P;
        n[27] !== T ? (P = s.jsx(f, {
            cb: T
        }),
        n[27] = T,
        n[28] = P) : P = n[28];
        var N;
        return n[29] !== l || n[30] !== L || n[31] !== $ || n[32] !== P || n[33] !== u || n[34] !== c || n[35] !== S ? (N = s.jsxs(s.Suspense, {
            defer: c,
            fallback: $,
            name: l,
            suspenseCallback: L,
            unstable_avoidThisFallback: u,
            children: [P, S]
        }),
        n[29] = l,
        n[30] = L,
        n[31] = $,
        n[32] = P,
        n[33] = u,
        n[34] = c,
        n[35] = S,
        n[36] = N) : N = n[36],
        N
    }
    g.displayName = "HeroPlaceholder",
    l.default = g
}
), 98);
__d("hero-tracing-placeholder", ["HeroComponent.react", "HeroCurrentInteractionForLoggingContext", "HeroHoldTrigger.react", "HeroInteractionContext", "HeroInteractionContextPassthrough.react", "HeroInteractionIDContext", "HeroPendingPlaceholderTracker", "HeroPlaceholder.react", "HeroPlaceholderUtils"], (function(t, n, r, o, a, i, l) {
    "use strict";
    l.HeroComponent = r("HeroComponent.react"),
    l.HeroHoldTrigger = r("HeroHoldTrigger.react"),
    l.HeroInteractionContext = o("HeroInteractionContext"),
    l.HeroInteractionContextPassthrough = r("HeroInteractionContextPassthrough.react"),
    l.HeroInteractionIDContext = r("HeroInteractionIDContext"),
    l.HeroCurrentInteractionForLoggingContext = r("HeroCurrentInteractionForLoggingContext"),
    l.HeroPendingPlaceholderTracker = o("HeroPendingPlaceholderTracker"),
    l.HeroPlaceholder = r("HeroPlaceholder.react"),
    l.HeroPlaceholderUtils = o("HeroPlaceholderUtils")
}
), 98);