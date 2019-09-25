<template>
  <modal name="modal-form-response" id="formResponse" height="auto" :adaptive="true" :reset="true" :scrollable="true"
         @before-open="beforeOpen" :class="{'form-response-success': isSuccess()}">
    <!--         :scrollable="true" :width="width.current" @before-open="adjustWidth" class="py-2">-->

    <div class="vue-modal-header px-4 border-top border-very-strong rounded"
         :class="{'border-success-dark': isSuccess(), 'border-danger-dark': isError()}">
      <button class="form-response-type-icon text-white border-0 animated bounceInUp"
              :class="{'success-color-dark': isSuccess(), 'danger-color-dark': isError()}" @click="hideModal">
        <i class="fal fa-3x animated zoomInDown delay-1s" :class="{'fa-check': isSuccess(), 'fa-times': isError()}"></i>
      </button>
      <!--      <hr class="w-100 border-dark">-->
    </div>

    <div class="vue-modal-body" :class="{'p-5': !isSuccess(), 'text-white font-weight-bold': isSuccess()}">

      <!--      <feedback :show="feedback.show" :content="feedback.content" :type="feedback.type"/>-->

      <div class="row w-100">
        <div class="col-12 text-center">
          <span class="font-italic" :class="{'text-danger-dark': isError()}">{{ message }}</span>
        </div>
      </div>

    </div>

    <!--<div class="vue-modal-footer mb-3" v-if="!isSuccess()">
      <div class="row w-100">
        <div class="col-6 border-right d-flex justify-content-center align-items-center">
          <button class="btn btn-block z-depth-0" type="button" @click.prevent="hideModal">
            <i class="fal fa-ban fa-2x text-danger"></i>
          </button>
        </div>
        <div class="col-6 border-left d-flex justify-content-center align-items-center">
          <button class="btn btn-block z-depth-0" type="submit" @click="save">
            <i class="fal fa-save fa-2x text-success"></i>
          </button>
        </div>
      </div>
    </div>-->

  </modal>
</template>

<script>
    export default {
        name: "FormResponse",

        data() {
            return {
                type   : null,
                message: null,
            }
        },

        methods: {

            isSuccess() {
                return this.type === 'success'
            },

            isError() {
                return this.type === 'error'
            },

            isWarning() {
                return this.type === 'warning'
            },

            hideModal() {
                // this.reset()
                this.$modal.hide('modal-form-response')
            },

            beforeOpen(event) {
                this.type = event.params.type
                this.message = event.params.message
            },

            save() {
            }

        }
    }
</script>

<style>

  #formResponse .vue-modal-header {
    position: relative;
    height: 50px;
    width: 100%;
  }

  .v--modal-overlay .v--modal-box {
    overflow: visible !important;
    margin: 0 !important;
    /*overflow-x: hidden;*/
  }

  #formResponse .v--modal-box.v--modal {
    box-shadow: none !important;
  }

  #formResponse.form-response-success .v--modal-box.v--modal {
    background: transparent !important;

  }

  #formResponse.v--modal-overlay {
    z-index: 1052 !important;
  }

  .form-response-type-icon {
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    width: 100px;
    margin-left: auto;
    margin-right: auto;
    z-index: 100;
    border-radius: 50%;
    outline: none !important;
  }

  .border-success-dark {
    border-color: #007e33 !important;
  }

  .border-danger-dark {
    border-color: #cc0000 !important;
  }

  .text-danger-dark {
    color: #cc0000 !important;
  }

</style>
