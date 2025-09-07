<script setup lang="ts">
import * as echarts from 'echarts/core';
// 引入地图数据
import mapJson from '../assets/MapData/china.json'
import {
  TitleComponent,
  TooltipComponent,
  GeoComponent
} from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TimelineComponent } from 'echarts/components';
import { onMounted, ref } from 'vue';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GeoComponent,
  GraphChart,
  CanvasRenderer,
  TimelineComponent
]);

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
console.log('props', props.data)


let chart: echarts.ECharts | null = null
const target = ref<HTMLDivElement | null>(null)
onMounted(() => {
  chart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  echarts.registerMap('china', mapJson as any)
  const option = {
    timeline: {
      data: props.data.voltageLevel,
      axisType: 'category',
      autoPlay: true,
      playInterval: 3000,
      // 位置
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      label: {
        // 默认状态
        color: '#ddd',
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff'
        }
      }
    },
  }

  chart?.setOption(option)
}

</script>


<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>


<style scoped lang="scss"></style>
