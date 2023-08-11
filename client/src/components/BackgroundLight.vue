<script setup lang="ts">

defineProps<{
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
  animated: boolean,
  strokeWidth: number,
  delay: number
}>()

</script>

<template>
  <svg width=100% viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <polyline
      class="background"
      :class="{animated: animated}"
      :style="{strokeWidth: strokeWidth * 2 + 'px', animationDelay: delay + 's'}"
      :points="`${xStart},${yStart} ${p2x},${yStart} ${p3x},${yEnd} ${xEnd},${yEnd}`"
    />
    <polyline
      class="line"
      :class="{animated: animated}"
      :style="{strokeWidth: strokeWidth + 'px', animationDelay: delay + 's'}"
      :points="`${xStart},${yStart} ${p2x},${yStart} ${p3x},${yEnd} ${xEnd},${yEnd}`"
    />
  </svg>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        p2x: this.xStart + (this.xEnd - this.xStart) / 2 - Math.abs(this.yEnd - this.yStart) / 2,
        p3x: this.xStart + (this.xEnd - this.xStart) / 2 + Math.abs(this.yEnd - this.yStart) / 2,
      }
    },
    beforeCreate() {
      
    },
  }
</script>

<style scoped>

  svg {
    width: 100%;
    height: 100%;
  }

  polyline {
    fill: none;
    stroke-linecap: round;
    stroke: var(--gold);
  }
  
  .animated {
    stroke-dasharray: 95% 10%;
    stroke-dashoffset: 105%;
    animation: move 18s infinite ease-in-out;
  }

  .background {
    filter: blur(10px);
  }

  @keyframes move {
    25%, 50% {
      stroke-dashoffset: 0;
      stroke: rgba(160, 160, 160, 0.3);
    }
    67% {
      stroke: var(--gold);
    }
    75%, to {
      stroke-dashoffset: -105%;
      stroke: var(--gold);
    }
  }
</style>
