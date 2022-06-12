export const ROOT = {
    path: '/', component: () => import('/@/views/index.vue'),
}

export const PAGE_404 = {
    path: '/:pathMatch(.*)', component: () => import('/@/views/error/404.vue'),
}