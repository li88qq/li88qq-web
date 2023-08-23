import {h} from 'vue'
import {useTooltipStore} from '@/store'

const render_index = ({index})=>{
    return `${index+1}`
}
const tooltipStore = useTooltipStore()

//表格列
export const columns = [
    {dataIndex: 'index', title: '序号',customRender:render_index},
    {dataIndex: 'id', title: 'id'},
    {dataIndex: 'name', title: '名称',ellipsis:{showTitle:false},customCell:(record)=>tooltipStore.customCell_cell(record['name']),},
    {dataIndex: 'name2', title: '名称2',ellipsis:{showTitle:false},customCell:(record)=>tooltipStore.customCell_cell(record['name2'],),},
    {dataIndex: 'createDate', title: '创建时间'},
    {dataIndex: 'action', title: '操作'},
]

//初始化表格数据
const initDataSource = (size = 100) => {
    const dataSource = []
    for (let i = 0; i < size; i++) {
        const row = {
            id: `${i}`,
            name: `字段-${i}\n\naaaaaaaaaaaaaaaaaaaaaaaaa\n\n啊啊啊啊啊啊啊啊啊啊啊啊啊\nd啊啊啊`,
            name2: `字段-${i}\n\n啊啊啊水水水水\n\n不不不\nd啊啊啊`,
            createDate: 0,
        }
        dataSource.push(row)
    }
    return dataSource
}

//表格数据
export const dataSource = initDataSource(8)