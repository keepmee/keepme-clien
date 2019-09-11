<template>
  <modal name="modal-upload-information" :click-to-close="false" height="auto" :adaptive="true" :reset="true"
         :scrollable="true" :max-width="400" class="py-2" @before-open="onBeforeOpen">

    <div class="vmodal-header px-4">
      <button class="btn z-depth-0 color-1 btn-block bg-transparent" @click="hideModal()">
        <i class="fal fa-times fa-2x"></i>
      </button>
      <hr class="w-100 border-color-1">
    </div>

    <div class="vmodal-body p-4">

      <div class="row d-flex justify-content-center align-items-center" v-if="file.preview.show">
        <div class="col-4 col-md-3 file-preview">
          <div class="file-preview-container mx-auto ml-md-auto mr-md-0 position-relative">
            <img :src="file.preview.src" v-if="file.type === 'image'" :alt="file.content.name"
                 class="img-fluid rounded h-100 w-100"/>
            <div class="file-preview-overlay bg-color-1 rounded"></div>
            <div class="file-preview-overlay-text rounded d-flex justify-content-center align-items-center">
              <span class="font-weight-bold text-white">{{ file.content.name.split('.').pop() | uppercase }}</span>
            </div>
          </div>
        </div>
        <div class="col-8 col-md-6">
          <span class="color-3 font-weight-bold">{{ file.content.name }}</span>
        </div>
        <div class="col-12 col-md-3 text-right">
          <span class="small font-italic">{{ humanizeFileSize(file.content.size) }}</span>
        </div>
      </div>

      <div class="row" v-else>
        <triple-spinner :thickness="1" :size="50" color1="#EBC8B2" color2="#CBCADE" color3="#110c11" class="mx-auto"/>
      </div>

    </div>

    <div class="vmodal-footer p-4">
      <hr class="w-100 border-color-1">
      <div class="row w-100">
        <button class="btn bg-white color-1 mx-auto" type="submit" @click="$emit('send')">
          <i class="far fa-thumbs-up fa-2x"></i>
        </button>
      </div>
    </div>

  </modal>
</template>

<script>

    import pdf           from 'vue-pdf'
    import TripleSpinner from '../../../../../../includes/commons/Loader/TripleSpinner'

    export default {
        name: "Information",

        props: {
            file            : { type: Object, required: false },
            humanizeFileSize: { type: Function, required: true }
        },

        components: {
            pdf,
            TripleSpinner,
        },

        methods: {
            onBeforeOpen() {

            },

            hideModal() {
                this.$modal.hide('modal-upload-information')
                this.$emit('close')
            },


        }

    }
</script>

<style scoped>

  .file-preview > .file-preview-container {
    height: 60px;
    width: 60px;
  }

  .file-preview .file-preview-overlay,
  .file-preview .file-preview-overlay-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  .file-preview .file-preview-overlay {
    opacity: .4;
  }

</style>
