<template>
  <div id="chooseWho">

    <div class="row col-12 my-2">
      <label class="h3 text-center w-100">Vous êtes...</label>
    </div>

    <div class="row col-12 my-2">
      <button :class="btnClass" @click="nextStep('parent')">parent</button>
    </div>

    <div class="row">
      <hr class="w-25">
    </div>

    <div class="row col-12 my-2">
      <button :class="btnClass" @click="nextStep('nanny')">nounou</button>
    </div>

  </div>
</template>

<script>
    export default {
        name: "ChooseWho",

        data() {
            return {
                btnClass: 'btn btn-block border border-color-1 color-1 bg-transparent'
            }
        },

        methods: {

            nextStep(choice) {
                this.$emit('setRole', choice)
            }

        }
    }
</script>

<style scoped>

</style>
