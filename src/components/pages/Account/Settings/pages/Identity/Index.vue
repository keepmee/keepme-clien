<template>
  <settings class="identity-container" action="identity">
    <form id="formGeneral" class="w-100 mx-auto" @submit.prevent="save">

      <div class="row">
        <ssf-form-group col="col-12 col-md-6" name="lastname" :object="user.current" label="Nom de famille"
                        @inputted="onInputted" :required="true" icon="fal fa-user"/>

        <ssf-form-group col="col-12 col-md-6" name="firstname" :object="user.current" label="Prénom"
                        @inputted="onInputted" :required="true" icon="fal fa-user"/>
      </div>

      <ssf-form-group :row="true" col="col-12" name="phone" :object="user.current" label="Numéro de téléphone"
                      @inputted="onInputted" icon="fal fa-mobile" autocomplete="tel"/>

      <ssf-form-group :row="true" col="col-12" name="email" :object="user.current" label="Adresse e-mail"
                      @inputted="onInputted" :required="true" icon="fal fa-envelope"/>

      <div class="row col-12">
        <div class="ssf-form-group">
          <date-picker ref="datePicker" name="birthday" v-model="user.current.birthday" format="dd-MM-yyyy"
                       :monday-first="true" :language="fr" :open-date="dates.open" input-class="form-control"
                       id="birthday"/>
          <label :class="{'input-active': helpers.isLabelActive(user.current, 'birthday')}">
            <i class="fal fa-calendar-alt mr-1"></i>Date de naissance (*)
          </label>
        </div>
      </div>

      <modal-footer @cancel="cancel" @confirm="save" class="mt-5"/>

    </form>
  </settings>
</template>

<script>

    import helpers      from "../../../../../../app/helpers";
    import ModalFooter  from "../../../../../includes/commons/ModalFooter";
    import SsfFormGroup from "../../../../../includes/commons/partials/SsfFormGroup";
    import Settings     from "../../Index";
    import PageTitle    from "../../includes/Title/Page";

    import DatePicker from 'vuejs-datepicker'

    import {fr} from 'vuejs-datepicker/dist/locale'

    export default {
        name: "SettingsIdentityIndex",

        components: {
            ModalFooter,
            SsfFormGroup,
            Settings,
            PageTitle,
            DatePicker
        },

        data() {
            return {
                user : { current: {} },
                dates: { open: new Date() },
                fr,
            }
        },

        created() {
            return this.run()
        },

        methods: {

            getCurrentUser() {
                return new Promise((resolve, reject) => {
                    this.$store.getters.user.database().then((response) => {
                        this.user.current = response
                        this.user.back = this.helpers.clone(response)
                        return resolve(true)
                    }, () => reject(false))
                })
            },

            setOpenDate() {
                if (this.user.current.birthday) {
                    this.dates.open = new Date(this.user.current.birthday)
                } else {
                    this.dates.open = this.helpers.moment()
                    this.dates.open.add(-18, 'year')
                    this.dates.open = new Date(this.dates.open)
                    this.dates.open.setHours(14)
                }
            },

            onInputted(name, value) {
                this.user.current[name] = value
                this.$forceUpdate()
            },

            cancel() {
                this.swal({
                    type             : 'question',
                    title            : "Un instant...",
                    text             : "Êtes-vous sûr de vouloir annuler vos modification ?",
                    confirmButtonText: 'Oui', confirmButtonClass: 'btn bg-color-1',
                    cancelButtonText : 'Non', cancelButtonClass: 'btn danger-color-dark', showCancelButton: true
                }).then(answer => answer.value ? this.user.current = this.helpers.clone(this.user.back) : true)

            },

            save() {
                if (!this.helpers.equals(this.user.current, this.user.back))
                    this.api.put('/users', this.user.back.id, this.user.current).then(
                        () => {
                            this.helpers.setFeedback("success", null, this)
                            return this.run()
                        },
                        (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this))
            },

            async run() {
                await this.getCurrentUser()
                this.setOpenDate()
            }


        }
    }
</script>

<style scoped>

</style>
