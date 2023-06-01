<script setup lang="ts">

</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <section class="wrapper">
    <div class="bg-img"></div>
    <div class="content-wrapper">

      <div ref="text" class="text" id="text1">
        <span>{{ texts[0] }}</span>
        <span ref="w0" class="switchingword">{{ words[0] }}</span>
        <span>{{ texts[1] }}</span>
        <span ref="w1" class="switchingword w1">{{ words[1] }}</span>
        <br>
        <span>{{ texts[2] }}</span>
        <span ref="w2" class="switchingword w2">{{ words[2] }}</span>
        <span>{{ texts[3] }}</span>
        <span ref="w3" class="switchingword">{{ words[3] }}</span>
      </div>

      <div class="cta">Werde Teil von&nbsp;<span class="font-austere"><span class="first-letter">R</span>ES</span><span class="material-symbols-outlined arrow">arrow_right_alt</span></div>
    </div>

  </section>
</template>

<script lang="ts">

  const speed = 100;

  const timer = () => {
    return new Promise(resolve => setTimeout(resolve, speed + Math.random() * 60 - 30));
  }

  export default {
    data() {
      return {
        words: ['', '', '', ''],
        texts: ['', '', '', ''],
        timeout: 0,
        words1: [
          ['passion', 'success'],
          ['diversity', 'community'],
          ['ambition', 'unstoppable'],
        ],
        words2: [
          ['dreams', 'reality'],
          ['goals', 'a journey'],
          ['friends', 'a team'],
          ['skills', 'nature'],
        ],
        n1: 2,
        n2: 0,
      }
    },
    methods: {
      async writeWord(i: number): Promise<void> {
        return new Promise(async resolve => {
          const word = i < 2 ? this.words1[this.n1][i % 2] : this.words2[this.n2][i % 2];
          const a = this.words[i].split('');
          for (let j = 0; j < Math.max(word.length, a.length); j++) {
            a[j] = word[j] !== undefined ? word[j] : '\xa0';
            this.words[i] = a.join('');
            await timer();
          }
          resolve();
        });
      }
    },
    async mounted() {
      this.$nextTick(async () => {
        const text = ['where', 'becomes', 'and', 'become'];

        for (let i = 0; i < text.length; i++) {
          for (let j = 0; j < text[i].length; j++) {
            this.texts[i] += text[i][j];
            await timer();
          }
          await this.writeWord(i);
        }

        const intervalF = () => {
          this.n1 = Math.floor(Math.random() * this.words1.length);
          this.writeWord(0);
          this.writeWord(1);
          setTimeout(() => {
            this.n2 = Math.floor(Math.random() * this.words2.length);
            this.writeWord(2);
            this.writeWord(3);
          }, 3000);
          this.timeout = setTimeout(intervalF, 6000);
        };
        intervalF();
      })
    },
    unmounted() {
      window.clearTimeout(this.timeout);
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

  .text {
    width: 60%;
    height: 3.4em;
    line-height: 1.7em;
    color: var(--primary);
    font-size: 2.5vw;
    font-family: 'Ubuntu Mono', 'Courier New', Courier, monospace;
  }

  .switchingword {
    display: inline-flex;
    margin-left: 1.5vw;
    width: 13vw;

    font-weight: bold;
    color: var(--color-text)
  }

  .w1 {
    width: 14vw;
  }

  .w2 {
    width: 10vw;
  }

  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 4.3vw;
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