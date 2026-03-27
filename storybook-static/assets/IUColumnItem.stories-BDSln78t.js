import{_ as i}from"./IUColumnItem-D74bFOSC.js";import{_ as a}from"./IUColumn-W68PzqSw.js";import"./iframe-B2HEpmjM.js";import"./preload-helper-C1FmrZbK.js";const _={title:"Layout/IUColumnItem",component:i,tags:["autodocs"],argTypes:{expanding:{control:"boolean",description:"flex-grow + flex-shrink-0 + basis-auto + min-h-0"},align:{control:{type:"select"},options:[void 0,"stretch","center","end","start"],description:"alignItems override for this specific item"},verticalAlign:{control:{type:"select"},options:["top","center","bottom","space-between"],description:"justifyContent inside this item"},paddingHorizontal:{control:{type:"select"},options:[void 0,4,8,12,16,20],description:"Override paddingInline for this item only"},paddingVertical:{control:{type:"select"},options:[0,4,8,12,16,20,24,40],description:"Override paddingBlock for this item only"},fallback:{description:"`undefined` = no boundary, `null` = silent, VNode/fn = custom error UI"},placeholder:{description:"Suspense fallback shown while async children are loading"}},parameters:{docs:{description:{component:"## IUColumnItem\n\nAn **explicit flex item** wrapper inside a Column. A direct port of `CometColumnItem.react`.\n\n### When to use\nYou normally don't need `IUColumnItem` directly — `IUColumn` auto-wraps nested\ncomponents via context. Use `IUColumnItem` explicitly when you need:\n- **Error boundary** (`fallback` prop) around a specific column slot\n- **Suspense** (`placeholder` prop) while an async child loads\n- **Per-item padding override** different from the column's context default\n- **Per-item alignment override** different from the column's `align` default\n\n### Key behaviour\n- Reads `spacing`, `paddingHorizontal`, `align`, `hasDividers` from parent `ColumnContext`\n- Applies spacing as `margin-top + margin-bottom` (with `:first-child:mt-0` / `:last-child:mb-0`)\n- Resets `ColumnContext` to `null` for its children\n- Optionally renders a divider `<hr>` before itself when `hasDividers=true` on the Column\n\n### Props\n| Prop | Default | Description |\n|---|---|---|\n| `expanding` | `false` | `flex-grow + flex-shrink-0 + basis-auto + min-h-0` |\n| `align` | from context | `alignItems` override for this item |\n| `verticalAlign` | `\"top\"` | `justifyContent` inside this item |\n| `paddingHorizontal` | from context | Per-item horizontal padding override |\n| `paddingTop` | — | Per-item top padding override |\n| `paddingVertical` | `0` | Per-item top + bottom padding |\n| `fallback` | `undefined` | Error boundary |\n| `placeholder` | `undefined` | Suspense placeholder |"}}}},e=(z,V="#e8f0fe")=>`<div style="background:${V};padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;color:#333">${z}</div>`,n={render:()=>({components:{IUColumn:a,IUColumnItem:i},template:`
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem :padding-horizontal="4">
          ${e("padding-horizontal=4","#e8f0fe")}
        </IUColumnItem>
        <IUColumnItem :padding-horizontal="12">
          ${e("padding-horizontal=12","#fce8f3")}
        </IUColumnItem>
        <IUColumnItem :padding-horizontal="20">
          ${e("padding-horizontal=20","#e8fef0")}
        </IUColumnItem>
      </IUColumn>
    `})},o={render:()=>({components:{IUColumn:a,IUColumnItem:i},template:`
      <IUColumn :spacing="8" style="width:320px;height:300px;background:#fafafa;border-radius:12px">
        <IUColumnItem>
          ${e("Fixed height item","#e8f0fe")}
        </IUColumnItem>
        <IUColumnItem :expanding="true">
          <div style="background:#7c6af7;color:#fff;border-radius:8px;height:100%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">
            Expanding — grows to fill remaining space
          </div>
        </IUColumnItem>
        <IUColumnItem>
          ${e("Fixed height item","#e8fef0")}
        </IUColumnItem>
      </IUColumn>
    `})},t={render:()=>({components:{IUColumn:a,IUColumnItem:i},template:`
      <IUColumn style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem :padding-vertical="4">
          ${e("paddingVertical=4","#e8f0fe")}
        </IUColumnItem>
        <IUColumnItem :padding-vertical="12">
          ${e("paddingVertical=12","#fce8f3")}
        </IUColumnItem>
        <IUColumnItem :padding-vertical="24">
          ${e("paddingVertical=24","#e8fef0")}
        </IUColumnItem>
      </IUColumn>
    `})},r={render:()=>({components:{IUColumn:a,IUColumnItem:i},template:`
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem>
          ${e("Always visible","#e8f0fe")}
        </IUColumnItem>
        <IUColumnItem :fallback="null">
          ${e("Wrapped in silent boundary — vanishes on error","#fce8f3")}
        </IUColumnItem>
        <IUColumnItem>
          ${e("Always visible","#e8fef0")}
        </IUColumnItem>
      </IUColumn>
    `})};var l,d,m,s,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn,
      IUColumnItem
    },
    template: \`
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem :padding-horizontal="4">
          \${Card('padding-horizontal=4', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :padding-horizontal="12">
          \${Card('padding-horizontal=12', '#fce8f3')}
        </IUColumnItem>
        <IUColumnItem :padding-horizontal="20">
          \${Card('padding-horizontal=20', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    \`
  })
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source},description:{story:"Explicit IUColumnItem with padding overrides per item.",...(p=(s=n.parameters)==null?void 0:s.docs)==null?void 0:p.description}}};var c,u,I,f,g;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn,
      IUColumnItem
    },
    template: \`
      <IUColumn :spacing="8" style="width:320px;height:300px;background:#fafafa;border-radius:12px">
        <IUColumnItem>
          \${Card('Fixed height item', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :expanding="true">
          <div style="background:#7c6af7;color:#fff;border-radius:8px;height:100%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">
            Expanding — grows to fill remaining space
          </div>
        </IUColumnItem>
        <IUColumnItem>
          \${Card('Fixed height item', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    \`
  })
}`,...(I=(u=o.parameters)==null?void 0:u.docs)==null?void 0:I.source},description:{story:"expanding=true makes the item grow to fill the column height.",...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.description}}};var C,U,h,x,y;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn,
      IUColumnItem
    },
    template: \`
      <IUColumn style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem :padding-vertical="4">
          \${Card('paddingVertical=4', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :padding-vertical="12">
          \${Card('paddingVertical=12', '#fce8f3')}
        </IUColumnItem>
        <IUColumnItem :padding-vertical="24">
          \${Card('paddingVertical=24', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    \`
  })
}`,...(h=(U=t.parameters)==null?void 0:U.docs)==null?void 0:h.source},description:{story:"Custom per-item paddingVertical gives items their own breathing room.",...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.description}}};var b,v,w,$,k;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn,
      IUColumnItem
    },
    template: \`
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem>
          \${Card('Always visible', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :fallback="null">
          \${Card('Wrapped in silent boundary — vanishes on error', '#fce8f3')}
        </IUColumnItem>
        <IUColumnItem>
          \${Card('Always visible', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    \`
  })
}`,...(w=(v=r.parameters)==null?void 0:v.docs)==null?void 0:w.source},description:{story:"Silent error boundary — item disappears cleanly if it throws.",...(k=($=r.parameters)==null?void 0:$.docs)==null?void 0:k.description}}};const D=["Default","Expanding","PaddingVertical","SilentErrorBoundary"];export{n as Default,o as Expanding,t as PaddingVertical,r as SilentErrorBoundary,D as __namedExportsOrder,_ as default};
