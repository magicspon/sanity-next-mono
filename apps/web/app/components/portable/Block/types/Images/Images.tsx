import clsx from 'clsx'
import { PortableImages } from 'cms/queries/fragments/portable.fragment'
import Image from 'next/image'
import * as React from 'react'
import { imageProps } from '~/utils/imageProps'

export interface TImagesProps {}

export function Images({ layout, images }: PortableImages) {
  return (
    <div className="grid grid-cols-site">
      <div
        className={clsx('col-[content] grid gap-8', {
          'grid-cols-2 gap-8': layout === 'inline',
        })}
      >
        {images?.map((img) => <Image key={img._key} {...imageProps(img)} />)}
      </div>
    </div>
  )
}
