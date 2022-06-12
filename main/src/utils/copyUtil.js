import {message} from "ant-design-vue";

/**
 * 复制内容到粘贴板
 * @param text
 */
export const copyText = (text) => {
    text = text || '';
    let bodyEl = document.getElementsByTagName('body')[0];
    let inputEl = document.createElement('input');

    inputEl.setAttribute("value", text);
    bodyEl.appendChild(inputEl);
    inputEl.select();
    document.execCommand('copy');
    message.success('数据已复制到粘贴板');
    bodyEl.removeChild(inputEl);
}