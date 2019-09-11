<template>
  <services-timeline class="services-nannies" :services="services" side="right"/>
</template>

<script>

    import ServicesTimeline from "./ServicesTimeline";

    export default {
        name: "ServicesNannies",

        components: { ServicesTimeline },

        data() {
            return {
                services: [
                    {
                        icon : 'far fa-user-plus',
                        title: 'inscription',
                        body : "Créez votre compte",
                    },
                    {
                        icon : 'far fa-sign-in',
                        title: 'connexion',
                        body : "Connectez-vous",
                    },
                    {
                        icon : 'far fa-layer-plus',
                        title: 'ajout',
                        body : "Déposez ensuite votre annonce",
                    },
                    {
                        icon : 'far fa-bullseye-pointer',
                        title: 'choix',
                        body : "Choisissez la nounou qui convient le mieux",
                    },
                    {
                        icon : 'far fa-comment-dots',
                        title: 'notation',
                        body : "Notez et / ou commentez la nounou",
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
