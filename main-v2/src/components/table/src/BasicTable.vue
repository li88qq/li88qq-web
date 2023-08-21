<template>
  <div>
    <a-card size="small" class="table-form">
      <SearchForm></SearchForm>
    </a-card>
    <a-card size="small" >
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
    <a-table v-bind="tableRt"></a-table>
    <a-card size="small">
      <div class="table-pagination">
        <span>{{ `1 - 10 10条记录，共100条记录` }}</span>
        <a-pagination :total="100"/>
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import {ref,reactive} from 'vue'
import {SearchForm} from '@/components/form'
import {
  AppstoreOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined,
  SettingOutlined,
  TableOutlined
} from '@ant-design/icons-vue'
import {columns, dataSource} from './data'

const tableRt = reactive({
  rowKey: 'id',
  bordered: true,
  columns: columns,
  dataSource: dataSource,
  pagination: false,
})

</script>
<style scoped>
.table-form{
  margin-bottom: 12px;
}
.table-action{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.table-pagination{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>