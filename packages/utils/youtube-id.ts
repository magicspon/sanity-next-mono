export function getYouTubeID(
  url: string,
  opts: { fuzzy: boolean } = { fuzzy: true },
) {
  if (/youtu\.?be/.test(url)) {
    // Look first for known patterns
    let i
    const patterns = [
      /youtu\.be\/([^#&?]{11})/, // youtu.be/<id>
      /\?v=([^#&?]{11})/, // ?v=<id>
      /&v=([^#&?]{11})/, // &v=<id>
      /embed\/([^#&?]{11})/, // embed/<id>
      /\/v\/([^#&?]{11})/, // /v/<id>
    ]

    // If any pattern matches, return the ID
    for (i = 0; i < patterns.length; ++i) {
      if (patterns && patterns?.[i]?.test(url)) {
        return patterns?.[i]?.exec?.(url)?.[1]
      }
    }

    if (opts.fuzzy) {
      // If that fails, break it apart by certain characters and look
      // for the 11 character key
      const tokens = url.split(/[/&?=#.\s]/g)
      for (i = 0; i < tokens.length; ++i) {
        if (tokens && tokens[i] && /^[^#&?]{11}$/.test(tokens[i] as string)) {
          return tokens[i]
        }
      }
    }
  }

  return null
}
