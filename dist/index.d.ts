import { default as BaseImage } from './components/BaseImage.vue';
import { default as IURow } from './components/IURow.vue';
import { default as IUColumn } from './components/IUColumn.vue';
import { default as CometScrollView } from './components/CometScrollView.vue';
import { default as SidebarRail } from './components/SidebarRail.vue';
import { default as SidebarRailSection } from './components/SidebarRailSection.vue';
import { default as SidebarRailItem } from './components/SidebarRailItem.vue';
import { default as SidebarRailFooter } from './components/SidebarRailFooter.vue';
import { default as TruncationTooltip } from './components/TruncationTooltip.vue';
import { default as CometDensityModeStateProvider } from './components/CometDensityModeStateProvider.vue';
import { default as FDSTextContextNew } from './components/FDSTextContextNew.vue';
import { default as FDSBaseTextImpl } from './components/FDSBaseTextImpl.vue';
import { default as BaseListCell } from './components/BaseListCell.vue';
import { default as BaseLink } from './components/BaseLink.vue';
import { default as BaseButton } from './components/BaseButton.vue';
import { default as CometBookmarkListItem } from './components/CometBookmarkListItem.vue';
import { default as CometBookmarkListItemWrapper } from './components/CometBookmarkListItemWrapper.vue';
import { default as FDSListCell } from './components/FDSListCell.vue';
import { default as FDSListCellPressable } from './components/FDSListCellPressable.vue';
import { default as FDSPressable } from './components/FDSPressable.vue';
import { default as CometPressable } from './components/CometPressable.vue';
import { default as WebPressable } from './components/WebPressable.vue';
import { default as FDSTextPairing } from './components/FDSTextPairing.vue';
import { default as FDSHeadlineWithAddOn } from './components/FDSHeadlineWithAddOn.vue';
import { default as IURowItem } from './components/IURowItem.vue';
import { default as IUColumnItem } from './components/IUColumnItem.vue';

export { provideBaseButtonPopoverContext, provideBaseDisabledContext, provideBasePlaceholderContext, provideCometContainerPressableContext, provideCometDangerouslySuppressInteractiveElementsContext, useBaseButtonPopoverContext, useBaseDisabledContext, useBasePlaceholderContext, useCometContainerPressableContext, useCometDangerouslySuppressInteractiveElementsContext, } from './system/cometPressableKeys';
export { provideBaseLinkDefaultTarget, provideBaseLinkNestedPressable, provideBaseLinkRouter, provideCometCustomLinkshimHash, provideCometGHLRendering, provideCometProductAttribution, provideCometTrackingCode, provideCometTrackingNodes, useBaseLinkDefaultTarget, useBaseLinkNestedPressable, useBaseLinkRouter, useCometCustomLinkshimHash, useCometGHLRendering, useCometProductAttribution, useCometTrackingCode, useCometTrackingNodes, } from './system/baseLinkKeys';
export type { BaseButtonPopoverContextValue, CometContainerPressableContextValue, CometContainerPressableRegistration, } from './system/cometPressableKeys';
export type { BaseLinkNavigationOptions, BaseLinkPrefetchHandle, BaseLinkRouterAdapter, ProductAttributionContextValue, TrackingCodeContextValue, } from './system/baseLinkKeys';
export type { SidebarRailItemData, SidebarRailSectionData, SidebarRailFooterItemData } from './system/sidebarRail';
export type { TruncationTooltipConfig } from './components/TruncationTooltip.vue';
export type { FDSTextContextValue } from './system/fdsTextKeys';
export type { FDSTextPairingLevel } from './utils/getFDSTextHierarchyStyle';
declare const CometDensityProvider: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        initialDense: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
        initialDense: boolean;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        initialDense: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        initialDense: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    initialDense: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    initialDense: boolean;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
});
declare const ImagePrimitive: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    xstyle: {
        type: import('vue').PropType<string | Record<string, boolean>>;
        default: undefined;
    };
    testid: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    onLoad: {
        type: import('vue').PropType<(event?: Event) => void>;
        default: undefined;
    };
    variant: {
        type: import('vue').PropType<import('./components/BaseImage.vue').ImageVariant>;
        default: undefined;
    };
    alt: {
        type: import('vue').PropType<string>;
        default: string;
    };
    ariaLabelledby: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    elementtiming: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    isDecorative: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    objectFit: {
        type: import('vue').PropType<"fill" | "contain" | "cover">;
        default: string;
    };
    referrerPolicy: {
        type: import('vue').PropType<ReferrerPolicy>;
        default: string;
    };
    sizes: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    src: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    srcSet: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
}>, {
    el: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
    img: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    xstyle: {
        type: import('vue').PropType<string | Record<string, boolean>>;
        default: undefined;
    };
    testid: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    onLoad: {
        type: import('vue').PropType<(event?: Event) => void>;
        default: undefined;
    };
    variant: {
        type: import('vue').PropType<import('./components/BaseImage.vue').ImageVariant>;
        default: undefined;
    };
    alt: {
        type: import('vue').PropType<string>;
        default: string;
    };
    ariaLabelledby: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    elementtiming: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    isDecorative: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    objectFit: {
        type: import('vue').PropType<"fill" | "contain" | "cover">;
        default: string;
    };
    referrerPolicy: {
        type: import('vue').PropType<ReferrerPolicy>;
        default: string;
    };
    sizes: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    src: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    srcSet: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    xstyle: string | Record<string, boolean>;
    testid: string;
    onLoad: (event?: Event) => void;
    variant: import('./components/BaseImage.vue').ImageVariant;
    alt: string;
    ariaLabelledby: string;
    elementtiming: string;
    isDecorative: boolean;
    objectFit: "fill" | "contain" | "cover";
    referrerPolicy: ReferrerPolicy;
    sizes: string;
    src: string;
    srcSet: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const IUListCell: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        role: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        xstyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        testid: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        tabIndex: {
            type: import('vue').PropType<number>;
            default: undefined;
        };
        ariaHidden: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        variant: {
            type: import('vue').PropType<import('./components/BaseListCell.vue').ListCellVariant>;
            default: undefined;
        };
        ariaLabelledby: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        verticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: string;
        };
        actionVerticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: undefined;
        };
        addOnBottomResponsive: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        addOnEndVerticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: undefined;
        };
        addOnEndXStyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        addOnStartVerticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: undefined;
        };
        addOnStartXStyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        ariaLabel: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        contentId: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        contentVerticalAlign: {
            type: import('vue').PropType<"center" | "top">;
            default: string;
        };
        contentXStyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        nestedSpacing: {
            type: import('vue').PropType<string | number>;
            default: undefined;
        };
    }>> & Readonly<{}>, {
        el: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
        role: string;
        xstyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        testid: string;
        tabIndex: number;
        ariaHidden: boolean;
        variant: import('./components/BaseListCell.vue').ListCellVariant;
        ariaLabelledby: string;
        verticalAlign: "stretch" | "center" | "bottom" | "top";
        actionVerticalAlign: "stretch" | "center" | "bottom" | "top";
        addOnBottomResponsive: boolean;
        addOnEndVerticalAlign: "stretch" | "center" | "bottom" | "top";
        addOnEndXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        addOnStartVerticalAlign: "stretch" | "center" | "bottom" | "top";
        addOnStartXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        ariaLabel: string;
        contentId: string;
        contentVerticalAlign: "top" | "center";
        contentXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        nestedSpacing: number | string;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        role: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        xstyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        testid: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        tabIndex: {
            type: import('vue').PropType<number>;
            default: undefined;
        };
        ariaHidden: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        variant: {
            type: import('vue').PropType<import('./components/BaseListCell.vue').ListCellVariant>;
            default: undefined;
        };
        ariaLabelledby: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        verticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: string;
        };
        actionVerticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: undefined;
        };
        addOnBottomResponsive: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        addOnEndVerticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: undefined;
        };
        addOnEndXStyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        addOnStartVerticalAlign: {
            type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
            default: undefined;
        };
        addOnStartXStyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        ariaLabel: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        contentId: {
            type: import('vue').PropType<string>;
            default: undefined;
        };
        contentVerticalAlign: {
            type: import('vue').PropType<"center" | "top">;
            default: string;
        };
        contentXStyle: {
            type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
            default: undefined;
        };
        nestedSpacing: {
            type: import('vue').PropType<string | number>;
            default: undefined;
        };
    }>> & Readonly<{}>, {
        el: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, {
        role: string;
        xstyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        testid: string;
        tabIndex: number;
        ariaHidden: boolean;
        variant: import('./components/BaseListCell.vue').ListCellVariant;
        ariaLabelledby: string;
        verticalAlign: "stretch" | "center" | "bottom" | "top";
        actionVerticalAlign: "stretch" | "center" | "bottom" | "top";
        addOnBottomResponsive: boolean;
        addOnEndVerticalAlign: "stretch" | "center" | "bottom" | "top";
        addOnEndXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        addOnStartVerticalAlign: "stretch" | "center" | "bottom" | "top";
        addOnStartXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        ariaLabel: string;
        contentId: string;
        contentVerticalAlign: "top" | "center";
        contentXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
        nestedSpacing: number | string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    role: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    xstyle: {
        type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
        default: undefined;
    };
    testid: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    tabIndex: {
        type: import('vue').PropType<number>;
        default: undefined;
    };
    ariaHidden: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: import('vue').PropType<import('./components/BaseListCell.vue').ListCellVariant>;
        default: undefined;
    };
    ariaLabelledby: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    verticalAlign: {
        type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
        default: string;
    };
    actionVerticalAlign: {
        type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
        default: undefined;
    };
    addOnBottomResponsive: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    addOnEndVerticalAlign: {
        type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
        default: undefined;
    };
    addOnEndXStyle: {
        type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
        default: undefined;
    };
    addOnStartVerticalAlign: {
        type: import('vue').PropType<"stretch" | "center" | "bottom" | "top">;
        default: undefined;
    };
    addOnStartXStyle: {
        type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
        default: undefined;
    };
    ariaLabel: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    contentId: {
        type: import('vue').PropType<string>;
        default: undefined;
    };
    contentVerticalAlign: {
        type: import('vue').PropType<"center" | "top">;
        default: string;
    };
    contentXStyle: {
        type: import('vue').PropType<false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null>;
        default: undefined;
    };
    nestedSpacing: {
        type: import('vue').PropType<string | number>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    el: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    role: string;
    xstyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
    testid: string;
    tabIndex: number;
    ariaHidden: boolean;
    variant: import('./components/BaseListCell.vue').ListCellVariant;
    ariaLabelledby: string;
    verticalAlign: "stretch" | "center" | "bottom" | "top";
    actionVerticalAlign: "stretch" | "center" | "bottom" | "top";
    addOnBottomResponsive: boolean;
    addOnEndVerticalAlign: "stretch" | "center" | "bottom" | "top";
    addOnEndXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
    addOnStartVerticalAlign: "stretch" | "center" | "bottom" | "top";
    addOnStartXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
    ariaLabel: string;
    contentId: string;
    contentVerticalAlign: "top" | "center";
    contentXStyle: false | import('./utils/resolveStyling').ClassLike | import('vue').CSSProperties | import('./utils/resolveStyling').StyleCapableValue[] | null;
    nestedSpacing: number | string;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        action?(_: {}): any;
        addOnStart?(_: {}): any;
        default?(_: {}): any;
        addOnBottom?(_: {}): any;
        addOnEnd?(_: {}): any;
        addOnFooter?(_: {}): any;
    };
});
export { BaseImage, ImagePrimitive, IURow, IUColumn, IURowItem, IUColumnItem, CometScrollView, SidebarRail, SidebarRailSection, SidebarRailItem, SidebarRailFooter, TruncationTooltip, CometDensityModeStateProvider, CometDensityProvider, FDSTextContextNew, FDSBaseTextImpl, BaseListCell, BaseLink, BaseButton, CometBookmarkListItem, CometBookmarkListItemWrapper, FDSPressable, CometPressable, IUListCell, FDSListCell, FDSListCellPressable, WebPressable, FDSHeadlineWithAddOn, FDSTextPairing };
declare const _default: {
    install: (app: any) => void;
};
export default _default;
