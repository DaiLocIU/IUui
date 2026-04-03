__d("CometPressable.react", ["BaseButton.react", "BaseDisabledContext", "BaseLink.react", "CometPressableOverlay.react", "react", "stylex", "useCometPressableBehavior", "useCometPressableContextMenu", "useCometPressableEventStates", "useCometPressableStyles", "useMergeRefs"], (function(t, n, r, o, a, i, l) {
    "use strict";
    var e = ["ref"], s = ["allowClickEventPropagation", "children", "cursorDisabled", "xstyle", "disabled", "display", "expanding", "hideFocusOverlay", "isUsingCustomFocusRing", "hideHoverOverlay", "isContainerTarget", "linkProps", "onFocusChange", "onFocusIn", "onFocusOut", "onFocusVisibleChange", "onHoverChange", "onHoverIn", "onHoverMove", "onHoverOut", "onPress", "onPressAction", "onPressChange", "onPressIn", "onPressOut", "preventContextMenu", "overlayDisabled", "overlayOffset", "overlayFocusRingPosition", "overlayFocusVisibleStyle", "overlayHoveredStyle", "overlayPressedStyle", "overlayFocused", "overlayRadius", "overlayXStyle", "suppressFocusRing", "testOnly_pressed", "testid", "pressedStyleValue", "style", "dynamicHoverTiltAngle", "dynamicHoverTranslationPercent", "showDynamicHover"], u = ["url"], c, d, m = d || (d = o("react")), p = d, _ = p.startTransition, f = p.useCallback, g = p.useRef;
    function h(t) {
        var n = t.ref
          , a = babelHelpers.objectWithoutPropertiesLoose(t, e)
          , i = a.allowClickEventPropagation
          , l = a.children
          , d = a.cursorDisabled
          , p = d === void 0 ? !1 : d
          , h = a.xstyle
          , y = a.disabled
          , C = y === void 0 ? !1 : y
          , b = a.display
          , v = a.expanding
          , S = v === void 0 ? b === "block" : v
          , R = a.hideFocusOverlay
          , L = R === void 0 ? !1 : R
          , E = a.isUsingCustomFocusRing
          , k = E === void 0 ? !1 : E
          , I = a.hideHoverOverlay
          , T = I === void 0 ? !1 : I
          , D = a.isContainerTarget
          , x = D === void 0 ? !1 : D
          , $ = a.linkProps
          , P = a.onFocusChange
          , N = a.onFocusIn
          , M = a.onFocusOut
          , w = a.onFocusVisibleChange
          , A = a.onHoverChange
          , F = a.onHoverIn
          , O = a.onHoverMove
          , B = a.onHoverOut
          , W = a.onPress
          , q = a.onPressAction
          , U = a.onPressChange
          , V = a.onPressIn
          , H = a.onPressOut
          , G = a.preventContextMenu
          , z = a.overlayDisabled
          , j = z === void 0 ? !1 : z
          , K = a.overlayOffset
          , Q = a.overlayFocusRingPosition
          , X = a.overlayFocusVisibleStyle
          , Y = a.overlayHoveredStyle
          , J = a.overlayPressedStyle
          , Z = a.overlayFocused
          , ee = Z === void 0 ? !1 : Z
          , te = a.overlayRadius
          , ne = a.overlayXStyle
          , re = a.suppressFocusRing
          , oe = re === void 0 ? !1 : re
          , ae = a.testOnly_pressed
          , ie = ae === void 0 ? !1 : ae
          , le = a.testid
          , se = a.pressedStyleValue
          , ue = a.style
          , ce = a.dynamicHoverTiltAngle
          , de = a.dynamicHoverTranslationPercent
          , me = a.showDynamicHover
          , pe = babelHelpers.objectWithoutPropertiesLoose(a, s)
          , _e = g(null)
          , fe = r("useMergeRefs")(n, _e)
          , ge = o("BaseDisabledContext").useBaseDisabledContext()
          , he = ge === !0 || C
          , ye = f(function(e) {
            W && W(e),
            !e.defaultPrevented && q != null && _(async function() {
                await q()
            })
        }, [W, q])
          , Ce = W != null || q != null ? ye : void 0
          , be = r("useCometPressableEventStates")({
            onFocusChange: P,
            onFocusVisibleChange: w,
            onHoverChange: A,
            onPressChange: U,
            ref: _e,
            testOnly_pressed: ie
        })
          , ve = be.focused
          , Se = be.focusVisible
          , Re = be.hovered
          , Le = be.onFocusChangeHandler
          , Ee = be.onFocusVisibleChangeHandler
          , ke = be.onHoverChangeHandler
          , Ie = be.onPressChangesHandler
          , Te = be.pressed
          , De = {
            onBlur: M,
            onClick: Ce != null ? Ce : W,
            onFocus: N,
            onFocusChange: Le,
            onFocusVisibleChange: Ee,
            onHoverChange: ke,
            onHoverEnd: B,
            onHoverMove: O,
            onHoverStart: F,
            onPressChange: Ie,
            onPressEnd: H,
            onPressStart: V
        }
          , xe = r("useCometPressableStyles")({
            cursorDisabled: p,
            disabled: he,
            display: b,
            expanding: S,
            focused: ve,
            focusVisible: Se,
            hideFocusOverlay: L,
            hovered: Re,
            isLink: $ != null,
            overlayDisabled: j,
            overlayFocusRingPosition: Q,
            pressed: Te,
            pressedStyleValue: se,
            suppressFocusRing: oe,
            xstyle: h
        })
          , $e = xe.pressedStyle
          , Pe = xe.xstyle;
        r("useCometPressableContextMenu")({
            isContainerTarget: x,
            linkProps: $,
            localRef: _e,
            onContextMenu: pe.onContextMenu,
            preventContextMenu: G
        });
        var Ne = r("useCometPressableBehavior")()
          , Me = Ne.isPlaceholder
          , we = Ne.suppressInteractiveElements
          , Ae = j ? null : m.jsx(r("CometPressableOverlay.react"), {
            focusRingPosition: Q,
            focusVisible: !L && (Se || ee),
            focusVisibleStyle: X,
            hovered: !T && Re,
            hoveredStyle: Y,
            offset: K,
            pressed: Te,
            pressedStyle: J,
            radius: te,
            showFocusRing: !k,
            xstyle: ne
        })
          , Fe = typeof l == "function" ? l({
            disabled: he,
            focused: ve,
            focusVisible: Se,
            hovered: Re,
            overlay: Ae,
            pressed: Te
        }) : m.jsxs(m.Fragment, {
            children: [l, Ae]
        })
          , Oe = babelHelpers.extends({}, ue, $e);
        if (we) {
            var Be = b === "inline" ? "span" : "div";
            return m.jsx(Be, babelHelpers.extends({
                display: b === "inline" ? b : "block",
                preventContextMenu: G
            }, pe, {
                className: (c || (c = r("stylex")))(Pe),
                "data-testid": void 0,
                ref: fe,
                style: Oe,
                children: Fe
            }))
        }
        if ($ != null) {
            var We = $.url
              , qe = babelHelpers.objectWithoutPropertiesLoose($, u)
              , Ue = babelHelpers.extends({}, qe, {
                href: We
            });
            return m.jsx(r("BaseLink.react"), babelHelpers.extends({}, De, pe, Ue, {
                brid: $.brid,
                disabled: he,
                display: b === "inline" ? b : "block",
                fbclid: $.fbclid,
                preventContextMenu: G,
                ref: fe,
                style: Oe,
                suppressFocusRing: !0,
                testid: void 0,
                xstyle: Pe,
                children: Fe
            }))
        }
        return m.jsx(r("BaseButton.react"), babelHelpers.extends({}, De, pe, {
            allowClickEventPropagation: i,
            disabled: he,
            display: b === "inline" ? b : "block",
            preventContextMenu: G,
            ref: fe,
            style: Oe,
            suppressFocusRing: !0,
            testid: void 0,
            xstyle: Pe,
            children: Fe
        }))
    }
    h.displayName = h.name + " [from " + i.id + "]",
    l.default = h
}
), 98);