<template>
  <div class="profile-image-container position-relative" v-if="user">

    <!--<triple-shape :size="130" :center-size="85" :strong="true" class="profile-image">
      <div class="d-flex justify-content-center align-items-center h-100 w-100" :class="{'bg-color-1': !user.image}">
        <img :src="user.image" alt="Photo de profil" v-if="user.image">
        <i class="fal fa-user fa-4x text-white user-icon" v-else></i>
      </div>
    </triple-shape>-->

    <profile-picture :size="small ? 66 : 130" :center="user.image ? small ? 65 : 130 : small ? 42 : 85"
                     :image="{src: user.image, height: small ? 65 : 130, width: small ? 65 : 130}"
                     :strong="false" class="profile-image" :class="{'small-item': small, 'fa-2x': !small}"/>

    <div class="profile-image-details" :class="{'small-item': small}">
      <div class="bar main bg-color-3" :class="{'image': user.image}"></div>
    </div>

    <div class="profile-image-name" :class="{'image': user.image, 'small-item': small}">
      <h3 class="sanchez" v-if="!small">{{ getUserName() }}</h3>
      <h5 class="sanchez" v-else>{{ getUserName() }}</h5>
    </div>

  </div>
</template>

<script>
    import TripleShape    from "../../../../includes/commons/partials/TripleShape";
    import ProfilePicture from "../../../../includes/commons/Profile/Picture";

    export default {
        name      : "ProfileImageContainer",
        components: { ProfilePicture, TripleShape },
        props     : {
            user       : Object || null,
            getUserName: { type: Function, required: true }
        },

        data() {
            return {
                small: false
            }
        },

        mounted() {

            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })


        },

        methods: {

            getWindowWidth() {
                this.small = this.isSmall()
            },

            isSmall(size = 767) {
                return window.innerWidth < size
            },
        }
    }
</script>

<style scoped>

  .profile-image-container .profile-image .user-icon {
    -webkit-transform: rotate(-45deg) !important;
    transform: rotate(-45deg) !important;
  }

  .profile-image-container .profile-image-details .bar {
    position: absolute;
    left: 174px;
    z-index: -1;
  }

  .profile-image-container .profile-image-name {
    position: absolute;
    top: 54px;
    left: 200px;
    z-index: -1;
  }

  .profile-image-container .profile-image:not(.small-item),
  .profile-image-container .profile-image-details:not(.small-item) .bar,
  .profile-image-container .profile-image-name:not(.small-item) {
    margin-left: calc(50% - 300px) !important;
  }

  .profile-image-container .profile-image-details:not(.small-item) .bar.main {
    top: 83px;
    height: 4px;
    width: 500px;
    max-width: calc(100% - 474px);
  }

  .profile-image-container .profile-image-details:not(.small-item) .bar.main.image {
    top: 63px !important;
    left: 135px !important;
  }


  .profile-image-container .profile-image-name.image:not(.small-item) {
    top: 34px !important;
    left: 135px;
  }

  .profile-image-container .profile-image.small-item,
  .profile-image-container .profile-image-details.small-item .bar,
  .profile-image-container .profile-image-name.small-item {
    margin-left: calc(50% - 150px) !important;
  }

  .profile-image-container .profile-image-details.small-item .bar.main {
    top: 42px;
    left: 88px;
    height: 2px;
    width: 500px;
    max-width: calc(100% - 100px);
  }

  .profile-image-container .profile-image-name.small-item {
    top: 20px;
    left: 95px;
  }

  /*.profile-image-container .profile-image-details.small-item .bar.main.image {
    top: 63px !important;
    left: 135px !important;
  }*/


  .profile-image-container .profile-image-name.image:not(.small-item) {
    top: 34px !important;
    left: 135px;
  }

</style>
