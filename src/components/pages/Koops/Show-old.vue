<template>
  <modal name="modal-show-koop" :click-to-close="false" height="auto" :adaptive="true" :reset="true"
         :scrollable="true" class="py-2" @before-open="onBeforeOpen">

    <div class="vmodal-header px-4">
      <button class="btn z-depth-0 color-1 btn-block bg-transparent" @click="hideModal()">
        <i class="fal fa-times fa-2x"></i>
      </button>
      <hr class="w-100 border-color-1">
    </div>

    <div class="vmodal-body p-3">
      <div class="koop-content" v-if="koop">

        <div class="row">
          <div class="col-12 text-center"><span class="h5">{{ koop.title }}</span></div>
        </div>

        <div class="row">
          <div :class="classes.iconContainer"><i class="fal fa-calendar-alt mr-2"></i>Dates</div>
          <div :class="classes.contentContainer">
            <span v-html="getDates(koop.start, koop.end)"></span><br/>
            <span class="grey-text small font-italic">({{ koop.duration }})</span>
          </div>
        </div>

        <div class="row">
          <div :class="classes.iconContainer"><i class="fal fa-water mr-2"></i>Description</div>
          <div :class="classes.contentContainer">{{ koop.description }}</div>
        </div>

        <div class="row" v-if="koop.notes">
          <div :class="classes.iconContainer"><i class="fal fa-info-circle mr-2"></i>Informations</div>
          <div :class="classes.contentContainer">{{ koop.notes }}</div>
        </div>

        <div class="row">
          <div :class="classes.iconContainer"><i class="fal fa-child mr-2"></i>Enfant(s)</div>
          <div class="col-12">
            <ul>
              <li v-for="(child, idx) in koop.enfants">
                L'enfant n°{{ idx + 1 }} a <span class="grey-text font-weight-bold font-italic">{{ getAge(child.birthday) }}</span>
                <br>
                <span v-if="child.note">{{ child.notes }}</span>
              </li>
            </ul>
            <span class="col-12 small font-italic color-3">(les informations exactes vous seront communiqués si la garde vous revient)</span>
          </div>
        </div>

        <div class="row">
          <div :class="classes.iconContainer"><i class="fal fa-map-marked-alt mr-2"></i>Adresse</div>
          <div :class="classes.contentContainer">
            <span class="col-12">
              <a :href="`https://www.google.com/maps/place/${koop.address.city}`" target="_blank">
                {{ koop.address ? `${koop.address.city} (${koop.address.postcode})` : '' }}
              </a>
            </span><br>
            <span class="col-12 small font-italic color-3">(l'adresse exacte vous sera communiqué si la garde vous revient)</span>
          </div>
        </div>

        <div class="row">
          <div :class="classes.iconContainer">Total</div>
          <div :class="classes.contentContainer" class="fa-2x">{{ total }}€</div>
        </div>

      </div>
    </div>

    <div class="vue-modal-footer pb-4">
      <div class="row w-100">
        <div class="col-12 col-md-6 d-flex justify-content-center align-items-center mb-2 mb-md-0">
          <button class="btn btn-block danger-color-dark" type="button" @click.prevent="cancel">
            J'abandonne
          </button>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <button class="btn btn-block bg-color-1" type="submit" @click="save">
            Je confirme
          </button>
        </div>
      </div>
    </div>

  </modal>
</template>

<script>


    export default {
        name: "Show",

        props: {
            koop: { required: false }
        },

        data() {
            return {
                classes: {
                    iconContainer   : "col-12 col-md-12 h6 color-1 font-weight-bold text-center mt-2",
                    contentContainer: "col-12 text-center"
                }
            }
        },

        computed: {
            total() {
                let hours = this.koop.duration.split("h")[0], minutes = this.koop.duration.split("h")[1]
                return (parseInt(hours) + (parseInt(minutes) === 0 ? 0 : 1)) * parseInt(this.koop.rate)
            }
        },

        methods: {
            onBeforeOpen() {

            },

            getAge(birthday) {
                let year, month, week;
                return (year = this.helpers.moment().diff(this.helpers.moment(birthday), 'years')) > 0
                    ? `${year} an${Math.abs(year) > 1 ? 's' : ''}`
                    : (month = this.helpers.moment().diff(this.helpers.moment(birthday), 'month')) > 0
                        ? `${Math.abs(month)} mois`
                        : `${week = this.helpers.moment().diff(this.helpers.moment(birthday), 'week')} semaine${Math.abs(week) > 1 ? 's' : ''}`
            },

            hideModal() {
                this.$modal.hide('modal-show-koop')
            },

            getDates(start, end) {
                start = this.helpers.moment(start)
                end = this.helpers.moment(end)
                return start.format('L') === end.format('L')
                    ? `Le ${start.format('L')} de ${start.format('LTS')} à ${end.format('LTS')}`
                    : `${start.format('DD MMMM YYYY à LTS')}<br><i class="fal fa-long-arrow-down"></i><br>${end.format('DD MMMM YYYY à LTS')}`
            },

            cancel() {
                this.hideModal()
            },

            save() {
                this.api.post(`/koop/apply/${this.koop.id}`).then(
                    () => this.$emit('applied'),
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            }
        }
    }
</script>

<style scoped>

</style>
