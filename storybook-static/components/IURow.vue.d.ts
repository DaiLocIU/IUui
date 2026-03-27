declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    spacing: {
        type: NumberConstructor;
        default: number;
    };
    spacingHorizontal: {
        type: NumberConstructor;
        default: undefined;
    };
    spacingVertical: {
        type: NumberConstructor;
        default: undefined;
    };
    paddingHorizontal: {
        type: NumberConstructor;
        default: undefined;
    };
    paddingVertical: {
        type: NumberConstructor;
        default: undefined;
    };
    paddingTop: {
        type: NumberConstructor;
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    spacing: {
        type: NumberConstructor;
        default: number;
    };
    spacingHorizontal: {
        type: NumberConstructor;
        default: undefined;
    };
    spacingVertical: {
        type: NumberConstructor;
        default: undefined;
    };
    paddingHorizontal: {
        type: NumberConstructor;
        default: undefined;
    };
    paddingVertical: {
        type: NumberConstructor;
        default: undefined;
    };
    paddingTop: {
        type: NumberConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    spacing: number;
    paddingHorizontal: number;
    paddingTop: number;
    paddingVertical: number;
    spacingHorizontal: number;
    spacingVertical: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
