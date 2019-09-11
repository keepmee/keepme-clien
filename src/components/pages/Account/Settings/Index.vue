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
      <div class="account-settings-sidebar px-2 mt-1">
        <div class="account-settings-sidebar-container border border-color-3 rounded">
          <div class="account-settings-sidebar-title bg-color-1 py-2 text-center">
            <span class="text-white fa-1x5">Mon espace client</span>
          </div>

          <div class="account-settings-sidebar-links px-3">
            <div class="account-settings-sidebar-item py-1 cursor-pointer" v-for="link in links"
                 @click="navigate(link)" v-if="link.show">
              <div class="row">
                <div class="col-2 px-0 text-center"><i :class="link.icon" class="mr-"></i></div>
                <div class="col-9 px-0">{{ link.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="account-settings-main px-2">
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
                loading: true

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
        },

        methods: {

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

  .account-settings-sidebar {
    width: 250px;
  }

  .account-settings-main {
    width: calc(100% - 250px);
  }

</style>
