<template>
  <div class="select-view-container">
    <span class="text-uppercase mx-2">Vue</span>
    <i class="fal fa-1x5 cursor-pointer mx-2" :title="item.title" v-for="item in items" :class="`${getClasses(item)}`"
       @click="onClickSetView(item.view)"></i>
  </div>
</template>

<script>
    export default {
        name: "SelectView",

        props: { view: { type: Number, required: true } },

        data() {
            return {
                items: [
                    { view: 1, title: "Grille", icon: 'fa-table' },
                    { view: 2, title: "Liste", icon: 'fa-list' },
                ]
            }
        },

        methods: {
            onClickSetView(view) {
                this.$emit('set-view', view)
            },

            getClasses(item) {
                return `${item.icon} ${this.view === item.view ? 'color-1' : 'color-2'}`
            }
        }
    }
</script>

<style scoped>

</style>
