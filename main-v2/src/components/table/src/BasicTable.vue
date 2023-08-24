<template>
  <div>
    <a-card size="small" class="table-form">
      <SearchForm></SearchForm>
    </a-card>
    <a-card size="small">
      <div class="table-action">
        <a-space>
          <a-button type="primary">新增</a-button>
          <a-button type="primary" danger>删除</a-button>
        </a-space>
        <a-space>
          <AppstoreOutlined></AppstoreOutlined>
          <TableOutlined></TableOutlined>
          <a-divider type="vertical"></a-divider>
          <ColumnHeightOutlined></ColumnHeightOutlined>
          <SettingOutlined></SettingOutlined>
          <FullscreenOutlined></FullscreenOutlined>
        </a-space>
      </div>
    </a-card>
    <a-table v-bind="tableRt">
      <template #bodyCell="{column,index}">
        <template v-if="column['dataIndex']==='index'">
          {{getPagination.start+index+1}}
        </template>
      </template>
    </a-table>
    <a-card size="small">
      <div class="table-pagination">
        <span>
          {{`${getPagination.start+1} - ${getPagination.end} ${getPagination.count}条记录，共${paginationRt.total}条记录` }}</span>
        <a-pagination v-bind="paginationRt"/>
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted, computed,watch} from 'vue'
import {SearchForm} from '@/components/form'
import {
  AppstoreOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined,
  SettingOutlined,
  TableOutlined
} from '@ant-design/icons-vue'
import {columns, dataSource} from './data'

//表格配置
const tableRt = reactive({
  rowKey: 'id',
  bordered: true,
  columns: columns,
  dataSource: [],
  pagination: false,
  scroll:{
    y:500,
  }
})

//分页配置
const paginationRt = reactive({
  current: 1,//当前页
  total: 0,//总数
  defaultPageSize: 15,//默认每页显示
  pageSize: 15,//每页显示数
  pageSizeOptions: ['5', '10', '15', '30', '50'],//每页显示数下拉选项
  //当前页,每页显示数量变化事件
  onChange: (page, pageSize) => onPaginationChange(page, pageSize),
})

//分页变化事件
const onPaginationChange = (page, pageSize) => {
  paginationRt.current = page
  paginationRt.pageSize = pageSize
}

//计算分页
const getPagination = computed(() => {
  let start = 0;//开始
  let end = 0;//结束
  let count = 0;//当前显示数量

  const totalPage = Math.ceil(paginationRt.total / paginationRt.pageSize)
  if (paginationRt.current <= totalPage) {
    start = (paginationRt.current - 1) * paginationRt.pageSize
    if (paginationRt.current < totalPage) {
      count = paginationRt.pageSize
      end = start + count
    } else {
      end = paginationRt.total
      count = paginationRt.total % paginationRt.pageSize
    }
  }

  return {
    start,
    end,
    count,
  }
})

//更新表格数据
const initDataSource = ()=>{
  const {start,end} = getPagination.value
  tableRt.dataSource = dataSource.slice(start,end)
}

//初始化
const init = () => {
  paginationRt.current = 1
  paginationRt.pageSize = 10
  paginationRt.total = dataSource.length
  initDataSource()
}

//监听分页变化
watch(()=>[paginationRt.current,paginationRt.pageSize],()=>{
  initDataSource()
})

onMounted(() => {
  init()
})

</script>
<style scoped>
.table-form {
  margin-bottom: 12px;
}

.table-action {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.table-pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>