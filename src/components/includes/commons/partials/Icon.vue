<template>
  <img :src="getSrc()" :alt="getAlt()">
</template>

<script>
    export default {
        name: "Icon",

        props: {
            icon: {
                type    : String,
                required: true
            }
        },

        methods: {

            getSrc() {
                return require(`@/assets/img/icons/${this.icon}.png`)
            },

            getAlt() {
                return `Icon ${this.icon}`
            }
        }
    }
</script>

<style scoped>

</style>
