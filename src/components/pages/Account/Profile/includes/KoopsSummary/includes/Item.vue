<template>
  <div class="col-12 col-md-3 d-flex justify-content-center align-items-center flex-column"
       :class="{'border-right': !border && border !== false}">

    <div class="row summary-logo text-center mb-3 color-2">
      <i class="fal fa-2x m-auto" :class="icon"></i>
    </div>

    <div class="row">

      <div class="row fa-2x number w-100 text-center">
        <span class="w-100 text-center">{{ number }}</span>
      </div>

      <hr class="w-50">

      <div class="row w-100">
        <label class="w-100 text-center">{{ title }}</label>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "Item",

    props: ['icon', 'title', 'number', 'border']
  }
</script>

<style scoped>

  .summary-logo {
    position: relative;
    height: 75px;
    width: 75px;
    border: 2px solid;
    border-radius: 50%;
  }

</style>
