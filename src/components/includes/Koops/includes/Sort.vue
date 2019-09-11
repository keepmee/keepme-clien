<template>
  <div class="sort-container">
    <span class="mx-2 text-uppercase">trier par : </span>
    <span class="mx-2 text-uppercase cursor-pointer" :class="{'color-1': isCurrentSortedBy(item.name)}"
          @click="onClickSortBy(item.name)" v-for="item in items">{{ item.title }}
          <i class="far" :class="getSortIcon(item.name)"></i>
    </span>
  </div>
</template>

<script>
    import {isCurrentSortedBy} from "../../../../app/utils/koops";

    export default {
        name: "KoopSort",

        props: {
            sort: { type: Object, required: true },
        },

        data() {
            return {
                items: [
                    { name: 'children', title: "nb. enfants" },
                    { name: 'distance', title: "distance" },
                    { name: 'duration', title: "durée" },
                ]
            }
        },

        methods: {
            onClickSortBy(field) {
                return this.$emit('click', field)
            },

            isCurrentSortedBy(field) {
                return isCurrentSortedBy(field, this.sort.by)
            },

            getSortIcon(field) {
                return isCurrentSortedBy(field, this.sort.by) && this.sort.by === `-${field}` ? this.sort.icons.reverse : this.sort.icons.default
            },
        }
    }
</script>

<style scoped>

</style>
