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
// 后端数据
const data = ref<any>({})
// 星星下坠背景
useCanvasBg(containerRef, canvasRef)


onMounted(async () => {
  const res = await getData()
  data.value = res
  console.log(data.value)
})
</script>

<template>
  <div v-if="data" class="w-screen h-screen bg-black" ref="containerRef">
    <!-- 背景 -->
    <canvas ref="canvasRef" class="fixed left-0 top-0 w-full h-full"></canvas>
    <!-- 内容 -->
    <div class="bg-transparent z-10 flex overflow-hidden chart-container">
      <!-- 左 -->
      <div class="flex-1 flex flex-col mr-2 bg-slate-800 bg-opacity-50 p-3">
        <!-- 横向柱状图 -->
        <HorizontalBar :data="data.abnormalData" class="flex-1 box-border pb-4" />
        <div class="flex-1 box-border pb-4"></div>
        <div class="flex-1 box-border pb-4"></div>
      </div>
      <!-- 中 -->
      <div class="w-1/2 flex flex-col mr-2"></div>
      <!-- 右 -->
      <div class="flex-1 flex flex-col bg-slate-800 bg-opacity-50 p-3"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 核心代码 */
@use "sass:math";

@function px-to-width($px, $design-width: 1920) {
  @return math.div($px, $design-width) * 100vw;
}

@function px-to-height($px, $design-height: 1080) {
  @return math.div($px, $design-height) * 100vh;
}

.chart-container {
  width: px-to-width(1920);
  height: px-to-height(1080);
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
