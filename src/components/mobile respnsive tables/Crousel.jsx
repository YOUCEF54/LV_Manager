import { ArrowLeft01Icon } from "hugeicons-react"
import { useState, useEffect } from "react"

export default function Carousel({
  // eslint-disable-next-line react/prop-types
  children: slides,
  // eslint-disable-next-line react/prop-types
  autoSlide = false,
  // eslint-disable-next-line react/prop-types
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    // eslint-disable-next-line react/prop-types
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    // eslint-disable-next-line react/prop-types
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          {/* <ArrowLeft01Icon className="size-5" /> */}
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
        {/* <ar className="size-5"/> */}
        </button>
      </div>


    </div>
  )
}