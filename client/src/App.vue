<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import BackgroundLight from './components/BackgroundLight.vue';
</script>

<template>

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
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

</template>

<script lang="ts">

  export default {
    beforeCreate() {
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
  line-height: 1.5;
  max-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  margin-bottom: 5%;
  background: var(--color-background-soft);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
