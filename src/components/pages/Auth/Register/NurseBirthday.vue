<template>
  <div id="nurseBirthday">

    <div class="row mb-4 mb-md-5">
      <div class="col-12 px-0 my-2">
        <label class="h4 text-center w-100">Vous êtes né(e) le...</label>
      </div>
    </div>

    <div class="row">

      <div class="col-12 col-md-2 mx-auto d-flex justify-content-center align-items-center my-2">
        <i class="fal fa-calendar-alt fa-2x color-1 cursor-pointer" @click="openCalendar()"></i>
      </div>

      <div class="col-12 col-md-10 px-0 mx-auto my-2">
        <div class="ssf-form-group mt-0 mb-0">
          <date-picker ref="datePicker" name="birthday" v-model="date" :format="'dd-MM-yyyy'" :monday-first="true"
                       :language="fr" :open-date="minDate" :input-class="'form-control'"/>
        </div>
      </div>

    </div>


    <div class="row my-5">

      <div class="col-12 col-md-8 col-lg-6 ml-auto my-2 px-0" v-if="isValidDate()">
        <button class="btn btn-block z-depth-0 p-0 color-1 text-right text-uppercase bg-transparent"
                @click="nextStep()">
          suivant <i class="fal fa-long-arrow-right"></i>
        </button>
      </div>

      <div class="col-12 text-right my-2 px-0 font-italic grey-text" v-else>
        <span>Vous devez être majeur(e) pour vous inscrire</span>
      </div>

    </div>

  </div>
</template>

<script>

    import DatePicker from 'vuejs-datepicker'
    import {fr}       from 'vuejs-datepicker/dist/locale'

    export default {
        name: "NurseBirthday",

        components: {
            DatePicker
        },

        data() {
            return {
                date   : null,
                minDate: new Date(),
                fr     : fr
            }
        },

        created() {
            this.minDate = this.helpers.moment()
            this.minDate.add(-18, 'year')
            this.minDate = new Date(this.minDate)
        },

        methods: {

            openCalendar() {
                this.$refs.datePicker.showCalendar()
            },

            isValidDate() {
                return this.date && (this.helpers.moment().diff(this.helpers.moment(this.date), 'years') >= 18)
            },

            nextStep() {
                this.$emit('setBirthday', this.date)
            }

        }
    }
</script>

<style scoped></style>
