<template>
  <settings class="diplomas-container" action="diplomas">
    <div
      class="bg-color-1 btn-file-upload rounded-circle d-flex justify-content-center align-items-center cursor-pointer mx-auto my-5">
      <i class="far fa-cloud-upload fa-3x text-white"></i>
      <input type="file" @change="onUploadFileChange" ref="file">
    </div>

    <hr class="mb-5 w-25 border-color-1">

    <div class="row pt-2">
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 diploma-container mx-auto my-2" v-for="diploma in diplomas"
           v-if="diploma.image">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 diploma-preview">
            <div class="diploma-preview-container mx-auto ml-md-auto mr-md-0 position-relative">
              <img :src="diploma.image" :alt="diploma.name" v-if="diploma.type === 'image'"
                   class="img-fluid rounded h-100 w-100">
              <pdf :src="diploma.image" v-else-if="diploma.type === 'pdf'"/>
              <div class="diploma-preview-overlay bg-color-2 rounded"></div>
              <div class="diploma-preview-overlay-text rounded d-flex justify-content-center align-items-center">
                <span class="font-weight-bold text-white font-italic text-center">{{ diploma.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-upload-information :file="file" @close="resetFile" :humanize-file-size="humanizeFileSize" @send="send"/>

  </settings>
</template>

<script>

    import pdf from 'vue-pdf'

    import Settings               from '../../Index'
    import ModalUploadInformation from './includes/Information'

    let ALLOWED_MIME_TYPE, MAX_FILE_SIZE;

    export default {
        name: "DiplomasIndex",

        components: {
            pdf,
            ModalUploadInformation,
            Settings
        },

        data() {
            return {
                file    : null,
                diplomas: null
            }
        },

        created() {
            return this.run()
        },

        methods: {

            resetFile() {
                this.file = { content: null, preview: { show: false, src: '' }, type: null }
            },

            onUploadFileChange() {

                this.file.content = this.$refs.file.files[0] || null;

                if (this.isValidFile(this.file.content)) {
                    let reader = new FileReader();
                    reader.addEventListener("load", function () {
                        this.file.preview.show = true;
                        this.file.preview.src = reader.result;
                    }.bind(this), false);

                    if (this.file.content && /\.(jpe?g|png|gif)$/i.test(this.file.content.name)) {
                        this.file.type = 'image';
                        reader.readAsDataURL(this.file.content);
                    } else {
                        this.file.type = 'pdf';
                        this.file.preview.show = true
                    }
                    return (this.$modal.show('modal-upload-information') || true)
                }
                return false
            },

            isValidFile(file) {

                return file.size > MAX_FILE_SIZE
                    ? (this.helpers.setFeedback("error", `Chaque fichier ne doit pas dépasser la taille de ${this.humanizeFileSize(MAX_FILE_SIZE)}`, this) || false)
                    : Object.keys(ALLOWED_MIME_TYPE).findIndex(mime => ALLOWED_MIME_TYPE[mime] === file.type) < 0
                        ? (this.helpers.setFeedback("error", `Le format du fichier ${file.name} n'est pas autorisé`, this) || false)
                        : true;

            },

            humanizeFileSize(size) {
                if (size / 1000 < 1000)
                    return Number((size / 1000).toFixed(1)) + ' Ko';
                if (size / 1000 / 1000 < 1000)
                    return Number((size / 1000 / 1000).toFixed(1)) + ' Mo';
                return Number((size / 1000 / 1000 / 1000).toFixed(1)) + ' Go'
            },

            setConfig() {
                return {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            },

            getDiplomas() {
                this.api.get('/diplomas/mine').then(
                    (response) => this.diplomas = response.data.data.diplomas,
                    (error) => console.log(error, error.response)
                )
            },

            // Envoyer les fichier au serveur
            send() {
                let data = new FormData();
                data.append("file", this.file.content);

                // Requête HTTP pour envoyer le fichier
                this.api.postImage('/diploma', data, this.setConfig()).then(
                    () => {
                        this.helpers.setFeedback("success", null, this)
                        this.run()
                        return this.$modal.hide('modal-upload-information')
                    },
                    (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this)
                )
            },

            run() {
                this.getDiplomas();
                this.resetFile();
                MAX_FILE_SIZE = 2000000; // 2Mo
                ALLOWED_MIME_TYPE = {
                    pdf: "application/pdf", jpeg: "image/jpeg", jpg: "image/jpeg", png: "image/png", gif: "image/gif",
                }
            }
        }
    }
</script>

<style>

  .btn-file-upload {
    position: relative;
    height: 100px;
    width: 100px;
  }

  .btn-file-upload input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
  }

  .diploma-container,
  .diploma-preview > .diploma-preview-container {
    height: 300px;
    max-width: 280px;
  }

  .diploma-preview .diploma-preview-overlay,
  .diploma-preview .diploma-preview-overlay-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  .diploma-preview .diploma-preview-overlay {
    opacity: .6;
  }

</style>
