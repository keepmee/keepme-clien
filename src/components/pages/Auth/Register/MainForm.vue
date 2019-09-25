<template>
  <div class="col-12 col-lg-10 col-xl-9 px-0 mx-auto">
    <form id="formRegister" class="w-100" @submit.prevent="register()">

      <div class="row">

        <ssf-form-group col="col-12 col-lg-6" name="lastname" :object="user" label="Nom" @inputted="onInputted"
                        :required="true" icon="fal fa-user"/>

        <ssf-form-group col="col-12 col-lg-6" name="firstname" :object="user" label="Prénom" @inputted="onInputted"
                        :required="true" icon="fal fa-user"/>

      </div>

      <ssf-form-group :row="true" col="col-12" name="email" :object="user" label="Adresse e-mail" @inputted="onInputted"
                      :required="true" icon="fal fa-at"/>

      <ssf-form-group :row="true" col="col-12" name="password" :object="user" label="Mot de passe"
                      @inputted="onInputted" type="password" :required="true" icon="fal fa-lock" :autocomplete="true"/>

      <ssf-form-group :row="true" col="col-12" name="confirm_password" :object="user" label="Confirmation mot de passe"
                      @inputted="onInputted" type="password" :required="true" icon="fal fa-lock" :autocomplete="true"/>

      <div class="row col-12 ssf-form-group">
        <button class="btn bg-color-1 btn-block mt-1">Enregistrer</button>
      </div>

    </form>
  </div>
</template>

<script>

    import sha1         from 'sha1'
    import SsfFormGroup from "../../../includes/commons/partials/SsfFormGroup";

    export default {
        name      : "MainForm",
        components: { SsfFormGroup },
        props     : ['birthday', 'role'],

        data() {
            return {
                user  : {},
                errors: {}
            }
        },

        created() {
            this.resetUser()
            this.resetErrors()
        },

        methods: {

            onInputted(name, value) {
                this.user[name] = value
                this.$forceUpdate()
            },

            resetUser() {
//                this.user = {
//                    firstname       : 'Sofiane',
//                    lastname        : 'Akbly',
//                    email           : 'sofiane.akbly@gmail.com',
//                    password        : 'toto',
//                    confirm_password: 'toto',
//                }
                this.user = { firstname: null, lastname: null, email: null, password: null, confirm_password: null }
            },

            resetErrors() {

                Object.keys(this.user).map((key) => {
                    this.errors[key] = false
                })
                // this.errors = { firstname: false, lastname: false, email: false, password: false, confirm_password: false }
            },

            checkField() {
                let value, error = false
                Object.keys(this.user).map((key) => {
                    value = this.user[key]
                    if (key !== 'birthday' && (!value || value === '')) {
                        error = true
                        this.errors[key] = true
                    } else
                        this.errors[key] = false
                })
                this.errors = JSON.parse(JSON.stringify(this.errors))
                return !error
            },

            checkPassword() {
                if (!(this.user.password === this.user.confirm_password)) {
                    this.errors.password = true
                    this.errors.confirm_password = true
                    return false
                }
                return true
            },

            register() {
                if (!(this.checkField() && this.checkPassword()))
                    return false

                this.user.birthday = this.birthday
                this.user.role = this.role

                let data = this.helpers.clone(this.user)
                data.password = sha1(data.password)
                delete data.confirm_password


                this.api.post('/register', data).then(
                    (response) => {
                        if (response && response.data && response.data.data) {
                            if (response.data.data.token)
                                this.helpers.setUserToken(response.data.data.token)
                            if (response.data.data.user)
                                this.helpers.setUserStorage(response.data.data.user)
                        }
                        location.reload()
                    },
                    (error) => {
                        this.resetErrors()
                        return (error && error.response)
                            ? this.helpers.setFeedback("error", error.response.data.error, this)
                            : null
                    }
                )

            }

        }

    }
</script>

<style scoped>

</style>
