import slugify from 'utils/slugify'

export const createIdFromChildren = (children: React.ReactNode) => {
  const value: string | null = Array.isArray(children) ? children[0] : null
  return value ? slugify(value) : undefined
}
