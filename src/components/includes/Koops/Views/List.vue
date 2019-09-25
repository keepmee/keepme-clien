<template>
  <div class="row w-100" @mouseenter="hover = true" @mouseleave="hover = false">

    <!-- Card -->
    <div class="card-list row w-100 border-bottom position-relative cursor-pointer"
         :class="{'bg-color-4': hover, 'bg-light font-italic grey-text': helpers.moment().unix() > helpers.moment(koop.start).unix(), 'border-color-1': helpers.moment().unix() <= helpers.moment(koop.start).unix()}"
         @click="$emit('apply', koop)">

      <div class="col-3 col-md-2 h-100 d-md-block d-none">
        <!-- Card header-->
        <div class="card-list-header full-absolute h-100 w-100">
          <!-- Card image -->
          <div class="view h-100 w-100">
            <img class="mx-auto h-100" :src="koop.image" alt="Card image cap">
            <div class="overlay h-100 w-100 full-absolute black"></div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-10 px-0 row pt-1 pb-3">

        <div class="col-12 px-0 px-md-2">
          <!-- Card content -->
          <div class="card-list-body">

            <!-- Title -->
            <h6 class="card-title text-center"><a>{{ koop.title }}</a></h6>

            <div class="row">

              <div class="col-12">

                <profile-container :koop="koop" :size="30" :center="20" :height="40" :strong="false" :small="true">
                  <div class="koop-children float-right">
                    <i class="fal fa-child" v-for="n in (koop.children.length > 0 ? koop.children.length : 1)"></i>
                  </div>
                  <template v-slot:slot2>
                    <div class="koop-children float-right small font-italic grey-text">
                      <span class="font-italic small" v-if="koop.children.length > 0">
                        <i class="fal fa-ellipsis-h"></i> {{ koop.children.length }} enfant{{ koop.children.length > 1 ? 's' : '' }}
                      </span>
                      <span class="font-italic small" v-else>
                      <i class="fal fa-ellipsis-h"></i> aucun enfant
                    </span>
                    </div>
                  </template>
                </profile-container>
              </div>

              <!--<div class="col-3 col-sm-2 col-md-1 px-0">
                <profile-picture :size="30" :center="20" class="mx-auto" :strong="false" :small="true"
                                 :image="{src: koop.author.image, height: 40, width: 40}"/>
              </div>

              <div class="col-9 col-sm-10 col-md-11">
                <div class="koop-author w-100 pt-1">
                  <span class="koop-author-content font-weight-bold color-1">
                    {{ koop.author.firstname | capitalize }} {{ koop.author.lastname | capitalize }}
                  </span>
                  <div class="koop-children float-right">
                    <i class="fal fa-child" v-for="n in (koop.children.length > 0 ? koop.children.length : 1)"></i>
                  </div>
                </div>
                <div class="koop-datetime">
                  <span class="koop-datetime-content grey-text">
                    {{ helpers.moment(koop.created_at).format('HH:mm') }}
                    <i class="fal fa-ellipsis-h"></i>
                    {{ helpers.moment(koop.created_at).format('DD MMM YYYY') }}
                  </span>
                  <div class="koop-children float-right small font-italic grey-text">
                    <span class="font-italic small" v-if="koop.children.length > 0">
                      <i class="fal fa-ellipsis-h"></i> {{ koop.children.length }} enfant{{ koop.children.length > 1 ? 's' : '' }}
                    </span>
                    <span class="font-italic small" v-else>
                      <i class="fal fa-ellipsis-h"></i> aucun enfant
                    </span>
                  </div>
                </div>
              </div>-->
            </div>

            <div class="col-12 mt-1">
              <!-- Text -->
              <p class="card-text mb-1 text-justify grey-text">
                <i class="fal fa-water mr-2 small"></i>{{ koop.description.substring(0, 200) }}...
                <i class="fal fa-eye color-1"></i>
              </p>
            </div>

            <!--<div class="row w-100">

              <div class="col-6">
                <div class="row" v-if="notification">
                  <div
                    class="nb-notifications col ml-auto px-0 rounded-circle d-flex justify-content-center align-items-center bg-color-1">
                    <span class="font-weight-bold text-white fa-1x">{{ notification }}</span>
                  </div>
                  <div class="col d-flex align-items-center px-0 ml-1">
                  <span
                    class="font-italic grey-text fa-xs" @click="$emit('show-notification', koop)">candidature{{ notification > 1 ? 's' : '' }} en attente</span>
                  </div>
                </div>
              </div>
            </div>-->

          </div>
          <!--          <div class="card-show-more">voir plus</div>-->
        </div>

        <div class="col-12 px-md-2 row mt-1">

          <div class="koop-details px-1 px-md-2">
            <i class="far fa-map-marked-alt color-3 mr-1"></i>
            <span class="number">{{ koop.distance }}</span><span class="font-italic small">km</span>
          </div>

          <div class="koop-details px-1 px-md-2">
            <i class="far fa-clock color-3 mr-1"></i>
            <span class="number">{{ koop.duration }}</span>
          </div>

          <div class="koop-details px-1 px-md-2">
            <i class="far fa-money-bill-wave color-3 mr-1"></i>
            <span class="number">{{ koop.rate }}</span>
            <span class="font-italic small">€/h</span>
          </div>

          <div class="koop-details px-1 px-md-2">
            <i class="far fa-calendar-day color-3 mr-1"></i>
            <span>{{ helpers.moment(koop.start).format('DD.MM.YYYY') }}</span>
          </div>

        </div>

        <!--<div class="col-4 d-flex justify-content-center align-items-center">
          &lt;!&ndash; Card footer &ndash;&gt;
          <div class="card-list-footer">

            <div class="row w-100">
              <div class="col-12 px-0 text-center">
                <i class="far fa-map-marked-alt color-3 mr-1 fa-xs"></i>
                <span class="number">{{ koop.distance }}</span><span class="font-italic small">km</span>
              </div>
            </div>

            <div class="border-special text-center w-100">
              <i class="fal fa-atom-alt color-1"></i>
            </div>

            <div class="row w-100">
              <div class="col-12 px-0 text-center">
                <i class="far fa-clock color-3 mr-1 fa-xs"></i>
                <span class="number">{{ koop.duration }}</span>
              </div>
            </div>

            <div class="border-special text-center w-100">
              <i class="fal fa-atom-alt color-1"></i>
            </div>

            <div class="row w-100">
              <div class="col-12 px-0 text-center">
                <i class="far fa-money-bill-wave color-3 mr-1 fa-xs"></i>
                <span class="number">{{ koop.rate }}</span>
                <span class="font-italic small">€/h</span>
              </div>
            </div>

          </div>
        </div>-->
      </div>

      <div class="row card-notification pb-3 pr-3" v-if="notification" @click.stop="$emit('show-notification', koop)">
        <span class="fa-stack" :class="{'small': notification < 10}">
          <i class="fas color-1 fa-bell fa-stack-2x"></i>
          <span class="fa-stack-1x fa-inverse font-weight-bold" :class="{'small': notification > 10}">
            {{ notification }}
          </span>
        </span>
      </div>

    </div>

  </div>
</template>

<script>
    import ProfileContainer from "../../commons/Profile/Container";
    import ProfilePicture   from "../../commons/Profile/Picture";

    export default {
        name      : "KoopViewList",
        components: { ProfileContainer, ProfilePicture },
        props     : {
            koop        : { type: Object || null, required: true },
            notification: { type: Number || null, required: false }
        },
        data() {
            return {
                hover: false
            }
        }
    }
</script>

<style scoped>

  .card-list-header {
    /*height: 100px;*/
    overflow: hidden;
    /*width: 100px;*/
  }

  .card-list-header img {
    filter: blur(2px);
  }

  .card-list-header .overlay {
    opacity: .3;
  }

  /*.border-special {
    padding-top: 10px;
    padding-bottom: 10px;
  }*/


  .border-special:after {
    content: '\f5d3';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 17px;
    margin: auto;
    color: #EBC8B2;
    font-weight: 300;
    font-family: "Font Awesome 5 Pro", sans-serif;
    font-size: 12px;
  }

  .nb-notifications {
    height: 30px !important;
    width: 30px !important;
    max-width: 30px !important;
  }

  .card-notification {
    position: absolute;
    right: 0;
    bottom: 0;
    /*height: 130px;*/
    /*background: #000;*/
  }

</style>
