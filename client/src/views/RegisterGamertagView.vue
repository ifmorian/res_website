<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="base">
    <div class="card">
      
      <div class="card-head" style="margin-bottom: 5vw">
        <div class="card-title" id="input-parent">Enter your gamertag</div>
        <a @click="() => $router.push('/')" class="card-head-link">skip</a>
      </div>

      <form method="dialog">

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="usernameIcon" class="material-symbols-outlined card-input-icon">
              swords
            </span>
            <svg ref="usernameBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="usernameBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input
                type="text"
                v-model="username"
                name="username"
                placeholder="gamertag"
                class="card-input-data-input"
                autofocus
                @blur="() => {checkUsername()}"
                @input="() => {
                  ($refs.usernameIcon as HTMLSpanElement).style.color = 'unset';
                  ($refs.usernameInputBorder as HTMLSpanElement).style.borderColor = 'unset';
                  usernameError = '';
                  submitError = '';
                }"
              >
              <span ref="usernameInputBorder" class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error">{{ usernameError }}</div>
          </div>
        </div>

        <div class="card-input submit">
          <div class="card-input-icon-wrapper">
            <span ref="submitIcon" class="material-symbols-outlined card-input-icon submit-icon">deployed_code</span>
          </div>
          <div class="card-input-data">
            <input type="submit" value="confirm" class="card-input-data-input submit-button" @click="() => register()">
            <div class="card-input-data-error">{{ submitError }}</div>
          </div>
        </div>

      </form>

    </div>
  </div>
</template>

<script lang="ts">

  const timer = async (ms: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  };

  import router from '@/router';
  import AuthenticationService from '@/services/AuthenticationService';
  import store from '@/store';
  export default {
    data() {
      return {
        username: '',
        usernameError: '',
        animationTasks: Array<CallableFunction>(),
        submitError: ''
      };
    },
    methods: {
      addAnimation(f: CallableFunction) {
        this.animationTasks.push(f);
        if (this.animationTasks.length === 1) this.animationTasks[0]();
      },
      runAnimation() {
        this.animationTasks.shift();
        if (this.animationTasks[0]) this.animationTasks[0]();
      },
      checkUsername() {
        if (this.username === '') {
          this.usernameError = 'Can\'t be empty.';
        } else {
          return this.addAnimation(this.playUsernameInputAnimation);
        }
        (this.$refs.usernameIcon as HTMLSpanElement).style.color = 'var(--error)';
        (this.$refs.usernameInputBorder as HTMLSpanElement).style.borderColor = 'var(--error)';
      },
      playUsernameInputAnimation() {
        this.playInputAnimation(
          this.username,
          this.$refs.usernameIcon as HTMLSpanElement,
          this.$refs.usernameBorder as SVGElement,
          this.$refs.usernameBorderCircle as SVGElement
        );
      },
      playInputAnimation(field: string, icon: HTMLSpanElement, border: SVGElement, borderCircle: SVGElement) {
        const duration = 700;
        if (field === "") {
          this.runAnimation()
          return icon.style.color = "unset";
        }
        border.animate([
            { transform: "rotate(600deg)" }
        ], {
            duration: duration,
        }).play();
        const animation = borderCircle.animate([
            { strokeDashoffset: "0", strokeWidth: 0 }
        ], {
            duration: duration,
        });
        animation.addEventListener("finish", () => {
          this.runAnimation();
        });
        animation.play();
        icon.style.color = "var(--secondary)";
      },
      credsDown() {
        this.playLoginAnimation(false);
      },
      credsUp() {
        this.playLoginAnimation(true);
      },
      playLoginAnimation(reverse: boolean) {
        // eslint-disable-next-line no-undef
        const timingOptions: KeyframeAnimationOptions = {
          duration: 500,
          easing: "cubic-bezier(1,0,1,1)",
          fill: "forwards",
          direction: reverse ? "reverse" : "normal"
        };
        const keyframes = [
          {marginTop: "0", opacity: 1},
          {marginTop: "10vw", opacity: 0}
        ];
        const animation = (this.$refs.usernameIcon as HTMLSpanElement).animate(keyframes, timingOptions);

        animation.addEventListener("finish", () => this.runAnimation());
        animation.play();
      },
      register() {
        if (document.hasFocus() && document.activeElement) {
          let el = document.activeElement as HTMLInputElement
          el.blur();
        }
        this.addAnimation(this.credsDown);
        AuthenticationService.isloggedin().then(res => {
          if (!res.data.userId) {
            store.notification.value.message = 'You must be logged in!'
            store.notification.value.success = false;
            store.notification.value.notificate = !store.notification.value.notificate;
            return router.push('/login');
          }
          Promise.all([timer(this.animationTasks.length === 1 ? 800 : 1300), AuthenticationService.setGamertag(this.username)]).then(value => {
            const errorCode = value[1].data.errorCode;
            if (errorCode === 1) {
              store.notification.value.message = 'Welome to RES Publica ' + this.username + '!';
              store.notification.value.success = true;
              store.notification.value.notificate = !store.notification.value.notificate;
              return router.push('/');
            }
            if (errorCode === 2) {
              (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--error)";
              this.usernameError = 'Can\'t be empty.';
            } else if (errorCode === 3) {
              store.notification.value.message = 'You must be logged in!'
              store.notification.value.success = false;
              store.notification.value.notificate = !store.notification.value.notificate;
              return router.push('/login');
            }
            this.addAnimation(this.credsUp);
          }).catch(() => {
            this.submitError = 'Something went wrong. Please try again.'
            this.addAnimation(this.credsUp);
          });
        }); 
      }
    }
  }
</script>

<style scoped>
  @import url('../assets/styles/form.css');
</style>