import{_ as n}from"./IUColumn-W68PzqSw.js";import{_ as j}from"./IURow-BX2oI-X0.js";import"./iframe-B2HEpmjM.js";import"./preload-helper-C1FmrZbK.js";import"./IUColumnItem-D74bFOSC.js";const J={title:"Layout/IUColumn",component:n,tags:["autodocs"],argTypes:{spacing:{control:{type:"select"},options:[void 0,4,8,12,16,20,24,32,40],description:"Gap between child items (margin-based). Token: 4px base."},paddingHorizontal:{control:{type:"select"},options:[void 0,4,8,12,16,20],description:"Inherited by all IUColumnItems as default paddingHorizontal."},paddingTop:{control:{type:"select"},options:[void 0,0,4,8,12,16,20,24,40],description:"Outer top padding override."},paddingVertical:{control:{type:"select"},options:[0,4,8,12,16,20,24,40],description:"Outer top + bottom padding."},align:{control:{type:"select"},options:[void 0,"stretch","center","end","start"],description:"Default alignItems passed to all IUColumnItems."},verticalAlign:{control:{type:"select"},options:["top","center","bottom","space-between"],description:"justifyContent on the inner flex-col div."},expanding:{control:"boolean",description:"flex-grow + flex-shrink-0 + min-height:0 on outer div."},hasDividers:{control:"boolean",description:"Render a separator line before each child item."}},parameters:{docs:{description:{component:'## IUColumn\n\nThe primary **vertical** layout primitive. A direct port of Facebook\'s `CometColumn`.\n\n### Structure\n`IUColumn` renders **two divs**:\n- **Outer** — receives rest props + `expanding`/`paddingVertical`/`paddingTop` styles\n- **Inner** — `flex-col flex-grow` + `verticalAlign` (justifyContent)\n\nChildren are provided with a `ColumnContext` carrying:\n`spacing`, `paddingHorizontal`, `align`, `hasDividers`\n\n`IUColumnItem` (auto-used internally or explicitly) reads this context to apply\nper-item margin gap and horizontal padding automatically.\n\n### Auto-wrapping\nWhen nested inside another `<IUColumn>`, the entire column wraps itself in\n`IUColumnItem { expanding }` automatically.\n\n### Props\n| Prop | Default | Description |\n|---|---|---|\n| `spacing` | — | Gap between items via margin. Tokens: 4–40px |\n| `paddingHorizontal` | — | Inherited by all child items as default `px` |\n| `paddingTop` | — | Outer top padding override |\n| `paddingVertical` | `0` | Outer top + bottom padding |\n| `align` | — | Default `alignItems` for all `IUColumnItem` children |\n| `verticalAlign` | `"top"` | `justifyContent` on inner div |\n| `expanding` | `false` | `flex-grow + flex-shrink-0 + min-h-0` |\n| `hasDividers` | `false` | Render `<hr>` before each item |'}}}},e=(F,V="#f5f5f5",s="")=>`<div style="background:${V};padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;color:#333;${s?`height:${s};`:""}display:flex;align-items:center">${F}</div>`,o={render:()=>({components:{IUColumn:n},template:`
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        ${e("Item A","#e8f0fe")}
        ${e("Item B","#fce8f3")}
        ${e("Item C","#e8fef0")}
      </IUColumn>
    `})},t={render:()=>({components:{IUColumn:n},template:`
      <div style="display:flex;gap:24px;padding:16px;flex-wrap:wrap">
        <div v-for="s in [4,8,12,16,24]" :key="s" style="flex:1;min-width:140px">
          <div style="font-size:11px;color:#888;margin-bottom:8px;font-weight:600">spacing={{ s }}</div>
          <IUColumn :spacing="s" style="background:#fafafa;border-radius:10px">
            ${e("A","#e8f0fe")}
            ${e("B","#fce8f3")}
            ${e("C","#e8fef0")}
          </IUColumn>
        </div>
      </div>
    `})},r={render:()=>({components:{IUColumn:n},template:`
      <IUColumn :has-dividers="true" :spacing="0" style="width:320px;background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden">
        ${e("Profile","#fff")}
        ${e("Settings","#fff")}
        ${e("Help & Support","#fff")}
        ${e("Log out","#fff")}
      </IUColumn>
    `})},a={render:()=>({components:{IUColumn:n},template:`
      <div style="display:flex;gap:16px;padding:16px">
        <div v-for="v in ['top','center','bottom','space-between']" :key="v" style="flex:1">
          <div style="font-size:11px;color:#888;margin-bottom:8px;font-weight:600">{{ v }}</div>
          <IUColumn :vertical-align="v" :spacing="8" style="height:200px;background:#fafafa;border-radius:10px;border:1px dashed #ddd">
            ${e("A","#e8f0fe")}
            ${e("B","#fce8f3")}
          </IUColumn>
        </div>
      </div>
    `})},i={render:()=>({components:{IUColumn:n,IURow:j},template:`
      <IUColumn :spacing="12" :padding-horizontal="12" style="width:400px;background:#f5f5f5;border-radius:12px">
        ${e("Header","#e8f0fe")}
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          <IUColumn :spacing="8" :expanding="true" style="background:#fff;border-radius:10px">
            ${e("Left A","#fafafa")}
            ${e("Left B","#fafafa")}
          </IUColumn>
          <IUColumn :spacing="8" :expanding="true" style="background:#fff;border-radius:10px">
            ${e("Right A","#fafafa")}
            ${e("Right B","#fafafa")}
          </IUColumn>
        </IURow>
        ${e("Footer","#e8fef0")}
      </IUColumn>
    `})},d={render:()=>({components:{IUColumn:n},template:`
      <div style="display:flex;gap:16px;padding:16px">
        <div v-for="ph in [0,8,16]" :key="ph" style="flex:1">
          <div style="font-size:11px;color:#888;margin-bottom:8px">paddingHorizontal={{ ph }}</div>
          <IUColumn :spacing="8" :padding-horizontal="ph" style="background:#f5f5f5;border-radius:10px">
            ${e("Item A","#e8f0fe")}
            ${e("Item B","#fce8f3")}
          </IUColumn>
        </div>
      </div>
    `})};var p,l,f,c,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn
    },
    template: \`
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        \${Card('Item A', '#e8f0fe')}
        \${Card('Item B', '#fce8f3')}
        \${Card('Item C', '#e8fef0')}
      </IUColumn>
    \`
  })
}`,...(f=(l=o.parameters)==null?void 0:l.docs)==null?void 0:f.source},description:{story:"Default column with 3 items. spacing=8 provides a gap between them.",...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.description}}};var u,g,x,C,v;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn
    },
    template: \`
      <div style="display:flex;gap:24px;padding:16px;flex-wrap:wrap">
        <div v-for="s in [4,8,12,16,24]" :key="s" style="flex:1;min-width:140px">
          <div style="font-size:11px;color:#888;margin-bottom:8px;font-weight:600">spacing={{ s }}</div>
          <IUColumn :spacing="s" style="background:#fafafa;border-radius:10px">
            \${Card('A', '#e8f0fe')}
            \${Card('B', '#fce8f3')}
            \${Card('C', '#e8fef0')}
          </IUColumn>
        </div>
      </div>
    \`
  })
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source},description:{story:"Spacing tokens — gap applied via margin between items.",...(v=(C=t.parameters)==null?void 0:C.docs)==null?void 0:v.description}}};var I,h,y,b,U;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn
    },
    template: \`
      <IUColumn :has-dividers="true" :spacing="0" style="width:320px;background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden">
        \${Card('Profile', '#fff')}
        \${Card('Settings', '#fff')}
        \${Card('Help & Support', '#fff')}
        \${Card('Log out', '#fff')}
      </IUColumn>
    \`
  })
}`,...(y=(h=r.parameters)==null?void 0:h.docs)==null?void 0:y.source},description:{story:"hasDividers adds an hr separator before each item.",...(U=(b=r.parameters)==null?void 0:b.docs)==null?void 0:U.description}}};var $,w,k,z,A;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn
    },
    template: \`
      <div style="display:flex;gap:16px;padding:16px">
        <div v-for="v in ['top','center','bottom','space-between']" :key="v" style="flex:1">
          <div style="font-size:11px;color:#888;margin-bottom:8px;font-weight:600">{{ v }}</div>
          <IUColumn :vertical-align="v" :spacing="8" style="height:200px;background:#fafafa;border-radius:10px;border:1px dashed #ddd">
            \${Card('A', '#e8f0fe')}
            \${Card('B', '#fce8f3')}
          </IUColumn>
        </div>
      </div>
    \`
  })
}`,...(k=(w=a.parameters)==null?void 0:w.docs)==null?void 0:k.source},description:{story:"verticalAlign controls justifyContent on the inner div. Requires fixed height.",...(A=(z=a.parameters)==null?void 0:z.docs)==null?void 0:A.description}}};var S,D,R,B,H;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn,
      IURow
    },
    template: \`
      <IUColumn :spacing="12" :padding-horizontal="12" style="width:400px;background:#f5f5f5;border-radius:12px">
        \${Card('Header', '#e8f0fe')}
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          <IUColumn :spacing="8" :expanding="true" style="background:#fff;border-radius:10px">
            \${Card('Left A', '#fafafa')}
            \${Card('Left B', '#fafafa')}
          </IUColumn>
          <IUColumn :spacing="8" :expanding="true" style="background:#fff;border-radius:10px">
            \${Card('Right A', '#fafafa')}
            \${Card('Right B', '#fafafa')}
          </IUColumn>
        </IURow>
        \${Card('Footer', '#e8fef0')}
      </IUColumn>
    \`
  })
}`,...(R=(D=i.parameters)==null?void 0:D.docs)==null?void 0:R.source},description:{story:"Nested IUColumn inside another — auto-wraps in IUColumnItem.",...(H=(B=i.parameters)==null?void 0:B.docs)==null?void 0:H.description}}};var T,_,L,O,P;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IUColumn
    },
    template: \`
      <div style="display:flex;gap:16px;padding:16px">
        <div v-for="ph in [0,8,16]" :key="ph" style="flex:1">
          <div style="font-size:11px;color:#888;margin-bottom:8px">paddingHorizontal={{ ph }}</div>
          <IUColumn :spacing="8" :padding-horizontal="ph" style="background:#f5f5f5;border-radius:10px">
            \${Card('Item A', '#e8f0fe')}
            \${Card('Item B', '#fce8f3')}
          </IUColumn>
        </div>
      </div>
    \`
  })
}`,...(L=(_=d.parameters)==null?void 0:_.docs)==null?void 0:L.source},description:{story:"paddingHorizontal is inherited by all IUColumnItem children from context.",...(P=(O=d.parameters)==null?void 0:O.docs)==null?void 0:P.description}}};const K=["Default","SpacingTokens","WithDividers","VerticalAlignment","NestedColumns","PaddingFromContext"];export{o as Default,i as NestedColumns,d as PaddingFromContext,t as SpacingTokens,a as VerticalAlignment,r as WithDividers,K as __namedExportsOrder,J as default};
