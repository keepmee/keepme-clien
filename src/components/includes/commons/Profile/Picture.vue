<template>
  <triple-shape :size="options.image.src ? options.image.height : options.size"
                :center-size="options.image.src ? options.image.height : options.center" :strong="false"
                :center-class="!!(options.image.src) ? 'no-rotate' :''" :image="!!(options.image.src)">
    <div class="d-flex justify-content-center align-items-center h-100 w-100"
         :class="{'bg-color-1': !options.image.src}">
      <img :src="options.image.src" alt="Photo de profil" v-if="options.image.src" :height="options.image.height"
           :width="options.image.width" :style="{height: options.image.height, width: options.image.width}"
           class="rounded-circle" :class="{'border-strong': strong, 'p-1 border border-color-1': bordered}">
      <i class="fal fa-user text-white user-icon" :class="{'fa-xs': small}" v-else></i>
    </div>
  </triple-shape>
</template>

<script>
    import TripleShape from "../partials/TripleShape";

    export default {
        name: "ProfilePicture",

        props: {
            size    : Number,
            center  : Number,
            image   : Object,
            strong  : { type: Boolean, default: true },
            small   : { type: Boolean, default: false },
            bordered: { type: Boolean, default: true }
        },

        components: {
            TripleShape
        },

        data() {
            return {
                options: {
                    size  : 50,
                    center: 30,
                    image : {
                        src   : null,
                        height: 150,
                        width : 150
                    }

                }
            }
        },

        watch: {
            size(value) {
                this.setSize(value)
            },

            center(value) {
                this.setCenter(value)
            },

            image(value) {
                this.setImage(value)
            },

        },

        created() {
            return this.run()
        },

        methods: {

            setSize(size) {
                this.options.size = size || this.options.size
            },

            setCenter(center) {
                this.options.center = center || this.options.center
            },

            setImage(image) {
                this.options.image.src = image.src || this.options.image.src
                this.options.image.height = image.height || this.options.image.height
                this.options.image.width = image.width || this.options.image.width
            },

            run() {
                this.setSize(this.size)
                this.setCenter(this.center)
                this.setImage(this.image)
            }
        }
    }
</script>

<style scoped>
  .user-icon {
    -webkit-transform: rotate(-45deg) !important;
    transform: rotate(-45deg) !important;
  }
</style>
