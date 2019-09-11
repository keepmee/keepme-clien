<template>
  <auth id="register">

    <div class="row mb-3 w-100">

      <button class="btn z-depth-0 p-0 color-1 text-left bg-transparent" @click="previousStep()">
        <i class="fal fa-long-arrow-left mr-1"></i> Retour
      </button>

    </div>

    <div class="row w-100">
      <div class="col-12 col-md-8 col-lg-6 mx-auto px-0" v-if="step === 1"> <!-- step : 1 -->
        <choose-who @setRole="setRoleAfterChoice" class="w-100"/>
      </div>
      <div class="col-12 mx-auto px-0" v-else-if="step === 2"> <!-- step : 2 -->
        <nanny-birthday @setBirthday="setBirthdayAfterFill" class="w-100"/>
      </div>
      <div class="col-12 mx-auto px-0" v-else-if="step === 3"> <!-- step : 3 -->
        <main-form :birthday="user.birthday" :role="user.role" @setUser="setUserAfterFill"/>
      </div>

    </div>

  </auth>
</template>

<script>

    import Auth from "../Auth";

    import ChooseWho     from './ChooseWho'
    import NannyBirthday from './NurseBirthday'
    import MainForm      from './MainForm'


    export default {
        name: "Register",

        components: {
            Auth,
            ChooseWho,
            NannyBirthday,
            MainForm,
        },

        data() {
            return {
                user: {},
                step: 1
            }
        },

        methods: {

            setRole(role) {
                this.user.role = role
            },

            setRoleAfterChoice(role) {
                this.setRole(role)
                this.step = this.isDefinedUserRole() ? (this.user.role === 'nanny' ? 2 : 3) : this.step
                this.$forceUpdate()
            },

            isDefinedUserRole() {
                return this.user.role
            },

            setBirthday(date) {
                this.user.birthday = this.helpers.moment(date)
            },

            setBirthdayAfterFill(date) {
                this.setBirthday(date)
                this.step = this.isDefinedBirthday() ? 3 : this.step
                this.$forceUpdate()
            },

            isDefinedBirthday() {
                return this.user.birthday && !(this.user.birthday === null)
            },

            setUser(user) {
                this.user = user
            },

            setUserAfterFill(user) {
                this.setUser(user)
                // this.step = this.isDefinedBirthday() ? 3 : this.step
                this.$forceUpdate()
            },

            /*isDefinedBirthday() {
              return this.user.birthday && !(this.user.birthday === null)
            },*/

            previousStep() {
                if (this.step === 3 && this.user.role === 'parent')
                    this.step = 1
                else {
                    if (this.step > 1)
                        this.step -= 1
                    else
                        this.helpers.navigate(this.$router, 'login')
                }
            }

        }
    }
</script>

<style scoped>

</style>
