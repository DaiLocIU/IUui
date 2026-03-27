import { ColumnAlignValue, ColumnVerticalAlignValue } from '../system/layoutKeys';

declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /** Default alignItems for child IUColumnItems (null = stretch by default in items). */
    align: {
        type: () => ColumnAlignValue;
        default: undefined;
        validator: (v: string) => boolean;
    };
    /** Outer root: flex-basis:auto, flex-grow:1, flex-shrink:0, min-height:0 */
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** If true, IUColumnItem renders a separator line before itself. */
    hasDividers: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Passed to context; IUColumnItem uses as default paddingHorizontal. Token: 4|8|12|16|20. */
    paddingHorizontal: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop override on outer root. Token: 0|4|8|12|16|20|24|40. */
    paddingTop: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop + paddingBottom on outer root. Token: 0|4|8|12|16|20|24|40. Default 0. */
    paddingVertical: {
        type: NumberConstructor;
        default: number;
        validator: (v: number) => boolean;
    };
    /** Passed to context; IUColumnItem uses as margin gap between items. Token: 4|8|12|16|20|24|32|40. */
    spacing: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** Inner div justifyContent. default "top" (= flex-start, no class). */
    verticalAlign: {
        type: () => ColumnVerticalAlignValue;
        default: string;
        validator: (v: string) => boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /** Default alignItems for child IUColumnItems (null = stretch by default in items). */
    align: {
        type: () => ColumnAlignValue;
        default: undefined;
        validator: (v: string) => boolean;
    };
    /** Outer root: flex-basis:auto, flex-grow:1, flex-shrink:0, min-height:0 */
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** If true, IUColumnItem renders a separator line before itself. */
    hasDividers: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Passed to context; IUColumnItem uses as default paddingHorizontal. Token: 4|8|12|16|20. */
    paddingHorizontal: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop override on outer root. Token: 0|4|8|12|16|20|24|40. */
    paddingTop: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop + paddingBottom on outer root. Token: 0|4|8|12|16|20|24|40. Default 0. */
    paddingVertical: {
        type: NumberConstructor;
        default: number;
        validator: (v: number) => boolean;
    };
    /** Passed to context; IUColumnItem uses as margin gap between items. Token: 4|8|12|16|20|24|32|40. */
    spacing: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** Inner div justifyContent. default "top" (= flex-start, no class). */
    verticalAlign: {
        type: () => ColumnVerticalAlignValue;
        default: string;
        validator: (v: string) => boolean;
    };
}>> & Readonly<{}>, {
    align: ColumnAlignValue;
    verticalAlign: ColumnVerticalAlignValue;
    expanding: boolean;
    spacing: number;
    paddingHorizontal: number;
    paddingTop: number;
    paddingVertical: number;
    hasDividers: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
