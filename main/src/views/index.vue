<template>
  <div class="flex flex-col justify-center h-full">
    <div class="flex-1 flex flex-col justify-center m-4">
      <a-row>
        <a-col :span="8" :offset="8">
          <a-input-search
              size="large"
              v-model:value="textRef"
              placeholder="搜一下!"
              enter-button
              @search="searchAc"
          />
        </a-col>
      </a-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
import Footer from '/@/components/footer/index.vue'

const textRef = ref('')
const searchAc = () => {

}
</script>