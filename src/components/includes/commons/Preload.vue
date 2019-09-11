<template>
  <div id="preload" class="position-fixed justify-content-center align-items-center" :class="className">
    <circle-square/>
  </div>
</template>

<script>

    let interval

    import CircleSquare from "./Loader/CircleSquare";

    export default {
        name: "Preload",

        components: {
            CircleSquare
        },

        data() {
            return {
                className: "d-flex",
                animate  : true
            }
        },

        created() {
            this.run()
        },

        methods: {

            close() {
                this.className = "d-flex animated fadeOut"
                let self = this
                setTimeout(() => {
                    self.className = "d-none"
                    clearInterval(interval)
                    this.$emit('loaded')
                }, 1000)
            },

            run() {
                let self = this, i = 0
                interval = setInterval(() => {
                    if ((document.readyState === "complete" || document.readyState === "ready") || i++ > 10)
                        self.close()
                }, 1000)

            }
        }
    }
</script>

<style scoped>

  #preload {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 16777271;
    background-color: #fff;
  }

</style>
