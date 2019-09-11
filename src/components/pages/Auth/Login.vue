<template>
  <auth id="login">

    <form id="formLogin" class="px-0 col-md-10 col-xl-8 mx-auto" @submit.prevent="login()">

      <!--      <div class="row">-->
      <ssf-form-group :row="true" col="col-12" name="email" :object="user" label="Adresse e-mail" @inputted="onInputted"
                      :required="true" icon="fal fa-at"/>
      <!--      </div>-->

      <!--      <div class="row">-->
      <ssf-form-group :row="true" col="col-12" name="password" type="password" :object="user" label="Mot de passe"
                      @inputted="onInputted" :required="true" icon="fal fa-lock"/>
      <!--      </div>-->

      <div class="row">
        <div class="ssf-custom-checkbox col-12">
          <label class="col-12 px-0 mb-4">
            <input type="checkbox" v-model="user.remember"> Se souvenir de mes identifiants
          </label>
        </div>
      </div>

      <div class="row">
        <div class="col-12 ssf-form-group mt-1">

          <router-link :to="{name: 'password.forgot'}">
            <icon icon="lock-forgot-color"/>
            Mot de passe oublié
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-12 ssf-form-group text-right mt-1">
          <button class="btn bg-color-1 btn-block" type="submit">Connexion</button>
        </div>
      </div>

      <div class="row">
        <hr class="w-25 my-4 my-md-5 border-color-1">
      </div>

      <div class="row">
        <div class="col-12 ssf-form-group mt-0">
          <button class="btn border-color-1 color-1 btn-block" @click.prevent="helpers.navigate($router, 'register')">
            Inscription
          </button>
        </div>
      </div>

    </form>

  </auth>
</template>

<script>

    import Icon         from "../../includes/commons/partials/Icon";
    import Auth         from "./Auth";
    import SsfFormGroup from "../../includes/commons/partials/SsfFormGroup";

    import sha1 from 'sha1'

    export default {
        name      : "Login",
        components: { Icon, SsfFormGroup, Auth },
        data() {
            return {
//                user: { email: 'sofiane.akbly@gmail.com', password: 'toto', remember: false },
		user: { email: null, password: null, remember: false },
            }
        },

        methods: {

            onInputted(name, value) {
                this.user[name] = value
                this.$forceUpdate()
            },


            /*setTokenCookie(token) {
                this.cookie.set(this.$store.getters.COOKIE_NAME, token.content, {
                    secure : false,
                    expires: (parseInt(token.expires) / 86400) + 1
                });
            },*/

            /*setUserStorage(user) {
                this.$localStorage.set("user", user)
                this.$store.dispatch('user', user)
            },*/
            /*

            setUserStorage(user) {
                this.$localStorage.set("user", user)
            },

            login() {

                if (!this.validForm()) {
                    this.setFeedback("danger", "Merci de remplir les champs")
                    return false
                }

                let data = JSON.parse(JSON.stringify(this.user));
                data.password = sha1(data.password);

                this.$api.post('/login', data).then(
                    (response) => {
                        if (response && response.data && response.data.data) {
                            if (response.data.data.token)
                                this.setTokenCookie(response.data.data.token)
                            if (response.data.data.user)
                                this.setUserStorage(response.data.data.user)
                        }
                        // this.$helpers.loading()
                        location.reload()
                    },
                    (error) =>
                        (error && error.response && error.response.status === 401) ?
                            this.setFeedback("danger", "Le nom d'utilisateur ou le mot de passe est incorrect") : null
                )
            }

        }
            */

            login() {

                let data = JSON.parse(JSON.stringify(this.user))
                data.password = sha1(data.password)

                this.cookie.delete(this.$store.getters.COOKIE_NAME)
                this.cookie.delete(this.$store.getters.COOKIE_NAME + '-user')


                this.api.post('/login', data).then(
                    (response) => {
                        if (response && response.data && response.data.data) {
                            if (response.data.data.token)
                                this.helpers.setUserToken(response.data.data.token)
                            if (response.data.data.user)
                                this.helpers.setUserStorage(response.data.data.user)
                        }
                        location.reload()
                    },
                    (error) => (error && error.response) ? this.helpers.setFeedback("error", error.response.data.data.error, this) : null
                )
            }

        }
    }
</script>

<style scoped>

  .reset-password-icon {
    position: relative !important;
    height: 35px !important;
    width: 35px !important;
  }

  .reset-password-icon .reset-password-icon-sync,
  .reset-password-icon .reset-password-icon-lock {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .reset-password-icon .reset-password-icon-sync {
    height: 25px;
    width: 25px;
  }

  .reset-password-icon .reset-password-icon-lock {
    height: 10px;
    width: 10px;
  }

</style>
