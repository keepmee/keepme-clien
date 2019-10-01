<template>
  <settings class="address-container" action="address">
    <form id="formGeneral" class="w-100 mx-auto" @submit.prevent="save">

      <!--<div class="row">
        <ssf-form-group col="col-6 col-md-3" name="number" :object="address.current" label="Numéro"
                        @inputted="onInputted" :required="true" type="number" autocomplete="shipping street-address"/>

        <ssf-form-group col="col-6 col-md-3" name="number_2" :object="address.current" label="Cpt. numéro"
                        @inputted="onInputted"/>

        <ssf-form-group col="col-12 col-md-6" name="firstname" :object="address.current"
                        label="Type de voie <span class='font-italic'>(rue, avenue etc.)</span>"
                        @inputted="onInputted" :required="true" icon="fal fa-address"
                        autocomplete="shipping street-address"/>
      </div>-->

      <ssf-form-group :row="true" col="col-12" name="address_line1" :object="address.current" label="Adresse"
                      @inputted="onInputted" :required="true" autocomplete="shipping address-line1"/>

      <ssf-form-group :row="true" col="col-12" name="address_line2" :object="address.current"
                      label="Complément d'adresse" @inputted="onInputted"/>

      <div class="row">
        <ssf-form-group col="col-12 col-md-4" name="postcode" :object="address.current" label="Code postal"
                        @inputted="onInputted" :required="true" autocomplete="postal-code"/>

        <ssf-form-group col="col-12 col-md-8" name="city" :object="address.current" label="Ville"
                        @inputted="onInputted" :required="true" autocomplete="locality"/>
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
    import axios      from 'axios'

    import {fr} from 'vuejs-datepicker/dist/locale'

    export default {
        name: "SettingAddressIndex",

        components: {
            ModalFooter,
            SsfFormGroup,
            Settings,
            PageTitle,
            DatePicker
        },

        data() {
            return {
                address: { current: {} },
                dates  : { open: new Date() },
                fr,
            }
        },

        created() {
            return this.run()
        },

        methods: {

            onZipCodeInput() {
                if (this.address.current.zipcode && this.address.current.zipcode.length >= 4)
                    axios.get(`https://geo.api.gouv.fr/communes?codePostal=${this.address.current.zipcode}`).then((r) => {
                        if (r.data && r.data.length > 0) {
                            this.address.current.city = r.data[0].nom
                            this.address.current = this.helpers.clone(this.address.current)
                            this.$forceUpdate()
                        }
                    })
            },

            getUserAddress() {
                this.api.get('/addresses/current').then((response) => {
                    if (response.data.data.address !== null)
                        this.address.current = response.data.data.address
                    this.address.back = this.helpers.clone(this.address.current)
                    let user = this.$store.getters.user.storage
                    user.address = response.data.data.address === null ? null : this.helpers.clone(this.address.current)
                    console.log(response.data.data)
                    this.$localStorage.set('user', user)
                })
            },

            onInputted(name, value) {
                this.address.current[name] = value
                if (name === 'zipcode')
                    this.onZipCodeInput()
                this.$forceUpdate()
            },

            cancel() {
                this.swal({
                    type             : 'question',
                    title            : "Un instant...",
                    text             : "Êtes-vous sûr de vouloir annuler vos modification ?",
                    confirmButtonText: 'Oui', confirmButtonClass: 'btn bg-color-1',
                    cancelButtonText : 'Non', cancelButtonClass: 'btn danger-color-dark', showCancelButton: true
                }).then(answer => answer.value ? this.address.current = this.helpers.clone(this.address.back) : true)

            },

            save() {
                if (!this.helpers.equals(this.address.current, this.address.back) || (this.address.current.latitude === null || this.address.current.longitude === null))
                    axios.get('https://nominatim.openstreetmap.org/search?q=' + `${this.address.current.address_line1}+${this.address.current.postcode}+${this.address.current.city}` + '&format=json').then((r) => {
                        if (r.data && r.data.length > 0) {
                            this.address.current.latitude = parseFloat(r.data[0].lat)
                            this.address.current.longitude = parseFloat(r.data[0].lon)
                            this.address.current = this.helpers.clone(this.address.current)
                        }
                        this.api.put('/addresses', this.address.back.id ? this.address.back.id : -1, this.address.current).then(
                            () => {
                                this.helpers.setFeedback("success", null, this)
                                return this.run()
                            },
                            (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                        )
                    })
            },

            run() {
                this.getUserAddress()
            }


        }
    }
</script>

<style scoped>

</style>
