<script setup lang="ts">
import { NButton, NDivider, NForm, NFormItem, NInput } from 'naive-ui'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { onDeactivated, onMounted, ref } from 'vue'
import type { Login } from '@/service'
import { getCaptchaUrl, login, setToken } from '@/service'
import { useAppStore } from '@/stores'

const app = useAppStore()

const formEl = ref<HTMLElement & FormInst>()
const model = ref<Login>({ username: '', password: '', code: '' })
const disableSubmit = ref(false)

onDeactivated(() => {
  model.value = { username: '', password: '', code: '' }
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名' },
    {
      pattern: /^[A-Za-z0-9_-]{6,18}$/,
      message: '用户名应为6-18位字母,数字或\'_-\'的组合',
      trigger: 'input',
    },
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请输入密码')
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(value)) {
          return new Error('密码必须包含大小写字母和数字')
        } else if (!/^[A-Za-z\d$@$!%*#?&]+$/.test(value)) {
          return new Error('密码不能有\'$@$!%*#?&\'以外的特殊字符')
        } else if (value.length < 8 || value.length > 18) {
          return new Error('密码长度应为8-18位')
        }
        return true
      },
      trigger: 'input',
    },
  ],
  code: [
    { required: true, message: '请输入验证码' },
    {
      pattern: /^[A-Za-z0-9]{4}$/,
      message: '验证码应为4位字母或数字的组合',
      trigger: 'input',
    },
  ],
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!formEl.value) {
    return
  }
  formEl.value.validate(async (errors) => {
    if (!errors) {
      disableSubmit.value = true
      const auth = await login(model.value)
      if (auth) {
        app.user = {
          username: model.value.username,
          token: auth.token,
          role: auth.role,
        }
        setToken(auth.token)
        window.$message?.success('登录成功')
      } else {
        app.clearUser()
        setToken('')
      }
      disableSubmit.value = false
    }
  })
}

const captchaEl = ref<HTMLImageElement>()
const onCaptchaClick = () => {
  if (captchaEl.value) {
    captchaEl.value.src = getCaptchaUrl()
  }
}
onMounted(() => onCaptchaClick())
</script>

<template>
  <div>
    <!-- 表单 用户名密码验证码 -->
    <NForm
      ref="formEl"
      :model="model"
      :rules="rules"
      :show-label="false"
    >
      <NFormItem path="username">
        <NInput
          v-model:value="model.username"
          type="text"
          placeholder="请输入账号"
          size="large"
        />
      </NFormItem>
      <NFormItem path="password">
        <NInput
          v-model:value="model.password"
          type="password"
          show-password-on="click"
          placeholder="请输入密码"
          size="large"
        />
      </NFormItem>
      <NFormItem path="code">
        <NInput
          v-model:value="model.code"
          type="text"
          show-password-on="click"
          placeholder="验证码不区分大小写"
          size="large"
        />
        <img
          ref="captchaEl"
          alt="captcha"
          h-10
          ml-4
          @click="onCaptchaClick"
        >
      </NFormItem>
    </NForm>
    <!-- 提交表单按钮 -->
    <NButton
      round
      :color="app.theme.primaryColor"
      text-color="white"
      w-full
      bg="$primary-color"
      :disabled="disableSubmit"
      @click="handleSubmit"
    >
      登录
    </NButton>
    <!-- 左注册 右忘记密码 -->
    <div flex justify-between m="x2 t4">
      <span>注册</span>
      <span>忘记密码</span>
    </div>
    <!-- 第三方账号登录 -->
    <div mt-4>
      <NDivider m="!y0">
        其他账号登录
      </NDivider>
      <div flex justify-center mt-2>
        <a href="#" flex items-center>
          <div i-mdi:wechat text="[#07c160]" />
          <span pl-1>微信</span>
        </a>
      </div>
    </div>
  </div>
</template>
