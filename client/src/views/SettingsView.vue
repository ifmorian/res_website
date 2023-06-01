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
                <input class="content-section-setting-data-input-input" type="text" name="gamertag" v-model="gamertag">
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

        <div class="divider-hor"></div>

        <div class="content-section">
        <div class="anchor" id="games"></div>
          <div class="content-section-title">
            <span>Games</span>
            <div class="content-section-title-nav">
              <div class="content-section-title-nav-link">
                <img src="../assets/images/icons/lol_icon.png" alt="lol" class="content-section-title-nav-link-img">
                <span>League of Legends</span>
              </div>
              <div class="content-section-title-nav-link">
                <img src="../assets/images/icons/lol_icon.png" alt="lol" class="content-section-title-nav-link-img">
              </div>
            </div>
          </div>
          <div class="content-section-setting">
            <div class="content-section-setting-title">
              <span class="content-section-setting-title-icon material-symbols-outlined">swords</span>
              <div class="content-section-setting-title-title">Gamertag</div>
            </div>
            <div class="content-section-setting-data">
              <form class="content-section-setting-data-input" method="dialog">
                <input class="content-section-setting-data-input-input" type="text" name="gamertag" v-model="gamertag">
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
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        gamertag: '',
        gamertagError: '',
        bio: '',
        bioError: '',
        bioLength: 0,
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
  }

  .content-section {
    margin-top: 5%;
    margin-bottom: 20%; 
  }

  .content-section-title {
    font-size: 200%;
    margin-bottom: 12%;
  }

  .content-section-title-nav {
    height: 40px;
    width: fit-content;
    display: flex;
    flex-direction: row;
  }

  .content-section-title-nav-link {
    /* width: fit-content; */
    border-radius: 8px;
    font-size: 60%;
    cursor: pointer;
    background: var(--color-background);
    margin-right: 5%;
    display: flex;
    align-items: center;
  }

  /* .content-section-title-nav-link span {
    width: fit-content;
  } */

  .content-section-title-nav-link-img {
    object-fit: contain;
    height: 70%;
    width: 10%;
    margin-left: 5%;
    margin-right: 5%;
  }

  .content-section-setting {
    display: flex;
    flex-direction: column;
    margin-bottom: 6%;
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
  }

  .content-section-setting-title-title {
    font-size: 140%;
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

  .content-section-setting-data-input-input {
    width: 75%;
    height: 36px;
    margin-right: 5%;

    background: transparent;
    outline: none;
    color:  var(--color-text);
    border: 1px solid;
    border-radius: 10px;
    font-size: 18px;
    padding: 0% 2%;

    transition: background-color .15s;
  }

  .content-section-setting-data-input textarea {
    height: 145px;
    padding-top: 1%;
  }

  .content-section-setting-data-input-input:focus {
    background: rgba(10, 10, 10, .2);
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
  }

  .content-section-settting-data-error {
    position: absolute;
    bottom: -20px;
    left: 0;
    color: var(--error);
  }

  .anchor {
    position: absolute;
    visibility: hidden;
    top: -8vw;
    left: 0;
  }
</style>