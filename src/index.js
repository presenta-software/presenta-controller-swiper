import Xwiper from 'xwiper'

const controller = function (routerElement, router, ctrlConfig, projectConfig) {
  const xwiperEl = new Xwiper(routerElement)
  xwiperEl.onSwipeLeft(router.next)
  xwiperEl.onSwipeRight(router.prev)
}

controller.install = Presenta => {
  Presenta.addController('swiper', controller)
}

export default controller

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(controller)
}
