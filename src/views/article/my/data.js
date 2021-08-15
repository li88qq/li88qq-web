import {h} from 'vue';
import {Tag, Button, Popconfirm} from "ant-design-vue";
import {timestampToTime} from '/@/utils/dateUtil'

export const columns = ({toView, deleteAc, editAc}) => [
    {
        key: 'index', title: '序号',
        width: 70,
        customRender: ({index}) => {
            return `${index + 1}`
        }
    },
    {
        dataIndex: 'title', title: '标题', width: 300, align: 'left',
        customRender: ({text, record}) => {
            return h(Button, {
                type: 'link', size: 'small', onClick: () => {
                    toView(record.sn);
                }
            }, () => text)
        }
    },
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
                color = 'orange';
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
                color = 'orange';
                value = '私有'
            }
            return h(Tag, {color: color}, () => value)
        }
    },
    {
        dataIndex: 'labels', title: '标签', width: 300,align: 'left',
        customRender: ({text}) => {
            if (!text) {
                return;
            }
            const arr = text.split(',');
            console.log(arr);
            const div = [];
            arr.forEach(a => {
                div.push(h(Tag, {color: 'green'}, () => a));
            });
            return div;
        }
    },
    {
        dataIndex: 'createDate', title: '创建时间',
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
    {dataIndex: 'readCount', title: '阅读量',},
    {
        key: 'action', title: '操作',
        customRender: ({record}) => {
            const editBtn = h(Button, {
                type: 'primary', size: 'small',
                onClick: () => {
                    editAc(record.id)
                }
            }, () => '编辑');
            const deleteBtn = h(Popconfirm, {
                title: '您确定删除该记录吗', okText: '确定', cancelText: '取消',
                onConfirm: () => {
                    deleteAc(record.id)
                },
            }, () => h(Button, {type: 'primary', danger: true, size: 'small'}, () => "删除"));
            return [editBtn, deleteBtn];
        }
    },
];