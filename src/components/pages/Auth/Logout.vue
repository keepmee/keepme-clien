<template>
  <div></div>
</template>

<script>
    export default {
        name: "Logout",

        created() {
            this.cookie.delete(this.$store.getters.COOKIE_NAME)
            this.$localStorage.remove("user")
            this.helpers.loading()
            this.api.post('/logout', null).then((r) => {
                this.helpers.loading()
                location.reload()
            })
        }
    }
</script>

<style scoped>

</style>
