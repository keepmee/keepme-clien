<template>
  <div class="vue-modal-footer pb-4">
    <div class="row w-100">
      <div class="col-6 px-0 border-right d-flex justify-content-center align-items-center">
        <button class="btn btn-block bg-transparent" type="button" @click.prevent="$emit('cancel')">
          <i class="fal fa-ban fa-2x text-danger"></i>
        </button>
      </div>
      <div class="col-6 px-0 border-left d-flex justify-content-center align-items-center">
        <button class="btn btn-block bg-transparent" type="submit" @click="$emit('save')">
          <i class="fal fa-save fa-2x text-success"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ModalFooter",

        methods: {}
    }
</script>

<style scoped>

</style>
