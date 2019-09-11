<template>
  <div class="contact-index container mx-auto section-container mb-5" id="contactIndexSection">

    <!-- SECTION TITLE -->
    <section-title title="nous <span class='color-1'>contacter</span>"/>

    <!-- SECTION CONTENT -->
    <div class="row w-100">

      <form id="contactForm" class="w-100 col-12 col-md-10 col-lg-8 col-xl-7 mx-auto" @submit.prevent="send">

        <div class="row">
          <ssf-form-group col="col-12 col-md-6" name="lastname" :object="contact" label="Nom" @inputted="onInputted"
                          :required="true" icon="far fa-user" data-aos="flip-down"/>
          <ssf-form-group col="col-12 col-md-6" name="firstname" :object="contact" label="Prénom"
                          @inputted="onInputted" :required="true" icon="far fa-user" data-aos="flip-down"/>
        </div>

        <div class="row">
          <ssf-form-group col="col-12 col-md-6" name="email" :object="contact" label="Adresse e-mail"
                          @inputted="onInputted" type="email" :required="true" icon="far fa-at" data-aos="flip-down"/>
          <ssf-form-group col="col-12 col-md-6" name="phone" :object="contact" label="Numéro de téléphone"
                          @inputted="onInputted" :required="true" icon="far fa-phone" data-aos="flip-down"/>
        </div>

        <div class="row">
          <ssf-form-group col="col-12" name="subject" :object="contact" label="Object"
                          @inputted="onInputted" :required="true" icon="far fa-mail-bulk" data-aos="flip-down"/>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="ssf-form-group" data-aos="flip-down">
              <textarea-autosize ref="message" rows="4" id="message" name="message" v-model="contact.message"
                                 class="form-control"/>
              <label for="message" :class="{'input-active': helpers.isLabelActive(contact, 'message')}">
                <i class="far fa-comment-alt-lines mr-1"></i>Message (*)
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="ssf-form-group text-right" data-aos="flip-down">
              <button class="btn bg-color-1" type="submit">
                Envoyer le message <i class="far fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

      </form>

    </div>

  </div>
</template>

<script>

    import SectionTitle from "../../../../includes/commons/partials/Title/Section";

    import SsfFormGroup from "../../../../includes/commons/partials/SsfFormGroup";

    export default {
        name      : "ContactIndex",
        components: { SectionTitle, SsfFormGroup },

        data() {
            return {
                contact: {},
            }
        },

        methods: {
            onInputted(name, value) {
                this.contact[name] = value
                this.$forceUpdate()
            },

            send() {
                this.api.post('/mail/contact', this.contact).then(() => this.contact = {})
            }
        }
    }
</script>

<style scoped>

</style>
