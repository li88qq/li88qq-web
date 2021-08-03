<template>
  <div>
    <a-card>
      <a-form>
        <div class="form-div">
          <a-form-item label="IP">
            <div style="width: 200px;">{{ formRt.ip }}</div>
          </a-form-item>
          <a-button type="link" @click="copyIP">复制</a-button>
        </div>
        <div class="form-div">
          <a-form-item label="当前时间">
            <div style="width: 200px;">{{ formRt.datetime }}</div>
          </a-form-item>
          <a-form-item label="时间戳">
            <div style="width: 200px;">{{ formRt.timestamp }}</div>
          </a-form-item>
          <a-button type="link" @click="copyTimestamp">复制</a-button>
        </div>
        <div class="form-div">
          <a-form-item label="单位">
            <a-radio-group v-model:value="formRt.unit">
              <a-radio :value="1">秒</a-radio>
              <a-radio :value="2">毫秒</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <div class="form-div">
          <a-form-item label="时间">
            <a-date-picker show-time v-model:value="formRt.datetime1"/>
          </a-form-item>
          <a-form-item label="=> 时间戳">
            <a-input-number v-model:value="formRt.timestamp1" disabled/>
          </a-form-item>
          <a-button type="link" @click="copyTimestamp1">复制</a-button>
        </div>
        <div class="form-div">
          <a-form-item label="时间戳">
            <a-input-number v-model:value="formRt.timestamp2"/>
          </a-form-item>
          <a-form-item label="=> 时间">
            <a-date-picker show-time :value="compDatetime" disabled/>
          </a-form-item>
          <a-button type="link" @click="emptyAc">清空</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, computed, onMounted, toRaw, watchEffect} from 'vue';
import {momentToSecond, momentToMs, timestampToMoment, msToMoment, momentNow, momentFormat} from '/@/utils/dateUtil';
import {getIp} from '/@/api/p/index';
import {copyText} from '/@/utils/copyUtil';

export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup() {
    const formRt = reactive({
      ip: '',
      datetime: undefined,
      timestamp: undefined,
      unit: 1,
      datetime1: undefined,
      timestamp1: undefined,
      timestamp2: undefined,
    });

    watchEffect(() => {
      if (formRt.unit === 1) {
        formRt.timestamp1 = momentToSecond(formRt.datetime1);
      } else {
        formRt.timestamp1 = momentToMs(formRt.datetime1);
      }
    });

    const compDatetime = computed(() => {
      if (formRt.unit === 1) {
        return timestampToMoment(formRt.timestamp2);
      } else {
        return msToMoment(formRt.timestamp2);
      }
    });

    //定时刷新时间
    setInterval(() => {
      const moment = momentNow();
      formRt.datetime = momentFormat(moment);
      if (formRt.unit === 1) {
        formRt.timestamp = momentToSecond(moment);
      } else {
        formRt.timestamp = momentToMs(moment);
      }
    }, 1000);

    const query = async () => {
      const ip = await getIp();
      formRt.ip = ip;
    }

    onMounted(() => {
      query();
    });

    const copyTimestamp = () => {
      const text = toRaw(formRt).timestamp;
      copyText(text);
    };
    const copyTimestamp1 = () => {
      const text = toRaw(formRt).timestamp1;
      copyText(text);
    };
    const copyIP = () => {
      const text = toRaw(formRt).ip;
      copyText(text);
    };
    const emptyAc = () => {
      formRt.timestamp2 = undefined;
    };

    return {formRt, compDatetime, copyTimestamp, copyTimestamp1, copyIP, emptyAc}
  }
})
</script>

<style scoped>
.form-div {
  display: flex;
  flex-direction: row;
}

::v-deep(.form-div .ant-form-item-label) {
  width: 120px;
}

::v-deep(.ant-input-number) {
  width: 200px;
}

::v-deep(.ant-calendar-picker-input) {
  width: 200px;
}
</style>