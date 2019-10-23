<template>
  <auth id="forgotPassword">

    <form id="formForgotPassword" class="px-0 col-12" @submit.prevent="send">

      <ssf-form-group :row="true" col="col-12" name="email" :object="user" label="Adresse e-mail" @inputted="onInputted"
                      :required="true" icon="fal fa-at"/>

      <div class="row col-12 ssf-form-group mt-1">
        <button class="btn bg-color-1 btn-block" type="submit">Envoyer le lien de réinitialisation</button>
      </div>

      <div class="row col-12 ssf-form-group mt-1">
        <ul class="fa-ul">
          <li v-for="link in links">
            <router-link :to="{name: link.route}">
              <span class="fa-li"><i :class="link.icon"></i></span>{{ link.label }}
            </router-link>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </form>

  </auth>
</template>

<script>

    import Auth         from "../Auth";
    import SsfFormGroup from "../../../includes/commons/partials/SsfFormGroup";

    export default {
        name      : "Forgot",
        components: { Auth, SsfFormGroup },

        data() {
            return {
                user : {},
                links: [
                    { icon: 'far fa-user-plus', label: "Je souhaite m'inscrire", route: 'register' },
                    { icon: 'far fa-sign-in', label: "Je souhaite me connecter", route: 'login' },
                ]
            }
        },

        methods: {

            onInputted(name, value) {
                this.user[name] = value
                this.$forceUpdate()
            },

            send() {
                this.api.post('/password/forgot', this.user).then(
                    () => this.helpers.setFeedback("success", "Veuillez suivre les instructions reçues par mail. (Vérifiez vos spams)", this),
                    (error) => this.helpers.setFeedback("error", (error && error.response && error.response.data.data) ? error.response.data.data.error || null : null, this)
                )
            }

        }
    }
</script>

<style scoped>

</style>
