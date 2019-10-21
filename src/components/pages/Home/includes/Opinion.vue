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
                        content: "Super plateforme. Facile à prendre en main, le service rendu par les nounous de la plateforme est de qualité. Au top merci !",
                        author : "Aurélie Grondin",
                        date   : '2019-10-15 10:43'
                    },
                    {
                        mark   : 3,
                        content: "Souvent eu des problèmes pour trouver des nounous proches de mon lieu de travail mais avec KeepMe je n'ai plus ce problème.",
                        author : "Denis Roux",
                        date   : '2019-09-28 15:38'
                    },
                    {
                        mark   : 4,
                        content: "Ma nounou a déménagé, je me suis donc à nouveau retrouvé en recherche de nounous pour mes filles, KeepMe m'a énormément facilité la vie. Je recommande !",
                        author : "Sébastien Camus",
                        date   : '2019-10-20 19:32'
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
