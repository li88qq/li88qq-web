import screenfull from 'screenfull'

/**
 * 全屏工具类
 */
export const useScreenFull = () => {

    /**
     * 全屏
     * @param el 元素,默认html
     */
    const screenFull = (el) => {
        if (screenfull.isEnabled) {
            screenfull.request(el);
        }
    }

    /**
     * 全屏切换
     * @param el 元素,默认html
     */
    const screenToggle = (el)=> {
        if (screenfull.isEnabled) {
            screenfull.toggle(el);
        }
    }

    return {
        screenFull, screenToggle,
    }
}
