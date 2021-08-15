const article = [
    {
        path: '/article', component: () => import('/@/layouts/index.vue'),
        redirect: '/article/my',
        children: [
            {path: 'my', component: () => import('/@/views/article/my/index.vue'),},
            {path: 'all', component: () => import('/@/views/article/all/index.vue'),},
            {path: 'editor', component: () => import('/@/views/article/editor/index.vue'),},
            {path: 'view', component: () => import('/@/views/article/view/index.vue'),},
        ]
    }
]

export default article;