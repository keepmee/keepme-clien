<template>
  <settings class="password-container" action="password">
    <form id="formSetPassword" @submit.prevent="save">
      <ssf-form-group :row="true" col="col-12" name="old" :object="password" label="Mot de passe actuel"
                      @inputted="onInputted" :required="true" icon="fal fa-lock" type="password"/>
      <ssf-form-group :row="true" col="col-12" name="new" :object="password" label="Nouveau mot de passe"
                      @inputted="onInputted" :required="true" icon="fal fa-lock" type="password"/>
      <ssf-form-group :row="true" col="col-12" name="confirm" :object="password" icon="fal fa-lock" type="password"
                      label="Confirmation nouveau mot de passe" @inputted="onInputted" :required="true"/>
      <modal-footer class="mt-5" @cancel="onCancel" @confirm="save"/>
    </form>
  </settings>
</template>

<script>

    import sha1 from "sha1";

    import ModalFooter  from "../../../../../includes/commons/ModalFooter";
    import Settings     from "../../Index";
    import SsfFormGroup from "../../../../../includes/commons/partials/SsfFormGroup";

    export default {
        name: "SettingsPasswordIndex",

        components: { ModalFooter, Settings, SsfFormGroup },

        data() {
            return {
                password: { old: null, new: null, confirm: null }
            }
        },

        methods: {

            resetPasswordData() {
                this.password = { old: null, new: null, confirm: null }
            },

            onCancel() {
                return this.resetPasswordData()
            },

            onInputted(name, value) {
                this.password[name] = value
                this.$forceUpdate()
            },

            hashAllPassword() {
                return {
                    old    : sha1(this.password.old),
                    new    : sha1(this.password.new),
                    confirm: sha1(this.password.confirm),
                }
            },

            save() {
                if (!this.password.new || !this.password.confirm || this.password.new !== this.password.confirm)
                    return this.helpers.setFeedback("error", "Le mot de passe et la confirmation ne correspondent pas", this)
                let data = this.hashAllPassword()
                this.api.put('/password/users', -1, data).then(
                    () => this.helpers.setFeedback('success', null, this) && this.resetPasswordData(),
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this),
                )
            }
        }
    }
</script>

<style scoped>

</style>
