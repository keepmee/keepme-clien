<template>
  <settings class="children-container" v-if="children" action="children">

    <!--    <page-title title="Mes enfants" icon="fal fa-child"/>-->

    <div class="row w-100" @click="$modal.show('modal-create-child')">
      <div class="d-flex align-items-center justify-content-end w-100 cursor-pointer">
        <label><i class="fal fa-plus-circle mx-1"></i>Ajouter un enfant</label>
      </div>
    </div>

    <div class="row w-100 my-4">
      <div class="card card-child rounded z-depth-0 border mx-auto my-3" v-for="child in children">

        <div class="card-header border-0 p-0 z-depth-1 rounded">
          <div class="card-icon rounded bg-color- d-flex justify-content-center align-items-center mx-auto">
            <i class="fal fa-child fa-3x text-white color-1"></i>
          </div>
        </div>

        <div class="card-body">
          <h5 class="card-title text-center">{{ child.firstname | lowercase | capitalize }}</h5>
          <div class="card-content">

            <ul class="fa-ul">
              <li>
                <span class="fa-li color-1"><i class="fal fa-birthday-cake"></i></span>
                <p class="card-text" v-if="child.birthday">
                  {{ helpers.moment(child.birthday).format('DD-MM-YYYY') }}
                  <span class="font-italic small">({{ getAge(child.birthday) }})</span>
                </p>
                <p class="card-text font-italic grey-text" v-else>Non défini</p>
              </li>
              <li>
                <span class="fa-li color-1"><i class="fal fa-info-circle"></i></span>
                <p class="card-text" v-if="child.notes && child.notes !== ''">{{ getNote(child.notes) }}</p>
                <p class="card-text font-italic grey-text" v-else>Non défini</p>
              </li>
            </ul>

          </div>
        </div>

        <hr class="w-25 d-block mt-1 mb-3 mx-auto">

        <div class="card-foot">

          <div class="row my-1 pt-1">

            <div class="col-4 mx-auto d-flex justify-content-center align-items-center">
              <i class="fal fa-pencil-alt text-success cursor-pointer" @click="openEditModal(child)"></i>
            </div>

            <div class="col-4 mx-auto d-flex justify-content-center align-items-center">
              <i class="fal fa-trash-alt text-danger cursor-pointer" @click="askDeleteChild(child)"></i>
            </div>

          </div>

        </div>

      </div>
    </div>

    <modal-create-children @added="onAddedChild" :is-valid-date="isValidDate"
                           :not-valid-date-error="notValidDateError"/>
    <modal-edit-children @updated="onUpdatedChild" :current-child="current.child" :is-valid-date="isValidDate"
                         @hide="onHideEdit" :not-valid-date-error="notValidDateError"/>

  </settings>
</template>

<script>

    import Settings  from "../../Index";
    import PageTitle from "../../includes/Title/Page";

    import ModalCreateChildren from "./Create";
    import ModalEditChildren   from "./Edit";


    export default {
        name: "SettingsChildrenIndex",

        components: {
            PageTitle,
            Settings,
            ModalCreateChildren,
            ModalEditChildren,
        },

        data() {
            return {
                children: null,
                current : { child: null }
                // user    : {},
                // child   : {},
                // fr
            }
        },

        created() {
            return this.run()
        },

        methods: {

            getUserChildren() {
                this.api.get('/children/current').then((r) => {
                    this.children = r.data.data.children
                    // this.saveUser = this.helpers.clone(this.user)
                })
            },

            getAge(birthday) {
                let year, month, week;
                return (year = this.helpers.moment().diff(this.helpers.moment(birthday), 'years')) > 0
                    ? `${year} an${Math.abs(year) > 1 ? 's' : ''}`
                    : (month = this.helpers.moment().diff(this.helpers.moment(birthday), 'month')) > 0
                        ? `${Math.abs(month)} mois`
                        : `${week = this.helpers.moment().diff(this.helpers.moment(birthday), 'week')} semaine${Math.abs(week) > 1 ? 's' : ''}`
            },

            getNote(note, length = 125) {
                return note.length <= length ? note : note.substr(0, length) + '...'
            },

            /* HANDLER */

            onAddedChild() {
                this.$modal.hide('modal-create-child')
                return this.run()
            },

            onUpdatedChild() {
                return this.onHideEdit(true)
            },

            onHideEdit(reload) {
                this.current.child = null
                this.$modal.hide('modal-edit-child')
                return reload ? this.run() : true
            },

            openEditModal(child) {
                this.current.child = child
                this.$modal.show('modal-edit-child')
            },

            askDeleteChild(child) {
                this.swal({
                    type              : 'question',
                    title             : "Êtes-vous sûr ?",
                    html              : `Voulez-vous vraiment supprimer <span class='font-weight-bold font-italic color-3'>${child.firstname}</span> de la liste ?`,
                    confirmButtonClass: 'btn bg-color-1',
                    confirmButtonText : 'Oui',
                    cancelButtonClass : 'btn danger-color-dark',
                    cancelButtonText  : 'Non',
                    showCancelButton  : true,
                }).then((answer) => answer.value
                    ? this.api.delete('/children', child.id).then(
                        () => {
                            this.helpers.setFeedback("success", null, this);
                            return this.run()
                        },
                        (error) => this.helpers.setFeedback("error", error.response.data.data.error || null, this))
                    : false)
            },

            /* COMMON FUNCTION */

            isValidDate(date) {
                return (date = this.helpers.moment(date))
                    && (this.helpers.moment() >= this.helpers.moment(date))
            },

            notValidDateError() {
                return this.swal({
                    type              : 'error',
                    title             : "Attention",
                    text              : "Vous devez au minimum être à 3 mois de grossesse pour ajouter un enfant",
                    confirmButtonClass: "danger-color-dark"

                })
            },

            run() {
                // this.getUser()
                this.getUserChildren()
            }
        }
    }
</script>

<style scoped>

  .card.card-child {
    width: 325px;
  }

  .card.card-child .card-header {
    background: url("../../../../../../assets/img/main.jpg") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-size: 100% 100%;
    background-position: center center;
  }

  .card.card-child .card-header .card-icon {
    height: 150px;
    width: 100%;
    background-color: rgba(33, 37, 41, .9);
  }

  .card.card-child .card-body {
    height: 180px;
  }

  .card.card-child .card-body ul p.card-text {
    text-align: left;
    color: #212529;
  }

  .card.card-child .card-foot {
    height: 50px;
  }
</style>
