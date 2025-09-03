<script setup lang="ts">
import { ref } from 'vue'
// 背景hooks
import { useCanvasBg } from './hooks/useCanvasBg'
const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
// 星星下坠背景
useCanvasBg(containerRef, canvasRef)
</script>

<template>
  <div style="width: 100vw; height: 100vh; background-color: #000000;" ref="containerRef">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped lang="scss"></style>
