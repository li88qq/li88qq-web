/**
 * 获取文件base64
 * @param blob
 * @param callback
 */
export function getBase64(blob, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(blob);
}