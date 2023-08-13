<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router';
import BackgroundLight from './components/BackgroundLight.vue';
import store from './store';
import AuthenticationService from './services/AuthenticationService';
import { watch } from 'vue';
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="background" :style="{backgroundImage: 'url(/src/assets/images/backgrounds/' + backgrounds[backgroundNumber] + '.gif)'}">
    <div class="hexgrid" ref="hexgrid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
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
      <a class="home" @click="() => router.push('/')">Home</a>
      <a @click="() => {}" class="home">Teams</a>
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
    <div class="profile d">
      <span v-if="store.userId.value" class="profile-picture"></span>
      <span v-else class="material-symbols-outlined profile-login" @click="() => router.push('/login')">login</span>
      <div v-if="store.userId.value" class="profile-dropdown dropdown d3">
        <a @click="() => router.push('/profile')" class="dropdown-option">
          <span class="material-symbols-outlined dropdown-option-icon dropdown-option-item">account_circle</span>
          <div class="dropdown-option-name dropdown-option-item">Profile</div>
        </a>
        <a @click="() => router.push('/settings')" class="dropdown-option">
          <span class="material-symbols-outlined dropdown-option-icon dropdown-option-item">settings</span>
          <div class="dropdown-option-name dropdown-option-item">Settings</div>
        </a>
        <a @click="() => {
          AuthenticationService.logout().then(() => {
            store.notification.value.message = 'Logged out!';
            store.notification.value.success = true;
            store.notification.value.notificate = !store.notification.value.notificate;
            //@ts-ignore
            this.$updateSession();
          }).catch(err => {
            
          })
        }" class="dropdown-option">
          <span class="material-symbols-outlined dropdown-option-icon dropdown-option-item">logout</span>
          <div class="dropdown-option-name dropdown-option-item">Log out</div>
        </a>
      </div>
      <div v-else class="profile-dropdown dropdown d2">
        <a @click="() => router.push('/login')" class="dropdown-option">
          <span class="material-symbols-outlined dropdown-option-icon dropdown-option-item">login</span>
          <div class="dropdown-option-name dropdown-option-item">Sign in</div>
        </a>
        <a @click="() => router.push('/register')" class="dropdown-option">
          <span class="material-symbols-outlined dropdown-option-icon dropdown-option-item">person_add</span>
          <div class="dropdown-option-name dropdown-option-item">Sign up</div>
        </a>
      </div>
    </div>
    <div id="header-border"></div>
  </header>

  <RouterView />

  <div
    ref="notification"
    class="notification"
    @mouseenter="() => clearNotification()"
    :style="{color: store.notification.value.success ? 'var(--secondary)' : 'var(--error)'}"
  >
    {{ store.notification.value.message }}
  </div>

  <footer>
    <div class="footer-wrapper">
      <div class="footer-section">
        <div class="footer-section-title">Rechtliches</div>
        <div class="footer-section-content">
          <a href="" class="footer-section-content-link">
            Datenschutzerklärung
            <div class="footer-section-content-link-border"></div>
          </a>
          <a href="" class="footer-section-content-link">
            Impressum
            <div class="footer-section-content-link-border"></div>
          </a>
          <!-- <a href="" class="footer-section-content-link">Stream</a> -->
        </div>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-section">
        <div class="footer-section-title">Über RES Publica</div>
        <div class="footer-section-content">
          <a href="" class="footer-section-content-link">
            About us
            <div class="footer-section-content-link-border"></div>
          </a>
          <a href="" class="footer-section-content-link">
            Teams
            <div class="footer-section-content-link-border"></div>
          </a>
          <a href="" class="footer-section-content-link">
            Stream
            <div class="footer-section-content-link-border"></div>
          </a>
        </div>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-section footer-socials">
        <a target="_blank" href="https://www.instagram.com/res_publica_esport/" class="footer-socials-link">
          <img src="./assets/images/socials/instagram.png" alt="">
        </a>
        <a target="_blank" class="footer-socials-link">
          <img src="./assets/images/socials/twitter.png" alt="">
        </a>
        <a target="_blank" class="footer-socials-link">
          <img src="./assets/images/socials/tiktok.png" alt="">
        </a>
        <a target="_blank" href="https://www.twitch.tv/res_publica_esport" class="footer-socials-link">
          <img src="./assets/images/socials/twitch.png" alt="">
        </a>
      </div>
    </div>
    <small class="copyright">&copy; Copyright {{currentYear}}, Felix Kurz. All Rights Reserved</small>
  </footer>

</template>

<script lang="ts">

  export default {
    data() {
      return {
        notetificationTimer: NaN,
        currentYear: new Date().getFullYear(),
        backgrounds: ["sorcery", "domination", "precision", "resolve", "inspiration"],
        backgroundNumber: Math.floor(Math.random() * 5),
      }
    },
    beforeMount() {
      //@ts-ignore
      this.$updateSession();
    },
    mounted() {
      watch(() => store.notification.value.notificate, () => {
        if (!Number.isNaN(this.notetificationTimer)) {
          clearTimeout(this.notetificationTimer);
        }
        (this.$refs.notification as HTMLDivElement).style.visibility = 'visible';
        (this.$refs.notification as HTMLDivElement).style.opacity = '1';
        this.notetificationTimer = setTimeout(() => {
          (this.$refs.notification as HTMLDivElement).style.visibility = 'hidden';
          (this.$refs.notification as HTMLDivElement).style.opacity = '0';
        }, 5000);
      });

      watch(() => this.$route, () => {
        this.backgroundNumber = Math.floor(Math.random() * this.backgrounds.length);
      })

      const header = document.getElementById('header-border') as HTMLHeadElement;
      const resize = () => {
        header.style.width = window.scrollY / (document.body.scrollHeight - document.body.clientHeight) * 100 + '%';
      }
      window.addEventListener('scroll', () => resize());
      window.addEventListener('resize', () => resize());

      document.addEventListener('mousemove', (e) => {
        let x = e.clientX + .05 * window.innerWidth;
        let y = e.clientY + .05 * window.innerHeight;
        let bg = "radial-gradient(circle farthest-corner at " + x + "px " + y + "px, transparent 1%, rgba(0, 0, 0, .5) 15%";
        (this.$refs.hexgrid as HTMLDivElement).style.backgroundImage = bg;
      })
    },
    methods: {
      clearNotification() {
        clearTimeout(this.notetificationTimer);
        (this.$refs.notification as HTMLDivElement).style.visibility = 'hidden';
        (this.$refs.notification as HTMLDivElement).style.opacity = '0';
      }
    }
  }

</script>

<style scoped>

.background {
  opacity: .5;
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-repeat: repeat;
  background-size: cover;
  background-position: 50% 100%;
}

.background-light {
  position: absolute;
}

.hexgrid {
  width: 110%;
  height: 110%;
  left: -5%; top: -5%;
  position: absolute;
  font-size: 0;
  --s: 6.4vw;
  --m: .5vw;
  --f: calc(1.732 * var(--s) + 4 * var(--m)  - 1px);
  opacity: .4;
}

.hexgrid::before {
  content: '';
  width: calc(var(--s)/2 + var(--m));
  float: left;
  height: 120%;
  shape-outside: repeating-linear-gradient(     
                   #0000 0 calc(var(--f) - 3px),      
                   #000  0 var(--f));
}

.hexgrid div {
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s)*1.1547);
  display: inline-block;
  font-size: initial;
  background: black;
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
}

header {
  position: fixed;
  opacity: 1;
  top: 0;
  line-height: 1.5;
  height: 6.5vw;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
  /* background: var(--color-background-soft); */
  background: #2828289d;
  border-bottom: .25vw solid var(--secondary);
  z-index: 20;
  backdrop-filter: blur(5px);
}

#header-border {
  position: absolute;
  content: '';
  left: 0; top: 0;
  width: 0%;
  height: 6.5vw;
  border-bottom: .25vw solid var(--primary);
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
  right: 1vw;
  top: 0;
  width: 6.5vw;
  height: 6.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  width: 50%;
  height: 50%;
  background: var(--secondary);
  border-radius: 50%;
  outline: .4vh solid var(--color-text);
  display: inline-block;
  cursor: pointer;
}

.profile-login {
  font-size: 2.3vw;
  cursor: pointer;
  transition: color .2s;
}

.profile-login:hover {
  color: var(--secondary);
}

.profile-dropdown {
  right: 0;
  width: 15vw;
}

a {
  font-family: 'Austere';
  font-size: 1.5vw;
  cursor: pointer;
  transition: color .2s;
}

a:hover {
  color: var(--secondary);
}

.logo-wrapper {
  position: relative;
  width: 5.5vw;
  height: 5.5vw;
  border-radius: 50%;
  transition: .4s;
}

.logo {
  position: absolute;
  width: 95%;
  height: 50%;
  left: 2.5%;
  top: .7vw;
}


.dropdown {
  position: absolute;
  top: 6.5vw;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height .2s, opacity .2s;

  display: flex;
  flex-direction: column;
}

.dropdown::before {
  content: '';
  height: .5vw;
}

.dropdown-option {
  width: 100%;
  height: auto;
  flex: 1;

  padding: 0 8%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: rgba(24, 24, 24, .7);
  border-bottom: .15vw solid var(--color-text);
  transition: border-color .2s;
}

.dropdown-option:hover {
  border-color: var(--secondary);
}

.dropdown-option:last-child {
  border: unset;
}

.dropdown-option-item {
  filter: drop-shadow(0 0 0 rgb(10, 10, 10));
  transition: filter .2s;
}

.dropdown-option:hover .dropdown-option-item {
  filter: drop-shadow(.3vw .4vw .1vw rgb(10, 10, 10));
}

.dropdown-option-icon {
  font-size: 1.8vw;

  display: flex;
  align-items: center;
}

.dropdown-option-name {
  font-size: 1.4vw;
  font-family: 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.d:hover .dropdown {
  opacity: 1;
}

.d:hover .d1 {height: 4vw;}
.d:hover .d2 {height: 8vw;}
.d:hover .d3 {height: 12vw;}
.d:hover .d4 {height: 16vw;}
.d:hover .d5 {height: 20vw;}


.notification {
  position: fixed;
  z-index: 100;
  bottom: 2vw;
  right: 2vw;
  width: 35vw;
  font-size: 1.4vw;
  padding: .6% 1.3%;
  border-radius: .8vw;
  background: var(--color-background-soft);
  visibility: hidden;
  opacity: 0;
  transition: opacity .5s, visibility .5s;
  border: .11vw solid;  
}

footer {
  width: 100vw;
  height: 15vw;
  background: var(--color-background-soft);

  border-top: .3vw solid var(--color-background-mute);
}

.footer-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.copyright {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: .5vw;
  text-align: center;
}

.footer-section {
  width: 25%;
  height: 70%;
  padding: 0 5%;
}

.footer-socials {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.footer-socials-link {
  width: 6vw;
  height: 6vw;
  padding: 2.5%;
  cursor: pointer;
}

.footer-socials-link img {
  width: 100%;
  height: 100%;
  z-index: 2;
  /* filter: invert(13.2%); */
  filter: invert(35%);
}

.footer-socials-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-background);
  border-radius: 0.5vw;
}

.footer-divider {
  width: .1%;
  background: var(--color-text);
  height: 50%;
}

.footer-section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5%;
}

.footer-section-content {
  display: flex;
  flex-direction: column;
}

.footer-section-content-link {
  font-family: unset;
  font-size: 15px;
  height: 100%;
  width: fit-content;
  overflow: visible;
}

.footer-section-content-link-border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2%;
  width: 0;
  transition: width .2s, color .2s;
  background: var(--color-text);
}

.footer-section-content-link:hover .footer-section-content-link-border {
  width: 100%;
  background-color: var(--secondary);
}


</style>
