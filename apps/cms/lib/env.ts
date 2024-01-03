export const PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID! ||
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore this is fine
  import.meta.env.SANITY_STUDIO_PROJECT_ID
