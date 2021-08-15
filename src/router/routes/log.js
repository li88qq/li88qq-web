const log = [
    {
        path: '/log', component: ()=>import('/@/layouts/index.vue'),
        redirect: '/log/login',
        children: [
            {path: 'login', component: ()=>import('/@/views/log/login/index.vue'),},
            {path: 'action', component: ()=>import('/@/views/log/action/index.vue'),},
        ]
    }
]

export default log;