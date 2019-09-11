<template>
  <div class="row w-100">

    <!-- Card -->
    <div class="card-list row w-100 border-bottom py-3" @click="$emit('apply', koop)">

      <div class="col-3 col-md-2 d-flex justify-content-center align-items-center">
        <!-- Card header-->
        <div class="card-list-header rounded z-depth-1">
          <!-- Card image -->
          <div class="view overlay rounded">
            <img class="rounded mx-auto" :src="koop.image" alt="Card image cap">
            <!--<div class="mask waves-effect waves-light rgba-white-slight"></div>-->
          </div>
        </div>
      </div>

      <div class="col-7">
        <!-- Card content -->
        <div class="card-list-body">

          <!-- Title -->
          <h5 class="card-title text-center"><a>{{ koop.title }}</a></h5>
          <!-- Text -->
          <p class="card-text mb-1 text-justify grey-text">
            <i class="fal fa-water mr-2 small"></i>{{ koop.description.substring(0, 200) }}
            {{ koop.description.length > 200 ? '(...)' : '' }}
          </p>
          <p class="mb-0">
            <i class="fal fa-child"></i>
            <span class="grey-text mx-2">|</span>
            <span class="number">{{ koop.children.length }}</span>
            <span class="font-italic small">enfant(s)</span>
          </p>
          <div class="row w-100">
            <div class="col-6 d-flex align-items-center px-0">
              <i class="fal fa-user"></i>
              <span class="grey-text mx-2">|</span>
              <span class="small">{{ koop.author.firstname | lowercase | capitalize }} {{ koop.author.lastname | lowercase | capitalize }}</span>
            </div>
            <div class="col-6">
              <div class="row" v-if="notification">
                <div
                  class="nb-notifications col ml-auto px-0 rounded-circle d-flex justify-content-center align-items-center bg-color-1">
                  <span class="font-weight-bold text-white fa-1x">{{ notification }}</span>
                </div>
                <div class="col d-flex align-items-center px-0 ml-1">
                  <span
                    class="font-italic grey-text fa-xs">candidature{{ notification > 1 ? 's' : '' }} en attente</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="col-3 d-flex justify-content-center align-items-center">
        <!-- Card footer -->
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
      </div>

      <div class="card-notification">

      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "KoopViewList",

        props: {
            koop        : { type: Object || null, required: true },
            notification: { type: Number || null, required: false }
        }
    }
</script>

<style scoped>

  .card-list-header,
  .card-list-header img {
    height: 100px;
    width: 100px;
  }

  .border-special {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .nb-notifications {
    height: 30px !important;
    max-width: 30px !important;
  }

</style>
