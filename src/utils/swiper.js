// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


/**
 * 初始化 轮播图
 * @author cieme
 * @date 2022-11-09
 * @param {any} elementClassName
 * @returns {any}
 */
export const initSwiper = (elementClassName) => {
  const swiper = new Swiper(elementClassName, {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
  })
  return swiper
}
