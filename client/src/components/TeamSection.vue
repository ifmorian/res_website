<template>
  <section class="wrapper">
    <div class="title"><span class="first-letter">T</span>eams</div>
    <div class="team-wrapper">
      <div class="team" v-for="(team, index) in teams" :key="team.name" @mousemove="$event => tiltBg($event, index)" @mouseleave="() => unsetBg(index)" ref="teamNodes">
        <div class="data-wrapper">
          <div class="team-name"><span class="first-letter">{{ team.name[0] }}</span>{{ team.name.substring(1, team.name.length) }}</div>
          <div class="row-rank row">
            <div class="team-rank">Average Rank:</div>
            <img class="team-rank-image" :src="`/src/assets/lol/rank/${team.rank}.png`" :alt="ranks[team.rank]">
          </div>
          <div class="row-div row">
            <div class="team-div">Primeleague Div. {{ team.div }}</div>
          </div>
        </div>
        <img :src="`/src/assets/logos/${team.logo}.png`" alt="" class="team-bg">
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue';


  export default {
    setup() {
      return {
        teamNodes: ref(null),
      }
    },
    data() {
      return {
        threshold: 20,
        ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platin', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
        teams: [{
          name: 'Icarus',
          logo: 'icarus',
          rank: 5,
          div: 6,
        },
        {
          name: 'Ares',
          logo: 'ares',
          rank: 8,
          div: 6,
        },
        {
          name: 'Argonauts',
          logo: 'icarus',
          rank: 5,
          div: 6,
        },
        {
          name: 'Icarus',
          logo: 'icarus',
          rank: 5,
          div: 6,
        }]
      }
    },
    methods: {
      tiltBg(event: MouseEvent, i: number) {
        const target = (this.$refs.teamNodes as Array<HTMLDivElement>)[i];

        const rotateX = (this.threshold / 2 - ((event.clientX - target.offsetLeft) / target.clientWidth) * this.threshold).toFixed(2);
        const rotateY = (((event.clientY - (target.clientWidth / 3)  - target.offsetTop) / target.clientHeight) * this.threshold - this.threshold / 2).toFixed(2);
        
        (target.lastChild as HTMLImageElement).style.transform = `perspective(${target.clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
      },
      unsetBg(i: number) {
        const target = (this.$refs.teamNodes as Array<HTMLDivElement>)[i];
        (target.lastChild as HTMLImageElement).style.transform = `perspective(${target.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
      }
    },
    mounted() {
      const wrapper = document.querySelector('.team-wrapper') as HTMLDivElement;

      let isDown = false;
      let start = 0;
      let scroll = wrapper.scrollLeft;

      let lastScrollT: number | null = null;
      let lastScrollX: number | null = null;
      let v: number | null = null;

      wrapper.addEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();
        isDown = true;
        start = event.pageX - wrapper.offsetLeft;
        scroll = wrapper.scrollLeft;
        document.body.style.setProperty('cursor', 'grabbing', 'important');
      });
      document.addEventListener('mouseup', () => {
        isDown = false;
        lastScrollT = null;
        document.body.style.cursor = 'unset';

        function move() {
          setTimeout(() => {
            if (!v || isDown) return;

            wrapper.scrollLeft -= 3 * v;
            v = v/1.03;

            if (Math.abs(v) > 0.1) move();
          }, 10);
        }
        move();
      });
      document.addEventListener('mousemove', (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - wrapper.offsetLeft;
        wrapper.scrollLeft = scroll - (x - start) * 1.2;

        let currentScroll = Date.now();
        if (lastScrollT && lastScrollX) {
          let dt = currentScroll - lastScrollT;
          let dX = x - lastScrollX;
          v = dX / dt;
        }
        lastScrollT = currentScroll;
        lastScrollX = x;
        
      });
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100vw;
    height: 38vw;
    border-bottom: .5vh solid var(--secondary);
    display: flex;
    justify-content: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgba(0, 0, 0, .3);
  }

  .title {
    font-size: 4em;
    margin-left: 2%;
    margin-bottom: -1.5%;
    margin-top: -1%;
    font-family: 'Austere';
  }

  .team-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 75%;
    overflow-x: scroll;
  }

  .team {
    height: 23vw;
    width: 0;
    overflow: hidden;
    margin-right: 4%;
    background: var(--color-background);
    flex: 0 0 30vw;
    transition: transform .2s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    transform: perspective(10vw) rotateX(0deg) rotateY(1deg) scale3d(1, 1, 1);
    filter: drop-shadow(30px 30px black inset)
  }

  .team:hover {
    transform: scale(1.04);
  }

  .team:first-child {
    margin-left: 2%;
  }

  .team::after {
    content: '';
    width: 92%;
    height: 92%;
    position: absolute;
    left: 4%; top: 4%;
    border: 5px solid var(--secondary);
    z-index: 3;
    pointer-events: none;
  }

  .data-wrapper {
    position: relative;
    height: 100%;
    width: 92%;
    margin: 0 auto;
    padding: 5% 10%;
    z-index: 4;
    overflow: hidden;
  }

  .team::before {
    content: '';
    width: 100%;
    height: 50%;
    position: absolute;
    left: 0; top: 0;
    background: linear-gradient(rgba(10, 10, 10, .9), rgba(10, 10, 10, .5) 70%, transparent);
    z-index: 2;
    transition: height .2s;
  }

  .team:hover::before {
    height: 70%;
  }

  .row {
    position: absolute;
    left: -50%;
    opacity: 0;
    transition: opacity .1s, left .35s;
  }

  .team:hover .row {
    left: 10%;
    opacity: 1;
  }

  .team:hover .row-div {
    transition-delay: .07s;
  }

  .row-div {
    margin-top: 4%;
    transition-delay: unset;
  }

  .row {
    display: flex;
  }

  .row-rank {
    width: 100%;
    height: 2.5em;
    line-height: 2.5em;
    margin-top: -2%;
  }

  .team-rank {
    font-size: 2.8em;
  }

  .team-name {
    text-align: center;
    font-size: 4.6vw;
    font-family: 'Austere';
    width: 100%;
    transition: font-size .4s, width .4s, text-shadow .4s;
    text-shadow: 0px 0px 0px rgba(109, 206, 178, .8);
  }

  .team:hover .team-name {
    width: 0;
    transition: font-size .4s, width .7s;
    text-shadow: 0px 0px .5vw rgba(109, 206, 178, .8);
  }

  .team-rank-image {
    width: 3em;
    height: 3em;
    margin-left: 2%;
  }

  .team-div {
    font-size: 2em;
  }

  .team-bg {
    position: absolute;
    width: 70%;
    top: 5%; left: 15%;
    aspect-ratio: 1;
    user-select: none;
    z-index: 0;
    pointer-events: none;
    filter: drop-shadow(.3vw .3vw .6vw var(--color-background-soft));
    transition: filter .3s, transform .3s;
  }

  .team:hover .team-bg {
    filter: drop-shadow(.3vw .3vw 0vw var(--color-background-soft));
    transition: filter .2s;
  }

</style>