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
    <Card class="content" w="80 md:100">
      <Tabs v-model:active="currentTabIndex">
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

<style scoped>
.content {
  box-shadow: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
}
</style>
