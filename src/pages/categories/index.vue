<script setup lang="ts">
import * as echarts from 'echarts/core'
import type { PieSeriesOption } from 'echarts/charts'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type { LegendComponentOption, ToolboxComponentOption } from 'echarts/components'
import {
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import { useAppStore, useLibraryStore, useThemeStore } from '@/stores'

type EChartsOption = echarts.ComposeOption<ToolboxComponentOption | LegendComponentOption | PieSeriesOption>

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])

const lib = useLibraryStore()
const app = useAppStore()
const theme = useThemeStore()
const router = useRouter()

const chartEl = ref<HTMLElement>()
let chart: echarts.ECharts

const option = computed((): EChartsOption => {
  return {
    backgroundColor: 'transparent',
    legend: {
      top: app.smallerThanMd ? 'bottom' : undefined,
      right: app.smallerThanMd ? undefined : 'right',
    },
    series: [
      {
        name: '全部分类',
        type: 'pie',
        radius: app.smallerThanMd ? [15, 80] : [40, 150],
        center: app.smallerThanMd ? ['50%', '40%'] : ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          formatter: '{b}:{c}篇({d}%)',
        },
        data: [
          { name: '机器人', value: 22 },
          { name: '知识总结', value: 2 },
          { name: '学习笔记', value: 6 },
          { name: '算法与数据结构', value: 17 },
          { name: '人工智能', value: 12 },
          { name: '嵌入式', value: 1 },
        ],
      },
    ],
  }
})

watch(lib.categories, () => {
  chart.setOption(option.value)
})

watch(() => theme.isDark, () => {
  if (chartEl.value) {
    chart.dispose()
    chart = echarts.init(chartEl.value, theme.isDark ? 'dark' : undefined)
    chart.setOption(option.value)
  }
})

useEventListener(window, 'resize', () => {
  chart.resize()
  chart.setOption(option.value)
})

onMounted(() => {
  if (chartEl.value) {
    chart = echarts.init(chartEl.value)
    chart.setOption(option.value)
    chart.on('click', (params) => {
      router.push(`/categories/${params.name}`)
    })
  }
})
</script>

<template>
  <main max-w-1200px m="xauto t-20" p="x2 md:x8">
    <Card p="x8 y6">
      <div text-2xl>
        全部分类
      </div>
      <div ref="chartEl" h="80 md:100" h-100 />
    </Card>
  </main>
</template>
