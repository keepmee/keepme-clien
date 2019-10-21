<template>
  <div class="w-100">
    <div class="koop-image-overlay d-flex justify-content-center align-items-center text-center">
      <blockquote class="groucho text-white w-100 sanchez">
        <span class="mx-2">&#10077;</span>
        {{ koop.title }}
        <span class="mx-2">&#10078;</span>
      </blockquote>
    </div>
    <div class="h-100 w-100">
      <!--      <img :src="koop.image" alt="Image" v-show="koop.image" class="position-absolute">-->

      <!-- MAP -->
      <l-map class="position-absolute h-100 w-100 map-image" :zoom="11" :center="koop.location" ref="koopShowMap">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="koop.location"/>
      </l-map>

    </div>
  </div>
</template>

<script>

    let interval = null

    export default {
        name: "KoopTop",

        props: {
            koop: { required: true }
        },

        data() {
            return {
                url        : "http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                // url        : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                userAddress: null
            }
        },

        mounted() {
            return this.run()
        },

        methods: {

            setControl() {
                return L.Routing.control({
                    waypoints         : [
                        L.latLng(this.koop.location.lat, this.koop.location.lng),
                        L.latLng(this.userAddress.lat, this.userAddress.lng)
                    ],
                    routeWhileDragging: true,
                    accessToken       : 'pk.eyJ1IjoiamF5Z29vZHN3cCIsImEiOiJjaW5scm92bjIweXh2dHRtM2N3Nmdja3QwIn0.tQz7VNzTgdlEuibA5swS3w'
                    // autoZoom          : false,
                    // serviceUrl        : 'http://ro.project-osrm.org/route/v1'
                })
            },

            traceRoute() {
                this.$nextTick(() => {
                    if (this.userAddress)
                        setTimeout(() => {
                            let control = this.setControl()
                            control.on('routingerror', () => {
                                control = this.setControl()
                                control.addTo(this.$refs.koopShowMap.mapObject)
                            })
                            control.addTo(this.$refs.koopShowMap.mapObject);
                        }, 2000)
                })
            },

            async setUserAddress() {
                this.helpers.loading()
                let user = await this.$store.getters.user.storage
                this.userAddress = user && user.address
                    ? { lat: parseFloat(user.address.latitude), lng: parseFloat(user.address.longitude) }
                    : null
                this.helpers.loading(false)
                this.traceRoute()
            },


            run() {
                this.setUserAddress()
            }
        }
    }
</script>

<style>
</style>
