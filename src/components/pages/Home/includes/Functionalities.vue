<template>
  <div class="functionality-index section-container row w-100" id="functionalityIndexSection">

    <!-- SECTION TITLE -->
    <section-title title="bienvenue chez <span class='color-1'>keepme</span>" class="pt-5"/>
    <div class="text-center w-100">
      <p class="mb-0">Vous êtes parents et avez besoin de faire garder votre (vos) enfant(s) ?</p>
      <p>Vous êtes nounous et souhaitez trouver des annonces ?</p>
      <p>Vous êtes au bon endroit.</p>
      <p class="mb-0">Nous mettons en relation les parents et les professionnels de l'enfant.</p>
      <p>Avec nous,
        <span class="font-weight-bold">la sécurité est de mise</span> car votre enfant est votre plus belle création
      </p>
    </div>

    <!-- SECTION CONTENT-->
    <div class="row w-100 my-5">
      <div class="col-12 col-sm-6 col-md-3 text-center my-2" v-for="(f, $idx) in functionalities"
           :data-aos="`${ $idx % 2 === 0 ? 'fade-right' : 'fade-left'}`">

        <div
          class="functionality-icon border border-strong-2 border-color-1 d-flex justify-content-center align-items-center rounded-circle mx-auto">
          <i :class="f.icon" class="fa-1x5 color-1" data-aos="zoom-in"
             data-aos-delay="500" data-aos-easing="ease-in-quad" data-aos-duration="500"></i>
        </div>

        <div class="functionality-content mt-1">
          <span class="font-weight-bold color-3 h5-responsive">{{ f.label }}</span>
          <p>{{ f.content }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

    import SectionTitle from "../../../includes/commons/partials/Title/Section";

    export default {
        name: "FunctionalityIndex",

        components: { SectionTitle },

        data() {
            return {
                functionalities: [
                    {
                        label  : 'Fiabilité',
                        icon   : 'far fa-fingerprint',
                        content: "Chaque nounou doit déposer au moins un diplôme avant de pouvoir postuler à une annonce."
                    },
                    {
                        label  : 'Rapidité',
                        icon   : 'far fa-bolt',
                        content: "Déposez, postulez, commentez ou encore notez vos expériences en deux clics."
                    },
                    {
                        label  : 'Simplicité',
                        icon   : 'far fa-child',
                        content: "Seule une connexion internet et un compte suffit à l'utilisation de notre service."
                    },
                    {
                        label  : 'Géolocalisation',
                        icon   : 'far fa-location-arrow',
                        content: "En tant que nounou, trouvez des annonces. Si vous êtes parents, choisissez vos nounous. Tout cela près de chez vous."
                    },
                ]
            }
        }
    }
</script>

<style scoped>

  .functionality-icon {
    height: 100px;
    width: 100px;
  }

</style>
