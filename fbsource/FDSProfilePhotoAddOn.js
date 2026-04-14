__d("FDSProfilePhotoAddOn.react", ["FDSProfilePhotoActivityBadge.react", "FDSProfilePhotoAvailabilityBadge.react", "FDSProfilePhotoLastActiveTimeBadge.react", "profilePhotoUtils", "react", "react-compiler-runtime"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e, s = e || (e = o("react"));
    function u(e) {
        var t = o("react-compiler-runtime").c(18)
          , n = e.addOn
          , a = e.pressed
          , i = e.size;
        switch (n.type) {
        case "availabilityBadge":
            {
                var l = n == null ? void 0 : n.type, u;
                t[0] !== i || t[1] !== l ? (u = o("profilePhotoUtils").getBadgeSizeAndStrokeWidth(i, l),
                t[0] = i,
                t[1] = l,
                t[2] = u) : u = t[2];
                var c = u, d = c[0], m;
                return t[3] !== n.isDecorative || t[4] !== d || t[5] !== a ? (m = s.jsx(r("FDSProfilePhotoAvailabilityBadge.react"), {
                    isDecorative: n.isDecorative,
                    pressed: a,
                    size: d
                }),
                t[3] = n.isDecorative,
                t[4] = d,
                t[5] = a,
                t[6] = m) : m = t[6],
                m
            }
        case "lastActiveTimeBadge":
            {
                var p;
                return t[7] !== n.border || t[8] !== n.time || t[9] !== a ? (p = s.jsx(r("FDSProfilePhotoLastActiveTimeBadge.react"), {
                    border: n.border,
                    pressed: a,
                    time: n.time
                }),
                t[7] = n.border,
                t[8] = n.time,
                t[9] = a,
                t[10] = p) : p = t[10],
                p
            }
        case "activityBadge":
            {
                var _;
                return t[11] !== n.backgroundColor || t[12] !== n.icon || t[13] !== n.isDecorative || t[14] !== n.overflow || t[15] !== n.size || t[16] !== a ? (_ = s.jsx(r("FDSProfilePhotoActivityBadge.react"), {
                    backgroundColor: n.backgroundColor,
                    icon: n.icon,
                    isDecorative: n.isDecorative,
                    overflow: n.overflow,
                    pressed: a,
                    size: n.size
                }),
                t[11] = n.backgroundColor,
                t[12] = n.icon,
                t[13] = n.isDecorative,
                t[14] = n.overflow,
                t[15] = n.size,
                t[16] = a,
                t[17] = _) : _ = t[17],
                _
            }
        case "trigger":
            return n.icon;
        case "multipleVoicesForAction":
            return n.badge;
        default:
            return null
        }
    }
    l.default = u
}
), 98);