<script setup lang="ts">
  import MagicText from '../components/MagicText.vue';
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <section class="wrapper">
    <div class="bg-img"></div>
    <div class="content-wrapper">

      <div class="text-wrapper">
        <div class="text" id="text1"></div>
        <div class="text" id="text2">Um Dennis jeden Tag aufs Neue<br>in den <MagicText size="inherit" text="Arsch"/> zu ficken.</div>
      </div>

      <div class="cta">Werde Teil von&nbsp;<span class="font-austere"><span class="first-letter">R</span>ES</span><span class="material-symbols-outlined arrow">arrow_right_alt</span></div>
    </div>

  </section>
</template>

<script lang="ts">
  export default {
    mounted() {
      const el1 = document.getElementById('text1') as HTMLDivElement;
      const text = 'Um Dennis jeden Tag aufs Neue in den Arsch zu ficken.'
      const speed = 60;
      window.addEventListener('load', () => {
        write(0);
      });
      function write(i: number) {
        if (i >= text.length) {
          return;
        };

        if (i > 36 && i < 43) {
          el1.innerHTML = el1.innerHTML.substring(0, 41) + `<span class="magic" data-v-5a451c92="">${text.substring(36, i + 1)}</span>`;
        } else {
          if (i == 43) {
            (document.querySelector('.magic') as HTMLDivElement).style.visibility = 'hidden';
            (document.getElementById('text2') as HTMLDivElement).style.visibility = 'visible';
          }
          el1.innerHTML += text[i];
        }

        if (i === 28) el1.innerHTML += '<br>';
        setTimeout(() => write(i + 1), speed + Math.random() * 60 - 30);
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=B612+Mono&family=Ubuntu+Mono&display=swap');
  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
  }
  .wrapper {
    width: 100vw;
    height: 100.5vh;
    border-bottom: .5vh solid var(--secondary);
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
    background-image: url('@/assets/images/pexels-gamer.jpg');
    background-size: 100%;
    background-position: center;
    background-attachment: fixed;
  }

  .wrapper::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, black, rgba(0, 0, 0, .7) 60%, transparent);
  }

  .content-wrapper {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 100%;
    margin-right: 10%;
  }

  .text-wrapper {
    width: 50%;
  }

  .text {
    width: 100%;
    height: 3.4em;
    line-height: 1.7em;
    color: var(--color-text);
    font-size: 3.5em;
    font-family: 'Ubuntu Mono', 'Courier New', Courier, monospace;
  }

  #text2 {
    position: absolute;
    top: 0; left: 0;
    visibility: hidden;
    color: transparent;
  }

  .magic {
    background: linear-gradient(
      to right,
      rgb(123, 31, 162),
      rgb(103, 58, 183),
      rgb(244, 143, 177),
      rgb(123, 31, 162)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
    background-size: 200%;
    background-position: 0 -100%;
  }

  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 70px;
    color: var(--color-background-mute);
    background: var(--secondary);
    right: -3%;
    font-size: 1.6em;
    font-family: 'Ubuntu Mono';
    font-weight: bold;
    cursor: pointer;
    border: 3px solid var(--color-text);
    border-radius: 10px;
    transition: background .2s, color .2s, transform .2s, border .2s;
  }

  .cta:hover {
    background: var(--primary);
    color: var(--color-text);
    border: 3px solid var(--secondary);
    transform: scale(1.05);
  }

  .arrow {
    visibility: hidden;
    margin-left: -3%;
    transition: margin .2s;
  }

  .cta:hover .arrow {
    visibility: visible;
    margin-left: 1%;
  }

  .first-letter {
    color: unset;
  }

  .cta:hover .first-letter {
    color: var(--secondary);
  }

</style>