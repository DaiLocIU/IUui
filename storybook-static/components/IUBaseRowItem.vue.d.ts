declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /** flex-grow: 1, flex-shrink: 0, flex-basis: auto, min-width: 0 */
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Legacy mode — skips display:flex + flex-direction:column wrapper.
     * Only adds max-width:100% + min-width:0 (item_DEPRECATED in the original).
     */
    useDeprecatedStyles: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** alignSelf override */
    verticalAlign: {
        type: () => "top" | "center" | "bottom" | "stretch";
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /** flex-grow: 1, flex-shrink: 0, flex-basis: auto, min-width: 0 */
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Legacy mode — skips display:flex + flex-direction:column wrapper.
     * Only adds max-width:100% + min-width:0 (item_DEPRECATED in the original).
     */
    useDeprecatedStyles: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** alignSelf override */
    verticalAlign: {
        type: () => "top" | "center" | "bottom" | "stretch";
        default: undefined;
    };
}>> & Readonly<{}>, {
    verticalAlign: "stretch" | "center" | "top" | "bottom";
    expanding: boolean;
    useDeprecatedStyles: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
