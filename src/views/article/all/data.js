import {h} from 'vue';
import {Tag, Button} from "ant-design-vue";
import {timestampToTime} from '/@/utils/dateUtil'

export const columns = ({toView}) => [
    {
        key: 'index', title: '序号',
        width: 70,
        customRender: ({index}) => {
            return `${index + 1}`
        }
    },
    {
        dataIndex: 'title', title: '标题', width: 300,align: 'left',
        customRender: ({text, record}) => {
            return h(Button, {
                type: 'link', size: 'small', onClick: () => {
                    toView(record.sn);
                }
            }, () => text)
        }
    },
    {dataIndex: 'username', title: '作者',},
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
        dataIndex: 'labels', title: '标签',width: 300,align: 'left',
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
        dataIndex: 'createDate', title: '发布时间',
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
    {dataIndex: 'readCount', title: '阅读量',},
    {
        key: 'action', title: '操作',
        customRender: () => {
        }
    },
];