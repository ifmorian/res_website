<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="base">
    <div class="card">
      <div class="nav">
        <a href="#profile" class="nav-link">Profile</a>
        <a href="#games" class="nav-link">Games</a>
        <a href="#account" class="nav-link">Account</a>
        <a href="#settings" class="nav-link">Settings</a>
      </div>
      <div class="divider"></div>
      <main class="content">
        <div class="content-section">
        <div class="anchor" id="profile"></div>
          <div class="content-section-title">Profile</div>
          <div class="content-section-setting">
            <div class="content-section-setting-title">
              <span class="content-section-setting-title-icon material-symbols-outlined">swords</span>
              <div class="content-section-setting-title-title">Gamertag</div>
            </div>
            <div class="content-section-setting-data">
              <form class="content-section-setting-data-input" method="dialog">
                <div class="input-wrapper">
                  <input class="content-section-setting-data-input-input" type="text" name="gamertag" v-model="gamertag">
                  <div class="input-border"></div>
                </div>
                <input class="content-section-setting-data-input-submit" type="submit" value="confirm">
              </form>
              <div class="content-section-settting-data-error">{{ gamertagError }}</div>
            </div>
          </div>

          <div class="content-section-setting">
            <div class="content-section-setting-title">
              <span class="content-section-setting-title-icon material-symbols-outlined">speaker_notes</span>
              <div class="content-section-setting-title-title">Bio</div>
            </div>
            <div class="content-section-setting-data">
              <form class="content-section-setting-data-input" method="dialog">
                
                <div class="input-wrapper">
                  <textarea class="content-section-setting-data-input-input" maxlength="150" type="email" name="gamertag" v-model="bio"
                    @input="() => {
                      bioLength = bio.length;
                    }"
                  >
                  </textarea>
                  <div class="input-border"></div>
                </div>
                <input class="content-section-setting-data-input-submit" type="submit" value="confirm">
              </form>
              <div class="counter">{{ bioLength }}/150</div>
              <div class="content-section-settting-data-error">{{ bioError }}</div>
            </div>
          </div>
        </div>

        <div class="divider-hor"></div>

        <div class="content-section">
        <div class="anchor" id="games"></div>
          <div class="content-section-title">
            <span>Games</span>
            <div class="content-section-title-nav">
              <div class="content-section-title-nav-link"
                :class="{'active-setting': game === 'lol'}"
                @click="() => game = 'lol'"
              >
                <img src="../assets/images/icons/lol_icon.png" alt="lol" class="content-section-title-nav-link-img">
                <div>League of Legends</div>
              </div>
              <div class="content-section-title-nav-link"
                :class="{'active-setting': game === 'valo'}"
                @click="() => game = 'valo'"
              >
                <img src="../assets/images/icons/valo_icon.png" alt="lol" class="content-section-title-nav-link-img">
                <div>Valorant</div>
              </div>
            </div>
          </div>
          <div class="content-section-setting-multi"
            :style="{'margin-left': game === 'lol' ? '0' : '-100%'}"
          >
            <div class="content-section-setting-multi-wrapper"
              :class="{'active-multi': game === 'lol'}"
            >

              <div class="content-section-account">
                <div class="content-section-account-pb-wrapper">
                  <img :src="'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/' + accountLol.pb + '.jpg'" alt="" class="content-section-account-pb">
                  <div class="content-section-account-pb-level">{{ accountLol.level }}</div>
                </div>
                <div class="content-section-account-info">
                  <div class="content-section-account-info-name">{{ accountLol.name }}</div>
                  <div class="content-section-account-info-division">
                    <span>{{ accountLol.rank }}</span>
                    <img :src="'/src/assets/images/lol/ranks/' + accountLol.rankImage + '.png'" alt="">
                  </div>
                </div>
              </div>

              <div class="content-section-setting">
                <div class="content-section-setting-title">
                  <span class="content-section-setting-title-icon material-symbols-outlined">stadia_controller</span>
                  <div class="content-section-setting-title-title">Account</div>
                </div>
                <div class="content-section-setting-data">
                  <form class="content-section-setting-data-input" method="dialog">
                    <div class="input-wrapper">
                      <input class="content-section-setting-data-input-input" type="text" name="gamertag" v-model="gamertag">
                      <div class="input-border"></div>
                    </div>
                    <input class="content-section-setting-data-input-submit" type="submit" value="confirm">
                  </form>
                  <div class="content-section-settting-data-error">{{ gamertagError }}</div>
                </div>
              </div>
            </div>
            <div class="content-section-setting-multi-wrapper"
              :class="{'active-multi': game === 'valo'}"
            >
              <div class="content-section-setting">
                <div class="content-section-setting-title">
                  <span class="content-section-setting-title-icon material-symbols-outlined">stadia_controller</span>
                  <div class="content-section-setting-title-title">Account</div>
                </div>
                <div class="content-section-setting-data">
                  <form class="content-section-setting-data-input" method="dialog">
                    <div class="input-wrapper">
                      <input class="content-section-setting-data-input-input" type="text" name="gamertag" v-model="gamertag">
                      <div class="input-border"></div>
                    </div>
                    <input class="content-section-setting-data-input-submit" type="submit" value="confirm">
                  </form>
                  <div class="content-section-settting-data-error">{{ gamertagError }}</div>
                </div>
              </div>

              <div class="content-section-setting">
                <div class="content-section-setting-title">
                  <span class="content-section-setting-title-icon material-symbols-outlined">speaker_notes</span>
                  <div class="content-section-setting-title-title">Bio</div>
                </div>
                <div class="content-section-setting-data">
                  <form class="content-section-setting-data-input" method="dialog">
                    <textarea class="content-section-setting-data-input-input" maxlength="150" type="email" name="gamertag" v-model="bio"
                      @input="() => {
                        bioLength = bio.length;
                      }"
                    >
                    </textarea>
                    <input class="content-section-setting-data-input-submit" type="submit" value="confirm">
                  </form>
                  <div class="counter">{{ bioLength }}/150</div>
                  <div class="content-section-settting-data-error">{{ bioError }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        accountLol: {
          name: 'No Account registered',
          rank: 'Unranked',
          rankImage: 'unranked',
          level: 0,
          pb: 29,
        },
        gamertag: '',
        gamertagError: '',
        bio: '',
        bioError: '',
        bioLength: 0,
        game: 'lol',
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .card {
    width: 70%;
    height: 100%;
    padding-top: 4%;
    background: var(--color-background-mute);

    display: flex;
    flex-direction: row;

    height: 200vh;

    opacity: .8;
    margin-bottom: 10%;
  }

  .nav {
    position: sticky;
    align-self: flex-start;
    top: 9vw;
    width: 20%;
    display: flex;
    flex-direction: column;
    margin-left: 8%;
    margin-bottom: 2vw;
    font-size: 2vw;
    font-weight: bold;
  }

  .nav-link {
    margin-bottom: 2.5vw;
  }

  .divider {
    position: sticky;
    align-self: flex-start;
    top: 9vw;
    width: .1%;
    height: 20vw;
    background: var(--color-text);
    margin-bottom: 4.5vw;
  }

  .divider-hor {
    align-self: center;
    width: 110%;
    height: .1vw;
    background: var(--color-text);
  }

  .content {
    position: relative;
    width: 55%;
    margin-left: 8%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .content-section {
    margin-top: 5%;
    margin-bottom: 20%;
  }

  .content-section-title {
    font-size: 1.7vw;
    margin-bottom: 12%;
  }

  .content-section-title-nav {
    display: flex;
    flex-direction: row;
  }

  .content-section-title-nav-link {
    border-radius: 8px;
    font-size: 30px;
    cursor: pointer;
    background: var(--color-background-soft);
    border: 1px solid transparent;
    margin-right: 2%;
    margin-top: 3%;
    display: inline-flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    transition: background-color .3s;
  }

  .content-section-title-nav-link div {
    white-space: nowrap;
    font-size: 70%;
  }

  .content-section-title-nav-link-img {
    display: block;
    height: 60%;
    object-fit: contain;
    margin-right: 10px;
  }

  .content-section-title-nav-link:hover {
    background-color: var(--color-background);
    transition: background-color .15s;
  }

  .active-setting {
    background-color: var(--color-background);
    border-color: var(--color-text);
  }

  .content-section-setting {
    display: flex;
    flex-direction: column;
    margin-bottom: 6%;
  }

  .content-section-setting-multi {
    display: flex;
    width: 200%;
    transition: margin .4s;
  }

  .content-section-setting-multi-wrapper {
    width: 50%;
    visibility: hidden;
    opacity: 0;
    transition: visibility .2s, opacity .2s;
  }

  .active-multi {
    visibility: visible;
    opacity: 1;
  }

  .content-section-setting-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.5%;
  }

  .content-section-setting-title-icon {
    margin-right: 1%;
    font-size: 130%;
    align-self: flex-end;
  }

  .content-section-setting-title-title {
    font-size: 140%;
    line-height: 110%;
  }

  .content-section-setting-data {
    display: flex;
    flex-direction: column;
  }

  .content-section-setting-data-input {
    display: flex;
    justify-content: space-between;
    width: 70%;
  }

  .input-wrapper {
    width: 75%;
    height: fit-content;
    margin-right: 5%;
  }

  .input-border {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, rgb(4, 244, 176), rgb(48, 144, 227), rgb(4, 244, 176));
    background-size: 200%;
    background-position: 0%;
    border-radius: 10px;
    z-index: 1;
    transform: scaleY(0) scaleX(0);
    transition: transform .2s;
    opacity: .3;
    animation: inputBackground 6s infinite linear;
  }

  @keyframes inputBackground {
    to {
      background-position: 200%;
    }
  }

  .content-section-setting-data-input-input {
    z-index: 3;
    width: 100%;
    height: 36px;

    background: transparent;
    outline: none;
    color:  var(--color-text);
    border: 1px solid;
    border-radius: 10px;
    font-size: 18px;
    padding: 0% 2%;

    transition: border-width .1s;
  }

  .content-section-setting-data-input-input:focus ~ .input-border {
    transform: scaleY(1) scaleX(1);
  }

  .content-section-setting-data-input-input:focus {
    border-width: 2px;
  }

  .content-section-setting-data-input textarea {
    height: 145px;
    padding-top: 1%;
  }

  .content-section-setting-data-input-submit {
    width: 20%;
    height: 36px;
    font-size: 15px;
    background: transparent;
    color: var(--color-text);
    border-radius: 10px;
    border: 2px solid var(--secondary);
    cursor: pointer;
    transition: background-color .15s;
  }

  .content-section-setting-data-input-submit:hover {
    background: rgba(10, 10, 10, .2);
  }

  .content-section-settting-data-error {
    position: absolute;
    bottom: -20px;
    left: 0;
    color: var(--error);
  }

  .content-section-account {
    display: flex;
    flex-direction: row;
    width: 20vw;
    height: 6.5vw;
    margin-bottom: 3%;
  }

  .content-section-account-pb-wrapper {
    height: 80%;
    margin-right: 5%;
    align-self: center;
    border-radius: 19%;
    border: .25vw solid var(--color-background);
  }

  .content-section-account-pb {
    height: 100%;
    object-fit: contain;
    border-radius: 19%;
  }

  .content-section-account-pb-level {
    position: absolute;
    bottom: -.5vw;
    left: 50%;
    transform: translateX(-50%);
    width: 45%;
    height: 1vw;
    line-height: .9vw;
    text-align: center;
    background: var(--color-background);
    font-size: .8vw;
    border-radius: .6vw;
  }

  .content-section-account-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .content-section-account-info-name {
    font-size: 1.5vw;
    font-weight: bold;
  }

  .content-section-account-info-division {
    display: flex;
    flex-direction: row;
    height: 40%;
  }

  .content-section-account-info-division span {
    font-size: 1.3vw;
    margin-right: 2%;
  }

  .content-section-account-info-division img {
    height: 80%;
    object-fit: contain;
  }

  .anchor {
    position: absolute;
    visibility: hidden;
    top: -8vw;
    left: 0;
  }
</style>