const app = [
    {path: '/app/qrcode', component: () => import('/@/views/app/qrcode/index.vue')},
    {path: '/app/json', component: () => import('/@/views/app/json/index.vue')},
    {path: '/app/timestamp', component: () => import('/@/views/app/timestamp/index.vue')},
    {path: '/app/base64', component: () => import('/@/views/app/base64/index.vue')},
    {path: '/app/navigation', component: () => import('/@/views/app/navigation/index.vue')},
]

export default app