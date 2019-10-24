<template>
  <div class="intended-users-index w-100 section-container" id="intendedUsersIndexSection">


    <!-- SECTION TITLE -->
    <section-title title="<span class='color-1'>inscrivez vous</span> en tant que"/>

    <!-- SECTION CONTENT-->
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 px-0" data-aos="slide-right">
          <selector-icon class="mx-auto cursor-pointer" icon="family" label-color="color-1" bg="bg-color-2"
                         shape-position="right" label="parents" @click="navigate('register')"/>
        </div>

        <div class="col-12 col-md-6 px-0" data-aos="slide-left">
          <selector-icon class="mx-auto cursor-pointer" icon="nanny" label-color="color-2" bg="bg-color-1"
                         shape-position="left" label="nounous" @click="navigate('register')"/>
        </div>
      </div>

      <!--    https://fr.freepik.com/photos-gratuite/belle-famille-passer-du-temps-exterieur_5149439.htm-->
      <!--    https://fr.freepik.com/photos-gratuite/livre-lecture-pour-enfants_1267847.htm-->
    </div>


    <div class="parallax-container position-relative my-5">
      <div class="parallax-overlay d-flex justify-content-center align-items-center text-center">
        <blockquote class="groucho text-white w-100 sanchez">
          <span class="mx-2">&#10077;</span>
          Rendre service aux autres c'est se rendre service à soi-même.
          <span class="mx-2">&#10078;</span>
        </blockquote>
      </div>
      <div class="parallax">
        <img src="../../../../../assets/img/backgrounds/park.jpg"/>
      </div>
    </div>

  </div>
</template>

<script>


    import SelectorIcon from "./components/IntendedUsersIcon";

    import SectionTitle from "../../../../includes/commons/partials/Title/Section";

    export default {
        name: "IntendedUsersIndex",

        components: { SectionTitle, SelectorIcon },


        mounted() {
            $(document).ready(function () {
                $('.parallax').parallax(2.6);
            });
        },

        methods: {
            navigate(name) {
                return this.$router.push({ name })
            },
        }
    }
</script>

<style scoped>

  .parallax-container {
    height: 300px;
  }

  .parallax-container .parallax > img {
    filter: sepia(40%);
  }

  .parallax-container .parallax-overlay {
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

</style>
