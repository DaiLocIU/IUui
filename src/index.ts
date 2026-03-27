import './style.css'

// ─── Public API ───────────────────────────────────────────────────────────────
// Primary layout primitives
import IURow from './components/IURow.vue'
import IUColumn from './components/IUColumn.vue'

// Advanced — use for error boundaries and Suspense wrappers
import IURowItem from './components/IURowItem.vue'
import IUColumnItem from './components/IUColumnItem.vue'

export { IURow, IUColumn, IURowItem, IUColumnItem }

export default {
  install: (app: any) => {
    app.component('IURow', IURow)
    app.component('IUColumn', IUColumn)
    app.component('IURowItem', IURowItem)
    app.component('IUColumnItem', IUColumnItem)
  }
}

