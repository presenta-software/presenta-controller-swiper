import Xwiper from 'xwiper'
import { Lethargy } from 'lethargy'

const controller = function (routerElement, router, ctrlConfig, projectConfig) {
  const xwiperEl = new Xwiper(routerElement.parentNode)
  const isVertical = ctrlConfig.vertical

  if (isVertical) {
    xwiperEl.onSwipeDown(router.next)
    xwiperEl.onSwipeUp(router.prev)

    const lethargy = new Lethargy()
    let dontProceed = false

    const callb = e => {
      // e.preventDefault()
      // e.stopPropagation()

      const v = lethargy.check(e)

      if (v !== false) {
        if (dontProceed) return false

        if (v === -1) router.next()
        if (v === 1) router.prev()

        dontProceed = true
        setTimeout(() => {
          dontProceed = false
        }, 300)
      }
    }

    ['mousewheel', 'DOMMouseScroll', 'wheel', 'MozMousePixelScroll'].forEach(evt => {
      window.addEventListener(evt, callb, false)
    })
  } else {
    xwiperEl.onSwipeLeft(router.next)
    xwiperEl.onSwipeRight(router.prev)
  }
}

controller.install = Presenta => {
  Presenta.addController('swiper', controller)
}

export default controller

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(controller)
}
