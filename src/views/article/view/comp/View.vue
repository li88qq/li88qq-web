<template>
  <div class="article-container">
    <div class="article-title">
      <h2>{{ articleRt.title }}</h2>
    </div>
    <div class="article-info">
      <div>
        <label>作者：</label>
        <span>{{ articleRt.username }}</span>
      </div>
      <div>
        <label>发布于：</label>
        <span>{{ timestampToTime(articleRt.createDate) }}</span>
      </div>
      <div>
        <label>阅读数：</label>
        <span>{{ articleRt.readCount }}</span>
      </div>
      <div>
        <label>字数：</label>
        <span>{{ articleRt.words }}</span>
      </div>
    </div>
    <a-divider style="height: 2px; background-color: #7cb305"/>
    <div ref="contentRef" class="article-content">
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, onMounted} from 'vue';
import {getArticle, readArticle} from '/@/api/p/index';
import {timestampToTime} from '/@/utils/dateUtil';
import "vditor/dist/index.css";
import 'vditor/dist/index.min';
import Vditor from "vditor";

export default defineComponent({
  name: '',
  props: {id: {}},
  components: {},
  setup(props) {
    const contentRef = ref();
    const articleRt = reactive({
      title: '',
      username: '',
      createDate: undefined,
      readCount: 0,
      words: 0,
      content: '',
    });
    const query = async () => {
      const data = await getArticle({id: props.id});
      articleRt.title = data.title;
      articleRt.username = data.username;
      articleRt.createDate = data.createDate;
      articleRt.readCount = data.readCount;
      articleRt.words = data.words;
      articleRt.content = data.content;

      await Vditor.preview(contentRef.value, data.content).catch()
    };

    const readAc = async () => {
      await readArticle({id: props.id}).catch();
    };

    onMounted(() => {
      query();
      readAc();
    });
    return {contentRef, articleRt, timestampToTime}
  }
})
</script>

<style scoped>
.article-title {
  text-align: center;
}

.article-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.article-content {
  padding: 12px 24px;
  border: 1px solid #eee;
}

.ant-divider-horizontal {
  margin: 12px 0;
}
</style>