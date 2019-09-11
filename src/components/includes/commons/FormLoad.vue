<template>
  <div v-if="load" id="formLoad" class="d-flex justify-content-center align-items-center">
    <triple-spinner :thickness="2" :size="100" color1="#EBC8B2" color2="#CBCADE" color3="#fffbf9"/>
  </div>
</template>

<script>

    import TripleSpinner from './Loader/TripleSpinner'

    export default {
        name: "FormLoad",

        components: { TripleSpinner },

        computed: {
            load() {
                return this.$store.getters.loading
            }
        },
    }
</script>

<style scoped>

  #formLoad {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 2050;
  }

</style>
