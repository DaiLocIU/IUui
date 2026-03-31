<!-- BaseTextV2LineClamp.vue -->
<!--
  React: inline line-clamp span structure inside BaseTextV2.
  Extracted to avoid 4× duplication — not a separate component in the React source,
  but justified here because the exact same JSX block repeated 4 times.

  React source (decoded):
    w = maxLines === 0
      ? children
      : jsx(rsd.html.span, { style: c.lineClampRoot, children:
          jsx(rsd.html.span, {
            style: maxLines === 1
              ? c.linClampOneLine
              : [c.numberOfLines(maxLines), c.lineClampMultiLine, c.lineClamp],
            children
          })
        })
-->
<template>
  <!-- React: maxLines === 0 — pass children directly, no wrapper -->
  <slot v-if="maxLines === 0" />

  <!-- React: c.lineClampRoot — display:block, overflow hidden, position:relative -->
  <span v-else class="relative block overflow-x-hidden overflow-y-hidden">

    <!-- React: c.linClampOneLine (maxLines === 1) — single-line text-overflow ellipsis -->
    <span
      v-if="maxLines === 1"
      class="block max-w-full overflow-x-hidden overflow-y-hidden text-ellipsis whitespace-nowrap"
    ><slot /></span>

    <!-- React: [c.numberOfLines(k), c.lineClampMultiLine, c.lineClamp] (maxLines > 1) -->
    <!-- --btv2-line-clamp CSS var drives -webkit-line-clamp; Tailwind line-clamp-{n} is static only -->
    <span
      v-else
      class="block max-w-full overflow-x-hidden overflow-y-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:var(--btv2-line-clamp)] [line-clamp:var(--btv2-line-clamp)]"
      :style="{ '--btv2-line-clamp': maxLines }"
    ><slot /></span>
  </span>
</template>

<script setup lang="ts">
/** React: k = maxLines (f === void 0 ? 0 : f) */
defineProps<{
  maxLines: number
}>()
</script>
