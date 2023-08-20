<template>
  <div class="view-wrapper full">
    <a-card class="view-sider">
      <a-tree></a-tree>
    </a-card>
    <div>
      <a-card size="small" style="margin-bottom: 12px;">

        <a-form layout="inline" :label-col="{span:6}" :wrapper-col="{span:18}">
          <a-row :gutter="[12,12]" v-row>
            <template v-for="item in 6" :key="item">
              <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5" :xxl="4">
                <a-form-item :label="`字段-${item}`">
                  <a-input/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5" :xxl="4">
              <a-form-item>
                <a-space>
                  <a-button type="default">清除</a-button>
                  <a-button type="primary">查询</a-button>
                  <a-button type="link">展开</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>

      <div>
        <a-card size="small">
          <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
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

        </a-table>
        <a-card size="small">
          <div style="display:flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span>{{ `1 - 10 10条记录，共${paginationRt.total}条记录` }}</span>
            <a-pagination v-bind="paginationRt"/>
          </div>
        </a-card>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'
import {
  SettingOutlined,
  TableOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ColumnHeightOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'

import {columns, dataSource} from './data'

//表格配置
const tableRt = reactive({
  rowKey: 'id',
  bordered: true,
  columns: columns,
  dataSource: dataSource,
  pagination: false,
})

//分页配置
const paginationRt = reactive({
  current: 1,//当前页数
  defaultPageSize: 10,//默认的每页条数
  pageSize: 10,//每页条数
  pageSizeOptions: ['10', '30', '50', '100'],//指定每页可以显示多少条
  total: 100,
})
</script>
<style scoped>
/*最外层*/
.view-wrapper {
  display: flex;
  flex-direction: row;
  padding: 12px;
}

/*最外层,全屏 64+36+1+1+6 有点奇怪*/
.full {
  height: calc(100vh - 108px);
}

/*侧边树*/
.view-sider {
  display: flex;
  flex-direction: column;
  min-width: 240px;
  max-width: 800px;
  overflow-x: auto;
  resize: horizontal;
  margin-right: 12px;
}

</style>