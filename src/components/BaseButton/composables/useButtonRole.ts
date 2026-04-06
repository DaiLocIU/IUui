import { computed, type Ref } from 'vue'

import {
  BLOCK_ALLOWED_ROLES,
  DEFAULT_ROLE,
  INLINE_ALLOWED_ROLES,
} from '../utils/button.constants'

export function useButtonRole(args: {
  role: Ref<string | undefined>
  display: Ref<'block' | 'inline'>
  ariaLabel: Ref<string | undefined>
  label: Ref<string | undefined>
}) {
  const resolvedRole = computed(() => {
    const role = args.role.value
    const allowedRoles = args.display.value === 'block'
      ? BLOCK_ALLOWED_ROLES
      : INLINE_ALLOWED_ROLES

    if (role != null && allowedRoles.has(role as never)) {
      return role
    }

    return DEFAULT_ROLE
  })

  const accessibilityLabel = computed(() => {
    if (args.role.value === 'none') {
      return undefined
    }

    return args.ariaLabel.value ?? args.label.value
  })

  return {
    resolvedRole,
    accessibilityLabel,
  }
}
