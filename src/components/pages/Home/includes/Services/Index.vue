<template>
  <div class="services-index container section-container" id="servicesIndexSection">

    <!-- SECTION TITLE -->
    <section-title title="<span class='color-1'>comment</span> ça marche ?" class="pt-5"/>

    <!-- SECTION CONTENT-->
    <div class="row w-100 my-5">
      <div class="col-12 col-sm-6 col-md-4 text-center my-5 mx-auto" v-for="(service, $idx) in services"
           :data-aos="`${ $idx % 2 === 0 ? 'fade-right' : 'fade-left'}`">

        <div
          class="service-icon bg-color-1 d-flex justify-content-center align-items-center rounded-circle mx-auto">
          <i :class="service.icon" class="fa-3x color-4" data-aos="zoom-in"
             data-aos-delay="500" data-aos-easing="ease-in-quad" data-aos-duration="500"></i>
        </div>

        <div class="service-content">
          <div class="font-weight-bold my-3">{{ service.title | uppercase }}</div>
          <p v-html="service.body"></p>
        </div>
      </div>
    </div>

    <blockquote class="groucho text-center w-100 sanchez grey-text font-italic">
      <span class="mx-2">&#10077;</span>
      Avec Keepme, restez maître de votre budget
      <span class="mx-2">&#10078;</span>
    </blockquote>

  </div>
</template>

<script>

    import SectionTitle from "../../../../includes/commons/partials/Title/Section";
    // import ServicesNannies from "./components/ServicesNannies";
    // import ServicesParents from "./components/ServicesParents";

    export default {
        name: "ServicesIndex",

        components: { SectionTitle, },

        data() {
            return {
                services: [
                    {
                        icon : 'fal fa-user-plus',
                        title: 'inscription',
                        body : "Commencez par <span class='font-weight-bold'>créer un compte</span> afin d'accéder au service.",
                    },
                    {
                        icon : 'fal fa-sign-in',
                        title: 'connexion',
                        body : "Utilisez vos identifiants pour <span class='font-weight-bold'>vous connecter</span> au service.",
                    },
                    {
                        icon : 'fal fa-layer-plus',
                        title: 'ajout',
                        body : "Déposez ensuite <span class='font-weight-bold'>votre annonce</span> dans l'espace prévu à cet effet.",
                    },
                    {
                        icon : 'fal fa-bullseye-pointer',
                        title: 'choix',
                        body : "Choisissez la nounou qui convient le mieux, <span class='font-weight-bold'>si vous êtes un parent</span>.",
                    },
                    {
                        icon : 'fal fa-bullseye-pointer',
                        title: 'choix',
                        body : "Choisissez l'annonce qui convient le mieux, <span class='font-weight-bold'>si vous êtes une nounou</span>.",
                    },
                    {
                        icon : 'fal fa-comment-dots',
                        title: 'commentaire',
                        body : "Commentez votre expérience afin d'aider les autres utilisateurs.",
                    }
                ]
            }
        }
    }
</script>

<style scoped>

  .service-icon {
    height: 100px;
    width: 100px;
  }

  .groucho {
    position: relative;
    font-size: 25px;
    line-height: 1.5em;
  }

</style>
