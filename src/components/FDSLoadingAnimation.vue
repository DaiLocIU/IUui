<template>
  <svg
    aria-hidden="true"
    :height="metrics.svgSize"
    :viewBox="`0 0 ${metrics.svgSize} ${metrics.svgSize}`"
    :width="metrics.svgSize"
  >
    <g :class="groupClass">
      <circle
        :class="circleClass"
        :cx="metrics.center"
        :cy="metrics.center"
        fill="none"
        :r="metrics.radius"
        :stroke="strokeColor"
        :stroke-width="metrics.strokeWidth"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

type FDSLoadingAnimationColor = 'default' | 'media'
type FDSLoadingAnimationSize = 36 | 40 | 60

interface SizeMetrics {
  center: number
  radius: number
  strokeWidth: number
  svgSize: number
}

const SIZE_METRICS: Record<FDSLoadingAnimationSize, SizeMetrics> = {
  36: {
    center: 19,
    radius: 17,
    strokeWidth: 2,
    svgSize: 38,
  },
  40: {
    center: 21,
    radius: 19,
    strokeWidth: 3,
    svgSize: 42,
  },
  60: {
    center: 31,
    radius: 29,
    strokeWidth: 4,
    svgSize: 62,
  },
}

const props = defineProps({
  animationPaused: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String as PropType<FDSLoadingAnimationColor>,
    default: 'default',
  },
  size: {
    type: Number as PropType<FDSLoadingAnimationSize>,
    default: 60,
  },
})

const resolvedSize = computed<FDSLoadingAnimationSize>(() =>
  props.size === 36 || props.size === 40 || props.size === 60 ? props.size : 60,
)

const metrics = computed<SizeMetrics>(() => SIZE_METRICS[resolvedSize.value])

const strokeColor = computed(() =>
  props.color === 'media'
    ? 'var(--always-white)'
    : 'var(--fds-blue-60, var(--accent))',
)

const groupClass = computed(() => [
  'fds-loading-animation__group',
  props.animationPaused && 'fds-loading-animation__animation-paused',
])

const circleClass = computed(() => [
  'fds-loading-animation__circle',
  `fds-loading-animation__circle--${resolvedSize.value}`,
  props.animationPaused && 'fds-loading-animation__animation-paused',
])
</script>

<style scoped>
.fds-loading-animation__group {
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-name: fds-loading-animation-spin;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
}

.fds-loading-animation__circle {
  animation-direction: reverse;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
}

.fds-loading-animation__circle--36 {
  animation-name: fds-loading-animation-dash-36;
}

.fds-loading-animation__circle--40 {
  animation-name: fds-loading-animation-dash-40;
}

.fds-loading-animation__circle--60 {
  animation-name: fds-loading-animation-dash-60;
}

.fds-loading-animation__animation-paused {
  animation-play-state: paused;
}

@keyframes fds-loading-animation-spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes fds-loading-animation-dash-36 {
  0% {
    animation-timing-function: cubic-bezier(.895, .03, .685, .22);
    stroke-dasharray: 71 95;
    stroke-dashoffset: 0;
  }

  49.999% {
    stroke-dasharray: 0 95;
    stroke-dashoffset: 0;
  }

  50.001% {
    animation-timing-function: cubic-bezier(.165, .84, .44, 1);
    stroke-dasharray: 0 95;
    stroke-dashoffset: -95;
  }

  100% {
    stroke-dasharray: 71 95;
    stroke-dashoffset: 0;
  }
}

@keyframes fds-loading-animation-dash-40 {
  0% {
    animation-timing-function: cubic-bezier(.895, .03, .685, .22);
    stroke-dasharray: 79 106;
    stroke-dashoffset: 0;
  }

  49.999% {
    stroke-dasharray: 0 106;
    stroke-dashoffset: 0;
  }

  50.001% {
    animation-timing-function: cubic-bezier(.165, .84, .44, 1);
    stroke-dasharray: 0 106;
    stroke-dashoffset: -106;
  }

  100% {
    stroke-dasharray: 79 106;
    stroke-dashoffset: 0;
  }
}

@keyframes fds-loading-animation-dash-60 {
  0% {
    animation-timing-function: cubic-bezier(.895, .03, .685, .22);
    stroke-dasharray: 118 158;
    stroke-dashoffset: 0;
  }

  49.999% {
    stroke-dasharray: 0 158;
    stroke-dashoffset: 0;
  }

  50.001% {
    animation-timing-function: cubic-bezier(.165, .84, .44, 1);
    stroke-dasharray: 0 158;
    stroke-dashoffset: -158;
  }

  100% {
    stroke-dasharray: 118 158;
    stroke-dashoffset: 0;
  }
}
</style>
