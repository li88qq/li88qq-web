import vAxios from '/@/utils/axiosUtil'

const Api = {
    ARTICLE_SAVE: '/article/save',
    ARTICLE_PAGE: '/article/getArticlePage',
    ARTICLE_ALL_PAGE: '/article/getAllPage',
    ARTICLE_GET: '/article/get',
    ARTICLE_DELETE: '/article/delete',
    ARTICLE_UPDATE: '/article/update',
    ARTICLE_UPDATE_CONTENT: '/article/updateContent',
}

export const save = (params) => vAxios.post(Api.ARTICLE_SAVE, params);
export const getArticlePage = (params) => vAxios.get(Api.ARTICLE_PAGE, {params: params});
export const getAllPage = (params) => vAxios.get(Api.ARTICLE_ALL_PAGE, {params: params});
export const getArticle = (params) => vAxios.get(Api.ARTICLE_GET, {params: params});
export const deleteArticle = (params) => vAxios.post(Api.ARTICLE_DELETE, params);
export const update = (params) => vAxios.post(Api.ARTICLE_UPDATE, params);
export const updateContent = (params) => vAxios.post(Api.ARTICLE_UPDATE_CONTENT, params);