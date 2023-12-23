import { ImageSelection } from 'cms/queries/fragments/image.fragment'
import { urlBuilder } from 'cms/lib/image'
import { ImageProps } from 'next/image'

export const createBuilder = urlBuilder

export const transformImage = (
  props: ImageSelection | null | undefined,
  target: { width: number; height: number },
): ImageProps | null => {
  if (!props) return null
  const alt = props.alt ?? ''
  const blurDataURL = props.asset.lqip

  const src = urlBuilder(props)

  return {
    src: src.size(target.width, target.height).url() as string,
    width: target.width,
    height: target.height,
    alt,
    blurDataURL,
    placeholder: 'blur',
  }
}

export function imageProps(props: ImageSelection): ImageProps {
  const width = props.asset.width
  const height = props.asset.height
  const alt = props.alt ?? ''
  const blurDataURL = props.asset.lqip

  if (!props.hotspot || !props.crop) {
    return {
      src: props.asset.url,
      width,
      height,
      alt,
      blurDataURL,
      placeholder: 'blur',
    }
  }

  const cropWidth = Math.ceil(width * props.hotspot.width)
  const cropHeight = Math.ceil(height * props.hotspot.height)

  const src = urlBuilder(props).rect(
    Math.ceil(props.crop.left * width),
    Math.ceil(props.crop.top * height),
    cropWidth,
    cropHeight,
  )

  return {
    src: src.url() as string,
    width: cropWidth,
    height: cropHeight,
    alt,
    blurDataURL,
    placeholder: 'blur',
  }
}
