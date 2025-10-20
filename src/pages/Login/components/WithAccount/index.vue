<style lang="scss" scoped>
.WithAccount {
  box-sizing: border-box;
}
</style>

<template>
  <a-form :model="formState" autocomplete="off">
    <a-form-item v-bind="validateInfos.username">
      <a-input v-model:value="formState.username" :placeholder="placeholderUserName" size="large">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password v-model:value="formState.password" :placeholder="placeholderPassword" size="large">
        <template #prefix>
          <LockOutlined />
        </template>
      </a-input-password>
    </a-form-item>
    
    <a-button style="width:100%" type="primary" html-type="submit" @click.prevent="onSubmit" :loading="state.loading">{{t('loginText')}}</a-button>  
  </a-form>  
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive, onBeforeUnmount } from 'vue'
import { message } from 'ant-design-vue';
import router from '@/router';
import { apiLoginAccessibleOrganizations, apiLoginDoLogin } from '@/services';
import { useI18n } from 'vue-i18n'
import { useForm } from 'ant-design-vue/es/form';
import { sleep } from '@/utils/tools';

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

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

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
    
    router.replace({
      name: 'ROUTE_HOME'
    })
  } catch (err: any) {
    message.error(err.message)
  } finally {
    sleep(2000).then(function () {
      state.loading = false
    })
  }
}

async function  onSubmit () {
  await validate()
  commitLogin()
}
</script>

