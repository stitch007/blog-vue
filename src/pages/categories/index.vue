<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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
import { breakpointsTailwind, useBreakpoints, useEventListener } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { BasicLayout } from '@/components/layouts'
import { HomeSide } from '@/components/business'
import { Toolbar } from '@/components/common'
import { useAppStore, useLibraryStore } from '@/stores'
import { changeTitle } from '@/composables'
import Card from '@/components/common/Card.vue'

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

changeTitle('全部分类')

const app = useAppStore()
const lib = useLibraryStore()
const router = useRouter()

const smallerThanMd = useBreakpoints(breakpointsTailwind).smaller('md')

const chartEl = ref<HTMLElement>()
let chart: echarts.ECharts

const option = computed((): EChartsOption => {
  return {
    backgroundColor: 'transparent',
    legend: {
      top: smallerThanMd.value ? 'bottom' : undefined,
      right: smallerThanMd.value ? undefined : 'right',
    },
    series: [
      {
        name: '全部分类',
        type: 'pie',
        radius: smallerThanMd.value ? [15, 80] : [40, 120],
        center: smallerThanMd.value ? ['50%', '40%'] : ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          formatter: '{b}:{c}篇({d}%)',
        },
        data: lib.sameCategoryArticles.map((item) => {
          return {
            name: item.category.name,
            value: item.articles.length,
          }
        }),
      },
    ],
  }
})

watch(() => lib.categories, () => {
  chart.setOption(option.value)
})

watch(() => app.isDark, () => {
  if (chartEl.value) {
    chart.dispose()
    chart = echarts.init(chartEl.value, app.isDark ? 'dark' : undefined)
    chart.setOption(option.value)
  }
})

useEventListener(window, 'resize', () => {
  chart.resize()
  chart.setOption(option.value)
})

onMounted(() => {
  if (chartEl.value) {
    chart = echarts.init(chartEl.value, app.isDark ? 'dark' : undefined)
    chart.setOption(option.value)
    chart.on('click', (params) => {
      const category = lib.categories.find(category => category.name === params.name)
      router.push(`/categories/${category?.id}`)
    })
  }
})
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar :title="`全部分类 - ${lib.categories.length}`" />
      <Card bordered>
        <div ref="chartEl" h="80 md:100" />
      </Card>
    </template>
    <template #right>
      <div h13 />
      <div sticky top-4>
        <HomeSide />
      </div>
    </template>
  </BasicLayout>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
