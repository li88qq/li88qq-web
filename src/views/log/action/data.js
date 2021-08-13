import {h} from 'vue';
import {Tag} from "ant-design-vue";
import {timestampToTime} from '/@/utils/dateUtil'

export const columns = ({}) => [
    {
        key: 'index', title: '序号',
        width: 70,
        customRender: ({index}) => {
            return `${index + 1}`
        }
    },
    {
        dataIndex: 'createDate', title: '操作时间',width: 160,
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
    {
        dataIndex: 'acType', title: '操作类型',width: 120,
        customRender: ({text, record, index}) => {
            let color = 'green', value = '';
            switch (text) {
                case 1:
                    value = '查询';
                    break;
                case 2:
                    value = '新增';
                    break;
                case 3:
                    value = '修改';
                    break;
                case 4:
                    color = "red";
                    value = '删除';
                    break;
                case 5:
                    value = '文件';
                    break;
                default:
                    break;
            }

            return h(Tag, {color: color}, () => value)
        }
    },
    {dataIndex: 'title', title: '标题',width: 200,},
    {dataIndex: 'detail', title: '详情',align: 'left'},
    {dataIndex: 'ip', title: 'IP',width: 160,},
];