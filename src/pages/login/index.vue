<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { BlankLayout } from '@/components/layouts'
import { Card, Toolbar } from '@/components/common'
import { getParamsFromUrl } from '@/utils'
import type { LoginParam } from '@/service'
import { getCaptchaUrl, giteeOauthLogin, login } from '@/service'

import { useAppStore } from '@/stores'
import gitee from '@/assets/img/gitee.svg'
import BlogTitle from '@/components/business/BlogTitle.vue'

const app = useAppStore()
const router = useRouter()

const giteeOauthUrl = `https://gitee.com/oauth/authorize?client_id=${import.meta.env.VITE_GITEE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`

// 获得 code 后向服务器发送请求
const params = getParamsFromUrl(location.href)
if (params?.code) {
  giteeOauthLogin(params.code).then((res) => {
    if (res !== null) {
      app.setUser(res)
      window.$message?.success('登录成功')
      router.replace('/')
    }
  })
}

const formEl = ref<HTMLElement & FormInst>()
const model = ref<LoginParam>({ username: '', password: '', code: '' })
const disableSubmit = ref(false)

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

// 验证码相关
const captchaEl = ref<HTMLImageElement>()
const onCaptchaClick = () => {
  if (captchaEl.value) {
    captchaEl.value.src = getCaptchaUrl()
  }
}
onMounted(() => onCaptchaClick())

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!formEl.value) {
    return
  }
  formEl.value.validate(async (errors) => {
    if (!errors) {
      disableSubmit.value = true
      const user = await login(model.value)
      if (user) {
        app.setUser(user)
        window.$message?.success('登录成功')
        router.replace('/')
      } else {
        app.clearUser()
      }
      disableSubmit.value = false
    }
  })
}
</script>

<template>
  <BlankLayout>
    <Toolbar title="登录" />
    <Card bordered flex flex-col items-center py12>
      <BlogTitle scale-95 />
      <div text-base text-gray-500 pt4 pb8>
        -> 很幸运与你相遇
      </div>
      <div w70 md:w80 pb6>
        <!-- 表单 用户名密码验证码 -->
        <NForm ref="formEl" :model="model" :rules="rules" :show-label="false">
          <NFormItem path="username">
            <NInput v-model:value="model.username" type="text" placeholder="请输入账号" />
          </NFormItem>
          <NFormItem path="password">
            <NInput
              v-model:value="model.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
            />
          </NFormItem>
          <NFormItem path="code">
            <NInput
              v-model:value="model.code"
              type="text"
              show-password-on="click"
              placeholder="验证码不区分大小写"
            />
            <img ref="captchaEl" alt="captcha" h8 ml4 @click="onCaptchaClick">
          </NFormItem>
        </NForm>
        <!-- 提交表单按钮 -->
        <NButton
          type="primary"
          text-color="white"
          w-full rounded-lg
          :disabled="disableSubmit"
          @click="handleSubmit"
        >
          登录
        </NButton>
      </div>
      <a
        :href="giteeOauthUrl"
        flex items-center justify-center
        w70 md:w80 h9 rounded-lg cursor-pointer
        border="~ gray-200 dark:gray-600"
      >
        <img :src="gitee" w6 mr4>
        <div>通过 Gitee 登录</div>
      </a>
    </Card>
  </BlankLayout>
</template>
