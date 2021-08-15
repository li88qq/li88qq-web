import {h} from 'vue';
import {Tag, Button} from "ant-design-vue";
import {timestampToTime} from '/@/utils/dateUtil'

export const columns_my = ({}) => [
    {
        key: 'index', title: '序号',
        width: 70,
        customRender: ({index}) => {
            return `${index + 1}`
        }
    },
    {dataIndex: 'title', title: '标题', width: 300,},
    {
        dataIndex: 'state', title: '状态',
        customRender: ({text, record, index}) => {
            let color, value;
            color = 'green';
            value = '正常'
            return h(Tag, {color: color}, () => value)
        }
    },
    {
        dataIndex: 'original', title: '是否原创',
        customRender: ({text, record, index}) => {
            let color, value;
            if (text === 1) {
                color = 'green';
                value = '原创'
            } else {
                color = 'default';
                value = '转载'
            }
            return h(Tag, {color: color}, () => value)
        }
    },
    {
        dataIndex: 'open', title: '是否公开',
        customRender: ({text, record, index}) => {
            let color, value;
            if (text === 1) {
                color = 'green';
                value = '公开'
            } else {
                color = 'default';
                value = '私有'
            }
            return h(Tag, {color: color}, () => value)
        }
    },
    {
        dataIndex: 'createDate', title: '创建时间',
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
    {dataIndex: 'labels', title: '标签',},
    {dataIndex: 'readCount', title: '阅读量',},
    {
        key: 'action', title: '操作',
        customRender: () => {
            const editBtn = h(Button, {type: 'primary', size: 'small'}, () => '编辑');
            const deleteBtn = h(Button, {type: 'primary', danger: 'danger', size: 'small'}, () => '删除');
            return [editBtn, deleteBtn];
        }
    },
];

export const columns_all = ({}) => [
    {
        key: 'index', title: '序号',
        width: 70,
        customRender: ({index}) => {
            return `${index + 1}`
        }
    },
    {dataIndex: 'title', title: '标题', width: 300,},
    {dataIndex: 'username', title: '作者',},
    {
        dataIndex: 'original', title: '是否原创',
        customRender: ({text, record, index}) => {
            let color, value;
            if (text === 1) {
                color = 'green';
                value = '原创'
            } else {
                color = 'default';
                value = '转载'
            }
            return h(Tag, {color: color}, () => value)
        }
    },
    {
        dataIndex: 'createDate', title: '发布时间',
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
    {dataIndex: 'labels', title: '标签',},
    {dataIndex: 'readCount', title: '阅读量',},
    {
        key: 'action', title: '操作',
        customRender: () => {
            const editBtn = h(Button, {type: 'primary', size: 'small'}, () => '编辑');
            const deleteBtn = h(Button, {type: 'primary', danger: 'danger', size: 'small'}, () => '删除');
            return [editBtn, deleteBtn];
        }
    },
];