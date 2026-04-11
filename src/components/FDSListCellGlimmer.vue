<template>
  <BaseLoadingStateElement>
    <IUColumn
      :padding-horizontal="resolvedPaddingHorizontal"
      :spacing="resolvedSpacing"
    >
      <IUColumnItem
        v-for="(widthSeed, index) in widthSeeds"
        :key="index"
      >
        <BaseListCell :xstyle="[styles.item, index === 0 && removeFirstItemPadding && styles.firstItem]">
          <template
            v-if="imageStyle !== 'none'"
            #addOnStart
          >
            <FDSGlimmer
              :index="index"
              :xstyle="[
                styles.image,
                imageSizeStyles[imageSize],
                imageStyle === 'circle' && styles.imageStyleCircle,
                imageStyle === 'roundedRect' && styles.imageStyleRoundedRect,
              ]"
            />
          </template>

          <FDSGlimmer
            :index="index"
            :xstyle="[styles.textGlimmer, textWidthStyles[widthSeed]]"
          />
        </BaseListCell>
      </IUColumnItem>
    </IUColumn>
  </BaseLoadingStateElement>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import BaseListCell from './BaseListCell.vue'
import BaseLoadingStateElement from './BaseLoadingStateElement.vue'
import FDSGlimmer from './FDSGlimmer.vue'
import IUColumn from './IUColumn.vue'
import IUColumnItem from './IUColumnItem.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'

type FDSListCellGlimmerImageSize = 20 | 36 | 40 | 48 | 56 | 60
type FDSListCellGlimmerImageStyle = 'none' | 'circle' | 'roundedRect'
type TextWidthSeed = 0 | 1 | 2 | 3

interface Props {
  imageSize?: FDSListCellGlimmerImageSize
  imageStyle?: FDSListCellGlimmerImageStyle
  numberOfItems?: number
  paddingHorizontal?: number
  removeFirstItemPadding?: boolean
  spacing?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  imageSize: 36,
  imageStyle: 'none',
  numberOfItems: 1,
  paddingHorizontal: 16,
  removeFirstItemPadding: true,
  spacing: undefined,
})

const styles = {
  firstItem: 'pt-0',
  image: 'me-3',
  imageStyleCircle: 'rounded-full',
  imageStyleRoundedRect: 'rounded-lg',
  item: 'pt-2 pb-2',
  textGlimmer: 'rounded-lg h-[15px]',
} satisfies Record<string, StyleCapableValue>

const imageSizeStyles: Record<FDSListCellGlimmerImageSize, StyleCapableValue> = {
  20: 'h-5 w-5',
  36: 'h-9 w-9',
  40: 'h-10 w-10',
  48: 'h-12 w-12',
  56: 'h-14 w-14',
  60: 'h-[60px] w-[60px]',
}

const textWidthStyles: Record<TextWidthSeed, StyleCapableValue> = {
  0: 'w-1/2',
  1: 'w-[67%]',
  2: 'w-[83%]',
  3: 'w-full',
}

const pickWidthSeed = (index: number): TextWidthSeed => (
  Math.floor(Math.PI * Math.pow(10, index % 10) % 4) as TextWidthSeed
)

const normalizeColumnToken = (
  value: number | string | undefined,
  allowedValues: readonly number[],
): number | undefined => {
  if (value == null) {
    return undefined
  }

  const parsedValue = typeof value === 'string' ? Number(value) : value

  return Number.isFinite(parsedValue) && allowedValues.includes(parsedValue)
    ? parsedValue
    : undefined
}

const widthSeeds = computed<TextWidthSeed[]>(() => (
  Array.from({ length: props.numberOfItems }, (_, index) => pickWidthSeed(index))
))

const resolvedPaddingHorizontal = computed<number | undefined>(() => (
  normalizeColumnToken(props.paddingHorizontal, [4, 8, 12, 16, 20])
))

const resolvedSpacing = computed<number | undefined>(() => (
  normalizeColumnToken(props.spacing, [4, 8, 12, 16, 20, 24, 32, 40])
))
</script>
