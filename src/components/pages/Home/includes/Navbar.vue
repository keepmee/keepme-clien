<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-color-4"
       :class="{'fixed-top': section && section !== 'homePreMain'}">
    <a class="navbar-brand" href="#">
      <logo :size="30" @click="navigate('home')"/>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav ml-auto">

        <li class="nav-item" v-for="link in links" :class="{'active rounded bg-color-2 text-white': isActive(link)}"
            v-if="link.show">
          <a class="nav-link waves-effect waves-light"
             @click="navigate(link.route)">
            <i :class="link.icon"></i>
            {{ link.label }}
          </a>
        </li>

      </ul>

    </div>
  </nav>
</template>

<script>

    import Logo     from '../../../includes/commons/Logo'
    import {scroll} from "../../../../app/utils";

    export default {
        name: "Navbar",

        components: { Logo },
        props     : ['section'],
        data() {
            return {
                links: [
                    { label: "Accueil", route: 'functionalityIndexSection', icon: 'far fa-home', show: true },
                    { label: "Pour qui ?", route: 'intendedUsersIndexSection', icon: 'far fa-bullseye', show: true },
                    { label: "Comment ça marche ?", route: 'servicesIndexSection', icon: 'far fa-wrench', show: true },
                    { label: "Nous contacter", route: 'contactIndexSection', icon: 'far fa-envelope', show: true },
                    { label: "Connexion", route: 'login', icon: 'far fa-sign-in', show: true },
                    { label: "Déconnexion", route: 'logout', icon: 'far fa-sign-out', show: false },
                ]
            }
        },

        mounted() {
            this.$store.getters.logged.then((r) => {
                this.links[this.links.findIndex(link => link.route === 'logout')].show = r === true
                this.links[this.links.findIndex(link => link.route === 'login')].show = r === false
                this.$forceUpdate()
            })
        },

        methods: {

            isActive(link) {
                return this.section === link.route
            },

            navigate(name) {
                return name === 'login' || name === 'logout' ? this.helpers.navigate(this.$router, name) : scroll(`#${name}`, 60);
            }
        }
    }
</script>

<style scoped>

  .navbar {
    width: 100%;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    -o-box-shadow: none !important;
    box-shadow: none !important;
    height: 100px;
  }

  .nav-item.active a.nav-link {
    color: #FFF !important;
    background-color: transparent !important;
  }

</style>
