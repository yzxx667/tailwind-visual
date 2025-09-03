import { onMounted, onUnmounted, type Ref } from 'vue'

export const useCanvasBg = (
  containerRef: Ref<HTMLDivElement | undefined>,
  canvasRef: Ref<HTMLCanvasElement | undefined>,
) => {
  class Star {
    arc: number
    x: number
    y: number
    speed: number
    brightness: number
    canvasRef: HTMLCanvasElement
    constructor(canvasRef: HTMLCanvasElement) {
      this.canvasRef = canvasRef
      this.arc = Math.random() * 2 + 1
      this.x = Math.random() * this.canvasRef.width
      this.y = Math.random() * this.canvasRef.height
      this.speed = Math.random() * 2
      this.brightness = Math.abs(Math.random() - 0.5) // 星星亮度
    }

    draw(ctx: CanvasRenderingContext2D) {
      ;(ctx as CanvasRenderingContext2D).beginPath()
      ;(ctx as CanvasRenderingContext2D).arc(this.x, this.y, this.arc, 0, Math.PI * 2)
      ;(ctx as CanvasRenderingContext2D).fillStyle = `rgba(255, 255, 255, ${this.brightness})`
      ;(ctx as CanvasRenderingContext2D).fill()
    }

    update() {
      this.y += this.speed
      if (this.y > this.canvasRef.height) {
        this.y = 0
      }
    }
  }

  const initSize = () => {
    if (canvasRef.value && containerRef.value) {
      const containerWidth = containerRef.value?.clientWidth
      const containerHeight = containerRef.value?.clientHeight
      canvasRef.value.width = containerWidth
      canvasRef.value.height = containerHeight
      // console.log(canvasRef.value)
      const ctx = canvasRef.value.getContext('2d')
      const stars: Star[] = []
      for (let i = 0; i < 200; i++) {
        stars.push(new Star(canvasRef.value))
      }
      for (const star of stars) {
        star.draw(ctx as CanvasRenderingContext2D)
      }

      function animate() {
        if (!canvasRef.value || !ctx) return
        ctx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
        for (const star of stars) {
          star.update()
          star.draw(ctx)
        }
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }
  }
  const observer = new ResizeObserver(() => {
    initSize()
  })
  onMounted(() => {
    initSize()
    if (containerRef.value) {
      observer.observe(containerRef.value)
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      observer.unobserve(containerRef.value)
    }
  })
}
