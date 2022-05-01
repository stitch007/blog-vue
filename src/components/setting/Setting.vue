<script setup lang="ts">
import { useAppStore } from '@/stores'

const app = useAppStore()
const currentTabIndex = ref(app.user ? 0 : 1)

watchEffect(() => {
  if (app.user) {
    currentTabIndex.value = 0
  }
})
</script>

<template>
  <Dialog v-model:show="app.showSettingPage">
    <Card w="80 md:100">
      <Tabs v-model:active="currentTabIndex" justify="children:center">
        <TabPanel name="设置">
          <div m="x2 t4">
            设置
          </div>
        </TabPanel>
        <TabPanel name="登录">
          <Login m="x2 t4" />
        </TabPanel>
      </Tabs>
    </Card>
  </Dialog>
</template>
