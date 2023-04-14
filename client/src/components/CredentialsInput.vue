<template>
  <div class="wrapper" :class="{active: activeInput}">
    <div class="ball" v-on:click="toggle">
      {{ title }}
    </div>
    <div class="ball-input">
      <input ref="inputElement" type="text" name="username" :placeholder="placeholder" v-on:blur="blur">
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      title: String,
      placeholder: String,
      active: Boolean,
    },
    data() {
      return {
        activeInput: this.active,
      }
    },
    methods: {
      toggle() {
        if (this.activeInput) return;
        this.activeInput = true;
        setTimeout(() => {
          (this.$refs.inputElement as HTMLInputElement).focus();
        }, 10)
      },
      blur() {
        setTimeout(() => {
          this.activeInput = false;
        }, 100);
      }
    }
  }
</script>

<style scoped>

  .wrapper {
    position: absolute;
    user-select: none;
  }

  .ball {
    position: absolute;

    width: 120px;
    height: 120px;
    background: var(--secondary);
    border: 2px solid var(--color-border);
    border-radius: 60px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    color: var(--vt-c-text-light-1);
    font-weight: bold;
    z-index: 1;
  }

  .ball-input {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 80px;
    top: 30px;

    border-radius: 30px;
    border: 2px solid rgba(50, 50, 50 .3) inset;

    height: 60px;

    background: var(--primary);
    transition: width .2s;
  }

  input {
    position: relative;

    margin-left: 25px;
    padding-left: 8px;

    height: 30px;
    border: 3px solid var(--secondary);
    border-radius: 15px;
    outline: none;
  }

  .wrapper:not(.active) .ball-input {
    width: 0px;
  }

  .active .ball-input {
    width: 500px;
  }

  .active {
    cursor: unset;
  }

  .active input {
    visibility: visible;
    width: 400px;
  }

  .wrapper:not(.active) input {
    width: 0;
    visibility: hidden;
  }

</style>
