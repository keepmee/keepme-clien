<template>

  <div class="nannies-index">

    <div class="col-12 col-md-6 col-lg-4 px-0 nanny-view-map mr-auto">
      <!-- MAP -->
      <nanny-view-map :nannies="nannies" class="h-100" @nanny-selected="onNannySelected"/>
    </div>

    <div class="col-12 col-md-6 col-lg-8 px-0 ml-auto">

      <!-- LIST -->
      <div class="row">
        <div class="col-12 px-0" v-for="(nanny, $i) in nannies" v-if="isVisibleNanny(nanny)">
          <router-link
            :to="{name: 'profile.index', params: {separator: 'nny', name: `${nanny.user.firstname}.${nanny.user.lastname}`}}"
            class="nanny-nav-item">
            <nanny-view-list :nanny="nanny" :key="$i" :data-nanny-id="nanny.id"
                             :class="{'bg-color-2 text-white': current.selected && current.selected.id === nanny.id}"/>
          </router-link>
        </div>
      </div>

      <!-- ZERO KOOP -->
      <div class="row" v-if="countVisible === 0">
        <div class="col-12">
          <span class="grey-text font-italic">Aucune nounou disponible dans votre secteur</span>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

    const gender = require('gender-detection')

    import {scroll}             from "../../../app/utils";
    import {getDistanceBetween} from "../../../app/utils/koops";
    import ProfileContainer     from "../../includes/commons/Profile/Container";
    import NannyViewList        from "../../includes/Nannies/Views/List";
    import NannyViewMap         from "../../includes/Nannies/Views/Map";

    export default {
        name: "NanniesIndex",

        components: {
            NannyViewMap,
            NannyViewList,
            ProfileContainer
        },

        data() {
            return {
                nannies: null,
                hover  : false,
                current: { selected: null }
            }
        },

        created() {
            return this.run()
        },

        computed: {
            countVisible() {
                return this.nannies ? this.nannies.reduce((count, nanny) => this.isVisibleNanny(nanny) ? count + 1 : count, 0) : 0
            }
        },

        methods: {

            isVisibleNanny(nanny) {
                return (nanny.distance && nanny.distance < 10)
                    || (nanny.user && nanny.user.address && this.$store.getters.user.storage && this.$store.getters.user.storage.address && getDistanceBetween(parseFloat(this.$store.getters.user.storage.address.latitude), parseFloat(this.$store.getters.user.storage.address.longitude), parseFloat(nanny.user.address.latitude), parseFloat(nanny.user.address.longitude), 'm') < 10000)
                /*koop.nanny_id !== null ? false : all === false && geolocation.radius !== null
                    ? getDistanceBetween(geolocation.center.lat, geolocation.center.lng, koop.location.lat, koop.location.lng, 'm') < geolocation.radius : true*/
            },

            age(birthday) {
                let year;
                return (year = this.helpers.moment().diff(this.helpers.moment(birthday), 'years')) > 0
                    ? `${year} an${Math.abs(year) > 1 ? 's' : ''}`
                    : `<span class="grey-text font-italic">Non renseigné</span>`
            },

            getKoopsText(nanny) {
                return `${gender.detect(nanny.user.firstname) === 'male' ? 'Il' : 'Elle'} a effectué ${nanny.koops.length} garde${nanny.koops.length > 1 ? 's' : ''} via notre plateforme.`
            },

            getNannies() {
                this.api.get('/nannies').then((response) => this.nannies = response.data.data)
            },


            onNannySelected(nanny) {
                this.current.selected = nanny
                scroll($(`[data-nanny-id=${nanny.id}]`), 60, 500)
                this.$forceUpdate()
            },

            run() {
                this.getNannies()
            }
        }
    }
</script>

<style scoped>
  @media screen and (min-width: 768px) {
    .nanny-view-map {
      position: fixed;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  a.nanny-nav-item {
    text-decoration: inherit !important;
    color: inherit !important;
  }
</style>
