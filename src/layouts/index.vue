<template>
  <a-layout class="layout-container">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo"/>
      <a-menu
          mode="inline"
          theme="dark"
          :openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          @openChange="onOpenChange"
          @click="toPath"
      >
        <a-sub-menu key="my">
          <template #icon>
            <AppstoreOutlined/>
          </template>
          <template #title>我的</template>
          <a-menu-item key="view">概览</a-menu-item>
          <a-menu-item key="workbench">工作台</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="app">
          <template #icon>
            <AndroidOutlined/>
          </template>
          <template #title>
            应用
          </template>
          <a-menu-item key="navigation">导航</a-menu-item>
          <a-menu-item key="timestamp">时间戳</a-menu-item>
          <a-menu-item key="json">JSON</a-menu-item>
          <a-menu-item key="qrcode">QrCode</a-menu-item>
          <a-menu-item key="base64">Base64</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="article">
          <template #icon>
            <GithubOutlined/>
          </template>
          <template #title>文章</template>
          <a-menu-item key="my">我的文章</a-menu-item>
          <a-menu-item key="all">文章列表</a-menu-item>
          <a-menu-item key="editor">写文章</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="log">
          <template #icon>
            <FormOutlined/>
          </template>
          <template #title>记录</template>
          <a-menu-item key="login">登录记录</a-menu-item>
          <a-menu-item key="action">操作记录</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="setting">
          <template #icon>
            <SettingOutlined/>
          </template>
          <template #title>设置</template>
          <a-menu-item key="profile">个人信息</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-main">
      <a-layout-header class="layout-header">
        <div class="header-left">
        </div>
        <div class="header-right">
          <div class="header-item">
            <a-avatar :size="32">
              <template #icon>
                <UserOutlined/>
              </template>
            </a-avatar>
          </div>
          <div class="header-item">
            <span>{{ infoRt.nickname }}</span>
          </div>
          <div class="header-item">
            <a-button type="link" @click="logoutAc">登出</a-button>
          </div>
        </div>
      </a-layout-header>
      <div class="layout-wrapper"></div>
      <a-layout-content class="layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  AppstoreOutlined,
  SettingOutlined,
  FormOutlined,
  AndroidOutlined,
  GithubOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, ref, reactive, watch, toRefs, onMounted,} from 'vue';
import {useRouter} from 'vue-router';
import {Modal} from 'ant-design-vue';
import {logout} from '/@/api/login';
import {loginStore} from "/@/store";
import {info as getInfo} from "/@/api/my";

export default defineComponent({
  components: {
    AppstoreOutlined,
    SettingOutlined,
    FormOutlined,
    AndroidOutlined,
    GithubOutlined,
    UserOutlined,
  },
  setup() {
    const state = reactive({
      rootSubmenuKeys: ['my', 'app', 'article', 'file', 'log', 'setting'],
      openKeys: ['my'],
      selectedKeys: [],
    });

    const infoRt = reactive({
      nickname: '',
      photo: '',
    })

    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    const {push} = useRouter();

    const toPath = ({item, key, keyPath}) => {
      push('/' + keyPath.join('/')).catch(() => {
      })
    };

    const logoutAc = () => {
      Modal.confirm({
        title: '提示',
        content: '您确定登出平台吗?',
        onOk: async () => {
          await logout();
          loginStore.commit('logout')
          setTimeout(() => {
            location.href = '/login';
          }, 3000);
        }
      });
    };

    const initInfo = async () => { //查询个人基本信息
      const data = await getInfo();
      infoRt.nickname = data.nickname || '--';
      infoRt.photo = data.photo;
    };

    const initMenu = () => { //设置菜单
      const pathname = window.location.pathname;
      const paths = pathname.split("/");
      const menus = paths.filter((a) => a !== '');
      if (menus.length > 0) {
        const menu = menus[menus.length - 1];
        state.openKeys = [menus[0]];
        state.selectedKeys = [menu];
      }
    };

    onMounted(() => {
      initMenu();
      initInfo();
    });

    return {...toRefs(state), infoRt, onOpenChange, toPath, logoutAc};
  },
});
</script>
<style>
.layout-container {
  height: 100%;
}

.layout-main {
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  padding-left: 200px;
}

.layout-header {
  background-color: #fff;
  position: fixed;
  height: 50px;
  width: calc(100% - 200px);
}

.layout-wrapper {
  display: block;
  height: 50px;
  width: calc(100% - 200px);
}

.layout-content {
  flex: 1;
  margin: 16px;
  overflow: auto;
}

.layout-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.header-right {
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-item {
  margin-left: 10px;
}
</style>