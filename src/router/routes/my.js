const my = [
    {
        path: '/my', component: ()=>import('/@/layouts/index.vue'),
        redirect: '/my/view',
        children: [
            {path: 'view', component: ()=>import('/@/views/my/view/index.vue'),},
            {path: 'workbench', component: ()=>import('/@/views/my/workbench/index.vue'),},
        ]
    }
]

export default my;