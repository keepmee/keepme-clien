<template>
  <div class="intended-users-label d-flex justify-content-center align-items-center">
    <span class="h3 intended-users-label-content border-bottom" :class="`${color} border-${color}`">{{ label | uppercase }}</span>
  </div>
</template>

<script>
    export default {
        name: "IntendedUsersLabel",

        props: ['label', 'color']
    }
</script>

<style scoped>

  .intended-users-label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  .intended-users-label .intended-users-label-content {
    border-bottom-style: double !important;
    border-bottom-width: 5px !important;
  }

</style>
