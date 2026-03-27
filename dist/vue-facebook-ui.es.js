import { defineComponent as d, computed as u, openBlock as r, createElementBlock as o, normalizeClass as f, renderSlot as m, ref as v, normalizeStyle as p, createElementVNode as i } from "vue";
const _ = ["disabled"], h = /* @__PURE__ */ d({
  __name: "FbButton",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (t) => ["primary", "secondary", "danger"].includes(t)
    },
    size: {
      type: String,
      default: "medium",
      validator: (t) => ["small", "medium", "large"].includes(t)
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click"],
  setup(t, { emit: s }) {
    const e = t, n = s, l = u(() => [
      "fb-btn",
      `fb-btn--${e.variant}`,
      `fb-btn--${e.size}`,
      { "fb-btn--disabled": e.disabled }
    ]), c = (a) => {
      e.disabled || n("click", a);
    };
    return (a, B) => (r(), o("button", {
      class: f(l.value),
      disabled: t.disabled,
      onClick: c
    }, [
      m(a.$slots, "default", {}, void 0, !0)
    ], 10, _));
  }
}), b = (t, s) => {
  const e = t.__vccOpts || t;
  for (const [n, l] of s)
    e[n] = l;
  return e;
}, y = /* @__PURE__ */ b(h, [["__scopeId", "data-v-485c76d0"]]), g = ["src", "alt"], k = {
  key: 1,
  class: "fb-avatar__fallback"
}, z = /* @__PURE__ */ d({
  __name: "FbAvatar",
  props: {
    src: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: "Avatar"
    },
    size: {
      type: Number,
      default: 40
    }
  },
  setup(t) {
    const s = t, e = v(!1), n = () => {
      e.value = !0;
    }, l = u(() => !s.src || e.value);
    return (c, a) => (r(), o("div", {
      class: "fb-avatar",
      style: p({ width: `${t.size}px`, height: `${t.size}px` })
    }, [
      l.value ? (r(), o("div", k, [...a[0] || (a[0] = [
        i("svg", {
          viewBox: "0 0 36 36",
          fill: "currentColor",
          height: "100%",
          width: "100%"
        }, [
          i("path", { d: "M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1.5-3.8c-1.3-.4-2.6-.6-4-.6s-2.7.2-4 .6l-1.5 3.8zM18 11.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5-2.9-6.5-6.5-6.5z" })
        ], -1)
      ])])) : (r(), o("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        onError: n,
        class: "fb-avatar__img"
      }, null, 40, g))
    ], 4));
  }
}), x = /* @__PURE__ */ b(z, [["__scopeId", "data-v-47025369"]]), $ = {
  install: (t) => {
    t.component("FbButton", y), t.component("FbAvatar", x);
  }
};
export {
  x as FbAvatar,
  y as FbButton,
  $ as default
};
