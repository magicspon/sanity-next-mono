import * as React from 'react'
import { PortableText, type PortableTextProps } from '@portabletext/react'
import { Links } from '~/components/portable/shared/Links'
import { Link } from '../marks/Link'
import { Images } from './types/Images'
import { Body } from 'cms/queries/fragments/portable.fragment'
import * as style from '../shared/variants'
import { StackBlocks } from './types/StackBlocks'
import { SplitBlocks } from '~/components/portable/Block/types/SplitBlocks'
import { CardBlocks } from './types/CardBlocks'
import { createBlock } from '../shared/block'
import clsx from 'clsx'
import { getYouTubeID } from 'utils/youtube-id'

export type BlockProps = {
  block: Body
} & style.Variant

export function Block({ block, variant }: BlockProps) {
  return (
    <div>
      <PortableText
        value={block as PortableTextProps['value']}
        components={{
          types: {
            links: ({ value }) => {
              return (
                <Links
                  links={value.links}
                  layout={value.layout}
                  className={clsx(
                    '[&:has(+*)]:mb-5',
                    value.indent ? 'col-start-5 col-span-3' : 'col-[content]',
                  )}
                />
              )
            },
            blocks: ({ value }) => {
              if (value.layout === 'stack') {
                return <StackBlocks {...value} />
              }
              if (value.layout === 'split') {
                return <SplitBlocks {...value} />
              }

              return (
                <div className="col-start-4 col-end-8">
                  <CardBlocks {...value} />
                </div>
              )
            },
            images: ({ value }) => {
              return (
                <div className="col-[full] [&:has(+*)]:mb-12">
                  <Images {...value} />
                </div>
              )
            },
            break: ({ value }) => {
              return (
                <div
                  className={clsx(
                    'flex items-center',
                    value.indent ? 'col-start-5 col-span-3' : 'col-[full]',
                    {
                      'h-12': value.size === 'small',
                      'h-24': value.size === 'medium',
                      'h-48': value.size === 'large',
                    },
                  )}
                >
                  {value.style !== 'blank' && (
                    <hr
                      className={clsx('w-full', {
                        'border-dotted': value.style === 'dotted',
                      })}
                    />
                  )}
                </div>
              )
            },
            youtube: ({ value }) => {
              const id = getYouTubeID(value.url)
              const embedUrl = `https://www.youtube.com/embed/${id}`
              if (!id) {
                return <div>Missing YouTube URL</div>
              }

              return (
                <div className="col-[content]">
                  <iframe
                    title="YouTube Preview"
                    width="560"
                    height="315"
                    src={embedUrl}
                    className="aspect-video w-full h-auto"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )
            },
          },
          block: createBlock({ variant, layout: 'content' }),
          list: {
            // Ex. 1: customizing common list types
            bullet: ({ children }) => (
              <ul className="col-[content] list-disc list-inside [&:has(+*)]:mb-8 space-y-2 trim text-base">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="col-[content] list-decimal [&:has(+*)]:mb-8 space-y-2 trim text-base">
                {children}
              </ol>
            ),
          },
          marks: {
            link: ({ children, value }) => {
              return <Link link={value}>{children}</Link>
            },
            highlight: ({ children }) => {
              return (
                <span className={style.highlight({ variant })}>{children}</span>
              )
            },
          },
        }}
      />
    </div>
  )
}
