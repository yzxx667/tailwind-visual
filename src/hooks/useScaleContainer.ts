import { ref, onMounted, computed, onUnmounted, type Ref } from 'vue'

const BASE_WIDTH = 1920
const BASE_HEIGHT = 1080
const BASE_RATIO = BASE_WIDTH / BASE_HEIGHT

export const useScaleContainer = (containerRef: Ref<HTMLDivElement | undefined>) => {
  console.log('计算尺寸')
  const scaleStyle = ref('')
  const computedScale = () => {
    const { width, height } = containerRef.value?.getBoundingClientRect() || { width: 0, height: 0 }
    const containerRatio = width / height

    // console.log(BASE_RATIO, containerRatio)
    if (containerRatio >= BASE_RATIO) {
      // 以高度为基准
      const realWidth = height * BASE_RATIO
      const scaleX = realWidth / BASE_WIDTH
      const scaleY = height / BASE_HEIGHT
      scaleStyle.value = `scale(${scaleX}, ${scaleY}) translate(-50%, -50%)`
    } else {
      // 以宽度为基准
      const realHeight = width / BASE_RATIO
      const scaleX = width / BASE_WIDTH
      const scaleY = realHeight / BASE_HEIGHT
      console.log(scaleX, scaleY)
      scaleStyle.value = `scale(${scaleX}, ${scaleY}) translate(-50%, -50%)`
    }
  }

  const transformStyle = computed(() => {
    return {
      transform: scaleStyle.value || 'scale(1, 1)',
      transformOrigin: 'left top',
    }
  })

  const observer = new ResizeObserver(() => {
    computedScale()
  })
  onMounted(() => {
    // 初次挂载时立即计算一次，避免需要等待尺寸变更才生效
    if (containerRef.value) observer.observe(containerRef.value)
  })

  onUnmounted(() => {
    if (containerRef.value) observer.unobserve(containerRef.value)
  })

  return {
    transformStyle,
  }
}
