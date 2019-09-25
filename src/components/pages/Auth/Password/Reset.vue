<template>
  <auth id="resetPassword">
    <form id="formResetPassword" class="px-0 col-md-10 col-xl-8 mx-auto" @submit.prevent="send">
      <ssf-form-group :row="true" col="col-12" name="email" :object="user" label="Adresse e-mail" @inputted="onInputted"
                      :required="true" icon="fal fa-at"/>

      <ssf-form-group :row="true" col="col-12" name="password" :object="user" label="Nouveau mot de passe"
                      type="password" @inputted="onInputted" :required="true" icon="fal fa-lock" :autocomplete="true"/>

      <ssf-form-group :row="true" col="col-12" name="confirm_password" :object="user" label="Confirmation mot de passe"
                      type="password" @inputted="onInputted" :required="true" icon="fal fa-lock" :autocomplete="true"/>

      <div class="row col-12 ssf-form-group ">
        <button class="btn bg-color-1 btn-block m-0" type="submit">Enregister la modification</button>
      </div>

    </form>
  </auth>
</template>

<script>
    import Auth         from "../Auth";
    import SsfFormGroup from "../../../includes/commons/partials/SsfFormGroup";

    import sha1 from 'sha1'

    export default {
        name      : "Reset",
        components: { Auth, SsfFormGroup },

        data() {
            return {
                user: {}
            }
        },

        created() {
            this.run()
        },

        methods: {
            onInputted(name, value) {
                this.user[name] = value
                this.$forceUpdate()
            },

            checkPassword() {
                if (this.user.password === '' || this.user.confirm_password === '' || !(this.user.password === this.user.confirm_password)) {
                    this.helpers.setFeedback("error", "Les mots de passe ne correspondent pas", this)
                    return false
                }
                return true
            },

            send() {

                if (!(this.checkPassword()))
                    return false

                let data = this.helpers.clone(this.user)
                data.password = sha1(data.password)
                delete data.confirm_password

                this.api.post('/password/reset', data).then(
                    (response) => {
                        this.helpers.setFeedback("success", null, this)
                        setTimeout(() => {
                            if (response && response.data && response.data.data) {
                                if (response.data.data.token)
                                    this.helpers.setUserToken(response.data.data.token)
                                if (response.data.data.user)
                                    this.helpers.setUserStorage(response.data.data.user)
                            }
                            location.reload()
                        }, 1500)
                    },
                    (error) => {
                        console.log(error, error.response)
                        return (error && error.response) ? this.helpers.setFeedback("error", error.response.data.data.error || null, this) : null
                    }
                )
            },

            run() {
                if (this.$route.params.email) this.onInputted('email', atob(this.$route.params.email))
            }
        }
    }
</script>

<style scoped>

</style>
