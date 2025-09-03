<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{
  data: any
  containerRef: Ref<HTMLDivElement>
}>()
console.log(props.data.servers)
const barContainer = ref<HTMLElement | null>(null)

import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

let chart: echarts.ECharts | null = null
onMounted(() => {
  echarts.use([GridComponent, BarChart, CanvasRenderer])
  chart = echarts.init(barContainer.value)
  renderChart()
  const observer = new ResizeObserver(() => {
    chart.resize()
  })
  observer.observe(props.containerRef)
})

const renderChart = () => {
  const option = {
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      // 计算边距时，包含标签
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.servers.map((item: any) => item.name),
      axisLabel: {
        color: '#9EB1C8'
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      // 最大值（防止触顶）
      max: function (value) {
        // 取整
        return parseInt(value.max * 1.2)
      }
    },
    series: [
      {
        type: 'bar',
        data: props.data.servers.map((item: any) => item.value),
        barWidth: 12,
        itemStyle: {
          color: '#479AD3', // 设置柱子的颜色
          barBorderRadius: 5, // 设置柱子的圆角
          shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
          shadowBlur: 5 // 设置柱子的阴影模糊大小
        },
        label: {
          show: true,
          // 设置标签位置为右侧
          position: 'top',
          textStyle: {
            // 设置标签文本颜色
            color: '#fff'
          },
          formatter: '{c}%'
        }
      }
    ]
  }

  chart.setOption(option)
}

// 监听数据的变化，重新渲染图表
watch(
  () => props.data,
  () => {
    renderChart()
  }
)
</script>
<template>
  <div>
    <div class="text-white">【服务资源占用比】</div>
    <div ref="barContainer" class="w-full h-full"></div>
  </div>
</template>

<style scoped lang="scss"></style>
