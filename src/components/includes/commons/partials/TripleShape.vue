<template>
  <div class="triple-shape position-relative" id="tripleShape"
       :style="{height: `${image ? options.size : options.size + (options.size * 0.3)}px`, width: `${image ? options.size : options.size + (options.size * 0.3)}px`, margin: `${image ? 0 : options.size / 5}px`}">

    <div class="item item-1 border border-color-1"
         :class="{'border-strong': strong, 'border-very-strong': veryStrong, 'border-0 no-rotate': image}"
         :style="{height: `${options.size}px`, width: `${options.size}px`}"></div>

    <div class="item item-2 border border-color-1"
         :class="{'border-strong': strong, 'border-very-strong': veryStrong, 'border-0 no-rotate': image}"
         :style="{height: `${options.size}px`, width: `${options.size}px`}"></div>

    <div class="item item-3 border border-color-1"
         :class="{'border-strong': strong, 'border-very-strong': veryStrong, 'border-0 no-rotate': image}"
         :style="{height: `${options.size}px`, width: `${options.size}px`}"></div>

    <div class="item item-center d-flex justify-content-center align-items-center" :class="centerClass"
         :style="{height: `${centerSize ? centerSize : options.size / 2 }px`, width: `${centerSize ? centerSize : options.size / 2 }px`}">
      <slot></slot>
    </div>


  </div>
</template>

<script>

    export default {
        name : "TripleShape",
        props: {
            size       : { type: Number, required: false },
            strong     : { type: Boolean, required: false },
            veryStrong : { type: Boolean, required: false },
            centerClass: { type: String, required: false },
            centerSize : { type: Number, required: false },
            animate    : { type: Boolean, required: false },
            image      : { type: Boolean, required: false }
        },

        data() {
            return {
                options: { size: 50 }
            }
        },

        watch: {
            size(value) {
                this.options.size = value
            },

            animate(value) {
                this.toggleAnimate(value)
            }
        },

        created() {
            this.options.size = this.size || 50
        },

        mounted() {
            this.toggleAnimate(this.animate)
        },

        methods: {
            toggleAnimate(animate) {
                let tripleShape = $('#tripleShape')
                if (animate) tripleShape.addClass('triple-shape-animate')
                else tripleShape.removeClass('triple-shape-animate')
            }
        }

    }

</script>

<style scoped>

  .triple-shape .item {
    position: absolute;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    border-radius: 2px;
    transform: rotate(45deg);
  }

  .triple-shape .item-1 {
    top: 0;
  }

  .triple-shape .item-2 {
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .triple-shape .item-3 {
    bottom: 0;
  }

  .triple-shape .item.item-center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    transform: rotate(45deg);
    margin: auto;
  }

  .triple-shape .no-rotate {
    top: 0 !important;
    bottom: 0 !important;
    margin: 0 !important;
    transform: rotate(0deg) !important;
  }

  .triple-shape.triple-shape-animate .item-2 {
    animation-delay: .2s;
  }

  .triple-shape.triple-shape-animate .item-3 {
    animation-delay: .4s;
  }

  .triple-shape-animate .item {
    /* ANIMATION NAME */
    -webkit-animation-name: tripleShapeAnimate;
    animation-name: tripleShapeAnimate;

    /* ANIMATION DURATION */
    -webkit-animation-duration: 2.8s;
    animation-duration: 2.8s;

    /* ANIMATION TIMING */
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;

    /* ANIMATION ITERATION */
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;

    /* ANIMATION FILL MODE */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;

    /* ANIMATION DIRECTION */
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }


  @keyframes tripleShapeAnimate {
    from {
      -webkit-transform: rotate(0) translateX(-90%);
      transform: rotate(0) translateX(-90%);
    }
    50% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    to {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

</style>
