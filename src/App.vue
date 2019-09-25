<template>
  <div id="app">

    <vue-navbar class="bg-color-4 color-1" :links="links" v-if="isVisibleNavbar()" @custom-action="onCustomAction"
                :right="true" :fixed="true" :show-title="false">
      <template slot="brand" @click="navigate('koops.index')">
        <logo :size="30"/>
      </template>
    </vue-navbar>

    <router-view v-if="loaded" class="main-container" :key="`${$route.fullPath}-${naviteration}`"
                 :class="{'padding': isVisibleNavbar() && $route.name !== 'account.profile.notifications'}"/>

    <notifications v-show="show.notifications" :show="show.notifications" @navigated="toggleNotifications(false)"/>

    <preload @loaded="loaded = true"/>

    <form-load/>

    <modal-form-response/>

    <!-- MODAL CREATE KOOP -->
    <modal-create-koop/>

    <x-footer v-if="isVisibleFooter()"/>


  </div>
</template>

<script>

    import FormLoad          from './components/includes/commons/FormLoad'
    import Preload           from './components/includes/commons/Preload'
    import ModalFormResponse from "./components/includes/commons/FormResponse"
    import XFooter           from "./components/includes/commons/partials/XFooter"
    import Logo              from './components/includes/commons/Logo'

    import VueNavbar from '../ssf_modules/vue-navbar'

    import NavbarLinks     from './app/router/links/navbar'
    import Notifications   from "./components/pages/Account/Profile/Notifications";
    import ModalCreateKoop from './components/pages/Koops/Create'

    export default {
        name: 'App',

        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title        : 'KeepMe | Trouver une nounou en mieux',
            // all titles will be injected into this template
            titleTemplate: '%s | KeepMe'
        },

        components: {
            Notifications,
            FormLoad,
            Preload,
            ModalFormResponse,
            XFooter,
            Logo,
            ModalCreateKoop,

            VueNavbar,
        },

        data() {
            return {
                links       : NavbarLinks,
                loaded      : false,
                naviteration: 0,
                show        : {
                    notifications: false
                }
            }
        },

        mounted() {
            this.loaded = this.isVisibleNavbar()
        },

        methods: {

            isVisibleFooter() {
                return !(this.$route && (['login', 'register', 'logout', 'password.forgot', 'password.reset'].find(route => route === this.$route.name)))
            },

            isVisibleNavbar() {
                return !(this.$route && (['login', 'register', 'home'].find(route => route === this.$route.name)))
            },

            onCustomAction(action) {
                return eval(this[action]())
            },

            navigate(name) {
                return this.helpers.navigate(this.$router, name)
            },

            showCreateKoopsModal() {
                // if (this.$route.name === 'koops.index')
                this.$modal.show('modal-create-koop');
                // else {
                //     this.$router.push({ name: 'koops.index' });
                //     setTimeout(() => {
                //         this.$modal.show('modal-create-koop')
                //     }, 1000)
                // }
            },

            toggleNotifications(value = null) {
                this.naviteration += value === false ? 1 : 0;
                return this.show.notifications = value === null ? !this.show.notifications : value
            }

        }
    }
</script>

<style>

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .main-container {
    min-height: 100vh;
  }

  .main-container.padding {
    padding-top: 100px;
  }

  .ssf-vue-navbar {
    min-height: 100px !important;
  }

  .ssf-vue-navbar .ssf-vue-navbar-list .ssf-vue-navbar-item.active-item .ssf-vue-navbar-link:not(.ssf-vue-dropdown-item),
  .ssf-vue-navbar .ssf-vue-navbar-link.ssf-vue-navbar-dropdown .ssf-vue-dropdown-menu .ssf-vue-navbar-link.ssf-vue-dropdown-item.active-item {
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
    background-color: #110c11 !important;
    color: #fff !important;
  }

  .ssf-vue-navbar .ssf-vue-navbar-list .ssf-vue-navbar-item.active-item .ssf-vue-navbar-link:not(.ssf-vue-dropdown-item) {
    border-radius: 6px !important;
  }

  .ssf-vue-navbar-toggle {
    width: 100% !important;
    background-color: #EBC8B2 !important;
    color: #fff;
    margin-top: 0 !important;
    padding: 10px 0 !important;
    height: auto !important;
  }

  .ssf-vue-navbar .ssf-vue-navbar-link.ssf-vue-navbar-dropdown .ssf-vue-dropdown-menu {
    background-color: #EBC8B2;
    color: #fff;
  }

  .ssf-vue-navbar .ssf-vue-navbar-list .ssf-vue-navbar-item.active-item .ssf-vue-navbar-link:not(.ssf-vue-dropdown-item),
  .ssf-vue-navbar-link:not(.ssf-vue-dropdown-item) {
    padding: 0 !important;
    height: 40px;
    width: 40px;
    /*border-radius: 50% !important;*/
  }

  .v--modal-overlay {
    z-index: 1051 !important;
  }

</style>
