<template>

  <!-- MAP -->
  <l-map class="position-relative mw-100" :zoom="11" :center="center" @update:zoom="zoomUpdated"
         @drag="onMapDrag" ref="myMap" @update:center="centerUpdated" v-if="center">
    <l-tile-layer :url="$store.getters.OSMURL"></l-tile-layer>

    <div class="custom-geo-search position-absolute">

      <div class="bg-white border text-center cursor-pointer icon" @click="show.searchInput = !show.searchInput">
        <i class="fa fa-xs fa-search"></i>
      </div>
      <div class="search-input-container">
        <input type="search" class="form-control position-absolute" v-model="searchInput" @input="onSearchAddress"
               v-if="show.searchInput" autofocus>
        <div class="bg-white">
          <ul class="pl-0" v-if="results">
            <li v-for="result in results" class="cursor-pointer small"
                @click.stop="updateUserStorage(result)">
              {{ result.display_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <l-circle :lat-lng="center" :radius="radius" color="#000" fill-color="#000"/>
    <l-marker :key="index" v-for="(nanny, index) in nannies" :lat-lng="position(nanny.user.address)"
              @click="openPopup($event, nanny)" v-if="nannies && position(nanny.user.address)">
      <!--              @click="onMarkerClick(koop)" :icon="markerIcon()">-->
      <l-popup class="m-0">
        <nanny-view-list :nanny="nanny"/>
        <!--        <koop-view-list :koop="koop" :small="true"/>-->
      </l-popup>
    </l-marker>
  </l-map>


  <!-- MAP -->
  <!--<gmap-map
    :center="{ lat: parseFloat(this.$store.getters.user.storage.address.latitude), lng: parseFloat(this.$store.getters.user.storage.address.longitude) }"
    :zoom="10">

    &lt;!&ndash; MARKERS &ndash;&gt;
    <gmap-marker :key="index" v-for="(nanny, index) in nannies" :position="position(nanny.user.address)"
                 :clickable="true" @click="onMarkerClick(nanny)"/>
  </gmap-map>-->

</template>

<script>
    import NannyViewList from "./List";

    import http from 'axios'

    export default {
        name      : "NannyViewMap",
        components: { NannyViewList },
        props     : {
            nannies: { type: Array || null },
        },


        data() {
            return {
                // url         : $store.getters.OSMURL,
                center      : { lat: 48.856613, lng: 2.352222 },
                radius      : 10000,
                filtered    : null,
                circleBounds: {},
                mapIsDragged: false,
                icon        : null,


                show       : {
                    searchInput: false
                },
                searchInput: null,
                results    : null
            }
        },


        /*created() {
            this.$getLocation({ enableHighAccuracy: true }).then(coordinates => {
                this.center = JSON.parse(JSON.stringify(coordinates))
            })
        },
*/
        watch: {
            circleRadius(value) {
                this.radius = value
            },
            mapCenter(value) {
                this.center = value
            }
        },

        mounted() {
            return this.run()
        },


        methods: {
            position(address) {
                return address === null ? null : {
                    lat: parseFloat(address.latitude),
                    lng: parseFloat(address.longitude)
                }
            },

            onSearchAddress() {
                if (this.searchInput && this.searchInput.length > 3)
                    http.get(`https://nominatim.openstreetmap.org/search?format=json&country=france&q=${encodeURIComponent(this.searchInput.trim())}`).then(
                        (response) => this.results = response.data,
                        (error) => console.log(error)
                    )
            },

            onMarkerClick(nanny) {
                return this.$emit('nanny-selected', nanny)
            },

            zoomUpdated(zoom) {
                this.mapIsZoomed = !(zoom === this.zoom)
                this.zoom = zoom
            },

            updateUserStorage(result) {
                let user = this.$localStorage.get('user')
                user.address = {
                    address_line1: result.display_name,
                    latitude     : result.lat,
                    longitude    : result.lon
                }
                this.centerUpdated({ lat: result.lat, lng: result.lon }, true)
                this.$localStorage.set('user', this.helpers.clone(user))
                this.$forceUpdate()
                setTimeout(() => {
                    this.$emit('address-updated')
                    this.setUserAddress()
                }, 1000)
            },

            centerUpdated(location, user = false) {
                let tmp = { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }
                if (!this.mapIsZoomed)
                    this.center = this.helpers.clone(tmp)
                if (user)
                    this.userAddress = tmp
                this.mapIsZoomed = false
                this.show.searchInput = false
                this.searchInput = null
                this.results = null
            },

            onMapDrag() {
                this.center = {
                    lat: this.$refs.myMap.mapObject.getCenter().lat,
                    lng: this.$refs.myMap.mapObject.getCenter().lng
                }
            },

            async setUserAddress() {
                this.helpers.loading()
                let user = await this.helpers.getUserStorage()
                this.center = user && user.address ? {
                    lat: user.address.latitude,
                    lng: user.address.longitude
                } : this.center
                this.helpers.loading(false)
            },

            openPopup(event, nanny) {
                this.$nextTick(() => {
                    event.target.openPopup();
                    return this.$emit('nanny-selected', nanny);
                })
            },


            run() {
                this.setUserAddress()
            }
        }
    }
</script>

<style scoped>

  .vue-map-container {
    /*height: 75vh !important;*/
    width: 100%;
    /*margin-bottom: 25vh;*/
  }

</style>
