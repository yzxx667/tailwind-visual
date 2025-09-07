<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 获取数据
import { getData } from './api/api'
// 背景hooks
import { useCanvasBg } from './hooks/useCanvasBg'
const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
// 组件
import HorizontalBar from './components/HorizontalBar.vue'
import TotalData from './components/TotalData.vue'
import VerticalBar from './components/VerticalBar.vue'
// 后端数据
const data = ref<any>(null)
// 星星下坠背景
useCanvasBg(containerRef, canvasRef)

onMounted(async () => {
  requestData()
  // setInterval(() => {
  //   requestData()
  // }, 5000)
})

const requestData = async () => {
  const res = await getData()
  data.value = res
  console.log(data.value)
}
</script>

<template>
  <div class="w-screen h-screen bg-black relative" ref="containerRef">
    <!-- 背景 -->
    <canvas ref="canvasRef" class="fixed left-0 top-0 w-full h-full"></canvas>
    <!-- 内容 -->
    <div v-if="data"
      class="bg-transparent z-10 flex overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 chart-container">
      <!-- 左 -->
      <div class="flex-1 flex flex-col mr-2 bg-slate-800 bg-opacity-50 p-3">
        <!-- 横向柱状图 -->
        <HorizontalBar :data="data.regionData" :containerRef="containerRef" class="flex-1 box-border pb-4" />
        <div class="flex-1 box-border pb-4"></div>
        <div class="flex-1 box-border pb-4"></div>
      </div>
      <!-- 中 -->
      <div class="w-1/2 flex flex-col mr-2">
        <TotalData :data="data.totalData" class="bg-opacity-50 bg-slate-800 p-3" />
        <div class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"></div>
      </div>
      <!-- 右 -->
      <div class="flex-1 flex flex-col bg-slate-800 bg-opacity-50 p-3">
        <VerticalBar :data="data.serverData" :containerRef="containerRef" class="flex-1 box-border pb-4" />
        <div class="flex-1 box-border pb-4"></div>
        <div class="flex-1 box-border"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 核心代码 */
@use 'sass:math';

@function px-to-width($px, $design-width: 1920) {
  @return math.div($px, $design-width) * 100vw;
}

@function px-to-height($px, $design-height: 1080) {
  @return math.div($px, $design-height) * 100vh;
}

.chart-container {
  width: px-to-width(1820);
  height: px-to-height(1080);
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
