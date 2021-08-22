<template>
  <div>
    <a-row class="nav-search">
      <a-col span="12" offset="4">
        <a-input-search
            v-model:value="keyRef"
            placeholder="请输入关键字(名称,链接,备注)查询"
            enter-button
            @search="init"
            allow-clear
        />
      </a-col>
      <a-col span="8" class="nav-action">
        <a-button type="primary" @click="addTypeAc">新增导航分类</a-button>
        <a-button type="primary" @click="openAc">{{ !editRef ? '开启编辑' : '关闭编辑' }}</a-button>
      </a-col>

    </a-row>

    <template v-for="item in navListRef" :key="item.typeId">
      <a-card :title="item.typeName" size="small" class="nav-container">
        <template #extra>
          <a-button type="link" @click="editTypeAc(item)">编辑分类名称</a-button>
          <a-popconfirm
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteTypeAc(item.typeId)"
          >
            <template #title>
              <span>您确定删除该分类吗?</span>
              <br/>
              <span>删除后所关联的导航也会同时删除.</span>
            </template>
            <a-button type="link" danger>删除分类</a-button>
          </a-popconfirm>
          <a-button type="link" @click="addAc(item.typeId)">新增导航</a-button>
        </template>
        <a-row>
          <template v-if="item.list.length>0" v-for="nav in item.list" :key="nav.id">
            <a-col span="4" class="nav-wrapper">
              <a-tooltip placement="top" :title="nav.remark" class="nav-text">
                <a-button type="link" @click="clickAc(nav)" size="small">{{ nav.name }}</a-button>
              </a-tooltip>
              <a-popconfirm
                  title="您确定删除该记录吗?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="deleteAc(nav.id)"
              >
                <a-button v-show="editRef" type="link" danger size="small" style="border-right: 1px solid #999">
                  <template #icon>
                    <CloseCircleOutlined/>
                  </template>
                </a-button>
              </a-popconfirm>
            </a-col>
          </template>
          <div v-else>暂无相关数据</div>
        </a-row>
      </a-card>
    </template>

    <AddModal ref="addModalRef" @success="init"></AddModal>
    <AddTypeModal ref="addTypeModalRef" @success="init"></AddTypeModal>
    <EditModal ref="editModalRef" @success="init"></EditModal>
  </div>
</template>

<script>
import {defineComponent, defineAsyncComponent, ref, unref, onMounted,} from 'vue';
import {getList, deleteType, addCount, deleteNav,} from '/@/api/nav';
import {PlusOutlined, CloseCircleOutlined,} from '@ant-design/icons-vue';

export default defineComponent({
  name: '',
  props: {},
  components: {
    PlusOutlined,
    CloseCircleOutlined,
    AddModal: defineAsyncComponent(() => import('./comp/AddModal.vue')),
    AddTypeModal: defineAsyncComponent(() => import('./comp/AddTypeModal.vue')),
    EditModal: defineAsyncComponent(() => import('./comp/EditModal.vue')),
  },
  setup() {
    const addModalRef = ref();
    const addTypeModalRef = ref();
    const editModalRef = ref();
    const navListRef = ref([]);
    const editRef = ref(false);
    const keyRef = ref('');

    const addTypeAc = () => {
      addTypeModalRef.value.showAc();
    };
    const editTypeAc = (type) => {
      editModalRef.value.showAc(type);
    };
    const deleteTypeAc = async (id) => {
      await deleteType({id: id});
      await init();
    };

    const init = async () => {
      const data = await getList({key: unref(keyRef)});
      navListRef.value = data;
    };

    const addAc = (typeId) => {
      addModalRef.value.showAc(typeId);
    };

    const clickAc = (nav) => {
      window.open(nav.url, '_blank');
      addCount({id: nav.id}).catch(() => {
      });
    };

    const deleteAc = async (id) => {
      try {
        await deleteNav({ids: id});
        init();
      } catch (err) {
      }
    };

    const openAc = () => {
      editRef.value = !editRef.value;
    };

    onMounted(() => {
      init();
    });
    return {
      addModalRef, addTypeModalRef, editModalRef, navListRef, editRef, keyRef,
      addTypeAc, editTypeAc, deleteTypeAc, init, addAc, clickAc, deleteAc, openAc,
    }
  }
})
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
}

.nav-text {
  flex: 1;
  text-align: center;
}

.nav-container {
  margin: 12px 0;
}

.nav-action {
  text-align: right;
}

.nav-action button {
  margin-left: 10px;
}

.nav-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>