<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { login, setToken } from '@/service'
import { useAppStore } from '@/stores'

const app = useAppStore()
const formEl = ref<HTMLElement & FormInst>()
const model = ref<{ username: string; password: string }>({
  username: '',
  password: '',
})
const disable = ref(false)

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
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!formEl.value) {
    return
  }
  formEl.value.validate(async (errors) => {
    if (!errors) {
      disable.value = true
      const auth = await login(model.value.username, model.value.password)
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
      disable.value = false
    }
  })
}
</script>

<template>
  <div>
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
    </NForm>
    <div flex justify-end>
      <span text-sm>忘记密码</span>
    </div>
    <button
      :disabled="disable"
      w-full
      mt-4
      p="y1.5"
      bg="$primary-color"
      rounded-full
      text-gray-100
      @click="handleSubmit"
    >
      登录
    </button>
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
