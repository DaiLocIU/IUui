import type { Meta, StoryObj } from '@storybook/vue3'
import SidebarRail from './SidebarRail.vue'

const meta: Meta<typeof SidebarRail> = {
  title: 'Navigation/SidebarRail',
  component: SidebarRail,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const baseSections = [
  {
    id: 'main',
    title: 'Workspace',
    items: [
      { id: 'home', label: 'Home', icon: 'H', active: true },
      { id: 'inbox', label: 'Inbox', icon: 'I', badge: 12 },
      { id: 'calendar', label: 'Calendar', icon: 'C' },
    ],
    separator: true,
  },
  {
    id: 'admin',
    title: 'Admin',
    items: [
      { id: 'members', label: 'Members', icon: 'M' },
      { id: 'billing', label: 'Billing', icon: '$' },
      { id: 'audit', label: 'Audit Log', icon: 'A', hidden: true },
    ],
  },
]

const footerItems = [
  { id: 'privacy', label: 'Privacy' },
  { id: 'terms', label: 'Terms' },
  { id: 'support', label: 'Support' },
]

/** Default library-facing rail: grouped sections, active item, badges, and footer links. */
export const Default: Story = {
  render: () => ({
    components: { SidebarRail },
    data: () => ({
      sections: baseSections,
      footerItems,
    }),
    template: `
      <div style="width: 280px; height: 540px; border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; background: white;">
        <SidebarRail :sections="sections" :footer-items="footerItems" />
      </div>
    `,
  }),
}

/** Per-section skeletons let async sidebars stream in without collapsing the rail shell. */
export const LoadingSections: Story = {
  render: () => ({
    components: { SidebarRail },
    data: () => ({
      sections: [
        { id: 'main', title: 'Workspace', items: [], loading: true, separator: true },
        { id: 'admin', title: 'Admin', items: [], loading: true },
      ],
      footerItems,
    }),
    template: `
      <div style="width: 280px; height: 540px; border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; background: white;">
        <SidebarRail :sections="sections" :footer-items="footerItems" />
      </div>
    `,
  }),
}

/** Consumers can override row rendering without rebuilding the rail shell. */
export const CustomItemSlot: Story = {
  render: () => ({
    components: { SidebarRail },
    data: () => ({
      sections: baseSections,
      footerItems,
    }),
    template: `
      <div style="width: 280px; height: 540px; border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; background: white;">
        <SidebarRail :sections="sections" :footer-items="footerItems">
          <template #item="{ item }">
            <a
              :href="item.href || '#'"
              class="flex items-center gap-3 rounded-[14px] px-3 py-2 no-underline transition-colors"
              :class="item.active ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'"
            >
              <span
                class="flex h-8 w-8 items-center justify-center rounded-[10px]"
                :class="item.active ? 'bg-white/15' : 'bg-slate-200'"
              >{{ item.icon }}</span>
              <span class="min-w-0 flex-1 truncate font-semibold">{{ item.label }}</span>
              <span v-if="item.badge !== undefined" class="text-xs opacity-80">{{ item.badge }}</span>
            </a>
          </template>
        </SidebarRail>
      </div>
    `,
  }),
}

/** Footer content can be fully overridden for account actions, docs links, or legal copy. */
export const CustomFooter: Story = {
  render: () => ({
    components: { SidebarRail },
    data: () => ({
      sections: baseSections,
    }),
    template: `
      <div style="width: 280px; height: 540px; border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; background: white;">
        <SidebarRail :sections="sections">
          <template #footer>
            <div style="padding: 16px; border-top: 1px solid #e2e8f0; display:flex; align-items:center; gap:12px;">
              <div style="width: 36px; height: 36px; border-radius: 999px; background:#dbeafe;"></div>
              <div style="min-width:0;flex:1;">
                <div style="font-size:13px;font-weight:700;color:#0f172a;">Design System Team</div>
                <div style="font-size:12px;color:#64748b;">Workspace Owner</div>
              </div>
            </div>
          </template>
        </SidebarRail>
      </div>
    `,
  }),
}
