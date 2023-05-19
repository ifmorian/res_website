<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackgroundLight from './components/BackgroundLight.vue';
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="background">
    <BackgroundLight
      class="background-light"
      :stroke-width="7.5"
      :x-start="100" :y-start="500" :x-end="1200" :y-end="400" :animated="true" :delay="0"
    />
    <BackgroundLight
      class="background-light"
      :stroke-width="4"
      :x-start="-300" :y-start="850" :x-end="500" :y-end="800" :animated="true" :delay="0.4"
    />
    <BackgroundLight
      class="background-light"
      :stroke-width="6"
      :x-start="1300" :y-start="250" :x-end="2000" :y-end="350" :animated="true" :delay="1.3"
    />
    <BackgroundLight
      class="background-light"
      :stroke-width="5"
      :x-start="800" :y-start="700" :x-end="1500" :y-end="800" :animated="true" :delay="0.9"
    />
    <BackgroundLight
      class="background-light"
      :stroke-width="4"
      :x-start="-100" :y-start="250" :x-end="300" :y-end="300" :animated="true" :delay="1.5"
    />
    <BackgroundLight
      class="background-light"
      :stroke-width="4"
      :x-start="1600" :y-start="700" :x-end="2100" :y-end="640" :animated="true" :delay="1.7"
    />
  </div>
  
  <header>
    <nav class="nav">
      <a href="/" class="home">Home</a>
      <a href="/" class="home">Teams</a>
      <a href="/" class="home">Stream</a>
    </nav>
    <div class="logo-wrapper">
      <picture class="logo">
        <source srcset="@/assets/logo_wotext_white.svg" media="(prefers-color-scheme: dark)">
        <img src="@/assets/logo_wotext.svg" />
      </picture>
    </div>
    <nav class="nav">
      <a href="/" class="home">Join RES</a>
      <a href="/" class="home">Contact</a>
      <a href="/" class="home">Contact</a>
    </nav>
    <a class="profile" @click="loggedIn = !loggedIn">
      <span v-if="loggedIn" class="profile-picture"></span>
      <span v-else class="material-symbols-outlined profile-login">login</span>
    </a>
    <div id="header-border"></div>
  </header>

  <RouterView />

</template>

<script lang="ts">
import AuthenticationService from './services/AuthenticationService';

  export default {
    data() {
      return {
        scrolled: true,
        loggedIn: true
      }
    },
    beforeCreate() {
      AuthenticationService.isloggedin().then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    mounted() {
      const header = document.getElementById('header-border') as HTMLHeadElement;
      const resize = () => {
        header.style.width = window.scrollY / (document.body.scrollHeight - document.body.clientHeight) * 100 + '%';
      }
      window.addEventListener('scroll', () => resize());
      window.addEventListener('resize', () => resize());
    },
}

</script>

<style scoped>

.background {
  opacity: .5;
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  aspect-ratio: 16 / 9;
  z-index: -1;
}

.background-light {
  position: absolute;
}

header {
  position: fixed;
  line-height: 1.5;
  height: 14vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
  background: var(--color-background-soft);
  border-bottom: .5vh solid var(--secondary);
  z-index: 20;
}

#header-border {
  position: absolute;
  content: '';
  left: 0; top: 0;
  width: 0%;
  height: 14vh;
  border-bottom: .5vh solid var(--primary);
  pointer-events: none;
}

.nav {
  /* width: 35%; */
  width: 30%;
  margin: 0 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* .nav:nth-child(3) {
  width: 25%;
  margin-right: 15%;
  margin-left: 5%;
} */

.profile {
  position: absolute;
  right: 5vh;
  top: 4vh;
  width: 6vh;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  width: 100%;
  height: 100%;
  background: var(--secondary);
  border-radius: 50%;
  outline: .4vh solid var(--color-text);
  display: inline-block;
}

.profile-login {
  font-size: 5vh;
}

a {
  font-family: 'Austere';
  font-size: 1.3vw;
  cursor: pointer;
}

.logo-wrapper {
  position: relative;
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
  transition: .4s;
}

.logo {
  position: absolute;
  width: 95%;
  height: 50%;
  left: 2.5%;
  top: 1vh;
}


</style>
