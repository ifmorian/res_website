<script setup lang="ts">
  defineProps<{
  size: string,
  text: string
}>()
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <span class="wrapper">
    <span class="magic" :style="{ fontSize: size }">
      {{ text }}
    </span>
    <span class="material-symbols-outlined star">star</span>
    <span class="material-symbols-outlined star">star</span>
    <span class="material-symbols-outlined star">star</span>
  </span>
</template>

<script lang="ts">
  export default {
    mounted() {
      const stars = document.querySelectorAll('.star');
      stars.forEach((star, i) => {
        const s = (star as HTMLSpanElement);
        s.style.top = Math.random() * 50 + '%';
        s.style.left = Math.random() * 100 + '%';
        setTimeout(() => {
          setInterval(() => {
            s.style.top = Math.random() * 70 - 10 + '%';
            s.style.left = Math.random() * 100 + '%';

            s.style.animation = 'none';
            s.offsetHeight;
            s.style.animation = '';
          }, 900);
        }, i * 300)
      })
    }
  }
</script>

<style scoped>

  @keyframes background-pan {
    from {
      background-position: 0% center;
    }
    to {
      background-position: -200% center;
    }
  }

  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
  }

  @keyframes sprinkle {
    from {
      transform: scale(0) rotate(0deg);
    }
    50% {
      transform: scale(1) rotate(-90deg);
    }
    to {
      transform: scale(0) rotate(-180deg);
    }
  }

  .star {
    color: rgb(123, 31, 162);
    opacity: .7;
    position: absolute;
    animation: sprinkle .9s infinite ease forwards;
  }
  .magic {
    animation: background-pan 3s linear infinite;
    background: linear-gradient(
      to right,
      rgb(123, 31, 162),
      rgb(103, 58, 183),
      rgb(244, 143, 177),
      rgb(123, 31, 162)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
    background-size: 200%;
    background-position: center -100%;
  }
</style>