__d("CometBookmarksAddOnUtils", ["CometImageFromIXValueRelayWrapper.react", "FDSIcon.react", "FDSProfilePhoto.react", "ImageIconSource", "react"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react"));
    function u(e, t, n, o, a, i, l, u) {
        a === void 0 && (a = 36),
        i === void 0 && (i = 36),
        u === void 0 && (u = !1);
        var c = n === !1 || e == null
          , d = c ? t : null;
        if (d != null && o !== "FOLDER")
            return s.jsx(r("FDSProfilePhoto.react"), {
                shape: o === "USER" || o === "PAGE" ? "circle" : "roundedRect",
                size: i,
                source: {
                    uri: d
                }
            });
        if (l != null)
            return u ? s.jsx("div", {
                className: "x6s0dn4 x1qhmfi1 x1c9tyrk xeusxvb x1pahc9y x1ertn4p x3nfvp2 xc9qbxq xl56j7k x14qfxbe",
                children: s.jsx("span", {
                    className: "x1fiuzfb",
                    children: s.jsx(r("CometImageFromIXValueRelayWrapper.react"), {
                        sprite: l
                    })
                })
            }) : s.jsx(r("CometImageFromIXValueRelayWrapper.react"), {
                sprite: l
            });
        if (e != null)
            return s.jsx(r("FDSIcon.react"), {
                icon: new (r("ImageIconSource"))(e,a,a)
            })
    }
    function c(e, t, n, o, a, i, l) {
        a === void 0 && (a = 36),
        i === void 0 && (i = 36);
        var s = n === !1 || e == null
          , u = s ? t : null;
        if (u == null && e == null && l == null)
            return null;
        if (u != null && o !== "FOLDER")
            return {
                shape: o === "USER" || o === "PAGE" ? "circle" : "roundedRect",
                size: i,
                source: {
                    uri: u
                },
                type: "profile-photo"
            };
        if (l != null)
            return {
                sprite: l,
                type: "sprite"
            };
        if (e != null)
            return {
                icon: new (r("ImageIconSource"))(e,a,a),
                type: "icon"
            }
    }
    l.getFDSBookmarkAddOnStart = u,
    l.getBookmarkAddOnStart = c
}
), 98);