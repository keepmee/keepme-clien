<template>

  <!-- MAP -->
  <l-map class="position-relative mw-100" :zoom="11" :center="center" @update:zoom="onZoomUpdated"
         @drag="onMapDrag" ref="myMap" @update:center="onCenterUpdated" v-if="center">
    <l-tile-layer :url="url"></l-tile-layer>

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
                @click.stop="onCenterUpdated({lat: result.lat, lng: result.lon}, true)">
              {{ result.display_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <l-circle :lat-lng="center" :radius="radius" color="#000" fill-color="#000"/>
    <l-marker :key="index" v-for="(koop, index) in koops" :lat-lng="koop.location" @click="openPopup($event, koop)">
      <l-popup class="m-0">
        <koop-view-list :koop="koop" :small="true"/>
      </l-popup>
    </l-marker>
  </l-map>


  <!--<gmap-map :center="center" :zoom="10" @dragstart="dragMapStart()" @dragend="dragMapEnd()"
            @click="setCenter($event, true)" v-if="center">

    &lt;!&ndash; MARKERS &ndash;&gt;
    <gmap-marker :key="index" v-for="(koop, index) in koops" :position="koop.location" :clickable="true"
                 @click="onMarkerClick(koop)" v-if="isVisibleKoop(koop)"/>

    &lt;!&ndash; CIRCLE &ndash;&gt;
    <gmap-circle ref="circle" :bounds="circleBounds" :center="center" :radius="radius" :editable="true"
                 :draggable="false" @dragend="updateCenter($event)" @center_changed="updateCircle('center', $event)"
                 @radius_changed="updateCircle('radius', $event)" @bounds_changed="updateCircle('bounds', $event)"
                 v-if="radius !== null"/>

  </gmap-map>-->

</template>

<script>

    import http from "axios";

    // import * as Leaflet from 'leaflet-routing-machine'

    // import VGeosearch              from 'vue2-leaflet-geosearch';
    import {OpenStreetMapProvider} from 'leaflet-geosearch';

    import KoopViewList from "./List";

    export default {
        name      : "KoopViewMap",
        components: { KoopViewList },
        props     : ['koops', 'mapCenter', 'circleRadius', 'isVisibleKoop'],


        component: {},

        data() {
            return {
                url         : "http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                // url         : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                center      : { lat: 48.856613, lng: 2.352222 },
                radius      : 10000,
                filtered    : null,
                circleBounds: {},
                mapIsDragged: false,
                icon        : null,
                mapIsZoomed : false,

                userAddress: null,

                show       : {
                    searchInput: false
                },
                searchInput: null,
                results    : null
            }
        },

        watch: {
            circleRadius(value) {
                this.radius = value
            },
            mapCenter(value) {
                this.center = value
            }
        },

        created() {
            return this.run()
        },

        mounted() {
            this.$nextTick(() => {
                // this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
                // console.log(this.$refs.myMap.mapObject)
            })
        },

        methods: {


            openPopup(event, koop) {
                this.$nextTick(() => {
                    event.target.openPopup();
                    return this.$emit('koop-selected', koop);
                })
            },

            onSearchAddress() {
                if (this.searchInput && this.searchInput.length > 3)
                    http.get(`https://nominatim.openstreetmap.org/search?format=json&country=france&q=${encodeURIComponent(this.searchInput.trim())}`).then(
                        (response) => this.results = response.data,
                        (error) => console.log(error)
                    )
            },

            test() {
                console.log('test')
            },

            onZoomUpdated(zoom) {
                this.mapIsZoomed = !(zoom === this.zoom)
                this.zoom = zoom
            },

            onCenterUpdated(location, user = false) {
                let tmp = { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }
                if (!this.mapIsZoomed)
                    this.setCenter(tmp)
                if (user)
                    this.userAddress = tmp
                this.mapIsZoomed = false
                this.show.searchInput = false
                this.searchInput = null
                this.results = null
            },

            boundsUpdated() {

            },

            onMarkerClick(koop) {
                return this.$emit('koop-selected', koop)
            },

            updateCircle(prop, value) {
                if (prop === 'radius')
                    return this.$emit('setRadius', value)
            },

            setCenter(location, mapZoom = false) {
                if (mapZoom === true)
                    location = { lat: location.latLng.lat(), lng: location.latLng.lng() }
                if (!this.mapIsDragged)
                    this.$emit('setCenter', location)
            },

            updateCenter() {
                this.setCenter({
                    lat: this.$refs.circle.$circleObject.center.lat(),
                    lng: this.$refs.circle.$circleObject.center.lng()
                })
            },

            onMapDrag() {
                this.center = {
                    lat: this.$refs.myMap.mapObject.getCenter().lat,
                    lng: this.$refs.myMap.mapObject.getCenter().lng
                }
            },

            dragMapStart($event) {
                // this.mapIsDragged = true
            },

            dragMapEnd() {
                // this.mapIsDragged = false
            },

            async setUserAddress() {
                this.helpers.loading()
                let user = await this.$store.getters.user.storage
                this.userAddress = {
                    lat: parseFloat(user && user.address ? user.address.latitude : this.center.lat),
                    lng: parseFloat(user && user.address ? user.address.longitude : this.center.lng)
                }
                this.setCenter(this.userAddress)
                this.helpers.loading(false)
            },


            run() {
                this.setUserAddress()
            }

        }
    }
</script>

<style>

  .vue-map-container {
    /*height: 75vh !important;*/
    width: 100%;
    /*margin-bottom: 25vh;*/
  }

  .leaflet-routing-container.leaflet-bar.leaflet-routing-collapsible.leaflet-control {
    display: none !important;
  }

  .leaflet-control-zoom.leaflet-bar.leaflet-control {
    border: none !important;
  }

  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    line-height: inherit !important;
  }

  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out,
  .custom-geo-search .icon {
    border: 1px solid #dee2e6 !important;
    font-size: 18px !important;
    box-sizing: border-box !important;
    margin-top: 3px !important;
    margin-bottom: 3px !important;
    border-radius: 6px !important;
  }

  .custom-geo-search {
    top: 80px;
    left: 0;
    right: 0;
    width: 100%;
    line-height: 30px;
    z-index: 1050;
  }

  .custom-geo-search .icon {
    margin-left: 10px;
  }

  .custom-geo-search .icon,
  .custom-geo-search input[type=search] {
    height: 30px;
    width: 30px;
    margin-top: 3px !important;
    margin-bottom: 0 !important;
  }

  .custom-geo-search input[type=search],
  .custom-geo-search input[type=search]:focus {
    top: 0;
    left: 40px;
    right: 3px;
    margin-left: 2px;
    width: calc(100% - 45px);
    outline: none !important;
    box-shadow: none !important;
  }
</style>
