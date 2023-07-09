<template>

  <main class="base"></main>
  <div class="bg" ref="bg">
    <div 
      class="bg-champ" v-for="champ in mainChamps" :key="champ"
      :style="{ backgroundImage: 'url(http://localhost:3000/lol/splash/' + champ.champion + '.jpg)' }"
    ></div>
  </div>

</template>

<script lang="ts">
  import AccountService from '@/services/AccountService';
import type { AxiosResponse } from 'axios';
  export default {
    data() {
      return {
        mainChamps: new Array(),
      }
    },
    beforeCreate() {
      AccountService.getMainChamps().then((res: AxiosResponse) => {
        this.mainChamps = res.data.champions;
        console.log(this.mainChamps)
      }).catch((error: Error) => console.error(error));
    }
  }
</script>

<style scoped>
  .bg {
    position: fixed;
    width: 110%;
    height: 100%;
    top: 0;
    left: -5%;
    display: flex;
    flex-direction: row;
  }

  .bg::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4)
  }

  .bg-champ {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
    transform: skew(5deg, 0deg);
    border-left: .5vw solid var(--primary);
  }
</style>