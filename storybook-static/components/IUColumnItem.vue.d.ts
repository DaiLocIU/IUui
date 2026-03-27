import { ColumnAlignValue } from '../system/layoutKeys';

declare function __VLS_template(): {
    fallback?(_: {
        error: Error | null;
    }): any;
    default?(_: {}): any;
    placeholder?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /** alignItems override. Default comes from context, then "stretch". */
    align: {
        type: () => ColumnAlignValue;
        default: undefined;
        validator: (v: string) => boolean;
    };
    /** flex-grow:1, flex-shrink:0, flex-basis:auto, min-height:0 */
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Error boundary fallback.
     * undefined → no boundary  |  null → silent boundary  |  VNode/fn → custom UI
     */
    fallback: {
        default: undefined;
    };
    /** paddingInlineStart + paddingInlineEnd. Tokens: 4|8|12|16|20px */
    paddingHorizontal: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop only override. Tokens: 0|4|8|12|16|20|24|40px */
    paddingTop: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop + paddingBottom. Tokens: 4|8|12|16|20|24|40px. Default 0. */
    paddingVertical: {
        type: NumberConstructor;
        default: number;
        validator: (v: number) => boolean;
    };
    /**
     * Suspense placeholder shown while async children load.
     * undefined → no Suspense wrapper.
     */
    placeholder: {
        default: undefined;
    };
    /** justifyContent (main-axis). Default: "top" (=flex-start). */
    verticalAlign: {
        type: () => "top" | "center" | "bottom" | "space-between";
        default: string;
        validator: (v: string) => boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /** alignItems override. Default comes from context, then "stretch". */
    align: {
        type: () => ColumnAlignValue;
        default: undefined;
        validator: (v: string) => boolean;
    };
    /** flex-grow:1, flex-shrink:0, flex-basis:auto, min-height:0 */
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Error boundary fallback.
     * undefined → no boundary  |  null → silent boundary  |  VNode/fn → custom UI
     */
    fallback: {
        default: undefined;
    };
    /** paddingInlineStart + paddingInlineEnd. Tokens: 4|8|12|16|20px */
    paddingHorizontal: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop only override. Tokens: 0|4|8|12|16|20|24|40px */
    paddingTop: {
        type: NumberConstructor;
        default: undefined;
        validator: (v: number) => boolean;
    };
    /** paddingTop + paddingBottom. Tokens: 4|8|12|16|20|24|40px. Default 0. */
    paddingVertical: {
        type: NumberConstructor;
        default: number;
        validator: (v: number) => boolean;
    };
    /**
     * Suspense placeholder shown while async children load.
     * undefined → no Suspense wrapper.
     */
    placeholder: {
        default: undefined;
    };
    /** justifyContent (main-axis). Default: "top" (=flex-start). */
    verticalAlign: {
        type: () => "top" | "center" | "bottom" | "space-between";
        default: string;
        validator: (v: string) => boolean;
    };
}>> & Readonly<{}>, {
    align: ColumnAlignValue;
    verticalAlign: "center" | "top" | "bottom" | "space-between";
    expanding: boolean;
    fallback: undefined;
    paddingHorizontal: number;
    paddingTop: number;
    paddingVertical: number;
    placeholder: undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
