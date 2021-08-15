<template>
  <div class="container">
    <div class="container-form">
      <a-form ref="formRef" :model="formRt" layout="inline" class="form-search">
        <a-form-item label="操作时间" style="width: 280px;" name="createDate">
          <a-range-picker v-model:value="formRt.createDate" allow-clear></a-range-picker>
        </a-form-item>
        <a-form-item label="操作类型" name="acType">
          <a-select v-model:value="formRt.acType" style="width: 100px;" allow-clear>
            <a-select-option :value="1">查询</a-select-option>
            <a-select-option :value="2">新增</a-select-option>
            <a-select-option :value="3">修改</a-select-option>
            <a-select-option :value="4">删除</a-select-option>
            <a-select-option :value="5">文件</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formRt.title" allow-clear/>
        </a-form-item>
        <a-form-item label="详情" name="detail">
          <a-input v-model:value="formRt.detail" allow-clear/>
        </a-form-item>
        <a-form-item label="IP" name="ip">
          <a-input v-model:value="formRt.ip" allow-clear/>
        </a-form-item>
        <a-form-item>
          <a-button type="default" @click="resetAc">重置</a-button>
          <a-button type="primary" @click="searchAc">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="container-body">
      <a-table
          ref="tableRef"
          :data-source="tableRt.datasource"
          :columns="tableRt.columns"
          :row-key="tableRt.rowKey"
          :pagination="tableRt.pagination"
          :loading="tableRt.loading"
          size="small"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRaw, onMounted} from 'vue';
import {actionPage} from '/@/api/log/index';
import {columns} from './data';
import {dfColumns, dfPagination} from '/@/settings/tableSetting';
import {toDate} from '/@/utils/dateUtil';

export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup() {
    const formRef = ref();
    const tableRef = ref();
    const formRt = reactive({
      createDate: [],
      acType: undefined,
      title: '',
      detail: '',
      ip: '',
    });
    const query = async () => {
      let params = toRaw(formRt);
      const createDate = params.createDate;
      if (createDate) {
        params.beginDate = toDate(createDate[0]);
        params.endDate = toDate(createDate[1]);
        params.createDate = undefined;
      }
      try {
        tableRt.loading = true;
        const data = await actionPage(params)
        tableRt.datasource = data.content;
        tableRt.pagination.total = data.totalElements;
      } catch (err) {

      } finally {
        tableRt.loading = false;
      }
    };

    const tableRt = reactive({
      datasource: [],
      columns: dfColumns(columns({})),
      loading: false,
      rowKey: 'id',
      title: '操作记录列表',
      pagination: dfPagination(query, toRaw(formRt)),
    });

    const resetAc = () => {
      formRef.value.resetFields();
    };
    const searchAc = () => {
      query();
    };

    onMounted(() => {
      query();
    });
    return {formRef, tableRef, tableRt, formRt, resetAc, searchAc,}
  }
})
</script>

<style scoped>

</style>