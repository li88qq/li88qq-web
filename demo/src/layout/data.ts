/**
 * 菜单
 */
export const menus = [
    {key: '/main', label: '主页'},
    {
        key: '/test', label: '测试', children: [
            {key: '/test/t1', label: 'Form表单',},
            {key: '/test/t2', label: 'Table表格',},
            {key: '/test/t3', label: 'Modal对话框',},
        ]
    },
]