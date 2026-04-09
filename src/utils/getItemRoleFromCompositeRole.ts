export type CompositeRole =
  | 'grid'
  | 'listbox'
  | 'list'
  | 'menu'
  | 'radiogroup'
  | 'row'
  | 'tablist'
  | string
  | undefined

export function getItemRoleFromCompositeRole(role: CompositeRole): string | null {
  switch (role) {
    case 'grid':
      return 'row'
    case 'listbox':
      return 'option'
    case 'list':
      return 'listitem'
    case 'menu':
      return 'menuitem'
    case 'radiogroup':
      return 'radio'
    case 'row':
      return 'gridcell'
    case 'tablist':
      return 'tab'
    default:
      return null
  }
}

export default getItemRoleFromCompositeRole
