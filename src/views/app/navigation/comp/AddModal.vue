<template>
  <a-modal
      :visible="visibleRef"
      title="新增导航"
      @ok="saveAc"
      @cancel="closeAc"
      closable
      :width="1000"
  >
    <a-table :data-source="datasourceRef" row-key="index" size="small" :pagination="false">
      <a-table-column title="序号" key="index" :width="60">
        <template #default="{index}">
          {{ index + 1 }}
        </template>
      </a-table-column>
      <a-table-column title="名称(*)" key="name" :width="200">
        <template #default="{index}">
          <a-input v-model:value="datasourceRef[index].name"/>
        </template>
      </a-table-column>
      <a-table-column title="链接URL(*)" key="url">
        <template #default="{index}">
          <a-input v-model:value="datasourceRef[index].url"/>
        </template>
      </a-table-column>
      <a-table-column title="备注" key="remark" :width="200">
        <template #default="{index}">
          <a-input v-model:value="datasourceRef[index].remark"/>
        </template>
      </a-table-column>
    </a-table>
  </a-modal>
</template>

<script>
import {defineComponent, ref, unref, toRaw,} from 'vue';
import {saveNav} from '/@/api/nav';
import {message} from "ant-design-vue";

export default defineComponent({
  name: '',
  props: {},
  components: {},
  emits: ['success'],
  setup(props, {emit}) {
    const visibleRef = ref(false);
    const countRef = ref(10);//初始化数量
    const datasourceRef = ref([]);//表格数据
    const typeIdRef = ref(0);//分类id

    const showAc = (typeId) => {
      typeIdRef.value = typeId;
      init();
      visibleRef.value = true;
    };
    const closeAc = () => {
      visibleRef.value = false;
    }
    const saveAc = async () => {
      const navs = unref(datasourceRef);
      if (navs.length === 0) {
        message.error('数据为空');
        return;
      }
      const arr = [];
      for (let i = 0; i < navs.length; i++) {
        if (navs[i].name && navs[i].url) {
          arr.push(navs[i])
        }
      }
      if (arr.length === 0) {
        message.error('数据为空')
        return;
      }
      try {
        await saveNav(arr);
        emit('success');
        closeAc();
      } catch (err) {
      }
    };

    const addAc = () => {
      countRef.value += 10;
    };

    const init = () => {
      datasourceRef.value = [];
      for (let i = 0; i < countRef.value; i++) {
        datasourceRef.value.push({
          index: i,
          name: '',
          url: '',
          remark: '',
          typeId: typeIdRef.value,
        })
      }
    };

    return {visibleRef, countRef, datasourceRef, showAc, closeAc, addAc, saveAc}
  }
})
</script>

<style scoped>
.type-item {
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.type-item label {
  width: 100px;
  text-align: center;
}
</style>