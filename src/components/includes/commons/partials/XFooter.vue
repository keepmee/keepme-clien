<template>
  <div id="footer" class="position-relative" :style="{marginTop: `${isHome ? 0 : 200}px`}">

    <div class="footer-overlay bg-color-4 py-4">
      <!--      <div class="container">-->

      <div class="row">

        <div class="col-12 col-md-4">
          <div class="footer-logo py-2">
            <img src="../../../../assets/img/logo.png" alt="Logo" class="img-fluid px-2 px-md-0 mx-auto d-block">
          </div>
          <div class="footer-about text-justify">
            <p>
              <router-link :to="{name: 'home'}">KeepMe</router-link>
              est née grâce à l'idée d'un groupe de développeur. Que vous soyez maman, papa ou professionnel(le) de
              l'enfance, nous sommes là pour vous. Avec nous, la sécurité est de mise car votre enfant est votre plus
              belle création.
            </p>
          </div>
        </div>

        <div class="col-6 col-md-4">

          <div class="footer-overlay-title pt-2 text-center">
            <span class="h5-responsive font-italic">Menu</span>
            <hr class="w-50 my-2 border-color-1">
          </div>

          <div class="row">
            <ul class="fa-ul mx-auto">
              <li v-for="link in links" v-if="link.show">
                <router-link :to="{name: link.name}">
                  <span class="fa-li"><i :class="link.icon"></i></span><span class="mr-2">></span>{{ link.title }}
                </router-link>
              </li>
            </ul>
          </div>

        </div>

        <div class="col-6 col-md-4">

          <div class="footer-overlay-title pt-2 text-center">
            <span class="h5-responsive font-italic">Contact</span>
            <hr class="w-50 my-2 border-color-1">
          </div>

          <div class="row">
            <ul class="fa-ul mx-auto">
              <li>
                <span class="fa-li"><i class="far fa-at"></i></span><span class="mr-2">></span>contact.keepme@gmail.com
              </li>
            </ul>
          </div>

        </div>

      </div>

      <!--      </div>-->
    </div>

    <div id="pre-footer" class="footer-container bg-color-1">
      <div class="text-white">
        <!--      <div class="container text-white">-->
        <div class="row d-flex align-items-center">
          <div class="col-6">
            Copyright&nbsp;<i class="fal fa-copyright"></i>&nbsp;2019&nbsp;
            <router-link :to="{name: 'home'}" class="text-white">KeepMe.</router-link>
          </div>
          <div class="col-6 text-right">
            Tous droits réservés
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Logo from "../Logo";

    export default {
        name      : "XFooter",
        components: { Logo },

        data() {
            return {
                links: [
                    { name: 'home', icon: 'far fa-home', title: 'Accueil', show: true },
                    { name: 'login', icon: 'far fa-sign-in', title: 'Connexion', show: true },
                    { name: 'nannies.index', icon: 'far fa-child', title: 'Nanny', show: true },
                    { name: 'koops.index', icon: 'far fa-list', title: 'Koops', show: true },
                    { name: 'account.settings.index', icon: 'far fa-user', title: 'Compte', show: true },
                    { name: 'account.profile.index', icon: 'far fa-eye', title: 'Profil', show: true },
                ]
            }
        },

        mounted() {
            this.$store.getters.nannied.then(is => {
                this.links[this.links.findIndex(link => link.name === 'nannies.index')].show = !is
                this.links[this.links.findIndex(link => link.name === 'koops.index')].show = is
                this.$forceUpdate()
            }).finally(() => this.loading = false)
        },

        computed: {
            isHome() {
                return this.$route.name === 'home'
            },
        }
    }
</script>

<style scoped>

  #footer {
    margin-top: 100px;
    background-color: #ffffff;
  }

  .footer-overlay {
    /*position: absolute;*/
    /*top: -100px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*height: 100px;*/
    width: 100%;
    /*opacity: .9;*/
  }

  #pre-footer {
    /*border-top: 3px solid #000;*/
    /*background-color: #ffffff;*/
    padding-top: 15px;
    padding-bottom: 15px;
  }

  #pre-footer .block {
    text-align: center;
  }

  #footer .block {
    padding-bottom: 1rem;
  }

  #pre-footer .block:not(.last-block):after {
    content: ' ';
    border-left: 2px solid #DD9B18;
    height: 50px;
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    top: 50%;
  }


  .footer-logo > img {
    height: 75px;
  }

  .footer-overlay a {
    text-decoration: inherit !important;
    color: inherit !important;
  }
</style>
