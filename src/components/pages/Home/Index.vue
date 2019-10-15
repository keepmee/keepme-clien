<template>
  <div class="home section-container" id="homeSection" @scroll="handleScroll">
    <home-pre-main :toggle="toggle.logo"/>

    <div id="homeMain">

      <home-navbar :section="current.section"/>

      <div class="row">

        <home-functionality/>

        <home-intended-users/>

        <home-services/>

        <home-contact/>

        <home-opinion/>

      </div>

    </div>

  </div>
</template>

<script>

    import HomeNavbar        from './includes/Navbar'
    import HomeOpinion       from "./includes/Opinion";
    import HomePreMain       from './includes/PreMain'
    import HomeFunctionality from './includes/Functionalities'
    import HomeIntendedUsers from './includes/IntendedUsers/Index'
    import HomeServices      from './includes/Services/Index'
    import HomeContact       from './includes/Contact/Index'

    import SectionTitle from "../../includes/commons/partials/Title/Section";

    import Icon             from '../../includes/commons/partials/Icon'
    import {scrollPosition} from "../../../app/utils";

    export default {

        name: 'Home',

        components: {
            Icon,
            HomeNavbar,
            HomePreMain,
            HomeServices,
            HomeIntendedUsers,
            HomeFunctionality,
            HomeContact,
            HomeOpinion,
            SectionTitle
        },

        created() {
            window.addEventListener('scroll', this.handleScroll);
            return this.run()
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        data() {
            return {
                toggle : { logo: false },
                current: { section: null }
            }
        },

        methods: {

            handleScroll() {
                this.current.section = scrollPosition()
            },

            run() {
                setTimeout(() => {
                    this.toggle.logo = true
                }, 2300)
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #homeMain {
    min-height: 100vh;
    width: 100%;
    z-index: 1050;
    background: #ffffff;
  }

</style>
