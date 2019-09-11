<template>
  <div class="profile-image-container position-relative" v-if="user">

    <triple-shape :size="130" :center-size="85" :strong="true" class="profile-image">
      <div class="d-flex justify-content-center align-items-center h-100 w-100" :class="{'bg-color-1': !user.image}">
        <img :src="user.image" alt="Photo de profil" v-if="user.image">
        <i class="fal fa-user fa-4x text-white user-icon" v-else></i>
      </div>
    </triple-shape>

    <div class="profile-image-details">
      <div class="bar main bg-color-3"></div>
    </div>

    <div class="profile-image-name">
      <h3 class="sanchez">{{ getUserName() }}</h3>
    </div>

  </div>
</template>

<script>
    import TripleShape from "../../../../includes/commons/partials/TripleShape";

    export default {
        name      : "ProfileImageContainer",
        components: { TripleShape },
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

</style>
