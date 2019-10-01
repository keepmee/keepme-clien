<template>

  <triple-shape :size="size" center-class="bg-color-1" :animate="false">
    <!--    <div class="item item-center bg-color-1 d-flex justify-content-center align-items-center"-->
    <!--         :style="{height: `${options.size - (options.size * 0.5)}px`, width: `${options.size - (options.size * 0.5)}px`}">-->
    <icon icon="baby" class="item-icon"
          :style="{height: `${options.size / 3}px`, width: `${options.size / 3}px`}"/>
    <!--    </div>-->
  </triple-shape>

  <!--<div class="logo position-relative"
       :style="{height: `${options.size + (options.size * 0.3)}px`, width: `${options.size + (options.size * 0.3)}px`, margin: `${options.size / 5}px`}">

    <div class="item item-1 border border-color-1"
         :style="{height: `${options.size}px`, width: `${options.size}px`}"></div>

    <div class="item item-2 border border-color-1"
         :style="{height: `${options.size}px`, width: `${options.size}px`}"></div>

    <div class="item item-3 border border-color-1"
         :style="{height: `${options.size}px`, width: `${options.size}px`}"></div>

    <div class="item item-center bg-color-1 d-flex justify-content-center align-items-center"
         :style="{height: `${options.size - (options.size * 0.5)}px`, width: `${options.size - (options.size * 0.5)}px`}">
      <icon icon="baby" class="item-icon"
            :style="{height: `${options.size / 3}px`, width: `${options.size / 3}px`}"/>
    </div>

  </div>-->
</template>

<script>

    import Icon        from "../partials/Icon";
    import TripleShape from "../partials/TripleShape";

    export default {
        name      : "Logo",
        components: { Icon, TripleShape },
        props     : {
            size: { type: Number, required: false }
        },

        data() {
            return {
                options: { size: 50 }
            }
        },

        watch: {
            size(value) {
                this.options.size = value
            }
        },

        created() {
            this.options.size = this.size || 50
        }

    }
</script>

<style scoped>

  .item-icon {
    transform: rotate(-45deg);
    -webkit-filter: brightness(0) invert(1);
    filter: brightness(0) invert(1);
  }

</style>
