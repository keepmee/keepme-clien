<template>
  <div id="footer" class="position-relative">
    <div class="footer-overlay white"></div>
    <div id="pre-footer" class="footer-container bg-color-2">
      <div class="container text-white">
        <div class="row d-flex align-items-center">
          Copyright&nbsp;<i class="fal fa-copyright"></i>&nbsp;2019&nbsp;
          <router-link :to="{name: 'home'}" class="text-white">Keepme</router-link>
          .
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "XFooter"
    }
</script>

<style scoped>

  #footer {
    margin-top: 100px;
    background-color: #ffffff;
  }

  .footer-overlay {
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    /*opacity: .9;*/
  }

  #pre-footer {
    /*border-top: 3px solid #000;*/
    /*background-color: #ffffff;*/
    padding-top: 25px;
    padding-bottom: 25px;
  }

  #pre-footer .block {
    text-align: center;
  }

  #footer .block {
    padding-bottom: 1rem;
  }

  #pre-footer .block:not(.last-block):after {
    content: ' ';
    border-left: 2px solid #DD9B18;
    height: 50px;
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    top: 50%;
  }
</style>
