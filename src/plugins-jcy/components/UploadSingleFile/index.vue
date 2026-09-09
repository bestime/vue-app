<style lang="scss" scoped>
.UploadSingleFile {
  box-sizing: border-box;
}
</style>

<template>
  <a-upload
    class="UploadSingleFile"
    :before-upload="beforeUpload"
    :showUploadList="false"
    :customRequest="readyUpload"
    :accept="accept"
    :disabled="state.loading"
  >
    <slot/>
  </a-upload>
</template>

<script lang="ts" setup>
import { message, Upload, type UploadProps } from 'ant-design-vue';
import { reactive, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n';

const uploadFileTypeMap = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif',
  'xls':'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'doc':'application/msword',
  'pdf': 'application/pdf',
  'zip': 'application/x-zip-compressed',
}



export type TUploadFileType = Array<keyof typeof uploadFileTypeMap>

interface IProps {
  types: TUploadFileType
}


const props = defineProps<IProps>()

export type TUploadCallback = () => void

const accept = computed(function () {
  return props.types.map(function (k) {
    return uploadFileTypeMap[k]
  }).join(', ')
})

const emits = defineEmits<{
  (name: 'on-upload', data: File, next: TUploadCallback): void
}>()

const { t } = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      'typeError': '文件格式不正确，仅支持 “{message}” 等格式的文件！'
    },
    "en": {
      'typeError': 'The file format is incorrect. Only files in formats such as "{message}" are supported!'
    },
  }
})

const state = reactive({
  loading: false,
})

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const passType = props.types.some(function (tp) {
    return uploadFileTypeMap[tp] === file.type
  })
  if (!passType) {
    message.error(t('typeError', {
      message: props.types.join('、')
    }));
  }
  return passType || Upload.LIST_IGNORE;
};


function readyUpload (ev: any) {
  if(state.loading) return;
  state.loading = true
  emits('on-upload', ev.file, function () {
    state.loading = false
  })
}


</script>