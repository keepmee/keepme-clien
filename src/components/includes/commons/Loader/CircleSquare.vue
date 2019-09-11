<template>
  <div class="loader-custom bg-color-1">
    <div class="loader-custom-item loader-custom-1"></div>
    <div class="loader-custom-item loader-custom-2 delay-1"></div>
    <div class="loader-custom-item loader-custom-3 delay-2"></div>
  </div>
</template>

<script>
    export default {
        name: "CircleSquare"
    }
</script>

<style scoped>

  .loader-custom {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .loader-custom-item::before {
    content: "";
    position: absolute;
    height: 100px;
    width: 100px;
    border-radius: 6px;
    border: 5px solid #fff;
    margin: auto;
    background: transparent;
    animation-name: load2;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .loader-custom, .loader-custom .loader-custom-item::before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .loader-custom-item.loader-custom-1::before {
    top: -100px
  }

  .loader-custom-item.loader-custom-2::before {
    top: 100px
  }

  @keyframes load2 {
    50% {
      top: 0;
      transform: rotateZ(180deg);
      border-radius: 55%;
    }
    100% {
      top: 250px !important;
      transform: rotateZ(360deg);
    }
  }

</style>
