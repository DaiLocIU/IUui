import{_ as e}from"./IURow-BX2oI-X0.js";import{_ as Y}from"./IUColumn-W68PzqSw.js";import"./iframe-B2HEpmjM.js";import"./preload-helper-C1FmrZbK.js";import"./IUColumnItem-D74bFOSC.js";const to={title:"Layout/IURow",component:e,tags:["autodocs"],argTypes:{spacing:{control:{type:"select"},options:[0,4,8,12,16,24,32],description:"Gap between children (both H and V). Token: 4px base."},spacingHorizontal:{control:{type:"select"},options:[void 0,0,4,8,12,16,24,32],description:"Override horizontal gap only."},spacingVertical:{control:{type:"select"},options:[void 0,0,4,8,12,16,24,32],description:"Override vertical gap only."},paddingHorizontal:{control:{type:"select"},options:[void 0,0,4,8,12,16,24,32],description:"Inner horizontal padding. Auto: 12 at top-level, 0 inside Column."},paddingTop:{control:{type:"select"},options:[void 0,0,4,8,12,16,24,40],description:"Inner top padding. Auto: 16 at top-level, 0 inside Column."},paddingVertical:{control:{type:"select"},options:[void 0,0,4,8,12,16,24,40],description:"Inner top + bottom padding."}},parameters:{docs:{description:{component:"## IURow\n\nThe primary **horizontal** layout primitive. A direct port of Facebook's `CometRow`.\n\n### Two-layer design\n- **`IURow`** (this component) — owns spacing/padding tokens\n- **`IUBaseRow`** (internal) — owns flex-row alignment, direction, wrap\n\n### Auto-wrapping\nWhen `<IURow>` is placed inside another `<IURow>` or `<IUColumn>`, it\n**automatically wraps itself** in the correct item wrapper:\n- Inside a Row → `IURowItem` (resets Row context, applies flex-item CSS)\n- Inside a Column → `IUColumnItem` (applies spacing margin, per-item padding)\n\n### Spacing vs Padding\n| Prop | Effect |\n|---|---|\n| `spacing` | `gap-x` + `gap-y` between children (default 12px) |\n| `spacingHorizontal` | Override horizontal gap only |\n| `spacingVertical` | Override vertical gap only |\n| `paddingHorizontal` | Inner padding left+right (auto: 12 top-level, 0 in Column) |\n| `paddingTop` | Inner padding top (auto: 16 top-level, 0 in Column) |\n| `paddingVertical` | Inner padding top+bottom |\n\nAll other props (`align`, `verticalAlign`, `direction`, `wrap`, `columns`, `expanding`)\nare forwarded directly to `IUBaseRow`."}}}},o=(Q,X="#4f8ef7")=>`<div style="background:${X};color:#fff;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;white-space:nowrap">${Q}</div>`,i={render:()=>({components:{IURow:e},template:`
      <IURow :padding-top="0" :padding-horizontal="0">
        ${o("Item A")} ${o("Item B")} ${o("Item C")}
      </IURow>
    `})},n={render:()=>({components:{IURow:e},template:`
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px">
        <div v-for="s in [0,4,8,12,16,24,32]" :key="s">
          <div style="font-size:11px;color:#888;margin-bottom:4px">spacing={{ s }}</div>
          <IURow :spacing="s" :padding-top="0" :padding-horizontal="0">
            ${o("A","#4f8ef7")} ${o("B","#7c6af7")} ${o("C","#e06f6f")}
          </IURow>
        </div>
      </div>
    `})},t={render:()=>({components:{IURow:e},template:`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="a in ['start','center','end','justify']" :key="a">
          <div style="font-size:11px;color:#888;margin-bottom:4px">align={{ a }}</div>
          <IURow :align="a" :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:8px;padding:8px">
            ${o("A","#4f8ef7")} ${o("B","#7c6af7")}
          </IURow>
        </div>
      </div>
    `})},a={render:()=>({components:{IURow:e},template:`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="v in ['top','center','bottom','stretch']" :key="v">
          <div style="font-size:11px;color:#888;margin-bottom:4px">verticalAlign={{ v }}</div>
          <IURow :vertical-align="v" :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:8px;height:80px">
            ${o("Tall","#4f8ef7")} <div style="background:#7c6af7;color:#fff;padding:4px 16px;border-radius:6px;font-size:13px;font-weight:600">Short</div>
          </IURow>
        </div>
      </div>
    `})},d={render:()=>({components:{IURow:e,IUColumn:Y},template:`
      <IUColumn :spacing="8" :padding-horizontal="12" style="background:#f5f5f5;border-radius:12px;width:400px">
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          ${o("Row 1 — A","#4f8ef7")} ${o("Row 1 — B","#7c6af7")}
        </IURow>
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          ${o("Row 2 — A","#e06f6f")} ${o("Row 2 — B","#e09f4f")}
        </IURow>
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          ${o("Row 3 — A","#4fb87c")} ${o("Row 3 — B","#5bbce0")}
        </IURow>
      </IUColumn>
    `})},r={render:()=>({components:{IURow:e},template:`
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f0f4ff;border-radius:8px;padding:8px">
        ${o("Fixed","#4f8ef7")}
        <IURow :expanding="true" :spacing="4" :padding-top="0" :padding-horizontal="0" style="background:#e0eaff;border-radius:6px">
          ${o("Grows","#7c6af7")} ${o("to fill","#a06af7")}
        </IURow>
        ${o("Fixed","#4f8ef7")}
      </IURow>
    `})},p={render:()=>({components:{IURow:e},template:`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">direction=forward (default)</div>
          <IURow :padding-top="0" :padding-horizontal="0">
            ${o("1","#4f8ef7")} ${o("2","#7c6af7")} ${o("3","#e06f6f")}
          </IURow>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">direction=backward</div>
          <IURow direction="backward" :padding-top="0" :padding-horizontal="0">
            ${o("1","#4f8ef7")} ${o("2","#7c6af7")} ${o("3","#e06f6f")}
          </IURow>
        </div>
      </div>
    `})},s={render:()=>({components:{IURow:e},template:`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="cols in [2,3,4,5]" :key="cols">
          <div style="font-size:11px;color:#888;margin-bottom:4px">columns={{ cols }}</div>
          <IURow :columns="cols" :padding-top="0" :padding-horizontal="0">
            <div v-for="i in cols" :key="i" style="background:#4f8ef7;color:#fff;text-align:center;padding:10px;border-radius:6px;font-size:13px;font-weight:600">Col {{ i }}</div>
          </IURow>
        </div>
      </div>
    `})};var c,l,g,f,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <IURow :padding-top="0" :padding-horizontal="0">
        \${Box('Item A')} \${Box('Item B')} \${Box('Item C')}
      </IURow>
    \`
  })
}`,...(g=(l=i.parameters)==null?void 0:l.docs)==null?void 0:g.source},description:{story:"Default row with 3 items and default spacing (12px gap).",...(m=(f=i.parameters)==null?void 0:f.docs)==null?void 0:m.description}}};var x,w,v,u,I;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px">
        <div v-for="s in [0,4,8,12,16,24,32]" :key="s">
          <div style="font-size:11px;color:#888;margin-bottom:4px">spacing={{ s }}</div>
          <IURow :spacing="s" :padding-top="0" :padding-horizontal="0">
            \${Box('A', '#4f8ef7')} \${Box('B', '#7c6af7')} \${Box('C', '#e06f6f')}
          </IURow>
        </div>
      </div>
    \`
  })
}`,...(v=(w=n.parameters)==null?void 0:w.docs)==null?void 0:v.source},description:{story:"Spacing tokens from 0 to 32px — control how wide the gap between items is.",...(I=(u=n.parameters)==null?void 0:u.docs)==null?void 0:I.description}}};var R,y,U,h,b;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="a in ['start','center','end','justify']" :key="a">
          <div style="font-size:11px;color:#888;margin-bottom:4px">align={{ a }}</div>
          <IURow :align="a" :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:8px;padding:8px">
            \${Box('A', '#4f8ef7')} \${Box('B', '#7c6af7')}
          </IURow>
        </div>
      </div>
    \`
  })
}`,...(U=(y=t.parameters)==null?void 0:y.docs)==null?void 0:U.source},description:{story:"Align children along the main axis (justify-content).",...(b=(h=t.parameters)==null?void 0:h.docs)==null?void 0:b.description}}};var $,z,B,k,C;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="v in ['top','center','bottom','stretch']" :key="v">
          <div style="font-size:11px;color:#888;margin-bottom:4px">verticalAlign={{ v }}</div>
          <IURow :vertical-align="v" :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:8px;height:80px">
            \${Box('Tall', '#4f8ef7')} <div style="background:#7c6af7;color:#fff;padding:4px 16px;border-radius:6px;font-size:13px;font-weight:600">Short</div>
          </IURow>
        </div>
      </div>
    \`
  })
}`,...(B=(z=a.parameters)==null?void 0:z.docs)==null?void 0:B.source},description:{story:"Vertical alignment of items (align-items).",...(C=(k=a.parameters)==null?void 0:k.docs)==null?void 0:C.description}}};var A,S,T,V,_;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow,
      IUColumn
    },
    template: \`
      <IUColumn :spacing="8" :padding-horizontal="12" style="background:#f5f5f5;border-radius:12px;width:400px">
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          \${Box('Row 1 — A', '#4f8ef7')} \${Box('Row 1 — B', '#7c6af7')}
        </IURow>
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          \${Box('Row 2 — A', '#e06f6f')} \${Box('Row 2 — B', '#e09f4f')}
        </IURow>
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          \${Box('Row 3 — A', '#4fb87c')} \${Box('Row 3 — B', '#5bbce0')}
        </IURow>
      </IUColumn>
    \`
  })
}`,...(T=(S=d.parameters)==null?void 0:S.docs)==null?void 0:T.source},description:{story:"Row inside a Column: auto-wraps in IUColumnItem, inherits column spacing.",...(_=(V=d.parameters)==null?void 0:V.docs)==null?void 0:_.description}}};var D,E,F,G,H;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f0f4ff;border-radius:8px;padding:8px">
        \${Box('Fixed', '#4f8ef7')}
        <IURow :expanding="true" :spacing="4" :padding-top="0" :padding-horizontal="0" style="background:#e0eaff;border-radius:6px">
          \${Box('Grows', '#7c6af7')} \${Box('to fill', '#a06af7')}
        </IURow>
        \${Box('Fixed', '#4f8ef7')}
      </IURow>
    \`
  })
}`,...(F=(E=r.parameters)==null?void 0:E.docs)==null?void 0:F.source},description:{story:"Expanding row fills available width (flex-1).",...(H=(G=r.parameters)==null?void 0:G.docs)==null?void 0:H.description}}};var O,j,N,P,q;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">direction=forward (default)</div>
          <IURow :padding-top="0" :padding-horizontal="0">
            \${Box('1', '#4f8ef7')} \${Box('2', '#7c6af7')} \${Box('3', '#e06f6f')}
          </IURow>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">direction=backward</div>
          <IURow direction="backward" :padding-top="0" :padding-horizontal="0">
            \${Box('1', '#4f8ef7')} \${Box('2', '#7c6af7')} \${Box('3', '#e06f6f')}
          </IURow>
        </div>
      </div>
    \`
  })
}`,...(N=(j=p.parameters)==null?void 0:j.docs)==null?void 0:N.source},description:{story:"Direction: forward (ltr) vs backward (rtl / row-reverse).",...(q=(P=p.parameters)==null?void 0:P.docs)==null?void 0:q.description}}};var L,W,J,K,M;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => ({
    components: {
      IURow
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="cols in [2,3,4,5]" :key="cols">
          <div style="font-size:11px;color:#888;margin-bottom:4px">columns={{ cols }}</div>
          <IURow :columns="cols" :padding-top="0" :padding-horizontal="0">
            <div v-for="i in cols" :key="i" style="background:#4f8ef7;color:#fff;text-align:center;padding:10px;border-radius:6px;font-size:13px;font-weight:600">Col {{ i }}</div>
          </IURow>
        </div>
      </div>
    \`
  })
}`,...(J=(W=s.parameters)==null?void 0:W.docs)==null?void 0:J.source},description:{story:"Equal-width column grid (3 columns = each item is 1/3 width).",...(M=(K=s.parameters)==null?void 0:K.docs)==null?void 0:M.description}}};const ao=["Default","SpacingTokens","Alignment","VerticalAlign","NestedInColumn","Expanding","Direction","ColumnGrid"];export{t as Alignment,s as ColumnGrid,i as Default,p as Direction,r as Expanding,d as NestedInColumn,n as SpacingTokens,a as VerticalAlign,ao as __namedExportsOrder,to as default};
