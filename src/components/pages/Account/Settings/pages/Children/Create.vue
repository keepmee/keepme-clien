<template>
  <modal name="modal-create-child" :click-to-close="false" height="auto" :adaptive="true" :reset="true"
         :scrollable="true" class="py-2" @before-open="onBeforeOpen">

    <div class="vmodal-header px-4">
      <button class="btn z-depth-0 color-1 btn-block bg-transparent" @click="hideModal()">
        <i class="fal fa-times fa-2x"></i>
      </button>
      <hr class="w-100 border-color-1">
    </div>

    <div class="vmodal-body p-4">

      <form id="formChildren" @submit.prevent="save">

        <div class="row">

          <ssf-form-group col="col-12 col-md-6" name="lastname" :object="child" label="Nom de famille"
                          @inputted="onInputted" :required="true" icon="fal fa-user"/>

          <ssf-form-group col="col-12 col-md-6" name="firstname" :object="child" label="Prénom" @inputted="onInputted"
                          :required="true" icon="fal fa-user"/>

        </div>

        <div class="row col-12">
          <div class="ssf-form-group">
            <date-picker ref="endDate" name="birthday" v-model="child.birthday" format="dd-MM-yyyy"
                         :monday-first="true" :language="fr" input-class="form-control" @selected="onSelectedDate"/>
            <label :class="{'input-active': helpers.isLabelActive(child, 'birthday')}">
              <i class="fal fa-calendar-alt mr-1"></i>Date de naissance (*)
            </label>
          </div>
        </div>

        <div class="row col-12">
          <div class="ssf-form-group">
            <textarea-autosize ref="notes" rows="3" id="notes" name="notes" v-model="child.notes" class="form-control"/>
            <label for="notes" :class="{'input-active': helpers.isLabelActive(child, 'notes')}">
              <i class="fal fa-info-circle mr-1"></i>Informations complémentaires (*)
            </label>
          </div>
        </div>

        <input type="submit" class="d-none">

      </form>
    </div>

    <modal-footer @cancel="hideModal" @save="save"/>

  </modal>

</template>

<script>

    import DatePicker  from 'vuejs-datepicker'
    import {fr}        from 'vuejs-datepicker/dist/locale'
    import ModalFooter from "../../../../../includes/commons/ModalFooter";

    import SsfFormGroup from "../../../../../includes/commons/partials/SsfFormGroup";

    export default {
        name: "SettingsChildrenCreate",

        components: {
            ModalFooter,
            DatePicker,
            SsfFormGroup,
        },

        props: {
            isValidDate      : { type: Function, required: true },
            notValidDateError: { type: Function, required: true }
        },

        data() {
            return {
                user : {},
                child: { lastname: null, firstname: null, birthday: null, notes: null },
                fr
            }
        },

        methods: {

            async onBeforeOpen() {
                this.getUser()
            },

            onSelectedDate(date) {
                return !this.isValidDate(date) ? this.notValidDateError() : (this.child.birthday = date);
            },

            getUser() {
                if ((this.user = this.helpers.getUserStorage()) !== null)
                    this.child.lastname = this.user.lastname.capitalize()
            },

            onInputted(name, value) {
                this.child[name] = value
                this.$forceUpdate()
            },

            hideModal() {
                this.child = {}
                this.$modal.hide('modal-create-child')
            },

            save() {
                let data = this.helpers.clone(this.child)
                data.birthday = this.helpers.moment(`${this.helpers.moment(this.child.birthday).format('L')}`).format('YYYY-MM-DD')
                if (!this.isValidDate(this.child.birthday))
                    return this.notValidDateError()

                this.api.post('/children', data).then(
                    () => {
                        this.child = {}
                        return this.$emit('added')
                    },
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            }

        }
    }
</script>

<style>

  .rate-input:after {
    content: '\f153';
    position: absolute;
    top: 0;
    right: 40px;
    bottom: 0;
    height: 15px;
    /*font-style: italic;*/
    font-size: 12px;
    font-weight: 300;
    font-family: "Font Awesome 5 Pro", sans-serif;
    margin: auto;
  }

</style>
