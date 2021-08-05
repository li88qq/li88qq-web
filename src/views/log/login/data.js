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
    {
        dataIndex: 'createDate', title: '登录时间',
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
    {
        dataIndex: 'state', title: '状态',
        customRender: ({text, record, index}) => {
            let color = '', value = '';
            switch (text) {
                case 1:
                    color = 'green';
                    value = '成功';
                    break;
                case 2:
                    color = 'red';
                    value = '密码错误';
                    break;
                default:
                    break;
            }
            return h(Tag, {color: color}, () => value)
        }
    },
    {
        dataIndex: 'loginType', title: '登录方式',
        customRender: ({text, record, index}) => {
            let color = 'green', value = '';
            switch (text) {
                case 1:
                    value = '浏览器';
                    break;
                case 2:
                    value = '移动端';
                    break;
                case 3:
                    value = '扫一扫';
                    break;
                default:
                    break;
            }

            return h(Tag, {color: color}, () => value)
        }
    },
    {dataIndex: 'loginIp', title: '登录IP',},
    {
        dataIndex: 'updateDate', title: '登出时间',
        customRender: ({text, record, index}) => {
            return timestampToTime(text);
        }
    },
];