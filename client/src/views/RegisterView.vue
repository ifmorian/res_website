<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="base">
    <div class="card">
      
      <div class="card-head">
        <div class="card-title" id="input-parent">Sign up</div>
        <a @click="() => $router.push('/login')" class="card-head-link">Sign in</a>
      </div>

      <form method="dialog">

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="usernameIcon" class="material-symbols-outlined card-input-icon">
              person
              <span class="material-symbols-outlined card-input-icon-info">info</span>
            </span>
            <svg ref="usernameBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="usernameBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
            <div ref="info" class="card-input-info">
              Your username is not (necessarily) your gamertag. You'll get to choose a gamertag later. Gamertags are shown on team pages.
            </div>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input
                type="text"
                v-model="username"
                name="username"
                placeholder="username"
                class="card-input-data-input"
                autofocus
                maxlength="64"
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

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="emailIcon" class="material-symbols-outlined card-input-icon">email</span>
            <svg ref="emailBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="emailBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input
                type="text"
                v-model="email"
                name="email"
                placeholder="email"
                class="card-input-data-input"
                @blur="() => {checkEmail()}"
                @input="() => {
                  ($refs.emailIcon as HTMLSpanElement).style.color = 'unset';
                  ($refs.emailInputBorder as HTMLSpanElement).style.borderColor = 'unset';
                  emailError = '';
                  submitError = '';
                }"
              >
              <span ref="emailInputBorder" class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error">{{ emailError }}</div>
          </div>
        </div>

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="passwordIcon" class="material-symbols-outlined card-input-icon">key</span>
            <svg ref="passwordBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="passwordBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input 
                placeholder="password"
                v-model="password"
                name="password"
                :type="passwordVisible ? 'text' : 'password'"
                class="card-input-data-input"
                @blur="() => {checkPassword()}"
                @input="() => {
                  ($refs.passwordIcon as HTMLSpanElement).style.color = 'unset';
                  ($refs.passwordInputBorder as HTMLSpanElement).style.borderColor = 'unset';
                  ($refs.passwordRepeatIcon as HTMLSpanElement).style.color = 'unset';
                  ($refs.passwordRepeatInputBorder as HTMLSpanElement).style.borderColor = 'unset';
                  passwordError = '';
                  passwordRepeatError = '';
                  submitError = '';
                }"
              >
              <span ref="passwordInputBorder" class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error">{{ passwordError }}</div>
          </div>
          <span
            class="material-symbols-outlined card-input-icon-password"
            @mousedown="(event) => {passwordVisible = true; event.preventDefault();}"
            @mouseup="(event) => passwordVisible = false"
            @mouseleave="(event) => passwordVisible = false"
          >
            {{passwordVisible ? 'visibility_off' : 'visibility'}}
          </span>
        </div>

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="passwordRepeatIcon" class="material-symbols-outlined card-input-icon">repeat</span>
            <svg ref="passwordRepeatBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="passwordRepeatBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input 
                placeholder="repeat password"
                v-model="passwordRepeat"
                name="passwordRepeat"
                :type="passwordVisible ? 'text' : 'password'"
                class="card-input-data-input"
                @blur="() => {checkPasswordRepeat()}"
                @input="() => {
                  ($refs.passwordRepeatIcon as HTMLSpanElement).style.color = 'unset';
                  ($refs.passwordRepeatInputBorder as HTMLSpanElement).style.borderColor = 'unset';
                  passwordRepeatError = '';
                  submitError = '';
                }"
              >
              <span ref="passwordRepeatInputBorder" class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error">{{ passwordRepeatError }}</div>
          </div>
          <span
            class="material-symbols-outlined card-input-icon-password"
            @mousedown="(event) => {passwordVisible = true; event.preventDefault();}"
            @mouseup="(event) => passwordVisible = false"
            @mouseleave="(event) => passwordVisible = false"
          >
            {{passwordVisible ? 'visibility_off' : 'visibility'}}
          </span>
        </div>

        <div class="card-input submit">
          <div class="card-input-icon-wrapper">
            <span ref="submitIcon" class="material-symbols-outlined card-input-icon submit-icon">deployed_code</span>
          </div>
          <div class="card-input-data">
            <input type="submit" value="register" class="card-input-data-input submit-button" @click="() => register()">
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

  // eslint-disable-next-line no-control-regex
  const emailReg: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  import router from '@/router';
  import AuthenticationService from '@/services/AuthenticationService';
  import store from '@/store';
  export default {
    data() {
      return {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        passwordRepeat: '',
        passwordRepeatError: '',
        passwordVisible: false,
        animationTasks: Array<CallableFunction>(),
        submitError: "",
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
        } else if(this.username.length > 64) {
          this.usernameError = 'Can\'t be longer than 64 characters.'
        } else {
          return this.addAnimation(this.playUsernameInputAnimation);
        }
        (this.$refs.usernameIcon as HTMLSpanElement).style.color = 'var(--error)';
        (this.$refs.usernameInputBorder as HTMLSpanElement).style.borderColor = 'var(--error)';
      },
      checkEmail() {
        if (this.email === '') {
          this.emailError = 'Can\'t be empty.';
        } else if (!(emailReg.test(this.email))) {
          this.emailError = 'Enter a valid email.';
        } else {
          return this.addAnimation(this.playEmailInputAnimation);
        }
        (this.$refs.emailIcon as HTMLSpanElement).style.color = 'var(--error)';
        (this.$refs.emailInputBorder as HTMLSpanElement).style.borderColor = 'var(--error)';
      },
      checkPassword() {
        if (this.password === '') {
          this.passwordError = 'Can\'t be empty.';
        } else if (this.password.length < 8) {
          this.passwordError = 'Must be at least 8 characters.';
        } else {
          return this.addAnimation(this.playPasswordInputAnimation);
        }
        (this.$refs.passwordIcon as HTMLSpanElement).style.color = 'var(--error)';
        (this.$refs.passwordInputBorder as HTMLSpanElement).style.borderColor = 'var(--error)';
      },
      checkPasswordRepeat() {
        if (this.passwordRepeat === '') {
          this.passwordRepeatError = 'Can\'t be empty.';
        } else if (this.password !== this.passwordRepeat) {
          this.passwordRepeatError = 'Passwords do not match.';
        } else {
          return this.addAnimation(this.playPasswordRepeatInputAnimation);
        }
        (this.$refs.passwordRepeatIcon as HTMLSpanElement).style.color = 'var(--error)';
        (this.$refs.passwordRepeatInputBorder as HTMLSpanElement).style.borderColor = 'var(--error)';
      },
      playUsernameInputAnimation() {
        this.playInputAnimation(
          this.username,
          this.$refs.usernameIcon as HTMLSpanElement,
          this.$refs.usernameBorder as SVGElement,
          this.$refs.usernameBorderCircle as SVGElement
        );
      },
      playEmailInputAnimation() {
        this.playInputAnimation(
          this.email,
          this.$refs.emailIcon as HTMLSpanElement,
          this.$refs.emailBorder as SVGElement,
          this.$refs.emailBorderCircle as SVGElement
        );
      },
      playPasswordInputAnimation() {
        this.playInputAnimation(
          this.password,
          this.$refs.passwordIcon as HTMLSpanElement,
          this.$refs.passwordBorder as SVGElement,
          this.$refs.passwordBorderCircle as SVGElement
        );
      },
      playPasswordRepeatInputAnimation() {
        this.playInputAnimation(
          this.passwordRepeat,
          this.$refs.passwordRepeatIcon as HTMLSpanElement,
          this.$refs.passwordRepeatBorder as SVGElement,
          this.$refs.passwordRepeatBorderCircle as SVGElement
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
        const keyframes = (top: number) => {
          return [
            {marginTop: "0", opacity: 1},
            {marginTop: top + "vw", opacity: 0}
          ]
        }
        (this.$refs.usernameIcon as HTMLSpanElement).animate(keyframes(25), timingOptions).play();
        (this.$refs.emailIcon as HTMLSpanElement).animate(keyframes(20), timingOptions).play();
        (this.$refs.passwordIcon as HTMLSpanElement).animate(keyframes(15), timingOptions).play();
        const animation = (this.$refs.passwordRepeatIcon as HTMLSpanElement).animate(keyframes(10), timingOptions);

        animation.addEventListener("finish", () => this.runAnimation());
        animation.play();
      },
      register() {
        if (document.hasFocus() && document.activeElement) {
          let el = document.activeElement as HTMLInputElement
          el.blur();
        }
        this.addAnimation(this.credsDown);
        Promise.all([timer(this.animationTasks.length === 1 ? 800 : 1300), AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordRepeat: this.passwordRepeat
        })]).then(value => {
          const errorCode = value[1].data.errorCode;
          if (errorCode === 1) {
            return AuthenticationService.login({
              identifier: this.username,
              password: this.password
            }).then(() => {
              store.notification.value.message = 'Signed up successfully!';
              store.notification.value.success = true;
              store.notification.value.notificate = !store.notification.value.notificate;
              //@ts-ignore
              this.$updateSession();
              return router.push('/gamertag');
            }).catch(err => {
              store.notification.value.message = 'Something went wrong while logging in.';
              store.notification.value.success = false;
              store.notification.value.notificate = !store.notification.value.notificate;
              console.error(err);
              return router.push('/login');
            })
          }
          if (errorCode % 2 === 0) {
            (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--error)";
            this.usernameError = 'Can\'t be empty.'
          }
          if (errorCode % 3 === 0) {
            (this.$refs.emailIcon as HTMLSpanElement).style.color = "var(--error)";
            this.emailError = 'Can\'t be empty.'
          }
          if (errorCode % 5 === 0) {
            (this.$refs.passwordIcon as HTMLSpanElement).style.color = "var(--error)";
            this.passwordError = 'Can\'t be empty.'
          }
          if (errorCode % 7 === 0) {
            (this.$refs.passwordRepeatIcon as HTMLSpanElement).style.color = "var(--error)";
            this.passwordRepeatError = 'Can\'t be empty.'
          }
          if (errorCode % 11 === 0) {
            (this.$refs.passwordRepeatIcon as HTMLSpanElement).style.color = "var(--error)";
            this.passwordRepeatError = 'Passwords do not match.';
          }
          if (errorCode % 13 === 0) {
            (this.$refs.emailIcon as HTMLSpanElement).style.color = "var(--error)";
            this.emailError = 'Enter a valid email.';
          }
          if (errorCode % 17 === 0) {
            (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--error)";
            this.usernameError = 'Username already exists.';
          }
          if (errorCode % 19 === 0) {
            (this.$refs.emailIcon as HTMLSpanElement).style.color = "var(--error)";
            this.emailError = 'Email is already registered.';
          }
          if (errorCode % 23 === 0) {
            (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--error)";
            this.usernameError = 'Can\'t be longer than 64 characters.';
          }
          if (errorCode % 23 === 0) {
            (this.$refs.passwordIcon as HTMLSpanElement).style.color = "var(--error)";
            this.passwordError = 'Must be at least 8 characters.';
          }
          this.addAnimation(this.credsUp);
        }).catch(() => {
          this.submitError = 'Something went wrong. Please try again.'
          this.addAnimation(this.credsUp);
        });
      }
    }
  }
</script>

<style scoped>
  @import url('../assets/styles/form.css');
</style>