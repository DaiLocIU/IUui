<template>
  <div
    ref="scrollerRef"
    v-bind="restAttrs"
    :id="id"
    :role="ariaRole"
    :tabindex="tabIndex"
    :style="[computedContainerStyle, style]"
    :data-scrolltracepolicy="scrollTracePolicy || undefined"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @scroll="handleScroll"
  >
    <div v-if="props.withTopShadow" :style="topShadowStyle">
      <div :style="topShadowInnerStyle" />
    </div>

    <div
      :ref="!useForceBrowserDefault ? 'innerContentRef' : undefined"
      :style="contentWrapperStyle"
    >
      <div v-if="onScrollTop" ref="topSentinelRef" :style="topSentinelStyle" />
      <slot />
      <div
        v-if="onScrollBottom"
        ref="bottomSentinelRef"
        :style="bottomSentinelStyle"
      />
    </div>

    <div v-if="props.withBottomShadow" :style="bottomShadowStyle">
      <div :style="bottomShadowInnerStyle" />
    </div>

    <div
      v-if="!useForceBrowserDefault"
      ref="trackRef"
      data-thumb="1"
      data-visualcompletion="ignore"
      :class="[
        'absolute top-0 block h-full w-4 bg-black/15 opacity-0 transition-opacity duration-300 ease-in-out',
        IS_RTL ? 'left-0' : 'right-0',
      ]"
      :style="props.scrollTrackXStyle"
    />

    <div
      v-if="!useForceBrowserDefault"
      ref="thumbRef"
      data-thumb="1"
      data-visualcompletion="ignore"
      :style="computedThumbStyle"
    >
      <div :style="thumbInnerStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useAttrs,
  watch,
  type CSSProperties,
} from "vue";

import { useBasePopoverReflowSheetContext } from "../composables/useBasePopoverReflowSheetContext";
import {
  provideBaseScrollableAreaContext,
  useBaseScrollableAreaContext,
} from "../composables/useBaseScrollableAreaContext";

const SCROLL_STEP_PX = 16;
const SCROLL_INTERVAL_MS = 50;
const IS_RTL =
  typeof document !== "undefined"
    ? document.documentElement.dir === "rtl"
    : false;

interface Props {
  contentRef?: { current: HTMLElement | null };
  expanding?: boolean;
  forceBrowserDefault?: boolean;
  hasScrollChaining?: boolean | null;
  hideScrollbar?: boolean;
  horizontal?: boolean;
  id?: string;
  indicatorStyle?: CSSProperties;
  nestedScrollEnabled?: boolean;
  persistentScrollbar?: boolean;
  role?: string;
  scrollThumbXStyle?: CSSProperties;
  scrollTracePolicy?: string;
  scrollTrackXStyle?: CSSProperties;
  style?: CSSProperties;
  tabIndex?: number;
  testid?: string;
  vertical?: boolean;
  withBottomShadow?: boolean;
  withTopShadow?: boolean;
  xstyle?: CSSProperties;
  onScrollTop?: () => void;
  onScrollBottom?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  expanding: false,
  forceBrowserDefault: false,
  hasScrollChaining: null,
  hideScrollbar: false,
  horizontal: false,
  nestedScrollEnabled: false,
  persistentScrollbar: false,
  vertical: false,
  withBottomShadow: false,
  withTopShadow: false,
});

const emit = defineEmits<{
  (e: "scroll", payload: Event): void;
  (e: "scrollEnd", payload: Event): void;
}>();

const attrs = useAttrs();
const restAttrs = computed(() => {
  const { testid: _testid, ...rest } = attrs as Record<string, unknown>;
  return rest;
});

const popoverCtx = useBasePopoverReflowSheetContext();
const parentScrollContexts = useBaseScrollableAreaContext();
const isReflowSheet = computed(() => popoverCtx?.isReflowSheet ?? false);

const scrollerRef = ref<HTMLElement | null>(null);
const innerContentRef = ref<HTMLElement | null>(null);
const thumbRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const topSentinelRef = ref<HTMLElement | null>(null);
const bottomSentinelRef = ref<HTMLElement | null>(null);
const scrollTimeoutRef = ref<number | null>(null);
let totalScrollHeight = 0;

provideBaseScrollableAreaContext([
  ...(parentScrollContexts ?? []),
  { getDOMNode: () => scrollerRef.value },
]);

function shouldUseBrowserDefaultScrollbar(): boolean {
  if (typeof navigator === "undefined") return true;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod|Android/i.test(ua);
}

const scrollChainingEnabled = computed(() =>
  props.hasScrollChaining !== null ? props.hasScrollChaining : true,
);

const useForceBrowserDefault = computed(
  () =>
    props.forceBrowserDefault ||
    !props.vertical ||
    props.hideScrollbar ||
    props.horizontal ||
    shouldUseBrowserDefaultScrollbar(),
);

const ariaRole = computed(
  () => props.role ?? (props.tabIndex === 0 ? "region" : undefined),
);

const isHovered = ref(false);
const isScrolling = ref(false);
const isDragging = ref(false);

const computedContainerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    MsOverflowStyle: "auto",
    WebkitOverflowScrolling: "touch",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "relative",
    zIndex: "0",
  } as CSSProperties;

  if (props.expanding) {
    style.flexBasis = "auto";
    style.flexGrow = "1";
    style.flexShrink = "1";
    style.minHeight = "0";
  }

  if (!useForceBrowserDefault.value) {
    style.scrollbarWidth = "none";
    (style as CSSProperties & { MsOverflowStyle?: string }).MsOverflowStyle =
      "none";
    style.perspective = "1px";
    style.perspectiveOrigin = "right top";
    style.transformStyle = "preserve-3d";
  } else if (props.hideScrollbar) {
    style.scrollbarWidth = "none";
    (style as CSSProperties & { MsOverflowStyle?: string }).MsOverflowStyle =
      "none";
  }

  if (props.horizontal) {
    style.overflowX = "auto";
    style.overscrollBehaviorX =
      isReflowSheet.value || scrollChainingEnabled.value ? "auto" : "contain";
  }

  if (props.vertical) {
    style.overflowY = "auto";
    style.overscrollBehaviorY =
      isReflowSheet.value || scrollChainingEnabled.value ? "auto" : "contain";
  }

  return { ...style, ...props.xstyle };
});

const contentWrapperStyle = computed<CSSProperties>(() => ({
  display: "flex",
  flexDirection: props.horizontal && !props.vertical ? "row" : "column",
  flexGrow: "1",
  position: "relative",
}));

const computedThumbStyle = computed<CSSProperties>(() => ({
  boxSizing: "border-box",
  display: "block",
  opacity:
    isHovered.value || isScrolling.value || isDragging.value || props.persistentScrollbar
      ? "1"
      : "0",
  paddingTop: "0",
  paddingBottom: "0",
  paddingInlineStart: "4px",
  paddingInlineEnd: "4px",
  pointerEvents: "none",
  position: "absolute",
  top: "0",
  transformOrigin: IS_RTL ? "left top" : "right top",
  transitionDuration:
    isHovered.value || isScrolling.value || isDragging.value || props.persistentScrollbar
      ? "0.1s"
      : "0.2s",
  transitionProperty: "opacity",
  transitionTimingFunction: "ease",
  width: "16px",
  ...(IS_RTL ? { left: "0" } : { right: "0" }),
  ...props.indicatorStyle,
}));

const thumbInnerStyle: CSSProperties = {
  borderRadius: "3px",
  background: "rgba(0,0,0,0.3)",
  width: "100%",
  height: "100%",
};
const topSentinelStyle: CSSProperties = {
  height: "1px",
  opacity: "0",
  pointerEvents: "none",
  position: "absolute",
  width: "100%",
  top: "0",
};

const bottomSentinelStyle: CSSProperties = {
  height: "1px",
  opacity: "0",
  pointerEvents: "none",
  position: "absolute",
  width: "100%",
  bottom: "0",
};

const topShadowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flexShrink: "0",
  left: "0",
  right: "0",
  pointerEvents: "none",
  position: "absolute",
  top: "0",
  justifyContent: "flex-start",
  zIndex: "1",
};

const bottomShadowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flexShrink: "0",
  left: "0",
  right: "0",
  pointerEvents: "none",
  position: "absolute",
  bottom: "0",
  justifyContent: "flex-end",
  zIndex: "1",
};

const topShadowInnerStyle: CSSProperties = {
  flexShrink: "0",
  height: "16px",
  width: "100%",
  background:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0))",
};

const bottomShadowInnerStyle: CSSProperties = {
  flexShrink: "0",
  height: "16px",
  width: "100%",
  background:
    "linear-gradient(to top, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0))",
};

function stopAllEvents(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function handleMouseEnter() {
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
}

function handleScroll(event: Event) {
  emit("scroll", event);
  isScrolling.value = true;

  if (scrollTimeoutRef.value !== null) {
    window.clearTimeout(scrollTimeoutRef.value);
  }

  scrollTimeoutRef.value = window.setTimeout(() => {
    isScrolling.value = false;
    emit("scrollEnd", event);
  }, 1000) as unknown as number;
}

let cleanupCustomScrollbar: (() => void) | null = null;


function setupCustomScrollbar() {
  cleanupCustomScrollbar?.()
  cleanupCustomScrollbar = null

  if (useForceBrowserDefault.value) return

  const scroller        = scrollerRef.value
  const innerContent    = innerContentRef.value
  const externalContent = props.contentRef?.current ?? innerContent
  const track           = trackRef.value
  const thumb           = thumbRef.value

  if (!scroller || !innerContent || !externalContent || !track || !thumb) return

  const safeScroller        = scroller
  const safeInnerContent    = innerContent
  const safeExternalContent = externalContent
  const safeTrack           = track
  const safeThumb           = thumb

  let thumbHeight = 0
  // containerTop declared but will be re-read fresh in handleTrackMouseDown (Bug 2 fix)

  function recalculate() {
    safeTrack.style.display = 'none'
    safeThumb.style.display = 'none'

    const scrollerRect         = safeScroller.getBoundingClientRect()
    const contentRect          = safeExternalContent.getBoundingClientRect()
    const scrollerScrollHeight = safeScroller.scrollHeight
    const innerScrollHeight    = safeInnerContent.scrollHeight
    const externalScrollHeight = safeExternalContent.scrollHeight

    const heightDiff    = innerScrollHeight - externalScrollHeight
    const hasHeightDiff = heightDiff !== 0
    const visibleHeight = safeScroller.clientHeight - heightDiff

    totalScrollHeight = hasHeightDiff ? externalScrollHeight : scrollerScrollHeight
    const totalHeight = totalScrollHeight

    thumbHeight = Math.pow(visibleHeight, 2) / totalHeight

    safeTrack.style.height = `${totalHeight}px`
    safeThumb.style.height = totalHeight <= visibleHeight ? '0px' : `${thumbHeight}px`

    const side = IS_RTL ? 'left' : 'right'
    safeTrack.style.setProperty(side, '0px')
    safeThumb.style.setProperty(side, '0px')

    const currentScrollTop = safeScroller.scrollTop
    const contentOffsetTop = contentRect.top - scrollerRect.top + currentScrollTop
    let perspectiveOffset  = 0

    // BUG 3 FIX: always reset top in both branches
    if (hasHeightDiff) {
      perspectiveOffset       = contentOffsetTop * -1
      safeTrack.style.top     = `${contentOffsetTop}px`
      safeThumb.style.top     = `${contentOffsetTop}px`
    } else {
      safeTrack.style.top = '0px'  // ← was missing, caused stale offset
      safeThumb.style.top = '0px'
    }

    // BUG 1 FIX: guard against division by zero when content == visible height
    const scrollRatio = (visibleHeight - thumbHeight) / (totalHeight - visibleHeight)
    const safeRatio   = Math.max(scrollRatio, 0.0001)

    safeThumb.style.transform = [
      `matrix3d(1,0,0,0,0,1,0,0,0,${perspectiveOffset},1,0,0,0,0,-1)`,
      `scale(${1 / safeRatio})`,
      `translateZ(${1 - 1 / safeRatio}px)`,
      `translateZ(-2px)`,
    ].join(' ')

    safeThumb.style.display = 'block'
    safeTrack.style.display = totalHeight <= visibleHeight ? 'none' : 'block'
  }

  function handleTrackMouseDown(event: MouseEvent) {
    stopAllEvents(event)

    // BUG 2 FIX: always read fresh — page scroll moves the scroller
    // so containerTop from last recalculate() is stale
    const containerTop = safeScroller.getBoundingClientRect().top

    const clickY       = event.clientY
    const clientHeight = safeScroller.clientHeight
    const scrollTop    = safeScroller.scrollTop

    isDragging.value = true

    const scrollRatio  = totalScrollHeight / clientHeight
    const thumbTop     = scrollTop / scrollRatio

    if (clickY < containerTop + thumbTop || clickY > containerTop + thumbTop + thumbHeight) {
      const direction = clickY < containerTop + thumbTop ? -SCROLL_STEP_PX : SCROLL_STEP_PX
      let isInside = true

      const scrollInterval = window.setInterval(() => {
        if (isInside) safeScroller.scrollTo({ top: safeScroller.scrollTop + direction })
      }, SCROLL_INTERVAL_MS)

      function onMouseUp(e: MouseEvent) {
        stopAllEvents(e)
        window.clearInterval(scrollInterval)
        window.removeEventListener('mouseup', onMouseUp, true)
        safeTrack.removeEventListener('mouseenter', onMouseEnterTrack)
        safeTrack.removeEventListener('mouseleave', onMouseLeaveTrack)
        isDragging.value = false
      }

      function onMouseEnterTrack(e: MouseEvent) { stopAllEvents(e); isInside = true  }
      function onMouseLeaveTrack(e: MouseEvent) { stopAllEvents(e); isInside = false }

      window.addEventListener('mouseup', onMouseUp, true)
      safeTrack.addEventListener('mouseenter', onMouseEnterTrack)
      safeTrack.addEventListener('mouseleave', onMouseLeaveTrack)
      return
    }

    const startY         = clickY
    const startScrollTop = scrollTop

    function onMouseMove(e: MouseEvent) {
      stopAllEvents(e)
      safeScroller.scrollTo({ top: startScrollTop + (e.clientY - startY) * scrollRatio })
    }

    function onMouseUp(e: MouseEvent) {
      stopAllEvents(e)
      isDragging.value = false
      window.removeEventListener('mousemove', onMouseMove, true)
      window.removeEventListener('mouseup',   onMouseUp,   true)
    }

    window.addEventListener('mousemove', onMouseMove, true)
    window.addEventListener('mouseup',   onMouseUp,   true)
  }

  const debouncedRecalculate = useDebounceFn(recalculate, 100)

  window.addEventListener('resize', debouncedRecalculate)
  safeTrack.addEventListener('mousedown', handleTrackMouseDown)

  const resizeObserver = new ResizeObserver(debouncedRecalculate)
  resizeObserver.observe(safeInnerContent)
  resizeObserver.observe(safeScroller)

  nextTick(() => recalculate())

  cleanupCustomScrollbar = () => {
    window.removeEventListener('resize', debouncedRecalculate)
    safeTrack.removeEventListener('mousedown', handleTrackMouseDown)
    resizeObserver.disconnect()
  }
}

let topObserver: IntersectionObserver | null = null;
let bottomObserver: IntersectionObserver | null = null;

function setupSentinels() {
  topObserver?.disconnect();
  bottomObserver?.disconnect();
  topObserver = null;
  bottomObserver = null;

  const scroller = scrollerRef.value;
  const topSentinel = topSentinelRef.value;
  const bottomSentinel = bottomSentinelRef.value;

  if (topSentinel && scroller && props.onScrollTop) {
    topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) props.onScrollTop?.();
      },
      { root: scroller, rootMargin: "0px", threshold: 0 },
    );
    topObserver.observe(topSentinel);
  }

  if (bottomSentinel && scroller && props.onScrollBottom) {
    bottomObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) props.onScrollBottom?.();
      },
      { root: scroller, rootMargin: "0px", threshold: 0 },
    );
    bottomObserver.observe(bottomSentinel);
  }
}

onMounted(() => {
  nextTick(() => {
    setupCustomScrollbar();
    setupSentinels();
  });
});

watch(useForceBrowserDefault, async () => {
  await nextTick();
  setupCustomScrollbar();
});

onUnmounted(() => {
  if (scrollTimeoutRef.value !== null) {
    window.clearTimeout(scrollTimeoutRef.value);
  }
  cleanupCustomScrollbar?.();
  topObserver?.disconnect();
  bottomObserver?.disconnect();
});

defineExpose({
  getDOMNode: () => scrollerRef.value,
});
</script>

<style scoped>
div:deep(::-webkit-scrollbar) {
  display: none;
  width: 0;
  height: 0;
}

div[data-thumb="1"]:hover {
  opacity: .3 !important;
}
</style>
