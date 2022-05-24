<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/stores'

const app = useAppStore()
const theme = useThemeStore()
const currentTabIndex = ref(app.user ? 0 : 1)

watchEffect(() => {
  if (app.user) {
    currentTabIndex.value = 0
  }
})
</script>

<template>
  <NModal v-model:show="app.showSettingPage">
    <Card w="80 md:100">
      <Tabs v-model:active="currentTabIndex" justify="children:center">
        <TabPanel name="设置">
          <div flex justify-center m="x2 t4 b2">
            <NButton
              :color="theme.common.primaryColor"
              text-color="white"
              bg="$primary-color"
              rounded-xl
              @click="$router.push('/editor')"
            >
              新建文章
            </NButton>
          </div>
        </TabPanel>
        <TabPanel name="登录">
          <Login m="x2 t4" />
        </TabPanel>
      </Tabs>
    </Card>
  </NModal>
</template>
