<template>

  <div class="profile-container row" v-if="koop || author">
    <div class="profile-picture-container" :style="{width: `${options.width}px`}">
      <profile-picture :size="options.size" :center="options.center" class="mx-auto" :small="small" :strong="strong"
                       :image="{src: user.image, height: options.height, width: options.width}"/>
    </div>

    <div class="profile-name-container pl-3 pr-2 d-flex justify-content-center flex-column"
         :style="{width: `calc(100% - ${options.width}px)`}">
      <div class="koop-author">
        <router-link
          :to="{name: 'profile.index', params: {separator: nanny ? 'nny' : 'prt', name: `${user.firstname}.${user.lastname}`}}">
          <span class="koop-author-content font-weight-bold color-1">
            {{ user.firstname | capitalize }} {{ user.lastname | capitalize }}
          </span>
        </router-link>

        <slot></slot>

      </div>

      <div class="koop-datetime">
        <span class="koop-datetime-content grey-text" v-if="koop">
          {{ helpers.moment(koop.created_at).format('HH:mm') }}
          <i class="fal fa-ellipsis-h"></i>
          {{ helpers.moment(koop.created_at).format('DD MMM YYYY') }}
        </span>
        <slot name="slot2"></slot>
      </div>

    </div>
  </div>

</template>

<script>
    import Share          from "../Share";
    import ProfilePicture from "./Picture";

    export default {
        name: "ProfileContainer",

        components: { Share, ProfilePicture },

        props: {
            koop  : { required: false },
            author: { required: false },
            size  : { type: Number },
            center: { type: Number },
            height: { type: Number },
            small : { type: Boolean },
            strong: { type: Boolean },
            nanny : { type: Boolean, default: false },
        },

        watch: {
            size(value) {
                return this.setSize(value)
            },
            center(value) {
                return this.setCenter(value)
            },
            height(value) {
                return this.setHeight(value)
            },
            koop(value) {
                return this.setAuthor(value.author)
            },
            author(value) {
                return this.setAuthor(value)
            },
        },

        created() {
            return this.run()
        },

        data() {
            return {
                options: {
                    size  : 50,
                    center: 30,
                    height: 60,
                    width : 60,
                    author: null
                },
                show   : { share: false }
            }
        },

        computed: {
            user() {
                return this.options.author ? this.options.author : this.koop ? this.koop.author : {}
            }
        },

        methods: {

            setSize(size) {
                this.options.size = size || this.options.size
            },

            setCenter(center) {
                this.options.center = center || this.options.center
            },

            setHeight(height) {
                this.options.height = height || this.options.height
                this.options.width = height || this.options.width
            },

            setAuthor(author) {
                this.options.author = author || this.options.author
            },

            run() {
                this.setSize(this.size)
                this.setCenter(this.center)
                this.setHeight(this.height)
                this.setAuthor(this.author)
            }

        }
    }
</script>

<style scoped>


  .koop-show-share-container {
    top: 25px;
    right: -15px;
    bottom: 0;
    height: 135px;
    width: 185px;
    background-color: #fff;
    padding-top: 8px;
    padding-bottom: 16px;
    /*padding: 8px 8px 16px 4px;*/
    z-index: 1;
  }

  .koop-show-share-container:before, .koop-show-share-container:after {
    bottom: 100%;
    left: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .koop-show-share-container:after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -30px;
  }

  .koop-show-share-container:before {
    border-bottom-color: #dee2e6;
    border-width: 11px;
    margin-left: -31px;
  }

</style>
