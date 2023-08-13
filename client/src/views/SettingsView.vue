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
                  <input class="content-section-setting-data-input-input" type="text" name="gamertag" v-model="profile.gamertag.value">
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                </div>
                <div class="submit-wrapper">
                  <input class="content-section-setting-data-input-submit" type="submit" :value="profile.gamertag.loading ? '' : 'update'" @click="() => updateGamertag()">
                  <svg v-if="profile.gamertag.loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading">
                    <circle cx="1" cy="1" r=".85" />
                  </svg>
                </div>
              </form>
              <div class="content-section-settting-data-error">{{ profile.gamertag.error }}</div>
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
                  <textarea class="content-section-setting-data-input-input" maxlength="150" type="email" v-model="profile.bio.value"
                    @input="() => {
                      profile.bio.length = profile.bio.value.length;
                    }"
                  >
                  </textarea>
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                </div>
                <div class="submit-wrapper">
                  <input class="content-section-setting-data-input-submit" type="submit" :value="profile.bio.loading ? '' : 'update'" @click="() => updateBio()">
                  <svg v-if="profile.bio.loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading">
                    <circle cx="1" cy="1" r=".85" />
                  </svg>
                </div>
              </form>
              <div class="counter">{{ profile.bio.length }}/150</div>
              <div class="content-section-settting-data-error">{{ profile.bio.error }}</div>
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
                <div class="input-background input-background-nonfocus content-section-acocunt-background"
                  :style="{backgroundImage: 'url(http://localhost:3000/lol/pfp/' + accountLol.pb + '.png)'}"
                ></div>
                <div class="content-section-account-pb-wrapper">
                  <img :src="'http://localhost:3000/lol/pfp/' + accountLol.pb + '.png'" alt="" class="content-section-account-pb">
                  <div class="content-section-account-pb-level">{{ accountLol.level }}</div>
                </div>
                <div class="content-section-account-info">
                  <div class="content-section-account-info-name">{{ accountLol.name }}</div>
                  <div class="content-section-account-info-division">
                    <span style="text-transform: capitalize;">{{ accountLol.rank }}</span>
                    <span>{{ accountLol.tier }}</span>
                    <img :src="'/src/assets/images/lol/ranks/' + accountLol.rank + '.png'" alt="">
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
                      <input class="content-section-setting-data-input-input" type="text" name="lolAccount" v-model="lolAccount.value">
                      <div class="input-border"></div>
                      <div class="input-background"></div>
                    </div>
                    <div class="submit-wrapper">
                      <input class="content-section-setting-data-input-submit" type="submit" :value="lolAccount.loading ? '' : 'update'" @click="() => updateLolAccount()">
                      <svg v-if="lolAccount.loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading">
                        <circle cx="1" cy="1" r=".85" />
                      </svg>
                    </div>
                  </form>
                  <div class="content-section-settting-data-error">{{ lolAccount.error }}</div>
                </div>
              </div>

              <div class="content-section-setting">
                <div class="content-section-setting-title select-title">
                  <span class="content-section-setting-title-icon material-symbols-outlined">favorite</span>
                  <div class="content-section-setting-title-title">Main Roles</div>
                </div>
                <div class="content-section-setting-multiselect">
                  <div class="content-section-setting-multiselect-option" :class="{'multiselect-option-active': roles.value[0]}" @click="roles.value[0] = !roles.value[0]">
                    <img src="../assets/images/lol/roles/top.png" alt="" class="role">
                  </div>
                  <div class="content-section-setting-multiselect-option" :class="{'multiselect-option-active': roles.value[1]}" @click="roles.value[1] = !roles.value[1]">
                    <img src="../assets/images/lol/roles/jungle.png" alt="" class="role">
                  </div>
                  <div class="content-section-setting-multiselect-option" :class="{'multiselect-option-active': roles.value[2]}" @click="roles.value[2] = !roles.value[2]">
                    <img src="../assets/images/lol/roles/mid.png" alt="" class="role">
                  </div>
                  <div class="content-section-setting-multiselect-option" :class="{'multiselect-option-active': roles.value[3]}" @click="roles.value[3] = !roles.value[3]">
                    <img src="../assets/images/lol/roles/bot.png" alt="" class="role">
                  </div>
                  <div class="content-section-setting-multiselect-option" :class="{'multiselect-option-active': roles.value[4]}" @click="roles.value[4] = !roles.value[4]">
                    <img src="../assets/images/lol/roles/support.png" alt="" class="role">
                  </div>
                </div>
                <div class="submit-wrapper multiselect-submit-wrapper">
                  <input class="content-section-setting-data-input-submit" type="submit" :value="roles.loading ? '' : 'save'" @click="() => updateRole()">
                  <svg v-if="roles.loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading">
                    <circle cx="1" cy="1" r=".85" />
                  </svg>
                </div>
                <div class="content-section-settting-data-error">{{ roles.error }}</div>
              </div>

              <div class="content-section-setting">
                <div class="content-section-setting-title select-title">
                  <span class="content-section-setting-title-icon material-symbols-outlined">stadia_controller</span>
                  <div class="content-section-setting-title-title">Main Champions</div>
                </div>
                <div class="content-section-setting-data">
                  <form class="content-section-setting-data-input multiform" method="dialog">
                    <div class="input-wrapper">
                      <input class="content-section-setting-data-input-input" type="text" name="mainchamp0" v-model="mainChamps[0].value"
                        @blur="() => resetMainChamp(0)"
                      >
                      <div class="input-border"></div>
                      <div class="input-background input-background-champion" 
                        :style="{
                          backgroundImage: 'url(http://localhost:3000/lol/champion/' + mainChamps[0].key + '.png)',
                          animation: 'none',
                          backgroundSize: '100%'
                        }"
                      ></div>
                      <svg v-if="mainChamps[0].loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading input-loading">
                        <circle cx="1" cy="1" r=".85" />
                      </svg>
                      <span class="material-symbols-outlined input-done" v-if="!mainChamps[0].loading && mainChamps[0].key" @click="() => removeMainChamp(0)">done</span>
                      <span class="material-symbols-outlined input-done input-done-close" v-if="!mainChamps[0].loading && mainChamps[0].key">close</span>
                      <div class="champion-dropdown-wrapper" v-if="mainChamps[0].value !== ''" >
                        <div class="champion-dropdown" v-for="(value, key) in championList" :key="key">
                          <div class="champion-dropdown-option" v-if="value.name.toLowerCase().includes(mainChamps[0].value.toLowerCase())"
                            @mousedown="() => {
                              //@ts-ignore
                              addMainChamp(value.name, value.key, 0)
                            }"
                          >{{ value.name }}</div>
                        </div>
                      </div>
                      <div class="content-section-settting-data-error">{{ mainChamps[0].error }}</div>
                    </div>
                    <div class="input-wrapper">
                      <input class="content-section-setting-data-input-input" type="text" name="mainchamp0" v-model="mainChamps[1].value"
                        @blur="() => resetMainChamp(1)"
                      >
                      <div class="input-border"></div>
                      <div class="input-background input-background-champion" 
                        :style="{
                          backgroundImage: 'url(http://localhost:3000/lol/champion/' + mainChamps[1].key + '.png)',
                          animation: 'none',
                          backgroundSize: '100%'
                        }"
                      ></div>
                      <svg v-if="mainChamps[1].loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading input-loading">
                        <circle cx="1" cy="1" r=".85" />
                      </svg>
                      <span class="material-symbols-outlined input-done" v-if="!mainChamps[1].loading && mainChamps[1].key" @click="() => removeMainChamp(1)">done</span>
                      <span class="material-symbols-outlined input-done input-done-close" v-if="!mainChamps[0].loading && mainChamps[1].key">close</span>
                      <div class="champion-dropdown-wrapper" v-if="mainChamps[1].value !== ''" >
                        <div class="champion-dropdown" v-for="(value, key) in championList" :key="key">
                          <div class="champion-dropdown-option" v-if="value.name.toLowerCase().includes(mainChamps[1].value.toLowerCase())"
                            @mousedown="() => {
                              //@ts-ignore
                              addMainChamp(value.name, value.key, 1)
                            }"
                          >{{ value.name }}</div>
                        </div>
                      </div>
                      <div class="content-section-settting-data-error">{{ mainChamps[1].error }}</div>
                    </div>
                    <div class="input-wrapper">
                      <input class="content-section-setting-data-input-input" type="text" name="mainchamp0" v-model="mainChamps[2].value"
                        @blur="() => resetMainChamp(2)"
                      >
                      <div class="input-border"></div>
                      <div class="input-background input-background-champion" 
                        :style="{
                          backgroundImage: 'url(http://localhost:3000/lol/champion/' + mainChamps[2].key + '.png)',
                          animation: 'none',
                          backgroundSize: '100%'
                        }"
                      ></div>
                      <svg v-if="mainChamps[2].loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading input-loading">
                        <circle cx="1" cy="1" r=".85" />
                      </svg>
                      <span class="material-symbols-outlined input-done" v-if="!mainChamps[2].loading && mainChamps[2].key" @click="() => removeMainChamp(2)">done</span>
                      <span class="material-symbols-outlined input-done input-done-close" v-if="!mainChamps[0].loading && mainChamps[2].key">close</span>
                      <div class="champion-dropdown-wrapper" v-if="mainChamps[2].value !== ''" >
                        <div class="champion-dropdown" v-for="(value, key) in championList" :key="key">
                          <div class="champion-dropdown-option" v-if="value.name.toLowerCase().includes(mainChamps[2].value.toLowerCase())"
                            @mousedown="() => {
                              //@ts-ignore
                              addMainChamp(value.name, value.key, 2)
                            }"
                          >{{ value.name }}</div>
                        </div>
                      </div>
                      <div class="content-section-settting-data-error">{{ mainChamps[2].error }}</div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
            <div class="content-section-setting-multi-wrapper"
              :class="{'active-multi': game === 'valo'}"
            >
            </div>
          </div>
        </div>

        <div class="divider-hor"></div>
          
        <div class="content-section">
          <div class="anchor" id="account"></div>
          <div class="content-section-title">Account</div>

          <div class="content-section-setting">
            <div class="content-section-setting-title">
              <span class="content-section-setting-title-icon material-symbols-outlined">person</span>
              <div class="content-section-setting-title-title">Username</div>
            </div>
            <div class="content-section-setting-data">
              <form class="content-section-setting-data-input" method="dialog">
                <div class="input-wrapper">
                  <input disabled class="content-section-setting-data-input-input" type="text" name="username" v-model="profile.username.value">
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                </div>
              </form>
            </div>
          </div>

          <div class="content-section-setting">
            <div class="content-section-setting-title">
              <span class="content-section-setting-title-icon material-symbols-outlined">email</span>
              <div class="content-section-setting-title-title">Email</div>
            </div>
            <div class="content-section-setting-data">
              <form class="content-section-setting-data-input" method="dialog">
                <div class="input-wrapper">
                  <input class="content-section-setting-data-input-input" type="text" name="email" v-model="profile.email.value">
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                </div>
                <div class="submit-wrapper">
                  <input class="content-section-setting-data-input-submit" type="submit" :value="profile.email.loading ? '' : 'update'" @click="() => updateEmail()">
                  <svg v-if="profile.email.loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading">
                    <circle cx="1" cy="1" r=".85" />
                  </svg>
                </div>
              </form>
              <div class="content-section-settting-data-error">{{ profile.email.error }}</div>
            </div>
          </div>

          <div class="content-section-setting">
            <div class="content-section-setting-title">
              <span class="content-section-setting-title-icon material-symbols-outlined">lock</span>
              <div class="content-section-setting-title-title">Change Password</div>
            </div>
            <div class="content-section-setting-data">
              <form class="content-section-setting-data-input multiform-col" method="dialog" style="flex-direction: column;">
                <div class="input-wrapper" style="margin-bottom: 10%;">
                  <input class="content-section-setting-data-input-input" type="password" name="passwordOld" v-model="profile.password.old.value" placeholder="old password">
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                  <div class="content-section-settting-data-error">{{ profile.password.old.error }}</div>
                </div>
                <div class="input-wrapper">
                  <input class="content-section-setting-data-input-input" type="password" name="passwordNew" v-model="profile.password.new.value" placeholder="new password">
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                  <div class="content-section-settting-data-error">{{ profile.password.new.error }}</div>
                </div>
                <div class="input-wrapper">
                  <input class="content-section-setting-data-input-input" type="password" name="passwordRepeat" v-model="profile.password.repeat.value" placeholder="repeat password">
                  <div class="input-background"></div>
                  <div class="input-border"></div>
                  <div class="content-section-settting-data-error">{{ profile.password.repeat.error }}</div>
                </div>
                <div class="submit-wrapper">
                  <input class="content-section-setting-data-input-submit" type="submit" :value="profile.password.loading ? '' : 'update'" @click="() => updatePassword()">
                  <svg v-if="profile.password.loading" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="loading">
                    <circle cx="1" cy="1" r=".85" />
                  </svg>
                </div>
              </form>
              <div class="content-section-settting-data-error">{{ profile.password.error }}</div>
            </div>
          </div>
            
        </div>

      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import router from '@/router';
  import AccountService from '@/services/AccountService';
  import AuthenticationService from '@/services/AuthenticationService';
  import store from '@/store';
  import type { AxiosResponse } from 'axios';

  export default {
    data() {
      return {
        profile: {
          gamertag: { value: '', error: '', loading: false },
          bio: { value: '', error: '', length: 0, loading: false },
          email: { value: '', error: '', loading: false },
          username: { value: '' },
          password: {
            old: {
              value: '',
              error: '',
            },
            new: {
              value: '',
              error: '',
            },
            repeat: {
              value: '',
              error: '',
            },
            error: '',
            loading: false 
          },
        },
        accountLol: {
          name: 'No Account registered',
          rank: 'Unranked',
          tier: '',
          level: '0',
          pb: 29,
        },
        roles: {
          value: [false, false, false, false, false],
          error: '',
          loading: false
        },
        championList: new Object(),
        game: 'lol',
        lolAccount: {
          value: '',
          error: '',
          loading: false
        },
        mainChamps: [ {value: '', error: '', loading: false, key: ''}, {value: '', error: '', loading: false, key: ''}, {value: '', error: '', loading: false, key: ''} ]
      }
    },
    created() {
      AccountService.getChampionList().then((res: AxiosResponse) => {
        this.championList = res.data.list;
        AccountService.getMainChamps().then(async (res: AxiosResponse) => {
          res.data.champions.forEach((champ: any) => {
            this.mainChamps[champ.number as number].key = champ.champion;
            this.resetMainChamp(champ.number as number);
          });
        }).catch(() => this.dataLoadingError());
      }).catch(() => this.dataLoadingError());
      AccountService.getLolAccount().then((res: AxiosResponse) => {
        if (res.data.errorCode) return;
        this.accountLol.name = res.data.name;
        this.lolAccount.value = res.data.name;
        this.accountLol.rank = res.data.division;
        this.accountLol.tier = res.data.tier;
        this.accountLol.level = res.data.level;
        this.accountLol.pb = res.data.pfpId;
      }).catch(() => this.dataLoadingError());
      AuthenticationService.getUserData().then((res: AxiosResponse) => {
        if (res.data.errorCode !== 1) return this.dataLoadingError();
        this.profile.gamertag.value = res.data.gamertag;
        this.profile.bio.value = res.data.bio;
        this.profile.email.value = res.data.email;
        this.profile.username.value = res.data.username;
      }).catch(() => this.dataLoadingError());
      AccountService.getLolRole().then((res: AxiosResponse) => {
        if (res.data.errorCode !== 1) return this.dataLoadingError();
        this.roles.value[0] = res.data.role % 2 == 0;
        this.roles.value[1] = res.data.role % 3 == 0;
        this.roles.value[2] = res.data.role % 5 == 0;
        this.roles.value[3] = res.data.role % 7 == 0;
        this.roles.value[4] = res.data.role % 11 == 0;
      }).catch(() => this.dataLoadingError());
    },
    mounted() {
      let navLinks = document.querySelectorAll('.nav-link');
      let sections = document.querySelectorAll('.content-section');
      document.addEventListener('scroll', () => {
        let current = 0;
        sections.forEach((el, key) => {
          if ((el as HTMLDivElement).offsetTop - 200 < window.scrollY) current = key;
        });
        navLinks.forEach((el, key) => {
          if (key === current) return el.classList.add('nav-current');
          el.classList.remove('nav-current');
        })
      });
    },
    methods: {
      notLoggedIn() {
        store.notification.value.message = 'You must be logged in!'
        store.notification.value.success = false;
        store.notification.value.notificate = !store.notification.value.notificate;
        router.push('/login');
      },
      dataLoadingError() {
        store.notification.value.message = 'Could not load data.'
        store.notification.value.success = false;
        store.notification.value.notificate = !store.notification.value.notificate;
      },
      updateGamertag() {
        if (this.profile.gamertag.loading) return;
        this.profile.gamertag.loading = true;
        this.profile.gamertag.error = '';
        AuthenticationService.setGamertag(this.profile.gamertag.value).then((res: AxiosResponse) => {
          if (res.data.errorCode === 3) return this.notLoggedIn();
          if (res.data.errorCode === 2) {
            this.profile.gamertag.loading = false;
            return this.profile.gamertag.error = 'Can\'t be emtpy.';
          }
          store.notification.value.message = 'Gamertag updated!';
          store.notification.value.success = true;
          store.notification.value.notificate = !store.notification.value.notificate;
          this.profile.gamertag.loading = false;
        }).catch(() => {
          this.profile.gamertag.error = 'Something went wrong.';
          this.profile.gamertag.loading = false;
        });
      },
      updateBio() {
        if (this.profile.bio.loading) return;
        this.profile.bio.loading = true;
        this.profile.bio.error = '';
        AuthenticationService.setBio(this.profile.bio.value).then((res: AxiosResponse) => {
          if (res.data.errorCode === 2) return this.notLoggedIn();
          store.notification.value.message = 'Bio updated!';
          store.notification.value.success = true;
          store.notification.value.notificate = !store.notification.value.notificate;
          this.profile.bio.loading = false;
        }).catch(() => {
          this.profile.bio.error = 'Something went wrong.';
          this.profile.bio.loading = false;
        });
      },
      updateEmail() {
        if (this.profile.email.loading) return;
        this.profile.email.loading = true;
        this.profile.email.error = '';
        AuthenticationService.setEmail(this.profile.email.value).then((res: AxiosResponse) => {
          if (res.data.errorCode === 2) return this.notLoggedIn();
          else if (res.data.errorCode === 4) this.profile.email.error = 'Enter a valid email.';
          else if (res.data.errorCode === 5) this.profile.email.error = 'Email already registered.';
          else {
          store.notification.value.message = 'Email updated!';
          store.notification.value.success = true;
          store.notification.value.notificate = !store.notification.value.notificate;
          }
          this.profile.email.loading = false;
        }).catch(() => {
          this.profile.email.error = 'Something went wrong.';
          this.profile.email.loading = false;
        });
      },
      updatePassword() {
        if (this.profile.password.loading) return;
        this.profile.password.loading = true;
        this.profile.password.error = '';
        this.profile.password.old.error = '';
        this.profile.password.new.error = '';
        this.profile.password.repeat.error = '';
        AuthenticationService.setPassword(
          this.profile.password.old.value,
          this.profile.password.new.value,
          this.profile.password.repeat.value
        ).then((res: AxiosResponse) => {
          console.log(res.data.errorCode % 5 === 0)
          if (res.data.errorCode === 0) return this.notLoggedIn();
          if (res.data.errorCode % 2 === 0) this.profile.password.old.error = 'Can\'t be emtpy.';
          else if (res.data.errorCode % 11 === 0) this.profile.password.old.error = 'Wrong password.';
          if (res.data.errorCode % 3 === 0) this.profile.password.new.error = 'Can\'t be emtpy.';
          if (res.data.errorCode % 5 === 0) this.profile.password.new.error = 'Must be at least 8 characters.';
          if (res.data.errorCode % 7 === 0) this.profile.password.repeat.error = 'Passwords do not match.';
          if (res.data.errorCode === 1) {
            store.notification.value.message = 'Password updated!';
            store.notification.value.success = true;
            store.notification.value.notificate = !store.notification.value.notificate;
          }
          this.profile.password.loading = false;
        }).catch(() => {
          this.profile.password.error = 'Something went wrong.';
          this.profile.password.loading = false;
        });
      },
      updateLolAccount() {
        if (this.lolAccount.loading) return;
        this.lolAccount.loading = true;
        this.lolAccount.error = '';
        AccountService.updateLolAccount({account: this.lolAccount.value}).then((res: AxiosResponse) => {
        this.lolAccount.loading = false;
          if (res.data.errorCode === 1) {
            this.accountLol.name = res.data.data.name;
            this.accountLol.rank = res.data.data.division;
            this.accountLol.tier = res.data.data.tier;
            this.accountLol.level = res.data.data.level;
            this.accountLol.pb = res.data.data.pfpId;
            if (this.accountLol.tier === '1') this.accountLol.tier = 'I';
            else if (this.accountLol.tier === '2') this.accountLol.tier = 'II';
            else if (this.accountLol.tier === '3') this.accountLol.tier = 'III';
            else if (this.accountLol.tier === '4') this.accountLol.tier = 'IV';
            return;
          }
          if (res.data.errorCode === 2) {
            return this.notLoggedIn();
          }
          else if (res.data.errorCode === 3) {
            this.lolAccount.error = 'Can\'t be empty.'
          }
          else if (res.data.errorCode === 4) {
            this.lolAccount.error = 'Account doesn\'t exist.'
          }
          else if (res.data.errorCode === 5) {
            this.lolAccount.error = 'Couldn\'t cache profilepicture.'
          }
        }).catch(() => {
          this.lolAccount.error = 'Something went wrong.'
          this.lolAccount.loading = false;
        });
      },
      async resetMainChamp(index: number) {
        setTimeout(() => {
          //@ts-ignore
          const champion = Object.entries(this.championList).find((el: any) => el[1].key === this.mainChamps[index].key);
          if (!champion) return this.mainChamps[index].value = '';
          this.mainChamps[index].value = champion[1].name;
        }, 20);
      },

      addMainChamp(name: string, key: string, number: number) {
        if (this.mainChamps[number].loading) return;
        this.mainChamps[number].error = '';
        this.mainChamps[number].loading = true;
        AccountService.addMainChamp(key, number.toString()).then((res: AxiosResponse) => {
          if (res.data.errorCode === 2) {
            return this.notLoggedIn();
          } else if (res.data.errorCode === 3) {
            this.mainChamps[number].error = 'Caching error';
          }
          this.mainChamps[number].loading = false;
          this.mainChamps[number].key = key;
          this.mainChamps[number].value = name;
        }).catch(() => {
          this.mainChamps[number].loading = false;
          this.mainChamps[number].error = 'Something went wrong.'
        });
      },
      removeMainChamp(number: number) {
        if (this.mainChamps[number].loading) return;
        this.mainChamps[number].error = '';
        this.mainChamps[number].loading = true;
        AccountService.removeMainChamp(number.toString()).then(() => {
          this.mainChamps[number].key = '';
          this.resetMainChamp(number);
          this.mainChamps[number].loading = false;
        }).catch(() => {
          this.mainChamps[number].error = 'Something went wrong.';
          this.mainChamps[number].loading = false;
        })
      },
      updateRole() {
        this.roles.loading = true;
        let role = 1;
        if (this.roles.value[0]) role *= 2;
        if (this.roles.value[1]) role *= 3;
        if (this.roles.value[2]) role *= 5;
        if (this.roles.value[3]) role *= 7;
        if (this.roles.value[4]) role *= 11;
        AccountService.updateLolRole(role).then(() => {
          this.roles.loading = false;
        }).catch(() => {
          this.roles.error = 'Something went wrong.'
          this.roles.loading = false;
        })
      }
    },
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

  .nav-current {
    color: var(--primary);
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
    width: 90%;
    height: .1vw;
    background: var(--color-text);
    margin-bottom: 5%;
    margin-left: -5%;
    z-index: 5;
  }

  .content {
    position: relative;
    width: 55%;
    margin-left: 8%;
    /* display: flex; */
    flex-direction: column;
  }

  .content-section {
    margin-top: 5%;
    margin-bottom: 20%;
    overflow: hidden;
  }

  .content-section-title {
    font-size: 2.5rem;
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
    height: 55px;
    padding: 0 15px;
    transition: background-color .3s;
  }

  .content-section-title-nav-link div {
    white-space: nowrap;
    font-size: 1.4rem;
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
    margin-bottom: 10%;
    width: 70%;
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

  .select-title {
    margin-bottom: 4%;
  }

  .content-section-setting-title-icon {
    margin-right: 1%;
    font-size: 1.45rem;
    align-self: flex-end;
  }

  .content-section-setting-title-title {
    font-size: 1.7rem;
    line-height: 110%;
  }

  .content-section-setting-data {
    display: flex;
    flex-direction: column;
  }

  .content-section-setting-data-input {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .multiform {
    margin-bottom: 2%;
  }

  .input-wrapper {
    width: 75%;
    height: fit-content;
    margin-right: 5%;
  }

  .multiform .input-wrapper {
    width: 30%;
    margin-right: 0;
  }

  .multiform-col .input-wrapper {
    margin-bottom: 5%;
  }

  .input-background {
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

  .input-background-champion {
    transform: scaleY(1) scaleX(1);
    background-size: 100%;
    background-position: 0% 50%;
    animation: none;
  }

  .input-background-nonfocus {
    transform: scaleY(1) scaleX(1);
  }

  @keyframes inputBackground {
    to {
      background-position: 200%;
    }
  }

  .input-border {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    border: 1px solid var(--color-text);
    transition: border .1s;
  }

  .content-section-setting-data-input-input {
    z-index: 3;
    width: 100%;
    height: 2.8rem;

    background: transparent;
    background-size: 100%;
    background-position: 0% 50%;
    outline: none;
    color:  var(--color-text);
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    padding: 0% 10px;
  }

  .content-section-setting-data-input-input:disabled {
    opacity: .6;
  }

  .content-section-setting-data-input-input:disabled ~ .input-background {
    background: var(--color-background-soft);
    transform: scaleY(.9) scaleX(.99);
    opacity: 1;
  }

  .content-section-setting-data-input-input:focus ~ .input-background {
    transform: scaleY(1) scaleX(1);
  }

  .content-section-setting-data-input-input:focus ~ .input-border {
    border-width: 2.5px;
  }

  .content-section-setting-data-input textarea {
    height: 120px;
    padding-top: 2%;
    font-size: 1.3rem;
  }

  .submit-wrapper {
    width: 20%;
    height: 2.8rem;
  }

  .content-section-setting-data-input-submit {
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
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
    bottom: -25px;
    left: 0;
    color: var(--error);
  }

  .content-section-account {
    display: flex;
    flex-direction: row;
    width: 70%;
    height: 6.5vw;
    margin-bottom: 3%;
    padding: .5%;
    padding-left: 2%;
    border-radius: 1vw;
    border: .25vw solid var(--color-background);
    overflow: hidden;
  }

  .content-section-acocunt-background {
    border-radius: 1vw;
    opacity: .8;
    z-index: 0;
    filter: blur(10vw);
  }

  .content-section-account-pb-wrapper {
    aspect-ratio: 1;
    height: 80%;
    margin-right: 5%;
    align-self: center;
    border-radius: 19%;
    border: .25vw solid var(--color-background);
  }

  .content-section-account-pb {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 15%;
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
    font-size: 1.2vw;
    margin-right: 2%;
  }

  .content-section-account-info-division img {
    height: 80%;
    object-fit: contain;
  }

  .content-section-setting-data-input-input:not(:focus) ~ .champion-dropdown-wrapper {
    visibility: hidden;
    opacity: 0;
  }

  .content-section-setting-multiselect {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5.5vw;
    justify-content: space-between;
  }

  .content-section-setting-multiselect-option {
    display: flex;
    height: 80%;
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--color-text);
    border-radius: 10%;
    cursor: pointer;
    transition: border-color .2s;
  }

  .multiselect-option-active {
    border-color: var(--gold);
  }

  .content-section-setting-multiselect-option img {
    width:60%;
    object-fit: contain;
    filter: grayscale(100%);
    transition: filter .2s;
  }

  .multiselect-option-active img {
    filter: grayscale(0%);
  }

  .multiselect-submit-wrapper {
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
    margin-top: 5%;
  }

  .champion-dropdown-wrapper {
    position: absolute;
    background: var(--color-background);
    width: 100%;
    border-radius:10px;
    max-height: 500%;
    overflow-y: scroll;
    opacity: 1;
    visibility: visible;
    transition: opacity .1s, visibility .1s;
    transition-delay: .05s;
  }

  .champion-dropdown-option {
    cursor: pointer;
    padding: 2%;
    margin-top: 1%;
    padding-left: 5%;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50%;
    transform: rotate(0deg) translateX(-50%) translateY(-50%);
    transform-origin: 0% 0%;
    animation: loading .6s infinite linear;
  }

  @keyframes loading {
    to {
      transform: rotate(360deg) translateX(-50%) translateY(-50%);
    }
  }

  .loading circle {
    stroke-width: .15;
    stroke: var(--secondary);
    fill: none;
    stroke-dasharray: 220%;
    stroke-dashoffset: 0%;
    transform: rotate(0deg);
    animation: loading-circle 3s infinite linear;
  }

  @keyframes loading-circle {
    to {
      stroke-dashoffset: 440%;
    }
  }

  .input-loading {
    left: unset;
    right: 0;
    z-index: 3;
  }

  .input-done {
    user-select: none;
    position: absolute;
    color: var(--secondary);
    top: 0;
    right: 0;
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    cursor: pointer;
    transition: opacity .2s;
  }

  .input-done:hover {
    opacity: 0;
  }

  .input-done:hover ~ .input-done-close {
    opacity: 1;
  }

  .input-done-close {
    opacity: 0;
    transition: opacity .2s;
    z-index: 3;
    color: var(--error)
  }

  .anchor {
    position: absolute;
    visibility: hidden;
    top: -8vw;
    left: 0;
  }
</style>