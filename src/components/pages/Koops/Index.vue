<template>
  <div class="home" v-if="koops">

    <div class="row">

      <div class="col-12 col-md-6 col-lg-4 px-0 koop-view-map ml-auto">

        <!-- MAP -->
        <koop-view-map :map-center="geolocation.center" :koops="koops" :circle-radius="geolocation.radius"
                       :is-visible-koop="isVisibleKoop" @setRadius="setRadius" @setCenter="setCenter" class="h-100"
                       v-if="geolocation.center" @koop-selected="onKoopSelected"/>

        <!-- CLICK TO VIEW -->
        <div class="row w-100 click-to-view d-md-none d-flex justify-content-center align-items-center smooth-scroll">
          <i class="fal fa-chevron-double-down color-1 cursor-pointer fa-3x animated infinite fadeInDown slower"
             @click="onScrollToViews"></i>
        </div>

      </div>

      <div class="col-12 col-md-6 col-lg-8 px-0 mr-auto">

        <!-- SORT -->
        <div class="row w-100 mt-3" id="mainKoopViews">

          <koop-sort :sort="sort" @click="onClickSortBy" class="col-12"/>

          <!--          <koop-select-view :view="view" class="col-6 text-right px-5" @set-view="onSetView"/>-->

          <hr class="w-100 mb-0">

        </div>

        <!-- GRID -->
        <div class="row" v-if="view === 1">
          <div class="col-12 col-md-6 mx-auto my-3" v-for="(koop, $i) in koops" v-if="isVisibleKoop(koop)">
            <koop-view-grid :koop="koop" :key="$i" @apply="apply"/>
          </div>
        </div>

        <!-- LIST -->
        <div class="row" v-else-if="view === 2">
          <div class="col-12 px-0" v-for="(koop, $i) in koops" v-if="isVisibleKoop(koop)">
            <koop-view-list :koop="koop" :key="$i" @apply="apply" :data-koop-id="koop.id"
                            :class="{'bg-color-2 text-white': current.selected && current.selected.id === koop.id}"/>
          </div>
        </div>


        <!-- ZERO KOOP -->
        <div class="row" v-if="countVisible === 0">
          <div class="col-12">
            <span class="grey-text font-italic">Aucune annonce disponible dans votre secteur</span>
          </div>
        </div>

      </div>

    </div>

    <!-- MODAL CREATE KOOP
    <modal-create-koop @added="onAddedKoop"/>-->

    <!-- MODAL SHOW KOOP
    <modal-show-koop :koop="current.koop" @applied="onApplied"/>-->

  </div>

</template>

<script>


    import KoopViewMap  from '../../includes/Koops/Views/Map'
    import KoopViewGrid from '../../includes/Koops/Views/Grid'
    import KoopViewList from '../../includes/Koops/Views/List'

    import KoopSort       from '../../includes/Koops/includes/Sort'
    import KoopSelectView from '../../includes/Koops/includes/SelectView'

    import ModalCreateKoop from './Create'
    import ModalShowKoop   from './Show-old'

    import {scroll} from "../../../app/utils";

    import {
        getKoops,
        setAllKoopData,
        isVisibleKoop,
        sortBy, getUserLocation, setAllKoopDistance
    } from "../../../app/utils/koops"

    import randInt from 'rand-int'

    export default {
        name: "KoopsIndex",

        components: {
            KoopViewMap,
            KoopViewGrid,
            KoopViewList,

            KoopSort,
            KoopSelectView,

            ModalCreateKoop,
            ModalShowKoop,
        },

        data() {
            return {
                current    : { koop: null },
                geolocation: { center: { lat: 48.856613, lng: 2.352222 }, radius: 10000 },
                koops      : null,
                sort       : { by: null, icons: { default: 'fa-long-arrow-down', reverse: 'fa-long-arrow-up', } },
                view       : 2,
            }
        },

        created() {
            return this.run()
        },

        computed: {
            countVisible() {
                return this.koops && this.geolocation.center ? this.koops.reduce((count, koop) => isVisibleKoop(this.geolocation, koop) ? count + 1 : count, 0) : 0
            }
        },

        methods: {

            /*
            * GET DATA :
            * * available koops
            * * user location
            * */

            getKoops() {
                return new Promise((resolve, reject) => {
                    getKoops('available', false).then(
                        (response) => resolve(this.koops = response),
                        (error) => reject(this.helpers.setFeedback("error", error.response.data.data.error || null, this) || false)
                    )
                })
            },

            getUserLocation() {
                return new Promise((resolve, reject) => {
                    getUserLocation(this).then(
                        (response) => resolve(this.setCenter(response)),
                        (error) => reject(error === 5962 ? false : this.helpers.setFeedback("error", "Une erreur est survenue, merci de réessayer plus tard", this))
                    )
                })
            },

            /*
            * SET DATA :
            * * center
            * * radius
            * * koop data
            * */

            async setCenter(coordinates) {
                this.geolocation.center = this.helpers.clone({
                    lat: parseFloat(coordinates.lat),
                    lng: parseFloat(coordinates.lng)
                });
                // let tmp = await setAllKoopDistance(this.koops, this.geolocation.center)
                this.koops = await setAllKoopDistance(this.geolocation.center, this.geolocation.radius)
                // console.log(tmp)
                this.$forceUpdate()
            },

            async setRadius(radius) {
                this.geolocation.radius = radius
                this.koops = await setAllKoopDistance(this.geolocation.center, this.geolocation.radius)
                this.$forceUpdate()
            },

            setAllKoopData() {
                this.koops = setAllKoopData(this.koops, this.geolocation.center)
            },

            isVisibleKoop(koop) {
                return isVisibleKoop(this.geolocation, koop)
            },

            apply(koop) {
                return this.helpers.navigate(this.$router, 'koops.show', {
                    id  : koop.id,
                    name: `${koop.author.firstname}.${koop.author.lastname}`
                })
            },

            onClickSortBy(field) {
                let result = sortBy(this.koops, field, this.sort.by);
                this.koops = result.koops;
                this.sort.by = result.sortedBy
            },

            onAddedKoop() {
                this.$modal.hide('modal-create-koop');
                return this.run()
            },

            onSetView(view) {
                this.view = view
            },

            onScrollToViews() {
                scroll('#mainKoopViews')
            },

            onApplied() {
                this.helpers.setFeedback("success", null, this);
                this.$modal.hide('modal-show-koop');
                this.current.koop = null
            },

            onKoopSelected(koop) {
                this.current.selected = koop
                scroll($(`[data-koop-id=${koop.id}]`), 60, 500)
                this.$forceUpdate()
            },

            async run() {
                // this.helpers.nannied().catch(() => this.helpers.navigate(this.$router, 'nannies.index'))
                await this.getKoops();
                await this.getUserLocation();
                this.setAllKoopData();
                this.helpers.loading(false)
            }

        }
    }
</script>

<style scoped>

  .click-to-view {
    height: 25vh;
  }

  @media screen and (max-width: 767px) {
    .vue-map-container {
      height: calc(75vh - 50px) !important;
    }

    .click-to-view {
      height: calc(25vh - 50px) !important;
    }
  }

  @media screen and (min-width: 768px) {
    .koop-view-map {
      position: fixed;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

</style>
