<template>
  <modal name="modal-show-koop-application" :click-to-close="true" height="auto" :adaptive="true" :reset="true"
         :scrollable="true">

    <div class="vmodal-body">
      <ul class="list-group">
        <li v-for="notification in notifications" class="list-group-item border-0"
            :class="{'grey lighten-4': !isRead(notification)}">
          <span class="pr-2">
            <i class="fa-circle fa-xs" :class="{'fa': !isRead(notification), 'far': isRead(notification)}"></i>
          </span>
          <router-link
            :to="{name: 'profile.index', params: {separator:'nny', name: `${notification.data.nanny.user.firstname}.${notification.data.nanny.user.lastname}`}}">
            {{ notification.data.nanny.user.lastname | capitalize }}
            {{ notification.data.nanny.user.firstname | capitalize }}
          </router-link>
          souhaite avoir la garde
          <span class="float-right mx-1 cursor-pointer" @click="deny(notification)"><i
            class="far fa-trash red-text"></i></span>
          <span class="float-right mx-1 cursor-pointer" @click="accept(notification)"><i
            class="far fa-check green-text"></i></span>
        </li>
      </ul>

    </div>

  </modal>
</template>

<script>
    export default {
        name: "KoopApplication",

        props: {
            notifications: Array || null
        },

        methods: {
            hideModal() {
                this.$modal.hide('modal-show-koop-application')
            },

            isRead(notification) {
                return !(notification.read_at === null)
            },

            deny(notification) {
                this.api.post(`/notifications/deny/${notification.id}`).then(
                    () => this.$emit('denied')
                )
            },

            accept(notification) {
                this.api.post(`/notifications/accept/${notification.id}`).then(
                    () => {
                        this.helpers.setFeedback('success', null, this)
                        this.$modal.hide('modal-show-koop-application')
                        this.$emit('accepted')
                    },
                )
            }
        }
    }
</script>

<style scoped>

</style>
