---
name: fb-source-deobfuscator
description: Deobfuscate Meta/Facebook/Instagram JavaScript source and turn it into readable explanations or clean Vue implementations. Use when the user provides Meta-style obfuscated code — identified by __d() module wrappers, Stylex atomic classes, babelHelpers calls, react-compiler-runtime cache arrays, or Comet/Base React components — and asks to explain, decode, convert, or port it to Vue. Always run the full decode-then-explain-then-plan sequence before writing any code, even if the user asks to skip straight to implementation.
---

# FB Source Deobfuscator & Vue Clone

Reverse engineer Meta internal JavaScript structure before writing any explanation or port. Strip compiler noise first, rename variables from behavior, and only then explain or implement.

## Quick Example

Given this obfuscated input:

```javascript
__d(
  "CometScrollableArea",
  ["react", "react-compiler-runtime"],
  function (t, n, r, o, a, i, l) {
    var c = n("react-compiler-runtime").c(4);
    var q = n("react");
    function B(props) {
      var Te = props.nativeScrollbar,
        Pe = props.onScroll;
      var Ue = q.useRef(null);
      var s =
        c[0] !== Te ? ((c[0] = Te), (c[1] = Te ? "auto" : "hidden")) : c[1];
      return q.createElement(
        "div",
        { ref: Ue, style: { overflow: s }, onScroll: Pe },
        props.children,
      );
    }
    l.default = B;
  },
  98,
);
```

**Phase 0 identifies:** `__d` module system, react-compiler-runtime cache.

**Phase 1 decode table:**

| Obfuscated | Readable              | Evidence                          |
| ---------- | --------------------- | --------------------------------- |
| `B`        | `CometScrollableArea` | module name                       |
| `Te`       | `useNativeScrollbar`  | controls overflow branch          |
| `Pe`       | `onScrollCallback`    | passed to `onScroll` handler      |
| `Ue`       | `containerRef`        | `useRef(null)` on the outer div   |
| `s`        | `overflowValue`       | computed from `Te`, used in style |
| `c[0..1]`  | compiler cache        | stripped entirely                 |

**Phase 1 stripped result:**

```javascript
function CometScrollableArea({
  useNativeScrollbar,
  onScrollCallback,
  children,
}) {
  const containerRef = useRef(null);
  const overflowValue = useNativeScrollbar ? "auto" : "hidden";
  return (
    <div
      ref={containerRef}
      style={{ overflow: overflowValue }}
      onScroll={onScrollCallback}
    >
      {children}
    </div>
  );
}
```

**Phase 2 verdict:** reusable primitive — used by multiple layout components.

**Phase 3 file plan:** single `.vue` file (under 100 decoded lines).

**Phase 4 output:**

```vue
<!-- CometScrollableArea.vue -->
<!-- React: CometScrollableArea — thin overflow wrapper -->
<template>
  <!-- React: outer div with containerRef and overflow style -->
  <div
    ref="containerRef"
    :style="{ overflow: overflowValue }"
    @scroll="onScroll"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** React: Te — selects native vs hidden overflow */
    nativeScrollbar?: boolean;
    onScroll?: (e: Event) => void;
  }>(),
  { nativeScrollbar: false },
);

/** React: Ue */
const containerRef = ref<HTMLElement | null>(null);

/** React: s */
const overflowValue = computed(() =>
  props.nativeScrollbar ? "auto" : "hidden",
);
</script>
```

---

## Phase 0: Recognize Meta Patterns

Identify which systems are present before decoding.

### Module system markers

```javascript
__d("ModuleName", ["dep1", "dep2"], factory, 98)
  t = module registry
  n = require()
  r = requireLazy()
  o = requireDynamic()
  a = module object
  i = module metadata
  l = exports
```

Read `n("Something")` as an import. Read `l.default = X` as `export default X`.

### React compiler cache

Ignore this pattern entirely — strip it before reading any logic:

```javascript
var n = o("react-compiler-runtime").c(37)
n[0] !== t ? (
  ...actual code...
  n[0] = t, n[1] = result
) : result = n[1]
```

Treat it as:

```javascript
result = ...actual code...
```

### Stylex atomic CSS

Treat `$$css: true` objects as Stylex class maps. Decode classnames from browser DevTools when available. When not available, use the table below — but mark any uncertain inference explicitly.

**Note:** These mappings are empirically observed from Meta's production bundles. They are not official and may drift across deployments. Always prefer DevTools confirmation.

#### Layout — display and flex

```text
x78zum5   = display: flex
x1lliihq  = display: grid
xdj266r   = display: block
x11i5rnm  = display: inline
x1rg5ohu  = display: inline-flex
xdt5ytf   = flex-direction: column
x1q0g3np  = flex-direction: row
x1qughib  = flex-direction: column-reverse
x13dflua  = flex-direction: row-reverse
x2lah0s   = flex-shrink: 0
x1iyjqo2  = flex-grow: 1
xs83m0k   = flex-shrink: 1
x1l7klhg  = flex-basis: auto
x1r8uery  = flex-basis: 0
xeuugli   = min-width: 0
x2lwn1j   = min-height: 0
x1cy8zhl  = align-items: center
x6s0dn4   = align-items: flex-start
x1qhh985  = align-items: stretch
xl56j7k   = align-items: flex-end
x1q0q8m5  = justify-content: center
x1qpq9i9  = justify-content: flex-start
xjbqb8w   = justify-content: flex-end
x1ypdohk  = justify-content: space-between
x1rkzygb  = flex-wrap: wrap
x14yjl9h  = flex-wrap: nowrap
```

#### Position and stacking

```text
x1n2onr6  = position: relative
x10l6tqk  = position: absolute
x1fixed    = position: fixed
x1ja2u2z  = z-index: 0
xw2csxc   = overflow-x: auto (also seen: horizontal scroll)
x6ikm8r   = overflow-x: hidden
x10wlt62  = overflow-y: hidden
x1odjw0f  = overflow-y: auto
x13vifvy  = top: 0
x1ey2m1c  = bottom: 0
xtijo5x   = inset-inline-end: 0
x1lkfr7t  = inset-inline-start: 0
```

#### Opacity, visibility, and pointer events

```text
xg01cxk   = opacity: 0
x1hc1fzr  = opacity: 1
x1i10hfl  = cursor: pointer
xjbqb8w   = pointer-events: none (context-dependent — confirm in DevTools)
x1hl2dhg  = visibility: hidden
```

#### Spacing (padding / margin — common values)

```text
x1gslohh  = padding: 0
x1a2a7pz  = padding-inline: 0
x14b9ak4  = padding-block: 0
x1iorvi4  = padding-top: 8px
xm80bdy   = padding-bottom: 8px
```

#### Typography

```text
x193iq5w  = font-size: 15px (common body)
xvq8zen   = font-weight: 600
x1s688f   = font-weight: 700
x1tlxs5b  = line-height: 1.3333
xdj266r   = text-align: left (context-dependent)
x1e56ztr  = text-overflow: ellipsis
x1xmf6yo  = white-space: nowrap
```

#### Sizing

```text
x14vy4nm  = width: 100%
x1tpjpt1  = height: 100%
x1d52u69  = box-sizing: border-box
```

### babelHelpers patterns

Translate these immediately on sight:

```javascript
babelHelpers.extends({}, a, b)     →  { ...a, ...b }
babelHelpers.objectWithoutPropertiesLoose(obj, keys)  →  destructuring with rest
babelHelpers.inheritsLoose(Child, Parent)  →  class Child extends Parent {}
babelHelpers.createClass(Ctor, methods)    →  class method definitions
```

---

## Phase 1: Decode Pass

Complete this entire pass before writing any output.

### 1.0 React usage discovery

Before planning or writing code, inspect who uses the target React component:

- Search the React source tree for imports or JSX usage of the target component.
- Identify whether the component is used by multiple generic primitives, one app-level composite, or internal helper/provider modules only.
- Summarize what those parents imply about reusability.

Classify the component as one of:

- **reusable primitive**
- **composite app feature**
- **private helper/provider**

This step is required before implementation. Do not skip it.

### 1.1 Map variables to readable names

Build a mapping table from usage, not guesswork.

| Obfuscated | Readable             | Source evidence                              |
| ---------- | -------------------- | -------------------------------------------- |
| `Ue`       | `scrollerRef`        | `ref: Ue` plus `useRef(null)`                |
| `Pe`       | `isHovered`          | setter toggled on `mouseenter`               |
| `Te`       | `useNativeScrollbar` | controls native/custom branch                |
| `ze`       | `totalScrollHeight`  | numeric ref assigned scroll metrics          |
| `k`        | `stopAllEvents`      | calls `preventDefault` and `stopPropagation` |
| `L`        | `IS_RTL`             | assigned from locale direction check         |

Rules:

- Name `useRef(null)` values from their DOM usage.
- Name `useState(false)` / `useState(true)` state from setter call sites.
- Name single-letter module-scope values as constants or utilities.
- Name functions by behavior, not shape.

### 1.2 Strip compiler cache

Replace every compiler-cache ternary with the actual underlying code. Do this mentally before interpreting any control flow.

### 1.3 Decode Stylex classes

Use DevTools when available. When not, infer from the table in Phase 0 and mark uncertainty explicitly.

### 1.4 Identify render-mode splits

When a flag selects completely different JSX, name the branches clearly:

```javascript
if (useNativeScrollbar) {
  return <NativeRender />;
}
return <CustomRender />;
```

Do not mix the two branches in your explanation.

### 1.5 Name JSX children

For `children: [A, B, C, D]`, label each child by role before explaining layout — for example: top shadow, content wrapper, bottom shadow, scrollbar track, scrollbar thumb.

---

## Phase 2: Explain Pass

After decoding, explain the component in this order.

### 2.1 Component purpose

State what user-facing problem the component solves in one paragraph. Explain:

- what problem it solves
- why that behavior exists in the product
- whether it belongs in a UI library, an app-specific composite, or an internal helper only

If the component is a helper/provider/context module, say so explicitly and state whether it should be omitted from a library port.

### 2.2 Props table

| Prop | Obfuscated var | Type | Default | Purpose |
| ---- | -------------- | ---- | ------- | ------- |

### 2.3 State and refs table

| Name | Obfuscated | React hook | Purpose |
| ---- | ---------- | ---------- | ------- |

### 2.4 Render modes

Explain each branch separately: trigger condition, DOM shape, and why the branch exists.

### 2.5 Key algorithms

For complex logic:

1. Explain the algorithm in plain English.
2. Show the math with decoded names.
3. Explain why Meta likely chose that approach (performance, RTL support, GPU-friendly transforms, etc.).

### 2.6 Context system

State what the component reads from context and what it provides to descendants.

### 2.7 React-to-Vue feature comparison

When the user asks how the Vue code maps back to React, compare feature-by-feature. For each important behavior, state:

1. The exact React source snippet or logic that inspired it
2. Whether the Vue version is a direct port, a generalized abstraction, or a library-oriented reinterpretation
3. The exact Vue code or pattern implementing it
4. The behavioral contract that must remain true after the port

Apply this especially to: hidden-item filtering, section ordering, loading boundaries, separators, footer pinning, scroll behavior, context wiring, and feature flags.

Distinguish explicitly:

- **Direct source mapping** — copied behavior from React source
- **Generalized library extraction** — derived from React, converted to reusable primitive
- **New library affordance** — added for library ergonomics, not in React

Never imply a one-to-one React prop existed if it did not.

### 2.8 Reusability verdict

State one of:

- **Public library primitive**
- **Internal/example-only port**
- **Do not port**

Base this on Phase 1.0 usage discovery.

---

## Phase 3: Plan Pass

Do not write any code until all of these are complete:

1. React usage discovery (1.0)
2. Benefits explained (2.1)
3. Reusability verdict stated (2.8)
4. Implementation plan described (below)

If the user asks to skip straight to code, acknowledge the request, run the analysis in condensed form, state the verdict, then proceed.

### 3.1 File structure decision

- Under 100 decoded lines → single `.vue` file
- 100–300 lines → component + one composable
- Over 300 lines or multiple algorithms → component, composables, and utils split by responsibility

For complex clones:

```text
ComponentName/
├── index.ts
├── ComponentName.vue
├── composables/
│   ├── useMainLogic.ts
│   └── useSubFeature.ts
└── utils/
    ├── component.utils.ts
    ├── component.math.ts
    └── component.styles.ts
```

### 3.2 React to Vue hook mapping

| React                   | Vue / VueUse                    | Notes                      |
| ----------------------- | ------------------------------- | -------------------------- |
| `useEffect(fn, [])`     | `onMounted(fn)`                 | mount-only effect          |
| `useState(false)`       | `ref(false)`                    | reactive state             |
| `useRef(null)`          | `ref(null)`                     | DOM or mutable ref         |
| `useMemo(fn, deps)`     | `computed(fn)`                  | derived state              |
| `useCallback(fn, deps)` | plain function                  | usually no special wrapper |
| `useContext(Ctx)`       | `inject(KEY)`                   | context read               |
| `useImperativeHandle`   | `defineExpose`                  | parent-facing API          |
| `ResizeObserver`        | `useResizeObserver`             | setup-time only            |
| `IntersectionObserver`  | `useIntersectionObserver`       | setup-time only            |
| DOM event listener      | `useEventListener`              | setup-time only            |
| `setTimeout`            | `useTimeoutFn` or plain timeout | based on setup timing      |

**Critical:** call VueUse composables only during synchronous setup. For debouncing inside plain functions, use a local debounce utility — not `useDebounceFn`.

### 3.3 Known bugs to avoid

Always check these when cloning Meta scrollbar or interaction code:

- Refresh `containerTop` from `getBoundingClientRect().top` inside mousedown handlers — never reuse stale values.
- Guard scroll-ratio denominators so `totalHeight === visibleHeight` cannot produce `NaN`.
- Reset both branches of style assignments so old `top` values do not linger.
- Bind `innerContentRef` only in custom-scrollbar mode if the native branch omitted it.
- Strip `testid` from spread attrs before binding in Vue.

---

## Phase 4: Implementation Pass

Write production-grade code, not pseudo-code. Never truncate.

### Pure util files

- No Vue reactivity imports.
- Named exports only.
- JSDoc each function back to its React source variable or behavior.

```typescript
/**
 * React source: var C = 16, b = 50
 * Constants for track-click scroll stepping.
 */
export const SCROLL_STEP_PX = 16;
export const SCROLL_INTERVAL_MS = 50;
```

### Composables

- Import only from Vue, VueUse, and local utils.
- Define a clear args interface.
- Return only what the component or peer composables need.
- Use VueUse cleanup or explicit `onUnmounted`.

### Main Vue component

Keep the component focused on: props/emits, refs, inject/provide wiring, computed values, event handlers, composable wiring.

Raw DOM math and style construction belong in utils, not in the component.

Add short inline comments connecting Vue variables to original React variables or branches.

**For library-oriented abstractions (not literal clones):**

- Comment which parts are direct React behavior vs. generalized library API.
- Do not name generic props as if they existed in React unless they truly did.
- Port context/provider/helper modules only when necessary to preserve public behavior, or when explicitly requested.

### Template comments

For non-trivial nodes, add a comment explaining the original React role — especially for memoized child arrays, conditional shadow elements, track/thumb structure, or scrollbar layout.

---

## Phase 5: Verification Checklist

Before delivering output, verify:

- Both render modes preserve original behavior
- Every React prop is declared in Vue props
- Every context read has an `inject`
- Every context provider has a `provide`
- Every imperative API is exposed via `defineExpose`
- Every listener and observer is cleaned up
- RTL affects the same layout properties as the original
- No VueUse composables called inside late plain functions
- Refs accessed with `.value`
- `useAttrs()` used for rest-attr spreading where needed
- `containerTop` refreshed during mousedown
- Scroll ratio guarded against division by zero
- Style reset branches set both sides explicitly
- `innerContentRef` bound only where valid
- `testid` stripped before attr spreading

---

## Output Format

Always produce in this order:

1. Decode table
2. Purpose and benefits
3. React usage map
4. Reusability verdict
5. File structure
6. Implementation plan
7. Code files
8. Line-by-line diff table

If the user asks for a detailed Vue-versus-React comparison, append:

9. **Feature mapping table** — one row per major behavior:
   - React source logic
   - Vue implementation
   - direct port vs. generalized abstraction
   - behavioral contract that must remain identical

Never omit required files. Never replace working code with pseudo-code.
