const app = [
    {
        path: '/app', component: ()=>import('/@/layouts/index.vue'),
        redirect: '/app/navigation',
        children: [
            {path: 'navigation', component: ()=>import('/@/views/app/navigation/index.vue'),},
            {path: 'timestamp', component: ()=>import('/@/views/app/timestamp/index.vue'),},
            {path: 'json', component: ()=>import('/@/views/app/json/index.vue'),},
            {path: 'qrcode', component: ()=>import('/@/views/app/qrcode/index.vue'),},
            {path: 'base64', component: ()=>import('/@/views/app/base64/index.vue'),},
        ]
    }
]

export default app;