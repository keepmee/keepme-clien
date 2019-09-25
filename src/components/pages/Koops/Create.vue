<template>
  <modal name="modal-create-koop" :click-to-close="false" height="auto" :adaptive="true" :reset="true"
         :scrollable="true" class="py-2" @before-open="onBeforeOpen">

    <div class="vmodal-header px-4">
      <button class="btn z-depth-0 color-1 btn-block bg-transparent" @click="hideModal()">
        <i class="fal fa-times fa-2x"></i>
      </button>
      <hr class="w-100 border-color-1">
    </div>

    <div class="vmodal-body p-4">

      <form @submit.prevent="save">

        <ssf-form-group :row="true" col="col-12" name="title" :object="koop" label="Titre" @inputted="onInputted"
                        :required="true" icon="fal fa-font"/>

        <div class="row col-12">
          <div class="ssf-form-group">
            <textarea-autosize ref="description" rows="4" id="description" name="description"
                               v-model="koop.description" class="form-control"/>
            <label for="description" :class="{'input-active': helpers.isLabelActive(koop, 'description')}">
              <i class="fal fa-water mr-1"></i>Description (*)
            </label>
          </div>
        </div>

        <div class="row">

          <div class="col-12">
            <label class="h6 grey-text w-100 text-center mb-0">Date & heure</label>
            <hr class="w-25 mb-4">
          </div>

          <div class="col-12 col-md-6">
            <div class="row">
              <label class="color-1 font-italic w-100 text-center mb-0">Début</label>
            </div>

            <div class="row">
              <div class="ssf-form-group row d-flex justify-content-center align-items-center">

                <div class="col-2"><i class="fal fa-calendar-alt fa-1x5 color-1"></i></div>

                <div class="col-10 px-0">
                  <date-picker ref="startDate" name="birthday" v-model="start.date" :format="'dd-MM-yyyy'"
                               :monday-first="true" :language="fr" input-class="form-control text-center"
                               calendar-class="border-left-0 border-right-0 border-top-0 w-100"/>
                </div>

              </div>
              <div class="ssf-form-group row d-flex justify-content-center align-items-center">

                <div class="col-2"><i class="fal fa-clock fa-1x5 color-1"></i></div>

                <div class="col-10 px-0">
                  <time-picker ref="startTime" v-model="start.time" :minute-interval="5" class="w-100"/>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="row">
              <label class="color-1 font-italic w-100 text-center mb-0">Fin</label>
            </div>
            <div class="row">
              <div class="ssf-form-group row d-flex justify-content-center align-items-center">
                <div class="col-2"><i class="fal fa-calendar-alt fa-1x5 color-1"></i></div>

                <div class="col-10 px-0">
                  <date-picker ref="endDate" name="birthday" v-model="end.date" :format="'dd-MM-yyyy'"
                               :monday-first="true" :language="fr" input-class="form-control text-center"
                               calendar-class="border-left-0 border-right-0 border-top-0 w-100"/>
                </div>

              </div>
              <div class="ssf-form-group row d-flex justify-content-center align-items-center">
                <div class="col-2"><i class="fal fa-clock fa-1x5 color-1"></i></div>
                <div class="col-10 px-0">
                  <time-picker ref="endTime" v-model="end.time" :minute-interval="5" class="w-100"/>
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr class="w-25 mb-5">

        <div class="row">

          <div class="col-12">
            <label class="h6 grey-text w-100 text-center mb-0">Les enfants à faire garder</label>
            <hr class="w-25 mb-4">
          </div>

          <div class="col-12 px-0">
            <div class="ssf-form-group row">
              <div class="col-4 mx-auto my-1" v-for="child in children">
                <div class="ssf-custom-checkbox w-100">
                  <label class="mb-4 w-100">
                    <input type="checkbox" @click="toggleChildren(child.id)"
                           :checked="koop.children.includes(child.id)">
                    {{ child.firstname | lowercase | capitalize }}
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr class="w-25 mb-5">

        <ssf-form-group :row="true" col="col-12" name="rate" :object="koop" label="Taux horaire"
                        @inputted="onInputted" :required="true" icon="fal fa-greater-than-equal"
                        form-group-class="rate-input"/>

        <ssf-form-group :row="true" col="col-12" name="note" :object="koop" label="Informations complémentaires"
                        @inputted="onInputted" icon="fal fa-info-circle"/>

        <div class="row">
          <div class="col-12 ssf-form-group mt-1">
            <button class="btn bg-color-1 btn-block" type="submit">
              Poster l'annonce <i class="far fa-layer-plus"></i>
            </button>
          </div>
        </div>

      </form>
    </div>

  </modal>

</template>

<script>

    import DatePicker from 'vuejs-datepicker'
    import TimePicker from 'vuejs-timepicker'
    import {fr}       from 'vuejs-datepicker/dist/locale'

    import SsfFormGroup from "../../includes/commons/partials/SsfFormGroup";

    import moment from 'moment'

    export default {
        name: "KoopCreate",

        components: {
            DatePicker,
            TimePicker,
            // Home,
            SsfFormGroup,
        },

        data() {
            return {
                children: [],
                start   : { date: null, time: { HH: "HH", mm: "mm" } },
                end     : { date: null, time: { HH: "HH", mm: "mm" } },
                /*koop    : {
                    title      : "Un titre bidon",
                    description: "Une description bidon",
                    start      : null,
                    end        : null,
                    rate       : 9,
                    note       : "Une note particulière",
                    longitude  : null,
                    latitude   : null,
                    children   : []
                }*/
                koop    : {
                    title    : null, description: null,
                    start    : null, end: null,
                    rate     : null, note: null,
                    longitude: null, latitude: null,
                    children : []
                },
                fr      : fr,
            }
        },


        methods: {

            async onBeforeOpen() {
                this.setStart()
                this.setEnd()
                await this.getUserChildren()
                return this.children.length === 0
                    ? this.swal({
                        type              : "error",
                        title             : "Attention",
                        text              : "Vous n'avez pas encore ajouté vos enfants à votre profil",
                        allowOutsideClick : false,
                        confirmButtonText : "Commencer",
                        confirmButtonClass: "btn bg-color-1 btn-block",
                    }).then(
                        (answer) => answer.value ? this.$router.push({ name: 'account.settings.children.index' }) : this.$modal.hide('modal-create-koop')
                    )
                    : true
            },

            onInputted(name, value) {
                this.koop[name] = value
                this.$forceUpdate()
            },

            hideModal() {
                this.$modal.hide('modal-create-koop')
            },

            setStart() {
                this.setStartTime(this.helpers.moment())
                this.setStartDate(new Date())
            },

            setStartTime(date) {
                if (date.minute() <= 55) {
                    this.start.time.HH = `${this.helpers.twoDigits(date.hour())}`
                    this.start.time.mm = `${this.helpers.twoDigits(Math.ceil(date.minute() / 5) * 5)}`
                } else {
                    this.start.time.HH = `${this.helpers.twoDigits(date.hour() + 1)}`
                    this.start.time.mm = `${this.helpers.twoDigits(0)}`
                }
            },

            setStartDate(date) {
                this.start.date = date
            },

            setEnd() {
                this.setEndTime(this.helpers.moment())
                this.setEndDate(new Date())
            },

            setEndTime(date) {
                if (date.minute() <= 55) {
                    this.end.time.HH = `${this.helpers.twoDigits(date.hour() + 1)}`
                    this.end.time.mm = `${this.helpers.twoDigits(Math.ceil(date.minute() / 5) * 5)}`
                } else {
                    this.end.time.HH = `${this.helpers.twoDigits(date.hour() + 2)}`
                    this.end.time.mm = `${this.helpers.twoDigits(0)}`
                }
            },

            setEndDate(date) {
                this.end.date = date
            },

            setChildren(nb) {
                this.koop.children = nb
            },

            toggleChildren(id) {
                if (this.koop.children.includes(id)) {
                    // let tmp = this.koop.children.indexOf(id)
                    this.koop.children.splice(this.koop.children.indexOf(id), 1)
                } else this.koop.children.push(id)
            },

            getUserChildren() {
                return new Promise((resolve, reject) => {
                    this.api.get('/children/current').then(
                        (response) => resolve(this.children = response.data.data.children),
                        (error) => reject(error)
                    )
                })
            },

            save() {
                let data = this.helpers.clone(this.koop)
                data.start = moment(`${moment(this.start.date).format('L')} ${this.start.time.HH}:${this.start.time.mm}:00`, 'DD/MM/YYYY HH:mm:ss')
                data.end = moment(`${moment(this.end.date).format('L')} ${this.end.time.HH}:${this.end.time.mm}:00`, 'DD/MM/YYYY HH:mm:ss')

                this.api.post('/koop', data).then(
                    () => this.$emit('added'),
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
