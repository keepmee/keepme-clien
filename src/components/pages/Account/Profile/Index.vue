<template>
  <div class="profile-container">
    <profile-image :user="user" :get-user-name="getUserName" class="my-5"/>

    <koops-summary class="my-4" :koops="koops" v-if="$store.getters.user.storage.role === 'parent'"/>

    <!-- SORT -->
    <div class="row w-100 my-3" id="mainKoopViews">

      <koop-sort :sort="sort" @click="onClickSortBy" class="col-12"/>

<!--      <koop-select-view :view="view" class="col-6 text-right px-5" @set-view="onSetView"/>-->

      <hr class="w-100">

    </div>

    <!-- GRID -->
    <div class="row" v-if="view === 1">
      <div class="col-12 col-md-6 col-lg-4 mx-auto my-3" v-for="(koop, $i) in koops">
        <koop-view-grid :koop="koop" :key="$i" v-if="isVisibleKoop(koop)"/>
      </div>
    </div>

    <!-- LIST -->
    <div class="row" v-else-if="view === 2">
      <div class="col-12 px-0 position-relative" v-for="(koop, $i) in koops">
        <koop-view-list :koop="koop" :key="$i" @show-notification="onShowNotification"
                        :notification="koop.notification ? koop.notification.number : 0" @apply="onApply"/>

        <div class="row card-status pb-3 pr-3 fa-1x5" v-if="$store.getters.user.storage.role === 'nanny'">
          <i class="fal text-success fa-check" v-if="$store.getters.user.storage.id === (koop.nanny || {}).user_id"></i>
          <i class="fal text-danger fa-times" v-else-if="koop.nanny_id !== null"></i>
          <i class="fal text-warning fa-hourglass-half" v-else></i>
        </div>

      </div>
    </div>

    <koop-application :notifications="current.notifications" v-if="$store.getters.user.storage.role === 'parent'"/>

  </div>
</template>

<script>

    import {getKoops, getUserLocation, isVisibleKoop, setAllKoopData, sortBy} from "../../../../app/utils/koops";

    import ProfileImage    from './includes/Image'
    import KoopsSummary    from './includes/KoopsSummary/Index'
    import KoopApplication from './includes/KoopApplication'

    import KoopViewGrid   from '../../../includes/Koops/Views/Grid'
    import KoopViewList   from '../../../includes/Koops/Views/List'
    import KoopSort       from '../../../includes/Koops/includes/Sort'
    import KoopSelectView from '../../../includes/Koops/includes/SelectView'


    export default {
        name: "AccountProfileIndex",

        components: {
            KoopApplication,
            ProfileImage,
            KoopsSummary,

            KoopViewGrid,
            KoopViewList,

            KoopSort,
            KoopSelectView,
        },

        data() {
            return {
                current    : {},
                user       : null,
                koops      : null,
                view       : 2,
                sort       : { by: null, icons: { default: 'fa-long-arrow-down', reverse: 'fa-long-arrow-up', } },
                geolocation: { center: { lat: 48.856613, lng: 2.352222 }, radius: 10000 },
            }
        },

        created() {
            return this.run()
        },

        methods: {

            onShowNotification(koop) {
                this.current.notifications = this.helpers.clone(koop.notification.content)
                this.$forceUpdate()
                this.$modal.show('modal-show-koop-application')
            },

            onApply(koop) {
                return this.helpers.navigate(this.$router, 'koops.show', {
                    id  : koop.id,
                    name: `${koop.author.firstname}.${koop.author.lastname}`
                })
                /*let user = this.$store.getters.user.storage;
                this.current.koop = this.helpers.clone(koop);
                return (user === null)
                    ? this.$route.push({ name: 'login' })
                    : (user.role === 'nanny')
                        ? this.$modal.show('modal-show-koop')
                        : null*/
            },

            getCurrentUser() {
                this.user = this.$store.getters.user.storage
            },

            getUserName(user = null) {
                return user ? `${user.lastname.toLowerCase().capitalize()} ${user.firstname.toLowerCase().capitalize()}` :
                    this.user ? `${this.user.lastname.toLowerCase().capitalize()} ${this.user.firstname.toLowerCase().capitalize()}` : ''
            },

            getUserLocation() {
                return new Promise((resolve, reject) => {
                    getUserLocation(this).then(
                        (response) => resolve(this.setCenter(response)),
                        (error) => reject(error === 5962 ? false : this.helpers.setFeedback("error", "Une erreur est survenue, merci de réessayer plus tard", this))
                    )
                })
            },

            getKoops() {
                return new Promise((resolve, reject) => {
                    getKoops('mine', false).then(
                        (response) => {
                            console.log(response);
                            return resolve(this.koops = response)
                        },
                        (error) => reject(this.helpers.setFeedback("error", error.response.data.data.error || null, this) || false)
                    )
                })
            },

            getNotification() {
                this.api.get('/notifications/unread/apply').then(
                    (response) => {
                        console.log(response.data)
                        if (response.data && response.data.data && this.koops)
                            this.koops.forEach((koop) => {
                                let tmp = response.data.data.filter(n => n.data.koop && n.data.koop.id === koop.id)
                                koop.notification = {
                                    number : tmp ? tmp.length : 0,
                                    content: tmp
                                }
                                // console.log(koop.id, n.data.koop)
                            })
                        this.koops = this.helpers.clone(this.koops)

                    },
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            },

            isVisibleKoop(koop) {
                return isVisibleKoop({}, koop, true)
            },

            setCenter(coordinates) {
                this.geolocation.center = this.helpers.clone({
                    lat: parseFloat(coordinates.lat),
                    lng: parseFloat(coordinates.lng)
                });
                this.$forceUpdate()
            },

            setAllKoopData() {
                this.koops = setAllKoopData(this.koops, this.geolocation.center)
            },

            onSetView(view) {
                this.view = view
            },

            onClickSortBy(field) {
                let result = sortBy(this.koops, field, this.sort.by);
                this.koops = result.koops;
                this.sort.by = result.sortedBy
            },


            async run() {
                this.getCurrentUser();
                await this.getKoops();
                await this.getUserLocation();
                this.setAllKoopData();
                this.helpers.loading(false);
                this.getNotification()
            }

        }
    }
</script>

<style scoped>


  .card-status {
    position: absolute;
    right: 0;
    bottom: 0;
    /*height: 130px;*/
    /*background: #000;*/
  }

</style>
