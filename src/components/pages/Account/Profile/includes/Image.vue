<template>
  <div class="profile-image-container position-relative" v-if="user">

    <!--<triple-shape :size="130" :center-size="85" :strong="true" class="profile-image">
      <div class="d-flex justify-content-center align-items-center h-100 w-100" :class="{'bg-color-1': !user.image}">
        <img :src="user.image" alt="Photo de profil" v-if="user.image">
        <i class="fal fa-user fa-4x text-white user-icon" v-else></i>
      </div>
    </triple-shape>-->

    <profile-picture :size="130" :center="user.image ? 130 : 85" class="profile-image" :strong="false"
                     :image="{src: user.image, height: 130, width: 130}"/>

    <div class="profile-image-details">
      <div class="bar main bg-color-3" :class="{'image': user.image}"></div>
    </div>

    <div class="profile-image-name" :class="{'image': user.image}">
      <h3 class="sanchez">{{ getUserName() }}</h3>
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

  .profile-image-container .profile-image,
  .profile-image-container .profile-image-details .bar,
  .profile-image-container .profile-image-name {
    margin-left: calc(50% - 300px) !important;
  }

  .profile-image-container .profile-image-details .bar.main {
    top: 83px;
    height: 4px;
    width: 500px;
    max-width: calc(100% - 474px);
  }

  .profile-image-container .profile-image-details .bar.main.image {
    top: 63px !important;
    left: 135px !important;
  }


  .profile-image-container .profile-image-name.image {
    top: 34px !important;
    left: 135px;
  }

</style>
