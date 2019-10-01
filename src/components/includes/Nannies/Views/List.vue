<template>
  <div class="row w-100" @mouseenter="hover = true" @mouseleave="hover = false">

    <!-- Card -->
    <div class="card-list row w-100 border-bottom position-relative cursor-pointer border-color-1"
         :class="{'bg-color-4': hover}">

      <div class="col-12 col-md-10 px-0 row pt-1 pb-3">

        <div class="col-12 px-0 px-md-2">
          <!-- Card content -->
          <div class="card-list-body">

            <div class="row">
              <div class="col-12">
                <profile-container :author="nanny.user" :size="30" :center="20" :height="40" :strong="false"
                                   :small="true" :nanny="true">

                  <div class="koop-datetime">
                    <span class="author-datetime-content grey-text font-italic small">
                      <span>créé(e) le </span>
                      {{ helpers.moment(nanny.user.created_at).format('DD MMM YYYY') }}
                    </span>
                  </div>

                </profile-container>
              </div>
            </div>

            <div class="col-12 mt-1">
              <!-- Text -->
              <p class="card-text mb-1 text-justify grey-text">
                <i class="fal fa-water mr-2 small"></i> {{ nanny.user.firstname | capitalize }} {{
                nanny.user.lastname | capitalize }} s'est
                inscrit(e) le {{ helpers.moment(nanny.user.created_at).format('DD MMMM YYYY') }}.
              </p>
              <p class="card-text mb-1 text-justify grey-text">{{ getKoopsText(nanny) }}</p>
              <p class="card-text mb-1 text-justify grey-text">{{ nanny.description }}</p>
            </div>

          </div>
        </div>

        <div class="col-12 px-md-2 row mt-1">

          <div class="koop-details px-1 px-md-2">
            <i class="far fa-map-marked-alt color-3 mr-1"></i>
            <span class="number">{{ nanny.distance }}</span><span class="font-italic small">km</span>
          </div>

          <div class="koop-details px-1 px-md-2">
            <i class="far fa-birthday-cake color-3 mr-1"></i>
            <span>{{ age(nanny.user.birthday) }}</span>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>

    const gender = require('gender-detection')
    import ProfileContainer from "../../commons/Profile/Container";

    export default {
        name: "NannyViewList",

        components: {
            ProfileContainer
        },

        props: {
            nanny: { type: Object || null, required: true },
        },

        data() {
            return {
                hover: false
            }
        },

        methods: {
            age(birthday) {
                let year;
                return (year = this.helpers.moment().diff(this.helpers.moment(birthday), 'years')) > 0
                    ? `${year} an${Math.abs(year) > 1 ? 's' : ''}`
                    : `<span class="grey-text font-italic">Non renseigné</span>`
            },

            getKoopsText(nanny) {
                return `${gender.detect(nanny.user.firstname) === 'male' ? 'Il' : 'Elle'} a effectué ${nanny.koops.length} garde${nanny.koops.length > 1 ? 's' : ''} via notre plateforme.`
            },
        }
    }
</script>

<style scoped>

</style>
