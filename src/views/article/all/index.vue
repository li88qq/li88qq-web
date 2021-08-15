<template>
  <div class="container">
    <div class="container-form">
      <a-form ref="formRef" :model="formRt" layout="inline" class="form-search">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formRt.title" allow-clear/>
        </a-form-item>
        <a-form-item label="标签" name="labels">
          <a-input v-model:value="formRt.labels" allow-clear/>
        </a-form-item>
        <a-form-item label="作者" name="username">
          <a-input v-model:value="formRt.username" allow-clear/>
        </a-form-item>
        <a-form-item label="是否原创" name="original">
          <a-select v-model:value="formRt.original" style="width: 80px;" allow-clear>
            <a-select-option :value="1">原创</a-select-option>
            <a-select-option :value="0">转载</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="发布时间" style="width: 280px;" name="createDate">
          <a-range-picker v-model:value="formRt.createDate" allow-clear></a-range-picker>
        </a-form-item>
        <a-form-item>
          <a-button type="default" @click="resetAc">重置</a-button>
          <a-button type="primary" @click="searchAc">搜索</a-button>
        </a-form-item>
      </a-form>
      <div class="form-action">
      </div>
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
    <View ref="viewRef" :id="snRef"></View>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRaw, onMounted} from 'vue';
import {getAllPage} from '/@/api/article/article';
import {columns} from './data';
import {dfColumns, dfPagination} from '/@/settings/tableSetting';
import {toDate} from '/@/utils/dateUtil';
import View from '/@/views/article/view/index.vue';

export default defineComponent({
  name: '',
  props: {},
  components: {View},
  setup() {
    const formRef = ref();
    const tableRef = ref();
    const viewRef = ref();
    const snRef = ref('');
    const formRt = reactive({
      title: '',
      labels: '',
      username: '',
      original: undefined,
      createDate: [],
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
        const data = await getAllPage(params)
        tableRt.datasource = data.content;
        tableRt.pagination.total = data.totalElements;
      } catch (err) {

      } finally {
        tableRt.loading = false;
      }
    };

    const toView = (sn) => {
      snRef.value = sn;
      viewRef.value.showAc();
    };

    const tableRt = reactive({
      datasource: [],
      columns: dfColumns(columns({toView})),
      loading: false,
      rowKey: 'id',
      title: '文章列表',
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
    return {formRef, tableRef, tableRt, formRt, snRef, viewRef, resetAc, searchAc, toView,}
  }
})
</script>

<style scoped>

</style>