import { VNode } from 'vue';

declare function __VLS_template(): {
    default?(_: {}): any;
    placeholder?(_: {}): any;
    fallback?(_: {
        error: Error | null;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Error boundary fallback.
     * - undefined  → no error boundary (default)
     * - null       → silent error boundary (catches errors, renders nothing on failure)
     * - Function   → (error: Error) => rendered content (use default slot via hasError)
     */
    fallback: {
        type: () => null | VNode | ((error: Error | null) => VNode);
        default: undefined;
    };
    /**
     * Suspense placeholder — shown while async child components are loading.
     * - undefined → no Suspense wrapper (default)
     */
    placeholder: {
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Error boundary fallback.
     * - undefined  → no error boundary (default)
     * - null       → silent error boundary (catches errors, renders nothing on failure)
     * - Function   → (error: Error) => rendered content (use default slot via hasError)
     */
    fallback: {
        type: () => null | VNode | ((error: Error | null) => VNode);
        default: undefined;
    };
    /**
     * Suspense placeholder — shown while async child components are loading.
     * - undefined → no Suspense wrapper (default)
     */
    placeholder: {
        default: undefined;
    };
}>> & Readonly<{}>, {
    fallback: VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }> | ((error: Error | null) => VNode) | null;
    placeholder: undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
