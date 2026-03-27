import{a as t,_ as r}from"./IURow-BX2oI-X0.js";import"./iframe-B2HEpmjM.js";import"./preload-helper-C1FmrZbK.js";import"./IUColumnItem-D74bFOSC.js";const y={title:"Layout/IURowItem",component:t,tags:["autodocs"],argTypes:{fallback:{description:"`undefined` = no error boundary, `null` = silent, VNode/fn = custom error UI"},placeholder:{description:"Suspense fallback shown while async children are loading"}},parameters:{docs:{description:{component:"## IURowItem\n\nAn **explicit flex item** wrapper inside a Row. A direct port of `CometRowItem.react`.\n\n### When to use\nYou normally don't need `IURowItem` directly — `IURow` auto-wraps nested components\nfor you. Use `IURowItem` explicitly when you need:\n- **Error boundary** (`fallback` prop) around a specific row slot\n- **Suspense** (`placeholder` prop) while an async child loads\n\n### Key behaviour\n- Resets `RowContext` to `null` for its children, so nested layouts don't think\n  they are still direct children of the row.\n- Delegates flex-item CSS (`flex-grow`, `flex-basis`, column grid, `alignSelf`)\n  to the internal `IUBaseRowItem`.\n\n### Props\n| Prop | Default | Description |\n|---|---|---|\n| `fallback` | `undefined` | `undefined` = no boundary, `null` = silent, VNode/fn = custom UI |\n| `placeholder` | `undefined` | Shown via `<Suspense>` while children load |\n\nAll other props (`expanding`, `columns`, `verticalAlign`, `class`, etc.)\nare forwarded directly to `IUBaseRowItem`."}}}},e={render:()=>({components:{IURow:r,IURowItem:t},template:`
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px">
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Fixed</div>
        </IURowItem>
        <IURowItem :expanding="true">
          <div style="background:#7c6af7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600;text-align:center">Expanding (flex-1)</div>
        </IURowItem>
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Fixed</div>
        </IURowItem>
      </IURow>
    `})},o={render:()=>({components:{IURow:r,IURowItem:t},template:`
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px">
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Always visible</div>
        </IURowItem>
        <IURowItem :fallback="null">
          <div style="background:#e06f6f;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">
            Wrapped in silent error boundary — disappears if it throws
          </div>
        </IURowItem>
      </IURow>
    `})},n={render:()=>({components:{IURow:r,IURowItem:t},template:`
      <IURow :padding-top="0" :padding-horizontal="0" vertical-align="stretch" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px;height:100px">
        <IURowItem vertical-align="top">
          <div style="background:#4f8ef7;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">top</div>
        </IURowItem>
        <IURowItem vertical-align="center">
          <div style="background:#7c6af7;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">center</div>
        </IURowItem>
        <IURowItem vertical-align="bottom">
          <div style="background:#e06f6f;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">bottom</div>
        </IURowItem>
        <IURowItem vertical-align="stretch">
          <div style="background:#4fb87c;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600;height:100%">stretch</div>
        </IURowItem>
      </IURow>
    `})};var i,d,a,p,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow,
      IURowItem
    },
    template: \`
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px">
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Fixed</div>
        </IURowItem>
        <IURowItem :expanding="true">
          <div style="background:#7c6af7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600;text-align:center">Expanding (flex-1)</div>
        </IURowItem>
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Fixed</div>
        </IURowItem>
      </IURow>
    \`
  })
}`,...(a=(d=e.parameters)==null?void 0:d.docs)==null?void 0:a.source},description:{story:"Explicit IURowItem usage inside a Row — controls expanding per slot.",...(s=(p=e.parameters)==null?void 0:p.docs)==null?void 0:s.description}}};var l,f,c,g,I;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow,
      IURowItem
    },
    template: \`
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px">
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Always visible</div>
        </IURowItem>
        <IURowItem :fallback="null">
          <div style="background:#e06f6f;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">
            Wrapped in silent error boundary — disappears if it throws
          </div>
        </IURowItem>
      </IURow>
    \`
  })
}`,...(c=(f=o.parameters)==null?void 0:f.docs)==null?void 0:c.source},description:{story:"Error boundary — when fallback=null the slot renders nothing on error.",...(I=(g=o.parameters)==null?void 0:g.docs)==null?void 0:I.description}}};var x,w,m,u,R;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow,
      IURowItem
    },
    template: \`
      <IURow :padding-top="0" :padding-horizontal="0" vertical-align="stretch" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px;height:100px">
        <IURowItem vertical-align="top">
          <div style="background:#4f8ef7;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">top</div>
        </IURowItem>
        <IURowItem vertical-align="center">
          <div style="background:#7c6af7;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">center</div>
        </IURowItem>
        <IURowItem vertical-align="bottom">
          <div style="background:#e06f6f;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">bottom</div>
        </IURowItem>
        <IURowItem vertical-align="stretch">
          <div style="background:#4fb87c;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600;height:100%">stretch</div>
        </IURowItem>
      </IURow>
    \`
  })
}`,...(m=(w=n.parameters)==null?void 0:w.docs)==null?void 0:m.source},description:{story:"verticalAlign — alignSelf override per item.",...(R=(u=n.parameters)==null?void 0:u.docs)==null?void 0:R.description}}};const k=["Default","SilentErrorBoundary","VerticalAlign"];export{e as Default,o as SilentErrorBoundary,n as VerticalAlign,k as __namedExportsOrder,y as default};
