<template>
  <div id="accountSettingsIndex" class="row" v-if="!loading">

    <div class="row w-100 settings-index d-flex align-items-center" v-if="$route.name === 'account.settings.index'">
      <div class="col-12 col-md-3" v-for="link in links" v-if="link.show">
        <div @click="navigate(link)"
             class="settings-link-card mx-auto border border-color-1 border-strong d-flex justify-content-center align-items-center flex-column my-2 rounded cursor-pointer">
          <i :class="link.icon" class="fa-2x color-1 mb-3"></i>
          <span>{{ link.title }}</span>
        </div>
      </div>
    </div>

    <div class="row w-100" v-else>
      <div class="account-settings-sidebar mt-2 mt-md-0" :class="{'small-item': small}">
        <div class="account-settings-sidebar-container border-right border-strong border-color-1">
          <div class="account-settings-sidebar-title bg-color-1 py-2 text-center" v-if="!small">
            <span class="text-white fa-1x5" v-if="small"><i class="fa fa-cogs"></i></span>
            <span class="text-white fa-1x5" v-else>Mon espace client</span>
          </div>

          <div class="account-settings-sidebar-links px-2 border-strong border-color-1 py-2 pb-md-3 pt-md-0"
               :class="{'border-bottom': !small}">
            <div class="account-settings-sidebar-item py-1 cursor-pointer" v-for="link in links"
                 @click="navigate(link)" v-if="link.show">
              <div class="row">
                <div class="col-12 col-md-2 px-0 text-center"><i :class="`${link.icon}${small ? ' fa-1x5' : ''}`"></i>
                </div>
                <div class="col-10 px-0" v-if="!small">{{ link.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="account-settings-main px-md-2" :class="{'small-item': small}">
        <div class="container">
          <page-title :title="getLinkByAction(action).title" :icon="getLinkByAction(action).icon"/>
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

    import PageTitle from "./includes/Title/Page";

    export default {
        name: "AccountSettingsIndex",

        components: { PageTitle, },

        props: {
            action: { type: String, required: false }
        },

        data() {
            return {
                links  : [
                    { title: 'Mon identité', icon: 'fal fa-id-card', action: 'identity', show: true },
                    { title: 'Mon mot de passe', icon: 'fal fa-lock', action: 'password', show: true },
                    { title: 'Mon adresse', icon: 'fal fa-building', action: 'address', show: true },
                    { title: 'Mes enfants', icon: 'fal fa-child', action: 'children', show: true, },
                    { title: 'Mes diplômes', icon: 'fal fa-diploma', action: 'diplomas', show: true, },
                ],
                loading: true,
                small  : false

            }
        },

        created() {
            this.run()
        },

        mounted() {
            this.$store.getters.nannied.then(is => {
                this.links[this.links.findIndex(link => link.action === 'children')].show = !is
                this.links[this.links.findIndex(link => link.action === 'diplomas')].show = is
                this.$forceUpdate()
            }).finally(() => this.loading = false)


            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })


        },

        methods: {

            getWindowWidth() {
                this.small = this.isSmall()
            },

            isSmall(size = 767) {
                return window.innerWidth < size
            },

            getLinkByAction(action) {
                return action ? this.links.find(link => link.action === action) : {}
            },

            getCurrentUser() {
                this.api.get('/users/current').then(
                    (response) => this.user = response.data.data.user
                )
            },

            navigate(link) {
                this.helpers.navigate(this.$router, `account.settings.${link.action}.index`)
            },

            run() {
                this.getCurrentUser()
            }

        }
    }
</script>

<style scoped>

  #accountSettingsIndex .settings-index {
    min-height: calc(100vh - 100px);
  }

  #accountSettingsIndex .settings-link-card {
    max-width: 250px;
    height: 200px;
  }

  .account-settings-sidebar:not(.small-item) {
    width: 200px;
  }

  .account-settings-sidebar.small-item {
    width: 50px;
  }

  .account-settings-main:not(.small-item) {
    width: calc(100% - 200px);
  }

  .account-settings-main.small-item {
    width: calc(100% - 50px);
  }

</style>
