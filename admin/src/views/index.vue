<template>
  <PageView>
    <template #sider>
      sider
    </template>
    <template #content>
      <a-form layout="inline">
        <a-form-item label="姓名">
          <a-input/>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="default">清空</a-button>
            <a-button type="primary">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
      <a-table></a-table>
    </template>
  </PageView>
</template>

<script setup lang="ts">
import { PageView } from '@/components/pageview'

</script>