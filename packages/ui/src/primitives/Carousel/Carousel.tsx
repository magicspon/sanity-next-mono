import * as React from 'react'

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { Flex } from '../Flex'

type EmblaCarouselType = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type EmblaOptionsType = UseCarouselParameters[0]
type EmblaPluginType = UseCarouselParameters[1]

/***
 * <Carousel.Root
 *		options={{
 *			active: true,
 *			axis: 'x',
 *			align: 'center',
 *			slidesToScroll: 1,
 *		}}
 *	>
 *		<Carousel.Prev>Prev</Carousel.Prev>
 *		<Carousel.Next>Next</Carousel.Next>
 *		<Carousel.Viewport>
 *			<Carousel.Item className="w-full flex-shrink-0">A</Carousel.Item>
 *			<Carousel.Item className="w-full flex-shrink-0">B</Carousel.Item>
 *			<Carousel.Item className="w-full flex-shrink-0">C</Carousel.Item>
 *			<Carousel.Item className="w-full flex-shrink-0">D</Carousel.Item>
 *		</Carousel.Viewport>
 *		<Carousel.Dots>
 *			<Carousel.Dot index={0}>Dot</Carousel.Dot>
 *			<Carousel.Dot index={1}>Dot</Carousel.Dot>
 *			<Carousel.Dot index={2}>Dot</Carousel.Dot>
 *			<Carousel.Dot index={3}>Dot</Carousel.Dot>
 *		</Carousel.Dots>
 *	</Carousel.Root>
 */

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    },
    [emblaApi, onButtonClick],
  )

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

type TCarouselContext = UsePrevNextButtonsType & UseDotButtonType

const CarouselContext = React.createContext<TCarouselContext>(null!)

function useCarousel() {
  return React.useContext(CarouselContext)
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const onPrevButtonClick = React.useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = React.useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export type TCarouselProps = {
  options?: EmblaOptionsType
  plugins?: EmblaPluginType
  children?: React.ReactNode
}

export function Root({ options, plugins, children }: TCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const context = React.useMemo(() => {
    return {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
      selectedIndex,
      scrollSnaps,
      onDotButtonClick,
    }
  }, [
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  ])

  return (
    <CarouselContext.Provider value={context}>
      <div ref={emblaRef}>{children}</div>
    </CarouselContext.Provider>
  )
}

export const Prev = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { asChild?: boolean }
>(function NextButton(props, ref) {
  const { onPrevButtonClick, prevBtnDisabled } = useCarousel()

  return (
    <button
      ref={ref}
      disabled={prevBtnDisabled}
      type="button"
      onClick={(e) => {
        onPrevButtonClick()
        props?.onClick?.(e)
      }}
      {...props}
    />
  )
})

export const Next = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function Next(props, ref) {
  const { onNextButtonClick, nextBtnDisabled } = useCarousel()

  return (
    <button
      ref={ref}
      disabled={nextBtnDisabled}
      type="button"
      onClick={(e) => {
        onNextButtonClick()
        props?.onClick?.(e)
      }}
      {...props}
    />
  )
})

export const Dots = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function Dots({ children, ...props }, ref) {
  return (
    <Flex {...props} ref={ref}>
      {children}
    </Flex>
  )
})

export const Viewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function Viewport({ children, ...props }, ref) {
  return (
    <Flex {...props} ref={ref}>
      {children}
    </Flex>
  )
})

export const Dot = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { index: number }
>(function Dot({ index, ...props }, ref) {
  const { onDotButtonClick, selectedIndex } = useCarousel()

  return (
    <button
      ref={ref}
      data-state={selectedIndex ? 'active' : 'inactive'}
      type="button"
      onClick={(e) => {
        onDotButtonClick(index)
        props?.onClick?.(e)
      }}
      {...props}
    />
  )
})

export const Item = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function NextButton(props, ref) {
  const { selectedIndex } = useCarousel()

  return (
    <div
      ref={ref}
      data-state={selectedIndex ? 'active' : 'inactive'}
      {...props}
    />
  )
})
