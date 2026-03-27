__d("CometVisibilityUserActivityMonitor", ["Visibility"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = {
        isUserActive: function() {
            return r("Visibility").isHidden() === !1
        },
        subscribe: function(t) {
            var e, n = (e = r("Visibility")).addListener(e.HIDDEN, function() {
                return t(!1)
            }), o = e.addListener(e.VISIBLE, function() {
                return t(!0)
            });
            return function() {
                n && n.remove(),
                o && o.remove()
            }
        }
    };
    l.default = e
}
), 98);

__d("Visibility", ["BaseEventEmitter", "ExecutionEnvironment", "TimeSlice"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s, u;
    (e || (e = r("ExecutionEnvironment"))).canUseDOM && (document.hidden !== void 0 ? (s = "hidden",
    u = "visibilitychange") : document.mozHidden !== void 0 ? (s = "mozHidden",
    u = "mozvisibilitychange") : document.msHidden !== void 0 ? (s = "msHidden",
    u = "msvisibilitychange") : document.webkitHidden !== void 0 && (s = "webkitHidden",
    u = "webkitvisibilitychange"));
    var c = (function(t) {
        function n() {
            for (var e, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
                r[o] = arguments[o];
            return e = t.call.apply(t, [this].concat(r)) || this,
            e.HIDDEN = "hidden",
            e.VISIBLE = "visible",
            e.hiddenKey = s,
            e.hiddenEvent = u,
            babelHelpers.assertThisInitialized(e) || babelHelpers.assertThisInitialized(e)
        }
        babelHelpers.inheritsLoose(n, t);
        var o = n.prototype;
        return o.isHidden = function() {
            return s ? document[s] : !1
        }
        ,
        o.isSupported = function() {
            return (e || (e = r("ExecutionEnvironment"))).canUseDOM && document.addEventListener && u !== void 0
        }
        ,
        n
    }
    )(r("BaseEventEmitter"))
      , d = new c;
    d.isSupported() && document.addEventListener(d.hiddenEvent, r("TimeSlice").guard(function(t) {
        d.emit(d.isHidden() ? d.HIDDEN : d.VISIBLE, {
            changeTime: t.timeStamp
        })
    }, "visibility change"));
    var m = d;
    l.default = m
}
), 98);


__d("BaseEventEmitter", ["EmitterSubscription", "ErrorGuard", "EventSubscriptionVendor", "FBLogger", "emptyFunction"], (function(t, n, r, o, a, i) {
    var e, l = (function() {
        "use strict";
        function t() {
            this.$2 = new (n("EventSubscriptionVendor")),
            this.$1 = null
        }
        var r = t.prototype;
        return r.addListener = function(t, r, o) {
            return this.$2.addSubscription(t, new (n("EmitterSubscription"))(this.$2,r,o))
        }
        ,
        r.removeListener = function(t) {
            this.$2.removeSubscription(t)
        }
        ,
        r.once = function(t, n, r) {
            var e = this;
            return this.addListener(t, function() {
                e.removeCurrentListener(),
                n.apply(r, arguments)
            })
        }
        ,
        r.removeAllListeners = function(t) {
            this.$2.removeAllSubscriptions(t)
        }
        ,
        r.removeCurrentListener = function() {
            if (!this.$1)
                throw n("FBLogger")("emitter").mustfixThrow("Not in an emitting cycle; there is no current subscription");
            this.$2.removeSubscription(this.$1)
        }
        ,
        r.listeners = function(t) {
            var e = this.$2.getSubscriptionsForType(t);
            return e ? e.filter(n("emptyFunction").thatReturnsTrue).map(function(e) {
                return e.listener
            }) : []
        }
        ,
        r.emit = function(t) {
            var e = this.$2.getSubscriptionsForType(t);
            if (e) {
                for (var n = Object.keys(e), r, o = 0; o < n.length; o++) {
                    var a = n[o]
                      , i = e[a];
                    if (i) {
                        if (this.$1 = i,
                        r == null) {
                            r = [i, t];
                            for (var l = 0, s = arguments.length <= 1 ? 0 : arguments.length - 1; l < s; l++)
                                r[l + 2] = l + 1 < 1 || arguments.length <= l + 1 ? void 0 : arguments[l + 1]
                        } else
                            r[0] = i;
                        this.__emitToSubscription.apply(this, r)
                    }
                }
                this.$1 = null
            }
        }
        ,
        r.__emitToSubscription = function(r, o) {
            for (var t = arguments.length, a = new Array(t > 2 ? t - 2 : 0), i = 2; i < t; i++)
                a[i - 2] = arguments[i];
            (e || (e = n("ErrorGuard"))).applyWithGuard(r.listener, r.context, a, {
                name: "EventEmitter " + o + " event"
            })
        }
        ,
        t
    }
    )();
    a.exports = l
}
), null);


__d("EmitterSubscription", ["EventSubscription"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = (function(e) {
        function t(t, n, r) {
            var o;
            return o = e.call(this, t) || this,
            o.listener = n,
            o.context = r,
            o
        }
        return babelHelpers.inheritsLoose(t, e),
        t
    }
    )(r("EventSubscription"));
    l.default = e
}
), 98);

__d("EventSubscription", [], (function(t, n, r, o, a, i) {
    "use strict";
    var e = function(t) {
        var e = this;
        this.remove = function() {
            e.subscriber && (e.subscriber.removeSubscription(e),
            e.subscriber = null)
        }
        ,
        this.subscriber = t
    };
    i.default = e
}
), 66);


__d("EventSubscriptionVendor", ["invariant"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = (function() {
        function e() {
            this.$1 = {}
        }
        var t = e.prototype;
        return t.addSubscription = function(t, n) {
            n.subscriber === this || l(0, 2828),
            this.$1[t] || (this.$1[t] = []);
            var e = this.$1[t].length;
            return this.$1[t].push(n),
            n.eventType = t,
            n.key = e,
            n
        }
        ,
        t.removeAllSubscriptions = function(t) {
            t === void 0 ? this.$1 = {} : delete this.$1[t]
        }
        ,
        t.removeSubscription = function(t) {
            var e = t.eventType
              , n = t.key
              , r = this.$1[e];
            r && delete r[n]
        }
        ,
        t.getSubscriptionsForType = function(t) {
            return this.$1[t]
        }
        ,
        e
    }
    )();
    a.exports = e
}
), null);

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

__d("Env", [], (function(t, n, r, o, a, i) {
    var e = {
        ajaxpipe_token: null,
        compat_iframe_token: null,
        iframeKey: "",
        iframeTarget: "",
        iframeToken: "",
        isCQuick: !1,
        jssp_header_sent: !1,
        jssp_targeting_enabled: !1,
        loadHyperion: !1,
        start: Date.now(),
        nocatch: !1,
        useTrustedTypes: !1,
        isTrustedTypesReportOnly: !1,
        enableDefaultTrustedTypesPolicy: !1,
        ig_server_override: "",
        barcelona_server_override: "",
        ig_mqtt_wss_endpoint: "",
        ig_mqtt_polling_endpoint: ""
    };
    t.Env && Object.assign(e, t.Env),
    t.Env = e;
    var l = e;
    i.default = l
}
), 66);

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

__d("TimeSlice", ["cr:1126"], (function(t, n, r, o, a, i, l) {
    l.default = n("cr:1126")
}
), 98);