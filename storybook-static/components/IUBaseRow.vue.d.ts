type AlignValue = "center" | "end" | "justify" | "start";
type VerticalAlign = "top" | "center" | "bottom" | "stretch";
type DirectionValue = "forward" | "backward";
type BaseWrapValue = "none" | "forward" | "backward";
declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    align: {
        type: () => AlignValue;
        default: string;
        validator: (v: string) => boolean;
    };
    verticalAlign: {
        type: () => VerticalAlign;
        default: string;
        validator: (v: string) => boolean;
    };
    direction: {
        type: () => DirectionValue;
        default: string;
        validator: (v: string) => boolean;
    };
    wrap: {
        type: () => BaseWrapValue;
        default: string;
        validator: (v: string) => boolean;
    };
    columns: {
        type: NumberConstructor;
        default: number;
        validator: (v: number) => boolean;
    };
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    role: {
        type: StringConstructor;
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    align: {
        type: () => AlignValue;
        default: string;
        validator: (v: string) => boolean;
    };
    verticalAlign: {
        type: () => VerticalAlign;
        default: string;
        validator: (v: string) => boolean;
    };
    direction: {
        type: () => DirectionValue;
        default: string;
        validator: (v: string) => boolean;
    };
    wrap: {
        type: () => BaseWrapValue;
        default: string;
        validator: (v: string) => boolean;
    };
    columns: {
        type: NumberConstructor;
        default: number;
        validator: (v: number) => boolean;
    };
    expanding: {
        type: BooleanConstructor;
        default: boolean;
    };
    role: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    wrap: BaseWrapValue;
    align: AlignValue;
    verticalAlign: VerticalAlign;
    direction: DirectionValue;
    columns: number;
    expanding: boolean;
    role: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
