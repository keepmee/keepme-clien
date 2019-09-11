<template>
  <div class="border-bottom border-color-3 py-2 col-12 d-flex align-items-center pl-0">
    <i class="grey-text" :class="icon" v-if="icon"></i>
    <label class="h5 font-weight-light mb-0"><span class="mx-3 font-weight-light color-1">|</span>{{ title }}</label>
  </div>
</template>

<script>
    export default {
        name: "Page",

        props: {
            title: { type: String, required: true },
            icon : { type: String, required: false }
        }
    }
</script>

<style scoped>

</style>
