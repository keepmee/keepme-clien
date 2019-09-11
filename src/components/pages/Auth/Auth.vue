<template>
  <div id="auth">

    <div class="img-bg">
      <img src="../../../assets/img/main.jpg" alt="Auth bg">
      <a href="https://fr.freepik.com/photos-vecteurs-libre/fond" class="d-none">
        Fond vecteur créé par vectorpouch - fr.freepik.com
      </a>
    </div>

    <div class="row">
      <div class="col-md-5 ml-auto form-container white z-depth-">

        <div class="row w-100">

          <div class="col-12 text-center color-1 my-4 my-md-5">
            <router-link :to="{name: 'home'}">
              <img src="../../../assets/img/logo.png" alt="Logo" class="d-block mx-auto auth-logo">
            </router-link>
          </div>

          <div class="col-12">
            <hr class="w-50 mt-0" :class="{'mb-4 mb-md-5': isLoginForm(), 'mb-4': !isLoginForm()}">
          </div>

        </div>


        <div class="row w-100">

          <slot></slot>
          <!--          <login-form v-if="isLoginForm()"/>-->
          <!--          <register-form v-else/>-->

        </div>

      </div>
    </div>

  </div>
</template>

<script>

    // import LoginForm    from './Login'
    // import RegisterForm from './Register/Index'

    export default {
        name: "Auth",

        components: {
            // LoginForm,
            // RegisterForm,
        },

        data() {
            return {
                action: 'login'
            }
        },

        created() {
            this.setAction()
        },

        watch: {
            $route() {
                this.setAction()
            }
        },

        methods: {

            isLoginForm() {
                return !(this.action === 'register')
            },

            getAction() {
                return this.$route ? this.$route.name : null
            },

            setAction(action = null) {
                this.action = action ? action : this.getAction()
            }

        }
    }
</script>

<style scoped>

  .img-bg img {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  .form-container {
    min-height: 100vh;
  }

  .auth-logo {
    height: 100px;
    width: auto
  }

</style>
