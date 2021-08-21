<template>
  <a-modal
      :visible="visibleRef"
      title="新增导航分类"
      @ok="saveAc"
      @cancel="closeAc"
      closable
      :width="500"
  >
    <div style="text-align: center;">
      <a-button type="primary" @click="addAc">添加</a-button>
    </div>
    <div style="max-height: 500px;overflow: auto;">
      <template v-for="item in countRef" :key="item">
        <div class="type-item">
          <label>{{ item + ': ' }}</label>
          <a-input v-model:value="typesRef[item-1]" :maxlength="20" allow-clear style="width: 300px;"/>
        </div>
      </template>
    </div>
  </a-modal>
</template>

<script>
import {defineComponent, ref, unref, toRaw,} from 'vue';
import {saveType} from '/@/api/nav';
import {message} from "ant-design-vue";

export default defineComponent({
  name: '',
  props: {},
  components: {},
  emits: ['success'],
  setup(props, {emit}) {
    const visibleRef = ref(false);
    const countRef = ref(10);
    const typesRef = ref([]);

    const showAc = () => {
      visibleRef.value = true;
    };
    const closeAc = () => {
      visibleRef.value = false;
    }
    const saveAc = async () => {
      const types = unref(typesRef);
      if (types.length === 0) {
        message.error('请输入分类名称');
        return;
      }
      const arr = [];
      for (let i = 0; i < types.length; i++) {
        if (types[i]) {
          arr.push(types[i])
        }
      }
      if (arr.length === 0) {
        message.error('请输入分类名称')
        return;
      }
      try {
        await saveType(arr);
        emit('success');
        closeAc();
      } catch (err) {
      }
    };

    const addAc = () => {
      countRef.value += 10;
    }

    return {visibleRef, countRef, typesRef, showAc, closeAc, addAc, saveAc}
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