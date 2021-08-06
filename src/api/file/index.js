import vAxios from '/@/utils/axiosUtil'

const Api = {
    IMAGE_SAVE: '/file/saveImage',
}

export const saveImage = (params) => vAxios.upload(Api.IMAGE_SAVE, params);
