import {h} from 'vue'

const render_index = ({index})=>{
    return `${index+1}`
}

//表格列
export const columns = [
    {dataIndex: 'index', title: '序号',customRender:render_index},
    {dataIndex: 'id', title: 'id'},
    {dataIndex: 'name', title: '名称'},
    {dataIndex: 'createDate', title: '创建时间'},
    {dataIndex: 'action', title: '操作'},
]

//初始化表格数据
const initDataSource = (size = 100) => {
    const dataSource = []
    for (let i = 0; i < size; i++) {
        const row = {
            id: `${i}`,
            name: `字段-${i}`,
            createDate: 0,
        }
        dataSource.push(row)
    }
    return dataSource
}

//表格数据
export const dataSource = initDataSource(5)