/**
 * 元素视窗位置
 */
export interface ViewportOffsetResult {
    left: number;
    top: number;
    right: number;
    bottom: number;
    rightIncludeBody: number;
    bottomIncludeBody: number;
}

/**
 * 方法返回元素的大小及其相对于视口的位置
 * @param element 元素
 */
export function getBoundingClientRect(element: Element): DOMRect | number {
    if (!element || !element.getBoundingClientRect) {
        return 0;
    }
    return element.getBoundingClientRect();
}

/**
 * 获取元素视窗位置
 * Get the left and top offset of the current element
 * left: the distance between the leftmost element and the left side of the document
 * top: the distance from the top of the element to the top of the document
 * right: the distance from the far right of the element to the right of the document
 * bottom: the distance from the bottom of the element to the bottom of the document
 * rightIncludeBody: the distance between the leftmost element and the right side of the document
 * bottomIncludeBody: the distance from the bottom of the element to the bottom of the document
 *
 * @description: 获取元素视窗位置
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
    const doc = document.documentElement;

    const docScrollLeft = doc.scrollLeft;
    const docScrollTop = doc.scrollTop;
    const docClientLeft = doc.clientLeft;
    const docClientTop = doc.clientTop;

    const pageXOffset = window.scrollX;
    const pageYOffset = window.scrollY;

    const box = getBoundingClientRect(element);

    const {left: retLeft, top: rectTop, width: rectWidth, height: rectHeight} = box as DOMRect;

    const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
    const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
    const offsetLeft = retLeft + pageXOffset;
    const offsetTop = rectTop + pageYOffset;

    const left = offsetLeft - scrollLeft;
    const top = offsetTop - scrollTop;

    const clientWidth = window.document.documentElement.clientWidth;
    const clientHeight = window.document.documentElement.clientHeight;
    return {
        left: left,
        top: top,
        right: clientWidth - rectWidth - left,
        bottom: clientHeight - rectHeight - top,
        rightIncludeBody: clientWidth - left,
        bottomIncludeBody: clientHeight - top,
    };
}