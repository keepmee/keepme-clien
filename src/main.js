// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue           from 'vue'
import Vue2Filters   from 'vue2-filters'
import VueWebStorage from 'vue-web-storage'
import VueMeta       from 'vue-meta'

import VueModal            from 'vue-js-modal'
import VueCarousel3d       from 'vue-carousel-3d'
import VueTextareaAutosize from 'vue-textarea-autosize'

import VueBrowserGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps    from 'vue2-google-maps'

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import cookie from 'json-cookie'
import swal   from 'sweetalert2'

import App     from './App'
import helpers from './app/helpers'
import router  from './app/router'
import store   from './app/store'
import api     from './app/api'

import {LMap, LTileLayer, LMarker, LCircleMarker, LCircle, LPopup, LControl} from 'vue2-leaflet';
import VGeosearch                                                            from 'vue2-leaflet-geosearch';

import {Icon} from 'leaflet';
import "leaflet/dist/leaflet.css"
// import "leaflet-geosearch/dist/style.css"
import "leaflet-geosearch/assets/css/leaflet.css"
// leaflet-geosearch@2.6.0/assets/css/leaflet.css
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine/dist/leaflet.routing.icons.png'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  // iconRetinaUrl: require('./assets/img/icons/map-marker-2x.png'),
  iconUrl      : require('./assets/img/icons/map-marker.png'),
  // shadowUrl    : require('./assets/img/icons/map-marker.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // iconUrl      : require('leaflet/dist/images/marker-icon.png'),
  shadowUrl    : require('leaflet/dist/images/marker-shadow.png')
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
// Vue.component('l-circle-marker', LCircleMarker);
Vue.component('l-circle', LCircle);
Vue.component('l-popup', LPopup);
// Vue.component('l-control', LControl);

Vue.use(VueModal);
Vue.use(Vue2Filters);
Vue.use(VueCarousel3d);
Vue.use(VueBrowserGeolocation);
Vue.use(VueTextareaAutosize);
Vue.use(VueWebStorage, { prefix: store.getters.storage.prefix });
Vue.use(VueMeta);


Vue.use(VueGoogleMaps, {
  load: {
    // key      : store.getters.GMAPS_KEY,
    // key      : 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
});

// AOS.init();

/*AOS.init({
  // Global settings:
  disable                : false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent             : 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName          : 'aos-init', // class applied after initialization
  animatedClassName      : 'aos-animate', // class applied on animation
  useClassNames          : true, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay          : 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay          : 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset         : -120, // offset (in px) from the original trigger point
  delay          : 0, // values from 0 to 3000, with step 50ms
  duration       : 400, // values from 0 to 3000, with step 50ms
  easing         : 'linear', // default easing for AOS animations
  once           : false, // whether animation should happen only once - while scrolling down
  mirror         : false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-center', // defines which position of the element regarding to window should trigger the animation

})*/

// You can also pass an optional settings object
// below listed default settings

Vue.config.productionTip = false;

Vue.prototype.api = api;
Vue.prototype.helpers = helpers;
Vue.prototype.swal = swal;
Vue.prototype.cookie = cookie;

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
};

new Vue({
  created() {
    AOS.init({
      duration: 1000
    })
  },
  el    : '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
