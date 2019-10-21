<template>
  <div class="koop-show-container">
    <!--    <h1 @click="test">share (add media card)</h1>-->

    <div class="row" v-if="koop">

      <div class="container-fluid koop-image-container position-relative mb-5 px-0">
        <koop-top :koop="koop"/>
      </div>

      <div class="container-fluid px-0">

        <div class="row">

          <div class="col-12 col-sm-7 col-md-8">

            <profile-container :koop="koop" :size="46" :center="24" :height="60">
              <div class="koop-more float-right position-relative">
                <i class="fa fa-share-alt cursor-pointer" @click="show.share = !show.share"></i>
                <transition name="custom-classes-transition" enter-active-class="animated zoomIn fast"
                            leave-active-class="animated zoomOut fast">
                  <div class="koop-show-share-container position-absolute z-depth-1 border" v-show="show.share">
                    <share/>
                  </div>
                </transition>
              </div>
            </profile-container>

            <!--<div class="koop-datetime">
              <span class="koop-datetime-content grey-text">
                {{ helpers.moment(koop.created_at).format('HH:mm') }}
                <i class="fal fa-ellipsis-h"></i>
                {{ helpers.moment(koop.created_at).format('DD MMM YYYY') }}
              </span>
            </div>-->

            <!--            <profile-picture :size="50" :center="30" class="mx-auto"-->
            <!--                             :image="{src: koop.author.image, height: 60, width: 60}"/>-->
          </div>

          <!--<div class="col-9 col-sm-5 col-md-6 col-lg-7">

            <div class="koop-author">
              <span class="koop-author-content font-weight-bold color-1">
                {{ koop.author.firstname | capitalize }} {{ koop.author.lastname | capitalize }}
              </span>

              <div class="koop-more float-right position-relative">
                <i class="fa fa-share-alt cursor-pointer" @click="show.share = !show.share"></i>
                <transition
                  name="custom-classes-transition"
                  enter-active-class="animated zoomIn fast"
                  leave-active-class="animated zoomOut fast">
                  <div class="koop-show-share-container position-absolute z-depth-1 border" v-show="show.share">
                    <share/>
                  </div>
                </transition>
              </div>

            </div>

            <div class="koop-datetime">
              <span class="koop-datetime-content grey-text">
                {{ helpers.moment(koop.created_at).format('HH:mm') }}
                <i class="fal fa-ellipsis-h"></i>
                {{ helpers.moment(koop.created_at).format('DD MMM YYYY') }}
              </span>
            </div>

          </div>-->

          <div class="col-12 col-sm-5 col-md-4">
            <button class="btn bg-color-1 d-block mx-auto mx-sm-0 mb-4 mb-sm-0" @click="save"
                    v-if="$store.getters.user && $store.getters.user.storage.role === 'nanny' && $store.getters.user.storage.id !== (koop.nanny || {}).user_id">
              postuler
            </button>
          </div>

        </div>

        <div class="row mt-1">

          <div class="col-12 col-sm-10 col-md-7 col-lg-8 mx-auto">
            <div class="koop-description">
              <span class="koop-description-content" v-html="formatDescription(koop.description)"></span>
            </div>

            <hr>

            <div class="koop-comments">

              <div class="new-comment position-relative">
                <textarea-autosize ref="comment" rows="1" id="comment" name="comment" v-model="comment"
                                   placeholder="Votre commentaire..." class="w-100 p-2 border border-color-1"/>
                <button @click="sendComment"
                        class="position-absolute btn-send-comment bg-color-1 text-white cursor-pointer">
                  <i class="fa fa-paper-plane"></i>
                </button>
              </div>

              <div class="comments-list">
                <ul class="pl-0">
                  <li v-for="comment in koop.comments" class="row my-2 py-2">
                    <div class="col-3 col-sm-2 col-md-1 px-0">
                      <profile-picture :size="32" :center="16" :small="true" :strong="false" :bordered="false"
                                       class="mx-auto" :image="{src: comment.author.image, height: 40, width: 40}"/>
                    </div>

                    <div class="col-9 col-sm-10 col-md-11">
                      <div class="bg-color-4 rounded p-2 comment-main">
                        <div class="koop-author">
                      <span class="koop-author-content font-weight-bold color-1">
                        {{ comment.author.firstname | capitalize }} {{ comment.author.lastname | capitalize }}
                      </span>
                        </div>
                        <div class="comment-content">
                          {{ comment.content }}
                        </div>
                      </div>
                      <!--<div class="koop-datetime">
                        <span class="koop-datetime-content grey-text">
                          {{ helpers.moment(koop.created_at).format('HH:mm') }}
                          <i class="fal fa-ellipsis-h"></i>
                          {{ helpers.moment(koop.created_at).format('DD MMM YYYY') }}
                        </span>
                      </div>-->
                    </div>

                    <div class="col-12">

                    </div>
                    <!--                    {{ comment.author }}<br>-->


                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div
            class="col-12 col-sm-10 col-md-5 col-lg-4 border-md-left border-strong border-color-3 mt-4 mt-md-0 mx-auto mx-md-0">
            <div class="koop-details">
              <div class="koop-details-content">

                <div class="row bg-color-4 rounded">
                  <div :class="classes.iconContainer"><i class="far fa-calendar-alt mr-2"></i></div>
                  <div :class="classes.contentContainer">
                    <span v-html="getDates(koop.start, koop.end)"></span><br/>
                    <span class="grey-text small font-italic">({{ koop.duration }})</span>
                  </div>
                </div>

                <details-separator v-if="koop.notes"/>

                <div class="row bg-color-4 rounded" v-if="koop.notes">
                  <div :class="classes.iconContainer"><i class="far fa-info-circle mr-2"></i></div>
                  <div :class="classes.contentContainer">{{ koop.notes }}</div>
                </div>

                <details-separator/>

                <div class="row bg-color-4 rounded">
                  <div :class="classes.iconContainer"><i class="far fa-child mr-2"></i></div>
                  <div :class="classes.contentContainer">
                    <ul>
                      <li v-for="(child, idx) in koop.enfants" class="text-left">
                        L'enfant n°{{ idx + 1 }} a <span
                        class="grey-text font-weight-bold font-italic">{{ getAge(child.birthday) }}</span>
                        <br>
                        <span v-if="child.note">{{ child.notes }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <span class="small font-italic grey-text">(les informations exactes vous seront communiqués si la garde vous revient)</span>

                <details-separator/>

                <div class="row bg-color-4 rounded">
                  <div :class="classes.iconContainer"><i class="far fa-map-marked-alt mr-2"></i></div>
                  <div :class="classes.contentContainer">
                    <span class="col-12">
                      <a :href="`https://www.google.com/maps/place/${koop.address.city}`" target="_blank">
                        {{ koop.address ? `${koop.address.city} (${koop.address.postcode})` : '' }}
                      </a>
                    </span>
                    <br>
                  </div>
                </div>
                <span class="small font-italic grey-text">(l'adresse exacte vous sera communiqué si la garde vous revient)</span>

                <details-separator/>

                <div class="row bg-color-4 rounded">
                  <div :class="classes.iconContainer"><i class="far fa-money-bill-wave"></i></div>
                  <div :class="classes.contentContainer">
                    {{ koop.rate }}€/h <span class="font-italic grey-text small">({{ total }}€)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>

    import {getImage}       from "../../../app/utils/koops";
    import SsfFormGroup     from "../../includes/commons/partials/SsfFormGroup";
    import ProfileContainer from "../../includes/commons/Profile/Container";
    import ProfilePicture   from "../../includes/commons/Profile/Picture";
    import Share            from "../../includes/commons/Share";
    import KoopViewGrid     from '../../includes/Koops/Views/Grid'
    import DetailsSeparator from "./includes/Show/DetailsSeparator";
    import KoopTop          from "./includes/Show/KoopTop";

    export default {
        name: "Show",

        metaInfo() {
            return { title: this.extract().name.formatted }
        },

        components: {
            KoopTop,
            ProfileContainer,
            Share,
            SsfFormGroup,
            DetailsSeparator,
            ProfilePicture,
            KoopViewGrid
        },

        created() {
            return this.run()
        },

        data() {
            return {
                koop   : null,
                classes: {
                    iconContainer   : "col-3 px-0 bg-color-1 font-weight-bold text-center d-flex justify-content-center align-items-center fa-1x5 text-white rounded-left",
                    contentContainer: "col-9 text-center py-3"
                },
                comment: null,
                show   : { share: false }
            }
        },

        computed: {
            total() {
                let hours = this.koop.duration.split("h")[0], minutes = this.koop.duration.split("h")[1]
                return (parseInt(hours) + (parseInt(minutes) === 0 ? 0 : 1)) * parseInt(this.koop.rate)
            }
        },

        methods: {

            test() {
                // window.navigator.share({ url: 'http://google.com' })
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
                    () => {
                        this.helpers.setFeedback("success", null, this)
                        return this.helpers.navigate(this.$router, 'koops.index')
                    },
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            },

            getKoop(id, name) {
                return new Promise((resolve, reject) => {
                    this.api.get(`/koop/${name}/${id}`).then(
                        (response) => resolve(this.koop = response.data.data),
                        (error) => reject(error)
                    )
                })
            },

            extract() {
                return {
                    id  : this.$route.params.id,
                    name: {
                        origin   : this.$route.params.name,
                        formatted: `${(this.$route.params.name.split('.')[0] || '').capitalize()} ${(this.$route.params.name.split('.')[1] || '').capitalize()}`
                    }
                }
            },

            formatDescription(description) {
                return description.replace(/\n/g, '<br/>')
            },

            sendComment() {
                this.api.post('/comments', { comment: this.comment, koop: this.koop }).then(
                    (response) => {
                        this.comment = null
                        return this.koop.comments ? this.koop.comments.push(response.data.data) : (this.koop.comments = [response.data.data])
                    }
                )
            },

            async run() {
                let extract = this.extract()
                await this.getKoop(extract.id, extract.name.origin)
                this.koop.image = getImage(this.koop)
                this.$forceUpdate()

                $(document).ready(function () {
                    $('.parallax').parallax(2.6);
                });
            },
            /* SOCIAL SHARE */

            /*share(media) {
                alert(media)
            }*/
        }
    }
</script>

<style>

  .map-image .leaflet-routing-container.leaflet-bar.leaflet-control {
    display: none !important;
  }

  .koop-image-container {
    height: 300px;
    width: 100%;
    overflow: hidden;
  }

  .koop-image-container img,
  .koop-image-container .map-image {
    top: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    min-height: 100%;
  }

  .koop-image-container .koop-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 50;
  }

  .groucho {
    position: relative;
    font-size: 25px;
    line-height: 1.5em;
  }

  @media (min-width: 768px) {
    .border-md-left {
      border-left: 1px solid #d3d9df;
    }
  }

  .new-comment textarea,
  .new-comment textarea:focus {
    border-radius: 15px;
    box-shadow: none !important;
    outline: none !important;
  }

  .new-comment textarea {
    padding-right: 34px !important;
  }

  .btn-send-comment {
    padding: 0 !important;
    border: none !important;
    height: 25px;
    width: 25px;
    top: 0;
    right: 10px;
    bottom: 0;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: 8px;
  }

  .btn-send-comment:focus {
    outline: none !important;
  }

  .koop-show-share-container {
    top: 25px;
    right: -15px;
    bottom: 0;
    height: 135px;
    width: 185px;
    background-color: #fff;
    padding-top: 8px;
    padding-bottom: 16px;
    /*padding: 8px 8px 16px 4px;*/
    z-index: 1;
  }

  .koop-show-share-container:before, .koop-show-share-container:after {
    bottom: 100%;
    left: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .koop-show-share-container:after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -30px;
  }

  .koop-show-share-container:before {
    /*border-color: rgba(194, 225, 245, 0);*/
    border-bottom-color: #dee2e6;
    border-width: 11px;
    margin-left: -31px;
  }

</style>
