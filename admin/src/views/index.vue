<template>
  <PageView>
    <template #sider></template>
    <template #content>
      <a-card size="small" class="page-form">
        <a-form layout="inline">
          <a-form-item label="姓名">
            <a-input/>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="default">清空</a-button>
              <a-button type="primary">查询</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>

      <a-card size="small" class="page-table">
        <div class="page-header">
          <a-space class="table-header-action">
            <a-button type="primary">新增</a-button>
            <a-button type="primary" danger>删除</a-button>
          </a-space>
          <a-space class="table-header-extra">
            <TableOutlined/>
            <AppstoreOutlined/>
            <a-divider type="vertical"/>
            <ColumnHeightOutlined/>
            <FullscreenOutlined/>
            <SettingOutlined/>
          </a-space>
        </div>
      </a-card>
      <a-table v-bind="tableRt"></a-table>
    </template>
  </PageView>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import { PageView } from '@/components/pageview'
import {TableOutlined,AppstoreOutlined,FullscreenOutlined,ColumnHeightOutlined,SettingOutlined} from '@ant-design/icons-vue'
import {timestampToTime} from '@/utils/dateUtil'

const columns = [
  {dataIndex:'index',title:'序号',customRender:({index})=>index+1},
  {dataIndex:'id',title:'id'},
  {dataIndex:'name',title:'名称'},
  {dataIndex:'createDate',title:'创建时间',customRender:({text})=>timestampToTime(text)},
]
const dataSource = [
  {id:1,name:'菜单1',createDate:1689519542},
  {id:2,name:'菜单2',createDate:1689519551},
]

const tableRt = reactive({
  bordered:true,
  rowKey:'id',
  columns:[],
  dataSource:[],
})

const init = ()=>{
  tableRt.columns = columns
  tableRt.dataSource = dataSource
}

onMounted(()=>{
  init()
})

</script>
<style scoped>
.page-form{
  margin-bottom: 12px;
}
.page-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>