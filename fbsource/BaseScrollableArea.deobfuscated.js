// ─────────────────────────────────────────────────────────────────────────────
// BaseScrollableArea.react — DEOBFUSCATED
// Original: Meta internal Comet UI, compiled by React Compiler + Metro bundler
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { isRTL } from "Locale";
import { isPlatform, isBrowser } from "UserAgent";
import { gkx } from "gkx";
import CometDebounce from "CometDebounce";
import ResizeObserver from "resize-observer-polyfill-deprecated";
import { useVisibilityObserver } from "useVisibilityObserver";
import BaseScrollableAreaContext from "BaseScrollableAreaContext";
import BasePopoverReflowSheetContext from "BasePopoverReflowSheetContext";
import CometVisualCompletionAttributes from "CometVisualCompletionAttributes";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SCROLL_STEP_PX      = 16;   // px per scroll step when clicking the track
const SCROLL_INTERVAL_MS  = 50;   // ms between scroll steps
const IS_RTL              = isRTL();

// ─────────────────────────────────────────────────────────────────────────────
// STYLE MAPS (Stylex atomic CSS → readable CSS)
// ─────────────────────────────────────────────────────────────────────────────

// Outer scrollable container styles
const containerStyles = {
  // Applied always
  default: {
    MsOverflowStyle:          "auto",       // IE scrollbar visibility
    MsScrollChaining:         "chained",    // IE scroll chaining
    MsScrollRails:            "railed",     // IE scroll rails
    WebkitOverflowScrolling:  "touch",      // iOS momentum scroll
    display:                  "flex",
    flexDirection:            "column",
    overflowX:                "hidden",
    overflowY:                "hidden",
    position:                 "relative",
    zIndex:                   "0",
  },

  // When expanding=true → fills parent height
  expanding: {
    flexBasis:  "auto",
    flexGrow:   "1",
    flexShrink: "1",
    minHeight:  "0",
  },

  // When hideScrollbar=true → hides native scrollbar visually
  hideScrollbar: {
    MsOverflowStyle: "none",
    scrollbarWidth:  "none",       // Firefox
    // "::-webkit-scrollbar" { display:none; height:0; width:0 }
  },

  // When horizontal=true → enable horizontal scroll
  horizontalAuto: {
    overflowX:            "auto",
    overscrollBehaviorX:  "contain",
  },

  // When horizontal=true AND (isReflowSheet OR hasScrollChaining) → allow scroll propagation
  horizontalOverScrollBehaviorAuto: {
    overscrollBehaviorX: "auto",
  },

  // Custom scrollbar mode only: 3D perspective for GPU-accelerated thumb positioning
  perspective: {
    perspective:       "1px",
    perspectiveOrigin: "top left",
    position:          "relative",
    transformStyle:    "preserve-3d",
  },

  // RTL: flip perspective origin to top right
  perspectiveRTL: {
    perspectiveOrigin: "top right",
  },

  // When vertical=true → enable vertical scroll
  verticalAuto: {
    overflowY:            "auto",
    overscrollBehaviorY:  "contain",
  },

  // When vertical=true AND (isReflowSheet OR hasScrollChaining)
  verticalOverScrollBehaviorAuto: {
    overscrollBehaviorY: "auto",
  },
};

// Scrollbar THUMB (draggable indicator) styles
const thumbStyles = {
  base: {
    boxSizing:              "border-box",
    display:                "block",
    insetInlineEnd:         "0",           // right in LTR, left in RTL
    opacity:                "0",           // hidden by default, shown on hover/scroll
    paddingTop:             "0",
    paddingBottom:          "0",
    paddingInlineStart:     "0",
    paddingInlineEnd:       "0",
    pointerEvents:          "none",
    position:               "absolute",
    top:                    "0",
    transformOrigin:        "right top",
    transitionDuration:     "0.2s",
    transitionProperty:     "opacity",
    transitionTimingFunction: "ease",
    width:                  "6px",
  },
  // When isHovered OR isScrolling OR isDragging → show thumb
  hovered: {
    opacity:          "1",
    transitionDuration: "0.1s",
  },
  // RTL: flip transform origin
  rtl: {
    transformOrigin: "left top",
  },
};

// Scrollbar TRACK (click area behind thumb) styles
const trackStyles = {
  base: {
    backgroundColor:        "rgba(0,0,0,0.15)",
    display:                "block",
    height:                 "100%",
    insetInlineEnd:         "0",
    opacity:                "0",
    position:               "absolute",
    top:                    "0",
    transitionDuration:     "0.3s",
    transitionProperty:     "opacity",
    transitionTimingFunction: "ease",
    width:                  "6px",
    // ":hover" { opacity: 1 }
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: shouldUseBrowserDefault
// Returns true when the custom scrollbar should NOT be used
// ─────────────────────────────────────────────────────────────────────────────
function shouldUseBrowserDefaultScrollbar() {
  return (
    isPlatform("iOS")            ||   // iOS handles scrolling natively
    isPlatform("Android")        ||   // Android too
    isBrowser("Edge")            ||   // Old Edge had custom scrollbar bugs
    isBrowser("IE")              ||   // IE doesn't support CSS scroll APIs
    isBrowser("Firefox < 64")    ||   // Old Firefox lacked needed APIs
    (gkx("19588") && isBrowser("Chrome >= 142"))  // Feature flag kill switch
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: stopAllEvents
// Fully stops a mouse event from propagating anywhere
// ─────────────────────────────────────────────────────────────────────────────
function stopAllEvents(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: ScrollSentinel
// An invisible div observed by IntersectionObserver.
// Fires onVisible when it enters the viewport.
// Used to detect scroll-to-top and scroll-to-bottom.
// ─────────────────────────────────────────────────────────────────────────────
function ScrollSentinel({ xstyle, onVisible, scrollerRef }) {
  // Build the IntersectionObserver root from the scroller ref
  const getRootElement = () => scrollerRef.current;

  const observerOptions = {
    root:       getRootElement,
    rootMargin: 0,
  };

  // useVisibilityObserver returns a ref to attach to the sentinel div
  const sentinelRef = useVisibilityObserver({ onVisible, options: observerOptions });

  return (
    <div
      ref={sentinelRef}
      style={{
        height:        "1px",
        opacity:       "0",
        pointerEvents: "none",
        position:      "absolute",
        width:         "100%",
        ...xstyle,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: ScrollTopSentinel
// Fires onScrollTop when user scrolls back to the very top
// ─────────────────────────────────────────────────────────────────────────────
function ScrollTopSentinel({ onVisible, scrollerRef }) {
  return (
    <ScrollSentinel
      onVisible={onVisible}
      scrollerRef={scrollerRef}
      xstyle={{ top: "0" }}   // positioned at the top of the content
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENT: ScrollBottomSentinel
// Fires onScrollBottom when user reaches the very bottom
// ─────────────────────────────────────────────────────────────────────────────
function ScrollBottomSentinel({ onVisible, scrollerRef }) {
  return (
    <ScrollSentinel
      onVisible={onVisible}
      scrollerRef={scrollerRef}
      xstyle={{ bottom: "0" }}   // positioned at the bottom of the content
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: BaseScrollableArea
// ─────────────────────────────────────────────────────────────────────────────
function BaseScrollableArea(props, forwardedRef) {
  // ── Destructure all props ─────────────────────────────────────────────────
  const {
    children,
    contentRef,           // optional external ref to the inner content wrapper
    expanding    = false, // flex-grow: fills parent
    forceBrowserDefault = false, // skip custom scrollbar, use native
    hasScrollChaining,    // allow scroll to propagate to parent (null = use feature flag)
    hideScrollbar = false,// hide scrollbar visually
    horizontal,           // enable horizontal scrolling
    id,                   // html id attribute
    indicatorStyle,       // custom style for scroll thumb
    nestedScrollEnabled,  // allow nested scroll areas (unused here, passed through)
    onScroll,             // scroll event callback
    onScrollBottom,       // fired when scrolled to bottom
    onScrollEnd,          // fired when scroll animation ends (native)
    onScrollTop,          // fired when scrolled back to top
    persistentScrollbar,  // always show scrollbar (unused here)
    role,                 // aria role
    scrollThumbXStyle,    // custom style for horizontal thumb
    scrollTracePolicy,    // analytics data attribute
    scrollTrackXStyle,    // custom style for track
    style,                // inline style override
    tabIndex,             // keyboard focus
    testid,               // data-testid (stripped in production)
    vertical,             // enable vertical scrolling
    withBottomShadow = false, // show gradient shadow at bottom edge
    withTopShadow    = false, // show gradient shadow at top edge
    xstyle,               // Stylex style overrides
    ...restProps          // everything else (aria-*, data-*, event handlers)
  } = props;

  // ── Feature flag: scroll chaining ────────────────────────────────────────
  // hasScrollChaining prop takes priority; falls back to gkx flag "8581"
  const scrollChainingEnabled = hasScrollChaining ?? gkx("8581");

  // ── Decide render mode ────────────────────────────────────────────────────
  // useForceBrowserDefault = true  → simple native scrollbar render
  // useForceBrowserDefault = false → custom scrollbar render (default for desktop)
  const useForceBrowserDefault = (
    forceBrowserDefault ||
    !vertical           ||   // not a vertical scroller → no custom scrollbar needed
    hideScrollbar       ||   // scrollbar hidden anyway → custom is pointless
    horizontal          ||   // horizontal scroll → not supported by custom scrollbar
    shouldUseBrowserDefaultScrollbar()
  );

  // ── Context ───────────────────────────────────────────────────────────────
  const { isReflowSheet } = useContext(BasePopoverReflowSheetContext);
  const parentScrollContexts = useContext(BaseScrollableAreaContext);

  // ── State ─────────────────────────────────────────────────────────────────
  const [isHovered,   setIsHovered]   = useState(false); // mouse over container
  const [isScrolling, setIsScrolling] = useState(false); // currently scrolling
  const [isDragging,  setIsDragging]  = useState(false); // dragging thumb

  // ── Refs ──────────────────────────────────────────────────────────────────
  const innerContentRef = useRef(null); // inner content wrapper div (for height calc)
  const scrollerRef     = useRef(null); // outer scrollable div
  const thumbRef        = useRef(null); // the draggable thumb element
  const trackRef        = useRef(null); // the scrollbar track element
  const scrollTimeoutRef = useRef(null);// timeout ID for hiding scrollbar
  const totalScrollHeight = useRef(0);  // cached total scrollable content height

  // ── Imperative handle ─────────────────────────────────────────────────────
  // Exposes getDOMNode() so parent components can access the scroller DOM node
  const scrollerHandle = { getDOMNode: () => scrollerRef.current };
  useImperativeHandle(forwardedRef, () => scrollerHandle, [scrollerHandle]);

  // ── Build context value ───────────────────────────────────────────────────
  // Append this scroll area to the list of ancestor scroll areas
  // so deeply nested components can find their nearest scroll container
  const scrollContextValue = [...parentScrollContexts, scrollerHandle];

  // ── Custom scrollbar setup effect ────────────────────────────────────────
  // Only runs when useForceBrowserDefault=false (custom scrollbar mode)
  useEffect(() => {
    if (useForceBrowserDefault) return; // skip in native mode

    const scroller     = scrollerRef.current;
    const innerContent = innerContentRef.current;
    const externalContent = contentRef?.current ?? innerContent;
    const track        = trackRef.current;
    const thumb        = thumbRef.current;

    // Exit early if any required element is missing
    if (!scroller || !innerContent || !externalContent || !track || !thumb) return;

    let thumbHeight      = 0; // computed thumb height in px
    let containerTop     = 0; // scroller's top offset from viewport

    // ── recalculate(): recompute scrollbar dimensions ──
    // Called on mount and whenever the container or content resizes
    function recalculate() {
      // Temporarily hide both elements to get clean getBoundingClientRect
      track.style.display = "none";
      thumb.style.display = "none";

      const scrollerRect  = scroller.getBoundingClientRect();
      const contentRect   = externalContent.getBoundingClientRect();
      const scrollerScrollHeight  = scroller.scrollHeight;
      const innerScrollHeight     = innerContent.scrollHeight;
      const externalScrollHeight  = externalContent.scrollHeight;

      // heightDiff: difference between inner and external content heights
      // This handles the case where contentRef points to a nested element
      const heightDiff       = innerScrollHeight - externalScrollHeight;
      const hasHeightDiff    = heightDiff !== 0;

      // Effective visible height of the scroller (subtract any height diff)
      const visibleHeight    = scroller.clientHeight - heightDiff;

      containerTop = scrollerRect.top;

      // Total scrollable height
      totalScrollHeight.current = hasHeightDiff ? externalScrollHeight : scrollerScrollHeight;
      const totalHeight = totalScrollHeight.current;

      // thumb height = visibleHeight² / totalHeight  (proportional sizing)
      thumbHeight = Math.pow(visibleHeight, 2) / totalHeight;

      // Set track height to total scrollable height
      track.style.height = `${totalHeight}px`;
      // Set thumb height (0 if content fits in view)
      thumb.style.height = totalHeight <= visibleHeight ? "0px" : `${thumbHeight}px`;

      // Position scrollbar on correct side (RTL = left, LTR = right)
      const side = IS_RTL ? "left" : "right";
      track.style[side] = "0px";
      thumb.style[side] = "0px";

      // Compute vertical offset for nested content scenario
      const currentScrollTop = scroller.scrollTop;
      const contentOffsetTop = contentRect.top - scrollerRect.top + currentScrollTop;
      let perspectiveOffset  = 0;

      if (hasHeightDiff) {
        // Offset thumb and track to align with external content
        perspectiveOffset = contentOffsetTop * -1;
        track.style.top = `${contentOffsetTop}px`;
        thumb.style.top = `${contentOffsetTop}px`;
      }

      // ── 3D perspective transform for GPU-accelerated thumb positioning ──
      // This positions the thumb along the Y axis without triggering layout reflow.
      // The perspective matrix creates a 3D context; translateZ and scale
      // are used to position the thumb within that context.
      const scrollRatio  = (visibleHeight - thumbHeight) / (totalHeight - visibleHeight);
      thumb.style.transform = [
        `matrix3d(
          1,0,0,0,
          0,1,0,0,
          0,${perspectiveOffset},1,0,
          0,0,0,-1)`,
        `scale(${1 / scrollRatio})`,
        `translateZ(${(1 - 1 / scrollRatio)}px)`,
        `translateZ(-2px)`,
      ].join(" ");

      // Show elements now that we're done measuring
      thumb.style.display = "block";
      track.style.display = totalHeight <= visibleHeight ? "none" : "block";
    }

    // ── handleTrackMouseDown(): user clicked on the scrollbar track ──
    function handleTrackMouseDown(event) {
      stopAllEvents(event);

      const clickY        = event.clientY;
      const clientHeight  = scroller.clientHeight;
      const scrollTop     = scroller.scrollTop;

      setIsDragging(true);

      // scrollRatio: how many px of content per px of visible height
      const scrollRatio   = totalScrollHeight.current / clientHeight;
      // thumbTop: current position of thumb in viewport coordinates
      const thumbTop      = scrollTop / scrollRatio;

      // ── Click OUTSIDE the thumb → jump scroll ──
      if (clickY < containerTop + thumbTop || clickY > containerTop + thumbTop + thumbHeight) {
        const direction = clickY < containerTop + thumbTop ? -SCROLL_STEP_PX : SCROLL_STEP_PX;
        let isInside    = true;

        // Continuously scroll while mouse is held down
        const scrollInterval = window.setInterval(() => {
          if (isInside) {
            scroller.scrollTo({ top: scroller.scrollTop + direction });
          }
        }, SCROLL_INTERVAL_MS);

        // Stop scrolling when mouse is released
        function onMouseUp(e) {
          stopAllEvents(e);
          window.clearInterval(scrollInterval);
          window.removeEventListener("mouseup", onMouseUp, true);
          track.removeEventListener("mouseenter", onMouseEnterTrack);
          track.removeEventListener("mouseleave", onMouseLeaveTrack);
        }

        // Pause scrolling when mouse leaves the track, resume on re-enter
        function onMouseEnterTrack(e) { stopAllEvents(e); isInside = true;  }
        function onMouseLeaveTrack(e) { stopAllEvents(e); isInside = false; }

        window.addEventListener("mouseup", onMouseUp, true);
        track.addEventListener("mouseenter", onMouseEnterTrack);
        track.addEventListener("mouseleave", onMouseLeaveTrack);
        return;
      }

      // ── Click ON the thumb → drag to scroll ──
      const startY         = clickY;
      const startScrollTop = scrollTop;

      function onMouseMove(e) {
        stopAllEvents(e);
        const deltaY = e.clientY - startY;
        scroller.scrollTo({ top: startScrollTop + deltaY * scrollRatio });
      }

      function onMouseUp(e) {
        stopAllEvents(e);
        setIsDragging(false);
        window.removeEventListener("mousemove", onMouseMove, true);
        window.removeEventListener("mouseup",   onMouseUp,   true);
      }

      window.addEventListener("mousemove", onMouseMove, true);
      window.addEventListener("mouseup",   onMouseUp,   true);
    }

    // ── Debounced recalculate (wait 100ms after last resize event) ──
    const debouncedRecalculate = CometDebounce(recalculate, { wait: 100 });

    // ── Set up listeners ──
    window.addEventListener("resize", debouncedRecalculate);
    track.addEventListener("mousedown", handleTrackMouseDown);

    // ResizeObserver watches both the inner content and scroller for size changes
    const resizeObserver = new ResizeObserver(debouncedRecalculate);
    resizeObserver.observe(innerContent);
    resizeObserver.observe(scroller);

    // ── Cleanup on unmount ──
    return () => {
      window.removeEventListener("resize", debouncedRecalculate);
      track.removeEventListener("mousedown", handleTrackMouseDown);
      resizeObserver.disconnect();
      debouncedRecalculate.reset();
    };
  }, [contentRef, scrollerRef, useForceBrowserDefault]);

  // ── Clear scroll timeout on unmount ──
  useEffect(() => {
    return () => { window.clearTimeout(scrollTimeoutRef.current); };
  }, []);

  // ── Event handlers ────────────────────────────────────────────────────────

  // Show scrollbar on mouse enter
  function handleMouseEnter() { setIsHovered(true);  }

  // Hide scrollbar on mouse leave
  function handleMouseLeave() { setIsHovered(false); }

  // Show scrollbar while scrolling, hide after 1 second of inactivity
  function handleScroll(event) {
    onScroll?.(event);
    setIsScrolling(true);
    window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }

  // ── Compute aria role ─────────────────────────────────────────────────────
  // Explicit role prop wins; if tabIndex=0, default to "region" for a11y
  const ariaRole = role ?? (tabIndex === 0 ? "region" : undefined);

  // ── Static shadow elements (memoized forever — no deps) ──────────────────
  // Top shadow gradient — shown when withTopShadow=true
  const topShadowElement = (
    <div
      style={{
        display:         "flex",
        flexDirection:   "column",
        flexShrink:      "0",
        left:            "0",
        right:           "0",
        pointerEvents:   "none",
        position:        "absolute",
        top:             "0",
        justifyContent:  "flex-start",
        // gradient fading from dark to transparent, top to bottom
      }}
    >
      <div style={{ flexShrink: "0" }} />
    </div>
  );

  // Bottom shadow gradient — shown when withBottomShadow=true
  const bottomShadowElement = (
    <div
      style={{
        display:         "flex",
        flexDirection:   "column",
        flexShrink:      "0",
        left:            "0",
        right:           "0",
        pointerEvents:   "none",
        position:        "absolute",
        bottom:          "0",
        justifyContent:  "flex-end",
        // gradient fading from transparent to dark, top to bottom
      }}
    >
      <div style={{ flexShrink: "0" }} />
    </div>
  );

  // ── Compute content wrapper className (bitmask lookup) ───────────────────
  // Meta pre-computes 8 className combinations using a 3-bit bitmask:
  //   bit 2 (4): horizontal=true AND vertical=false
  //   bit 1 (2): withTopShadow=true
  //   bit 0 (1): withBottomShadow=true
  //
  // This avoids computing class strings at runtime — just index into the map.
  const contentWrapperKey = (
    (!!(horizontal && !vertical) << 2) |
    (!!(withTopShadow)            << 1) |
    (!!(withBottomShadow)         << 0)
  );

  const CONTENT_WRAPPER_CLASSES = {
    0: "flex column grow relative",                            // vertical, no shadows
    4: "flex row grow relative",                               // horizontal, no shadows
    2: "flex column grow relative withTopOverflow",            // vertical, top shadow
    6: "flex row grow relative withTopOverflow",               // horizontal, top shadow
    1: "flex column grow relative withBottomOverflow",         // vertical, bottom shadow
    5: "flex row grow relative withBottomOverflow",            // horizontal, bottom shadow
    3: "flex column grow relative withTopOverflow withBottomOverflow", // vertical, both
    7: "flex row grow relative withTopOverflow withBottomOverflow",    // horizontal, both
  };
  // NOTE: In the actual code these are atomic Stylex class names (e.g. "x78zum5 xdt5ytf")
  // We represent them descriptively here

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER MODE A: forceBrowserDefault=true
  // Simple native scrollbar — lighter DOM, no custom scrollbar elements
  // ─────────────────────────────────────────────────────────────────────────
  if (useForceBrowserDefault) {
    const nativeScrollerStyles = {
      ...containerStyles.default,
      ...(expanding    && containerStyles.expanding),
      ...(hideScrollbar && containerStyles.hideScrollbar),
      ...(horizontal   && containerStyles.horizontalAuto),
      ...(horizontal   && (isReflowSheet || scrollChainingEnabled) && containerStyles.horizontalOverScrollBehaviorAuto),
      ...(vertical     && containerStyles.verticalAuto),
      ...(vertical     && (isReflowSheet || scrollChainingEnabled) && containerStyles.verticalOverScrollBehaviorAuto),
      ...xstyle,
    };

    // Sentinel for onScrollTop
    const scrollTopSentinel = onScrollTop
      ? <ScrollTopSentinel    onVisible={onScrollTop}    scrollerRef={scrollerRef} />
      : null;

    // Sentinel for onScrollBottom
    const scrollBottomSentinel = onScrollBottom
      ? <ScrollBottomSentinel onVisible={onScrollBottom} scrollerRef={scrollerRef} />
      : null;

    return (
      <BaseScrollableAreaContext.Provider value={scrollContextValue}>
        <div
          {...restProps}
          style={{ ...nativeScrollerStyles, ...style }}
          data-testid={undefined}  // stripped in production
          id={id}
          onScroll={handleScroll}
          onScrollEnd={onScrollEnd}
          ref={scrollerRef}
          role={ariaRole}
          tabIndex={tabIndex}
        >
          {/* Top shadow gradient */}
          {withTopShadow && topShadowElement}

          {/* Content wrapper */}
          <div className={CONTENT_WRAPPER_CLASSES[contentWrapperKey]}>
            {scrollTopSentinel}
            {children}
            {scrollBottomSentinel}
          </div>

          {/* Bottom shadow gradient */}
          {withBottomShadow && bottomShadowElement}
        </div>
      </BaseScrollableAreaContext.Provider>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER MODE B: Custom scrollbar (default desktop mode)
  // Uses 3D perspective transform for GPU-accelerated scrollbar thumb
  // ─────────────────────────────────────────────────────────────────────────

  const customScrollerStyles = {
    ...containerStyles.default,
    ...containerStyles.hideScrollbar,  // always hide native scrollbar in custom mode
    ...(expanding  && containerStyles.expanding),
    // perspective transform for 3D thumb positioning
    ...containerStyles.perspective,
    ...(IS_RTL     && containerStyles.perspectiveRTL),
    ...(horizontal && containerStyles.horizontalAuto),
    ...(horizontal && (isReflowSheet || scrollChainingEnabled) && containerStyles.horizontalOverScrollBehaviorAuto),
    ...(vertical   && containerStyles.verticalAuto),
    ...(vertical   && (isReflowSheet || scrollChainingEnabled) && containerStyles.verticalOverScrollBehaviorAuto),
    ...xstyle,
  };

  // Scrollbar TRACK: the clickable background area
  const trackStyles_computed = { ...trackStyles.base, ...scrollTrackXStyle };
  const trackElement = (
    <div
      {...trackStyles_computed}
      {...CometVisualCompletionAttributes.IGNORE}  // exclude from visual completion tracking
      data-thumb={1}
      ref={trackRef}
    />
  );

  // Scrollbar THUMB inner indicator
  const thumbInnerElement = (
    <div
      style={{
        // inner pill-shaped indicator
        borderRadius:     "3px",
        width:            "100%",
        height:           "100%",
      }}
    />
  );

  // Scrollbar THUMB: the draggable indicator
  // Shows when: isHovered OR isScrolling OR isDragging
  const thumbStyles_computed = {
    ...thumbStyles.base,
    ...(IS_RTL                              && thumbStyles.rtl),
    ...((isHovered || isScrolling || isDragging) && thumbStyles.hovered),
    ...indicatorStyle,
  };
  const thumbElement = (
    <div
      {...thumbStyles_computed}
      {...CometVisualCompletionAttributes.IGNORE}
      data-thumb={1}
      ref={thumbRef}
    >
      {thumbInnerElement}
    </div>
  );

  // Sentinel for onScrollTop
  const scrollTopSentinel = onScrollTop
    ? <ScrollTopSentinel    onVisible={onScrollTop}    scrollerRef={scrollerRef} />
    : null;

  // Sentinel for onScrollBottom
  const scrollBottomSentinel = onScrollBottom
    ? <ScrollBottomSentinel onVisible={onScrollBottom} scrollerRef={scrollerRef} />
    : null;

  return (
    <BaseScrollableAreaContext.Provider value={scrollContextValue}>
      <div
        {...restProps}
        style={{ ...customScrollerStyles, ...style }}
        data-scrolltracepolicy={scrollTracePolicy}
        data-testid={undefined}   // stripped in production
        id={id}
        onMouseEnter={handleMouseEnter}   // → isHovered=true  → show scrollbar
        onMouseLeave={handleMouseLeave}   // → isHovered=false → hide scrollbar
        onScroll={handleScroll}           // → isScrolling=true → hide after 1s
        ref={scrollerRef}
        role={ariaRole}
        tabIndex={tabIndex}
      >
        {/* Top shadow gradient */}
        {withTopShadow && topShadowElement}

        {/* Content wrapper — holds children + sentinels */}
        <div
          className={CONTENT_WRAPPER_CLASSES[contentWrapperKey]}
          ref={innerContentRef}
        >
          {scrollTopSentinel}
          {children}
          {scrollBottomSentinel}
        </div>

        {/* Bottom shadow gradient */}
        {withBottomShadow && bottomShadowElement}

        {/* Custom scrollbar TRACK (clickable background) */}
        {trackElement}

        {/* Custom scrollbar THUMB (draggable indicator) */}
        {thumbElement}

      </div>
    </BaseScrollableAreaContext.Provider>
  );
}

export default BaseScrollableArea;
