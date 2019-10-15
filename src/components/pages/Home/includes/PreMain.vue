<template>
  <div class="home-pre-main section-container" id="homePreMain">

    <!-- PRE MAIN BACKGROUND -->
    <img src="../../../../assets/img/main.jpg" alt="Main background" class="home-pre-main-bg">

    <!-- PRE MAIN OVERLAY -->
    <div class="home-pre-main-overlay"></div>

    <!-- PRE MAIN CONTENT -->
    <div class="home-pre-main-content d-flex justify-content-center align-items-center flex-column">
      <div class="row d-none" :class="logoClass">
        <img src="../../../../assets/img/logo.png" alt="Logo" class="img-fluid px-2 px-md-0">
      </div>

      <div
        class="home-pre-main-content-icon text-center cursor-pointer d-flex justify-content-center align-items-center bg-color-1 text-white"
        @click="slideToNext">
        <i class="fal fa-chevron-double-down fa-3x animated infinite fadeInDown slow"></i>
      </div>
    </div>

  </div>
</template>

<script>

    import {scroll} from "../../../../app/utils";

    export default {
        name: "HomeMain",

        props: {
            toggle: { type: Boolean, required: false }
        },

        data() {
            return {
                logoClass: ''
            }
        },

        watch: {
            toggle(value) {
                if (value === true) this.toggleLogoClass()
            }
        },

        methods: {

            slideToNext() {
                scroll('#homeMain')
            },

            toggleLogoClass() {
                this.logoClass = this.logoClass === '' ? 'animated fadeInDown d-block' : ''
            },

            run() {
            }
        }
    }
</script>

<style scoped>

  .home-pre-main {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .home-pre-main .home-pre-main-bg,
  .home-pre-main .home-pre-main-overlay,
  .home-pre-main .home-pre-main-content {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .home-pre-main .home-pre-main-overlay,
  .home-pre-main .home-pre-main-content {
    position: absolute;
  }

  .home-pre-main .home-pre-main-bg {
    position: fixed !important;
    max-width: 100vw;
    z-index: -1;
  }

  .home-pre-main .home-pre-main-bg,
  .home-pre-main .home-pre-main-overlay {
    max-height: 85vh;
  }

  .home-pre-main .home-pre-main-overlay {
    background-color: rgba(0, 0, 0, .8);
  }

  .home-pre-main .home-pre-main-content-icon {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 15vh;
    background: #fff;
  }

</style>
