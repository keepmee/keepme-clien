<template>

  <!-- Card -->
  <div class="card rounded z-depth-0 border mx-auto" @click="$emit('apply', koop)">

    <!-- Card header-->
    <div class="card-header rounded border-0 p-0 white z-depth-1">
      <!-- Card image -->
      <div class="view overlay rounded">
        <img class="rounded card-img-top mx-auto" :src="koop.image" alt="Card image cap" v-show="koop.image">
        <div class="mask waves-effect waves-light rgba-white-slight"></div>
      </div>
    </div>

    <!-- Card content -->
    <div class="card-body">

      <!-- Title -->
      <h5 class="card-title text-center"><a>{{ koop.title }}</a></h5>
      <!-- Text -->
      <p class="card-text mb-1 text-justify">
        <i class="fal fa-water mr-2 small"></i>{{ koop.description.substring(0, 160) }}
        {{ koop.description.length > 160 ? '(...)' : '' }}
      </p>

      <div class="row my-2">
        <p class="mb-0 w-50">
          <i class="fal fa-child" v-for="n in (koop.children.length > 0 ? koop.children.length : 1)"></i>
          <span v-if="koop.children.length === 0">
              <span class="grey-text mx-2">|</span>
              <span class="number">{{ koop.children.length }}</span>
            </span>
          <span class="font-italic small">enfant{{ koop.children.length > 1 ? 's' : '' }}</span>
        </p>
        <p class="mb-0 w-50 text-right">
          <i class="fal fa-user"></i>
          <span class="grey-text mx-2">|</span>
          <span class="small">{{ koop.author.firstname | lowercase | capitalize }} {{ koop.author.lastname | lowercase | capitalize }}</span>
        </p>
      </div>

    </div>

    <!-- Card footer -->
    <div class="card-footer white border-0 rounded pt-0 px-0">

      <div class="row">
        <hr class="w-25 mt-0 mb-3 border-color-1">
      </div>

      <div class="row">

        <div class="col-4 border-special pl-2">
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-map-marked-alt color-3"></i>
            </div>
          </div>
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <span class="number">{{ koop.distance }}</span><span class="font-italic small">km</span>
            </div>
          </div>
        </div>

        <div class="col-4 border-special">
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-clock color-3"></i>
            </div>
          </div>
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <span class="number">{{ koop.duration }}</span>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-money-bill-wave color-3"></i>
            </div>
          </div>
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <span class="number">{{ koop.rate }}</span>
              <span class="font-italic small">€/h</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "KoopViewGrid",

        props: [
            'koop',
            // 'getDistance',
            // 'getTime',
            // 'getImage',
            // 'apply'
        ],

        data() {
            return {
                gClass: null
            }
        },

        methods: {}
    }
</script>

<style scoped>

  .card {
    max-width: 350px;
  }

  .card-header img {
    max-height: 200px;
    width: 100%;
  }

  .card-body {
    height: 200px;
  }

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

</style>
