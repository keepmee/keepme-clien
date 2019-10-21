<template>

  <!-- MAP -->
  <gmap-map
    :center="{ lat: parseFloat(this.$store.getters.user.storage.address.latitude), lng: parseFloat(this.$store.getters.user.storage.address.longitude) }"
    :zoom="10">

    <!-- MARKERS -->
    <gmap-marker :key="index" v-for="(nanny, index) in nannies" :position="position(nanny.user.address)"
                 :clickable="true" @click="onMarkerClick(nanny)"/>
  </gmap-map>

</template>

<script>
    export default {
        name: "NannyViewMap",

        props: {
            nannies: { type: Array || null },
        },


        data() {
            return {
                center      : { lat: 48.856613, lng: 2.352222 },
                radius      : 10000,
                filtered    : null,
                circleBounds: {},
                mapIsDragged: false,
                icon        : null
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


        methods: {
            position(address) {
                return { lat: parseFloat(address.latitude), lng: parseFloat(address.longitude) }
            },

            onMarkerClick(nanny) {
                return this.$emit('nanny-selected', nanny)
            },
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
