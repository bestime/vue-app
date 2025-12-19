<style lang="scss" scoped>
.WithAccount {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}
</style>

<template>
  <div class="WithAccount">
    <el-input v-model="formState.username" :placeholder="placeholderUserName" size="large"></el-input>
    <el-input v-model="formState.password" :placeholder="placeholderPassword" size="large"></el-input>
    <el-button style="width:100%" type="primary" html-type="submit" @click.prevent="onSubmit" :loading="state.loading">{{t('loginText')}}</el-button>  
  </div>
  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount } from 'vue'
import router from '@/router';
import { apiLoginAccessibleOrganizations, apiLoginDoLogin } from '@/services';
import { useI18n } from 'vue-i18n'
import { sleep } from '@/utils/tools';
import { reloadRoutes } from '@/permission';
import { ElMessage } from 'element-plus';

const formState = reactive({
  username: '',
  password: '',
})

const state = reactive({
  loading: false
})

const { t } = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      "username": '用户名',
      "password": '密码',
      'placeholder': '请输入{message}',
      'loginText': '登录',
    },
    "en": {
      "username": 'Username',
      "password": 'Password',
      'placeholder': 'Please input your {message}',
      'loginText': 'Sign in',
    },
  }
})

const placeholderUserName = t('placeholder', {
  message: t('username')
}) + '：yangjx'

const placeholderPassword = t('placeholder', {
  message: t('password')
}) + '：123456'

const rulesRef = reactive({
  username: [
    {
      required: true,
      message: placeholderUserName,
    },
  ],
  password: [
    {
      required: true,
      message: placeholderPassword,
    },
  ],
});

async function commitLogin () {
  if(state.loading) return;
  state.loading = true  
  try {
    const organizationId = await apiLoginAccessibleOrganizations({
      disableErrorAlert: true,
      data: {
        userName: formState.username
      }
    }).then(async function (res: any) {
      return res.data?.data?.[0]?.id
    })

    await apiLoginDoLogin({
      disableErrorAlert: true,
      data: {
        userName: formState.username,
        password: formState.password,
        organizationId,
      }
    }).then(function (resp: any) {      
      return resp.data.data
    })
    
    await reloadRoutes()
    router.replace({
      name: 'ROUTE_FUNBOOTH'
    })
  } catch (err: any) {
    ElMessage.error(err.message)
  } finally {
    sleep(2000).then(function () {
      state.loading = false
    })
  }
}

async function  onSubmit () {
  commitLogin()
}
</script>

