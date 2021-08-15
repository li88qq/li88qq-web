<template>
  <div class="container">
    <div class="container-form">
      <a-form ref="formRef" :model="formRt" layout="inline" class="form-search">
        <a-form-item label="登录时间" style="width: 280px;" name="createDate">
          <a-range-picker v-model:value="formRt.createDate" allow-clear></a-range-picker>
        </a-form-item>
        <a-form-item label="状态" name="state">
          <a-select v-model:value="formRt.state" style="width: 100px;" allow-clear>
            <a-select-option :value="1">成功</a-select-option>
            <a-select-option :value="2">密码错误</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="登录方式" name="loginType">
          <a-select v-model:value="formRt.loginType" style="width: 100px;" allow-clear>
            <a-select-option :value="1">浏览器</a-select-option>
            <a-select-option :value="2">移动端</a-select-option>
            <a-select-option :value="3">扫一扫</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="登录IP" name="loginIp">
          <a-input v-model:value="formRt.loginIp" allow-clear/>
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
import {loginPage} from '/@/api/log/index';
import {columns_my} from './data';
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
      state: undefined,
      loginType: undefined,
      loginIp: '',
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
        const data = await loginPage(params)
        tableRt.datasource = data.content;
        tableRt.pagination.total = data.totalElements;
      } catch (err) {

      } finally {
        tableRt.loading = false;
      }
    };

    const tableRt = reactive({
      datasource: [],
      columns: dfColumns(columns_my({})),
      loading: false,
      rowKey: 'id',
      title: '登录记录列表',
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