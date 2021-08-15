const setting = [
    {
        path: '/setting', component: ()=>import('/@/layouts/index.vue'),
        redirect: '/setting/profile',
        children: [
            {path: 'profile', component: ()=>import('/@/views/setting/profile/index.vue'),},
        ]
    }
]

export default setting;