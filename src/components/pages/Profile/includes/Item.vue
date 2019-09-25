<template>
  <li class="py-3 border-bottom">
    <span class="fa-li"><i :class="icon" class="color-1"></i></span>
    <slot></slot>
  </li>
</template>

<script>
    export default {
        name: "Item",

        props: {
            icon: String
        }
    }
</script>

<style scoped>

</style>
