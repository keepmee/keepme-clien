<template>
  <div class="profile-notification-container">
    {{ notifications }}
  </div>
</template>

<script>
    export default {
        name: "Notifications",

        created() {
            return this.run()
        },

        data() {
            return {
                notifications: null
            }
        },

        methods: {

            getNotifications() {
                this.api.get('/notifications').then(
                    (response) => (this.notifications = (response.data.data.notification || null)),
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            },

            run() {
                this.getNotifications()
            }
        }
    }
</script>

<style scoped>

</style>
