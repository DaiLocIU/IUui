__d("MetaConfig", ["invariant", "ExecutionEnvironment", "MetaConfigMap", "MetaconfigWebExposureFalcoEvent", "ODS"], (function(t, n, r, o, a, i, l, s) {
    "use strict";
    var e, u, c = {}, d = {
        _: function(n) {
            var t = r("MetaConfigMap").get(n);
            t != null || s(0, 57910, n);
            var a = t.log_id
              , i = t.value;
            return a != null && c[n] !== !0 && ((u || (u = r("ExecutionEnvironment"))).isInBrowser && ((e || (e = o("ODS"))).bumpEntityKey(530, "metaconfig.web.exposure", "falco_logger"),
            r("MetaconfigWebExposureFalcoEvent").log(function() {
                return {
                    identifier: n,
                    log_id: a
                }
            })),
            c[n] = !0),
            i
        }
    }, m = d;
    l.default = m
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
__d("invariant", ["Env", "fb-error-lite", "sprintf"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e;
    function s(e, t) {
        if (!e) {
            for (var n = t, o = arguments.length, a = new Array(o > 2 ? o - 2 : 0), i = 2; i < o; i++)
                a[i - 2] = arguments[i];
            if (typeof n == "number") {
                var l = u(n, a)
                  , s = l.decoderLink
                  , c = l.message;
                n = c,
                a.unshift(s)
            } else if (n === void 0) {
                n = "Invariant: ";
                for (var d = 0; d < a.length; d++)
                    n += "%s,"
            }
            var m = n
              , p = new Error(m);
            throw p.name = "Invariant Violation",
            p.messageFormat = n,
            p.messageParams = a.map(function(e) {
                return String(e)
            }),
            p.taalOpcodes = [r("fb-error-lite").TAALOpcode.PREVIOUS_FRAME],
            p.stack,
            p
        }
    }
    function u(t, n) {
        var o = "Minified invariant #" + t + "; %s";
        n.length > 0 && (o += " Params: " + n.map(function(e) {
            return "%s"
        }).join(", "));
        var a = (e || (e = r("Env"))).show_invariant_decoder === !0 ? "visit " + c(t, n) + " to see the full message." : "";
        return {
            message: o,
            decoderLink: a
        }
    }
    function c(e, t) {
        var n = "https://www.internalfb.com/intern/invariant/" + e + "/";
        return t.length > 0 && (n += "?" + t.map(function(e, t) {
            return "args[" + t + "]=" + encodeURIComponent(String(e))
        }).join("&")),
        n
    }
    l.default = s
}
), 98);
__d("MetaConfigMap", [], (function(t, n, r, o, a, i) {
    "use strict";
    var e = {}
      , l = {
        add: function(n, r) {
            for (var t in n)
                r && r.entry++,
                t in e ? r && r.dup_entry++ : e[t] = n[t]
        },
        get: function(n) {
            return e[n]
        }
    }
      , s = l;
    i.default = s
}
), 66);