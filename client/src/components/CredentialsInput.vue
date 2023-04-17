

<template>
  <div ref="ball-wrapper" class="ball-wrapper" :class="{active: activeInput}" :style="{top: currentTop + 'px', left: currentLeft + 'px'}">
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
      top: Number,
      left: Number,
    },
    data() {
      return {
        activeInput: this.active,
        currentTop: this.top,
        currentLeft: this.left
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
    },
    mounted() {
      const wrapper = <HTMLDivElement>(document.querySelector('.ball-wrapper'));
      let pickedUp: boolean = false;
      let x = 0;
      let y = 0;
      wrapper.addEventListener("mousedown", (event) => {
        pickedUp = true;
        x = event.clientX - <number>this.currentLeft;
        y = event.clientY - <number>this.currentTop;
      });
      window.addEventListener("mouseup", (event) => {
        pickedUp = false;
      });
      window.addEventListener("mousemove", async (event: MouseEvent) => {
        if (!pickedUp) return;
        this.currentLeft = event.clientX - x;
        this.currentTop = event.clientY - y;
        wrapper.style.top = this.currentLeft + "px";
        wrapper.style.left = this.currentTop + "px";
      });
    }
  }
</script>

<style scoped>

  .ball-wrapper {
    position: absolute;
    user-select: none;
  }

  .ball {
    position: absolute;

    width: 100px;
    height: 100px;
    background: var(--secondary);
    border: 4px solid var(--color-border);
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
    left: 65px;
    top: 20px;

    border-radius: 30px;
    border: 4px solid var(--color-border);

    height: 60px;

    background: var(--color-text);
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

  .ball-wrapper:not(.active) .ball-input {
    width: 0px;
  }

  .active .ball-input {
    width: 400px;
  }

  .active {
    cursor: unset;
  }

  .active input {
    visibility: visible;
    width: 300px;
  }

  .ball-wrapper:not(.active) input {
    width: 0;
    visibility: hidden;
  }

</style>
