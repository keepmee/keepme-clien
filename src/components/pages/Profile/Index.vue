<template>
  <div class="profile-index bg-light">

    <div class="container" v-if="user">

      <div class="row mt-3 white rounded">

        <div class="col-12 col-md-3 d-flex justify-content-center align-items-center">
          <triple-shape :size="50" :center-size="30" :strong="false" class="mx-auto">
            <div class="d-flex justify-content-center align-items-center h-100 w-100"
                 :class="{'bg-color-1': !user.image}"
                 v-if="user">
              <img :src="user.image" alt="Photo de profil" v-if="user.image" height="150" width="150"
                   class="user-icon rounded-circle p-1 border border-color-1 border-strong">
              <i class="fal fa-user text-white user-icon" v-else></i>
            </div>
          </triple-shape>
        </div>

        <div class="col-12 col-md-9">

          <div class="container-header col-12 py-3 bg-color-1 mt-5 rounded text-center">
          <span class="h5 color-4">
            <i class="fa mx-2" :class="`fa-${gender.detect(user.firstname)}`"></i>
            <span>À propos</span>
          </span>
          </div>

          <div class="container-body col-12">

            <div class="row">

              <div class="col-12 col-md-6">
                <ul class="fa-ul">
                  <item icon="far fa-user">{{ user.lastname | capitalize }} {{ user.firstname | capitalize }}</item>
                  <item icon="far fa-at">{{ user.email }}</item>
                  <item icon="far fa-map-marked-alt">Habite à
                    <a :href="`https://www.google.com/maps/place/${user.address.city}`" target="_blank">
                      {{ user.address.city }}
                    </a>
                  </item>
                </ul>
              </div>

              <div class="col-12 col-md-6">
                <ul class="fa-ul">
                  <item icon="far fa-birthday-cake"><span v-html="age(user.birthday)"></span></item>
                  <item icon="far fa-mobile" v-if="user.phone">
                    <a :href="`tel:${phone(user.phone)}`" class="black-text"><span
                      v-html="phone(user.phone)"></span></a>
                  </item>
                  <item icon="far fa-mobile" v-else><span v-html="phone(user.phone)"></span></item>
                  <item class="border-bottom-0">
                    Envoyer un message <i class="far fa-edit fa-1x5 color-1 cursor-pointer ml-2" @click="chatWith"></i>
                  </item>
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>


      <div class="row my-2 white rounded" v-for="koop in koops">
        <koop-view-list :koop="koop" :all="true" :bordered="false"/>
      </div>

      <div class="row mt-3 white col-12" v-if="user.diplomas">

        <div class="container-header col-12 py-3 bg-color-1 mt-5 rounded text-center">
          <span class="h5 color-4">
            <i class="fa fa-diploma mx-2"></i>
            <span>Diplômes</span>
          </span>
        </div>

        <div class="container-body col-12 mb-3">

          <div class="row">
            <div class="col-12 col-md-3 col-lg-4 col-xl-3 profile-diploma-container mx-auto my-2"
                 v-for="(diploma, idx) in user.diplomas" v-if="user.diplomas > 0">
              <div
                class="profile-diploma-preview p-1 border border-strong border-color-1 rounded-circle">
                <div class="h-100 w-100 bg-color-1 d-flex justify-content-center align-items-center rounded-circle">
                  <span class="number fa-1x5 color-4">{{ idx + 1 }}</span>
                </div>
              </div>
            </div>
            <div v-else><span class="grey-text font-italic">Aucun</span></div>
          </div>
          <span class="color- font-italic">Tous les diplômes sont vérifiés par nos soins</span>

        </div>

      </div>

    </div>
  </div>

</template>

<script>

    const gender = require('gender-detection')

    import {setAllKoopImage} from "../../../app/utils/koops";
    import TripleShape       from "../../includes/commons/partials/TripleShape";
    import KoopViewList      from "../../includes/Koops/Views/List";

    import Item from "./includes/Item";

    import {formatNumber} from "../../../app/utils";

    export default {
        name      : "ProfileIndex",
        components: { KoopViewList, Item, TripleShape },
        data() {
            return {
                user : null,
                koops: null,
                gender
            }
        },

        created() {
            return this.run()
        },

        methods: {

            extract() {
                let separator = this.$route.params.separator, tmp = this.$route.params.name.split(`.`)
                return {
                    firstname: tmp[0] || null,
                    lastname : tmp[1] || null,
                    type     : separator === 'nny' ? 'nanny' : separator === 'prt' ? 'parent' : null
                }
            },

            age(birthday) {
                let year;
                return (year = this.helpers.moment().diff(this.helpers.moment(birthday), 'years')) > 0
                    ? `${year} an${Math.abs(year) > 1 ? 's' : ''}`
                    : `<span class="grey-text font-italic">Non renseigné</span>`
            },

            phone(phone) {
                return phone ? formatNumber(phone) : `<span class="grey-text font-italic">Non renseigné</span>`
            },

            getUserByNameAndType(user) {
                return new Promise((resolve, reject) => {
                    this.api.get(`/user/${user.lastname}/${user.firstname}/${user.type}`).then(
                        (response) => resolve(this.user = response.data.data),
                        (error) => reject(error)
                    )
                })
            },

            getUserKoops() {
                this.api.get(`/koops/${this.user.firstname || ''}.${this.user.lastname || ''}`).then(
                    (response) => this.koops = setAllKoopImage(response.data.data),
                )
            },

            chatWith() {
                let userId = this.user.id, myId = this.$store.getters.user.storage.id
                this.$router.push({
                    name  : 'chat.index.params',
                    params: { index: btoa(`${Math.min(userId, myId)}-${Math.max(userId, myId)}`) }
                })
            },

            async run() {
                await this.getUserByNameAndType(this.extract())
                this.getUserKoops()
            }

        }
    }
</script>

<style scoped>


  .user-icon {
    -webkit-transform: rotate(-45deg) !important;
    transform: rotate(-45deg) !important;
  }

  .profile-diploma-preview {
    height: 100px;
    width: 100px;
  }


</style>
