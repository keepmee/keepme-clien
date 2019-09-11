<template>
  <triple-shape :size="225" :strong="true" :center-size="178">
    <div class="intended-users-icon-container h-100 w-100">
      <div class="intended-users-icon-overlay" :class="bg"></div>
      <img :src="getSrc()" :alt="getAlt()" class="img-fluid">
      <intended-users-label :label="label" :color="labelColor"/>
    </div>
  </triple-shape>
</template>

<script>

    import Icon        from "../../../../../includes/commons/partials/Icon";
    import TripleShape from "../../../../../includes/commons/partials/TripleShape";

    import IntendedUsersLabel from "./IntendedUsersLabel";

    export default {
        name: "IntendedUsersIcon",

        props: ['icon', 'labelColor', 'bg', 'shapePosition', 'label'],

        components: { IntendedUsersLabel, Icon, TripleShape },

        created() {
            return this.run()
        },

        methods: {

            getSrc() {
                return require(`@/assets/img/backgrounds/${this.icon}.jpg`)
            },

            getAlt() {
                return `Image ${this.icon}`
            },

            getStyle() {
                let winWidth = $(window).width(), width = winWidth < 468 ? winWidth : 468,
                    styles = { 'border-top': `${width}px solid #fff` }

                if (this.shapePosition === 'right') {
                    styles.right = 0
                    styles["border-left"] = `${width}px solid transparent`
                } else if (this.shapePosition === 'left') {
                    styles.left = 0
                    styles["border-right"] = `${width}px solid transparent`
                }
                return styles
            },

            resizeShape() {
                let selBefore = $('.intended-users-icon-container:before'),
                    selContainer = $('.intended-users-icon-container')
                selBefore.css({
                    'border-left-width': $(window).width() < selContainer.height() ? $(window).height() : selContainer.height(),
                    'border-top-color' : `border-${this.color}`
                })
            },

            resize() {
                this.resizeShape()
            },

            run() {
                this.resize()
            }
        }

    }
</script>

<style scoped>

  /*.item.item-center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: rotate(45deg);
    margin: auto;
  }*/

  .intended-users-icon-container {
    position: relative;
  }

  .intended-users-icon-container img,
  .intended-users-icon-container .intended-users-icon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .intended-users-icon-container .intended-users-icon-overlay {
    opacity: .8;
    z-index: 2;
  }

  .intended-users-icon-container .intended-users-label {
    transform: rotate(-45deg);
  }

</style>
