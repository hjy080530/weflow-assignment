const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN ?? 'weflow-admin-2026'

export function isAuthorized(cookieValue: string | undefined): boolean {
  return cookieValue === SESSION_TOKEN
}

export { SESSION_TOKEN }
