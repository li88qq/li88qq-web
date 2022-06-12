<template>
  <a-layout class="h-full w-full">
    <Header class="w-full fixed z-100"></Header>
    <a-layout class="flex flex-row overflow-auto">
      <a-layout-sider class="overflow-auto  pt-16" collapsible>
        <a-menu
            mode="inline"
            theme="dark"
            @select="toPathAc"
        >
          <a-menu-item key="/">
            <template #icon>
              <Icon icon="ant-design:home-outlined" menu></Icon>
            </template>
            <span>首页</span>
          </a-menu-item>
          <a-sub-menu key="app">
            <template #icon>
              <Icon icon="ant-design:appstore-outlined" menu></Icon>
            </template>
            <template #title>应用</template>
            <a-menu-item key="/app/navigation">导航</a-menu-item>
            <a-menu-item key="/app/timestamp">时间戳</a-menu-item>
            <a-menu-item key="/app/json">JSON</a-menu-item>
            <a-menu-item key="/app/qrcode">QrCode</a-menu-item>
            <a-menu-item key="/app/base64">Base64</a-menu-item>
            <a-menu-item key="/app/icon">图标</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout class="flex flex-col overflow-auto flex-1">
        <div class="h-16"></div>
        <a-layout-content class="flex-1">
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
import Header from './comp/Header.vue'
import {Icon} from '/@/components/icon'
import {useRouter} from 'vue-router'

const {replace} = useRouter()

const toPathAc = ({key}) => {
  replace(key)
}
</script>