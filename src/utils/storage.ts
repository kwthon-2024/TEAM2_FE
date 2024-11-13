export const getSessionStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(key)
}

export const setSessionStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value)
  }
}

export const removeSessionStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key)
  }
}

export const clearSessionStorage = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.clear()
  }
}
