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
        <a-form-item label="是否原创" name="original">
          <a-select v-model:value="formRt.original" style="width: 80px;" allow-clear>
            <a-select-option :value="1">原创</a-select-option>
            <a-select-option :value="0">转载</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="是否公开" name="open">
          <a-select v-model:value="formRt.open" style="width: 80px;" allow-clear>
            <a-select-option :value="1">公开</a-select-option>
            <a-select-option :value="0">私有</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="创建时间" style="width: 280px;" name="createDate">
          <a-range-picker v-model:value="formRt.createDate" allow-clear></a-range-picker>
        </a-form-item>
        <a-form-item>
          <a-button type="default" @click="resetAc">重置</a-button>
          <a-button type="primary" @click="searchAc">搜索</a-button>
        </a-form-item>
      </a-form>
      <div class="form-action">
        <a-button type="primary" @click="addAc">新增</a-button>
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
    <EditModal ref="editModalRef" :id="idRef" @success="handleSuccess"></EditModal>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRaw, onMounted, defineAsyncComponent} from 'vue';
import {getArticlePage, deleteArticle} from '/@/api/article/article';
import {columns} from './data';
import {dfColumns, dfPagination} from '/@/settings/tableSetting';
import {toDate} from '/@/utils/dateUtil';

export default defineComponent({
  name: '',
  props: {},
  components: {
    View: defineAsyncComponent(() =>
        import('/@/views/article/view/index.vue')
    ),
    EditModal: defineAsyncComponent(() =>
        import('./comp/EditModal.vue')
    ),
  },
  setup() {
    const formRef = ref();
    const tableRef = ref();
    const viewRef = ref();
    const editModalRef = ref();
    const snRef = ref('');
    const idRef = ref(0);
    const formRt = reactive({
      title: '',
      labels: '',
      state: undefined,
      open: undefined,
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
        const data = await getArticlePage(params)
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
    //删除
    const deleteAc = async (id) => {
      await deleteArticle({id})
          .then(() => {
            query();
          }, err => {
          })
    };
    const editAc = (id) => {
      idRef.value = id;
      editModalRef.value.showAc();
    };

    const tableRt = reactive({
      datasource: [],
      columns: dfColumns(columns({toView, deleteAc, editAc,})),
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
    //新增
    const addAc = () => {
      window.open('/article/editor');
    };
    const handleSuccess = () => {
      query();
    }

    onMounted(() => {
      query();
    });
    return {
      formRef, tableRef, tableRt, formRt, viewRef, editModalRef, snRef, idRef,
      resetAc, searchAc, addAc, handleSuccess,
    }
  }
})
</script>

<style scoped>

</style>