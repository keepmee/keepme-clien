<template>
  <div class="opinion-index container mx-auto section-container mb-5">

    <!-- SECTION TITLE -->
    <section-title title="<span class='color-1'>avis</span> utilisateurs"/>

    <!-- SECTION CONTENT -->
    <div class="row w-100">

      <div class="col-12 col-md-4 my-2" v-for="opinion in opinions">
        <div class="card border card-opinion z-depth-0 rounded mx-auto">

          <div class="row stars-container d-flex align-items-center">
            <div class="col-6 orange-text">
              <i class="fa fa-star" v-for="n in opinion.mark"></i>
              <i class="far fa-star" v-for="n in (5 - opinion.mark)"></i>
            </div>
            <div class="col-6 small font-italic pl-0 text-right">
              {{ helpers.moment(opinion.date).format('L LT') }}
            </div>
          </div>

          <div class="row content-container">
            <div class="col-12">
              <span class="grey-text font-italic sanchez fa-1x25">
                <span class="mx-2">&#10077;</span>{{ opinion.content }}<span class="mx-2">&#10078;</span>
              </span>
            </div>
          </div>

          <div class="row author-container">
            <div class="col-12">
              <span class="font-weight-bold small">{{ opinion.author }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

    import SectionTitle from "../../../includes/commons/partials/Title/Section";

    export default {
        name: "HomeOpinion",

        components: { SectionTitle },

        data() {
            return {
                opinions: [
                    {
                        mark   : 5,
                        content: "Contenu test",
                        author : "Aurélie Grondin",
                        date   : '2019-01-01 00:00'
                    },
                    {
                        mark   : 3,
                        content: "Contenu test",
                        author : "Denis Roux",
                        date   : '2019-01-01 00:00'
                    },
                    {
                        mark   : 4,
                        content: "Contenu test",
                        author : "Sébastien Camus",
                        date   : '2019-01-01 00:00'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

  .stars-container {
    min-height: 50px;
  }

  .card-opinion {
    max-width: 250px !important;
  }

  .content-container {
    min-height: 75px;
  }

  .fa-1x25 {
    font-size: 1.25em !important;
  }

</style>
