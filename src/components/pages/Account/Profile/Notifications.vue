<template>
  <div class="profile-notification-container rounded z-depth-1-half white">
    <div class="bg-color-1 col-12 py-2 rounded-top"><span class="h5-responsive">Notifications</span></div>
    <ul class="pl-0 mb-" v-if="notifications && notifications.length > 0">
      <li v-for="(notification, idx) in notifications" class="row py-2 cursor-pointer" @click="navigate(notification)"
          :class="{'border-top': idx > 0, 'bg-light': notification.read_at === null}">
        <div class="col-3 col-lg-2 text-center">
          <profile-picture :size="20" :center="16" class="mx-auto" :bordered="false" :small="true" :strong="false"
                           :image="{src: notification.data.users.writer ? notification.data.users.writer.image : null, height: 32, width: 32}"/>
        </div>
        <div class="col-9 col-lg-10 d-flex align-items-center px-0">
          <span v-if="notification.custom_type === 'apply'">
            <span class="font-weight-bold">{{ notification.data.nanny.user.lastname | capitalize }} {{ notification.data.nanny.user.firstname | capitalize }}</span>
            a postulé à votre annonce <span class="font-weight-bold">{{ notification.data.koop.title }}</span>
          </span>
          <span v-else-if="notification.custom_type === 'comment.main'">
            <span class="font-weight-bold">{{ notification.data.users.writer.lastname | capitalize }} {{ notification.data.users.writer.firstname | capitalize }}</span>
            a commenté votre annonce <span class="font-weight-bold">{{ notification.data.koop.title }}</span>
          </span>
          <span v-else-if="notification.custom_type === 'comment.guest'">
            <span class="font-weight-bold">{{ notification.data.users.writer.lastname | capitalize }} {{ notification.data.users.writer.firstname | capitalize }}</span>
            a commenté une annonce que vous avez commenté
          </span>
        </div>
        <div class="col-12 text-right small color-3 font-italic">il y a {{ getDateFrom(notification.created_at) }}</div>
      </li>
    </ul>
    <span v-else class="font-italic grey-text">Aucune notification</span>
  </div>
</template>

<script>

    import {date}         from "../../../../app/utils";
    import ProfilePicture from "../../../includes/commons/Profile/Picture";

    export default {
        name: "Notifications",

        props: {
            show: { type: Boolean, required: true }
        },

        components: {
            ProfilePicture
        },

        data() {
            return {
                notifications: null,
            }
        },

        watch: {

            show(value) {
                if (value)
                    return this.run()
            }
        },

        methods: {

            getDateFrom(created) {
                let minutes = Math.abs(date.diff(this.helpers.moment(), this.helpers.moment(created), false)), hours
                return minutes < 60
                    ? `${parseInt(minutes)} minutes` : (hours = (minutes / 60)) < 24
                        ? `${parseInt(hours)} heures` : `${parseInt(hours / 24)} jours`
            },

            getNotifications() {
                this.api.get('/notifications/limit').then(
                    (response) => (this.notifications = (response.data.data || null)),
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            },

            navigate(notification) {
                this.$emit('navigated')
                if (notification.custom_type === 'apply' || notification.custom_type.includes('comment'))
                    return this.$route.name === 'koop.show' && this.$route.params.id === notification.data.koop.id
                        ? this.$router.go(this.$router.currentRoute)
                        : this.$router.replace(
                            {
                                name  : 'koops.show',
                                params: {
                                    id  : notification.data.koop.id,
                                    name: `${notification.data.koop.author.firstname}.${notification.data.koop.author.lastname}`
                                }
                            }
                        )
                /* if (notification.custom_type === 'comment')
                     return this.helpers.navigate(this.$router, 'koops.show', {
                         id  : notification.data.koop.id,
                         name: `${notification.data.koop.author.firstname}.${notification.data.koop.author.lastname}`
                     })*/
            },

            run() {
                this.getNotifications()
            }
        }
    }
</script>

<style scoped>

  .profile-notification-container {
    position: fixed;
    top: 70px;
    right: 10px;
    z-index: 1051;
    width: 400px;
    max-width: 100%;
    min-height: inherit !important;
    /*min-height: 600px !important;*/
    background-color: #EBC8B2;
    padding: 0 !important;
  }

  .profile-notification-container:before {
    bottom: 100%;
    left: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .profile-notification-container:before {
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: #EBC8B2;
    border-width: 10px;
    margin-left: -26px;
  }

  li {
    list-style: none !important;
  }

  @media screen and (max-width: 767px) {
    .profile-notification-container {
      width: 300px !important;
      max-width: calc(100% - 10px) !important;
    }
  }

</style>
