__d("memoizeWithArgs", [], (function(t, n, r, o, a, i) {
    var e = Object.prototype.hasOwnProperty;
    function l(t, n, r) {
        var o, a = function() {
            o || (o = {});
            var r = n.apply(void 0, arguments);
            return e.call(o, r) || (o[r] = t.apply(void 0, arguments)),
            o[r]
        };
        return a
    }
    i.default = l
}
), 66);
__d("getFDSTextHierarchyStyle", ["memoizeWithArgs"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = r("memoizeWithArgs")(function(e, t) {
        switch (e) {
        case 1:
            return {
                bodyType: "body1",
                headlineType: "headlineEmphasized1",
                metaType: "meta1"
            };
        case 2:
            return {
                bodyType: "body2",
                headlineType: "headlineEmphasized2",
                metaType: "meta2"
            };
        case 3:
            return {
                bodyType: "body3",
                headlineType: t === !0 ? "headline3" : "headlineEmphasized3",
                metaType: "meta3"
            };
        default:
        case 4:
            return {
                bodyType: "body4",
                headlineType: t === !0 ? "headline4" : "headlineEmphasized4",
                metaType: "meta4"
            };
        case "entityHeader1":
            return {
                bodyType: "body2",
                headlineType: "entityHeaderHeadline1",
                metaType: "entityHeaderMeta1"
            };
        case "entityHeader2":
            return {
                bodyType: "body2",
                headlineType: "entityHeaderHeadline2",
                metaType: "entityHeaderMeta2"
            }
        }
    }, function(e, t) {
        return String(e) + (t === !0 ? "" : "e")
    });
    l.default = e
}
), 98);