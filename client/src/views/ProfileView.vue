<template>

  <main class="base" ref="base">
    <div class="card-wrapper">
      <div class="card-border"></div>
      <div class="card">
        <div class="card-title" ref="cardTitle">
          <div class="pfp-wrapper">
            <div class="pfp-border"></div>
            <div class="pfp">
              <img src="../assets/logo_wotext_white.svg" alt="">
            </div>
          </div>
          <div class="card-title-name-wrapper">
            <div class="card-title-tag">{{ accountInfo.gamertag }}</div>
            <div class="card-title-name">@{{ accountInfo.username }}</div>
          </div>
        </div>
        <div class="content">
          <div class="bio">{{ accountInfo.bio }}</div>
          <div class="roles" ref="roles">
            <div class="roles-circle" ref="rolesCircle">
              <span>c</span>
              <span>l</span>
              <span>i</span>
              <span>c</span>
              <span>k</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
            <img src="../assets/images/lol/images/summoners_rift2.gif" alt="" ref="rolesImage">
            <div class="roles-logo">
              <div class="roles-logo-wrapper top" :class="{'active-role': role % 2 === 0}">
                <img src="../assets/images/lol/roles/top.png" alt="">
              </div>
              <div class="roles-logo-wrapper jungle" :class="{'active-role': role % 3 === 0}">
                <img src="../assets/images/lol/roles/jungle.png" alt="">
              </div>
              <div class="roles-logo-wrapper mid" :class="{'active-role': role % 5 === 0}">
                <img src="../assets/images/lol/roles/mid.png" alt="">
              </div>
              <div class="roles-logo-wrapper bot" :class="{'active-role': role % 7 === 0}">
                <img src="../assets/images/lol/roles/bot.png" alt="">
              </div>
              <div class="roles-logo-wrapper support" :class="{'active-role': role % 11 === 0}">
                <img src="../assets/images/lol/roles/support.png" alt="">
              </div>
            </div>
            <div class="roles-title">Main Roles</div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="bg" ref="bg">
    <div 
      class="bg-champ" v-for="champ in mainChamps" :key="champ"
    >
      <img :src="'http://localhost:3000/lol/splash/' + champ.champion + '.jpg'" alt="">
    </div>
  </div>

</template>

<script lang="ts">
  import AccountService from '@/services/AccountService';
  import AuthenticationService from '@/services/AuthenticationService';
  import type { AxiosResponse } from 'axios';
  export default {
    data() {
      return {
        mainChamps: new Array(),
        accountInfo: Object(),
        role: 0,
      }
    },
    beforeCreate() {
      AccountService.getMainChamps().then((res: AxiosResponse) => {
        this.mainChamps = res.data.champions;
      }).catch((error: Error) => console.error(error));

      AuthenticationService.getUserData().then((res: AxiosResponse) => {
        this.accountInfo = res.data;
        this.accountInfo.bio = this.accountInfo.bio.replace(/P!L!ACEHOLD!!ER/gm, "");
        this.accountInfo.bio = this.accountInfo.bio.replace(/[\r\n]/, "P!L!ACEHOLD!!ER");
        this.accountInfo.bio = this.accountInfo.bio.replace(/[\r\n]/, "P!L!ACEHOLD!!ER");
        this.accountInfo.bio = this.accountInfo.bio.replace(/[\r\n]/gm, " ");
        this.accountInfo.bio = this.accountInfo.bio.replace(/P!L!ACEHOLD!!ER/gm, "\n");
      }).catch((error: Error) => console.error(error));
      
      AccountService.getLolRole().then((res: AxiosResponse) => {
        this.role = res.data.role;
      }).catch((error: Error) => console.error(error));
    },
    mounted() {
      const cardTitle = this.$refs.cardTitle as HTMLDivElement
      document.addEventListener('scroll', () => {
        if (window.scrollY >= 0.08 * window.outerWidth) {
          cardTitle.classList.add('is-pinned');
        }
        else {
          cardTitle.classList.remove('is-pinned');
        }
      });

      const roleImage = this.$refs.rolesImage as HTMLImageElement;
      roleImage.addEventListener('click', () => {
        (this.$refs.roles as HTMLDivElement).classList.toggle('in-sight')
      });

      const rolesCircle = this.$refs.rolesCircle as HTMLDivElement;
      
      const rotate = (angle: number, offset: number = 10) => {
        rolesCircle.childNodes.forEach((el, key) => {
          (el as HTMLSpanElement).style.transform = 'rotate(' + (key *  offset + angle) + 'deg)';
        });
      };
      rotate(-80);
      roleImage.addEventListener('mouseover', () => {
        rolesCircle.childNodes.forEach((el, key) => {
          rotate(-20, 15);
        });
      });
      roleImage.addEventListener('mouseleave', () => {
        rotate(-80, 10);
      });
    }
  }
</script>

<style scoped>
  .bg {
    z-index: -1;
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
    transform: skew(10deg, 0deg);
    border-left: .5vw solid var(--color-background-mute);
    overflow: hidden;
  }

  .bg-champ > img {
    width: 130%;
    left: -15%;
    height: 100%;
    object-fit: cover;
    transform: skew(-10deg, 0deg);
  }

  .base {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .card-wrapper {
    max-width: 700px;
    width: 90%;
    height: 1000px;
    opacity: .8;
    margin-bottom: 10%;
  }

  .card-border {
    position: absolute;
    left: -1vw; top: -1vw;
    width: calc(100% + 2vw);
    height: calc(100% + 2vw);
    background: radial-gradient(#7e116c, #47879b, #7e116c);
    border-radius: 1.2vw;
    border: .35vw solid #7e116c73;
    background-size: 200% 200%;
    background-position: 0% 0%;
    animation: rotateCardBorder 5s linear infinite;
  }

  @keyframes rotateCardBorder {
    to {
      background-position: -200% -200%;
    }
  }

  .card {
    background: linear-gradient(to bottom right, rgba(0, 82, 76, .6), rgba(109, 206, 178, .6));
    border: .3vw solid #2a0624;
    border-radius: 1vw;
    height: 100%;
    width: 100%;
  }

  .pfp-wrapper {
    height: 100%;
    aspect-ratio: 1;
  }

  .pfp {
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .pfp > img {
    height: 100%;
    object-fit: contain;
  }

  .pfp-border {
    position: absolute;
    left: -5%; top: -5%;
    width: 110%;
    height: 110%;
    background: linear-gradient(#7e116c, #47879b);
    border-radius: 50%;
    outline: 1px solid rgba(10, 10, 10, .5);
    transform: rotate(0deg);
    animation: rotatePfp 1.5s infinite linear;
  }

  @keyframes rotatePfp {
    to {
      transform: rotate(360deg);
    }
  }

  .card-title {
    font-size: 16px;
    width: 100%;
    height: 250px;
    top: 0vw;
    margin-top: -5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    transition: height .1s, font-size .1s;
    margin-bottom: 4%;
    z-index: 5;
    padding: 0 4%;
    padding-bottom: 2%;
    padding-top: 7.5vw;
  }

  .card-title.is-pinned {
    height: 210px;
    font-size: 12px;
    backdrop-filter: blur(100px);
    border-bottom: .3vw solid #2a0624;
  }

  .card-title-name-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 3%;
  }

  .card-title-tag {
    color: var(--color-heading);
    font-family: 'Austere';
    font-size: 3em;
    line-height: 130%;
  }

  .card-title-name {
    color: var(--color-text);
    font-size: 1.5em;
    line-height: 130%;
    font-family: monospace;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 0 4%;
  }

  .bio {
    width: 100%;
    word-wrap: break-word;
    white-space: pre-line;
    font-size: 145%;
    color: var(--color-heading);
  }

  .roles {
    width: 100%;
    left: 0%;
    margin-top: 8%;
    transition: width .2s;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .roles-circle {
    position: absolute;
    z-index: 4;
    pointer-events: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    user-select: none;
  }

  .roles.in-sight .roles-circle {
    display: none;
  }

  .roles-circle span {
    width: 175%;
    height: 175%;
    top: -37.5%;
    left: -37.5%;
    transform-origin: center;
    position: absolute;
    text-align: center;
    font-size: 100%;
    font-weight: bold;
    transition: transform .2s;
  }

  .roles-title {
    font-size: 200%;
    width: 40%;
    margin-left: 3%;
    color: var(--color-heading);
  }

  .roles.in-sight > .roles-title {
    display: none;
  }

  .roles > img {
    width: 0%;
    object-fit: contain;
    border: 30px solid var(--gold);
    border-radius: 30px;
    transition: border-width .2s, width .2s;
    cursor: pointer;
  }

  .roles.in-sight > img {
    width: 100%;
    border-width: 6px;
    border-color: var(--color-background-mute)
  }

  .roles-logo {
    width: 100%;
    height: 100%;
    display: none;
    position: absolute;
    pointer-events: none;
  }

  .roles.in-sight > .roles-logo {
    display: unset;
  }

  .roles-logo-wrapper {
    width: 35px;
    position: absolute;
    filter: grayscale(100%);
  }

  .roles-logo-wrapper.active-role {
    filter: unset;
    transform: translateY(-10px)
  }

  .roles-logo-wrapper.active-role::after {
    bottom: -30px;
    background: var(--gold);
    width: 5px;
    height: 24px;
  }

  .roles-logo-wrapper.active-role > img {
    transform: scale(1.5);
  }

  .roles-logo-wrapper::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 20px;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-text);
  }

  .roles-logo-wrapper > img {
    width: 100%;
  }

  .roles-logo > .top {
    left: 29%;
    top: 13%;
  }
  .roles-logo > .jungle {
    left: 34%;
    top: 30%;
  }
  .roles-logo > .mid {
    left: 45%;
    top: 33%;
  }
  .roles-logo > .bot {
    left: 67%;
    top: 54%;
  }
  .roles-logo > .support {
    left: 56%;
    top: 45%;
  }
</style>