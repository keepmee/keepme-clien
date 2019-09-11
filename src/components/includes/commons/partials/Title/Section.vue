<template>
  <div class="section-title w-100">
    <h2 class="h2 section-title-content text-center w-100">
      <span v-html="title"></span>
    </h2>
    <hr class="border-very-strong section-title-hr bg-color-2">
  </div>
</template>

<script>
    export default {
        name: "Section",

        props: {
            title: { type: String, required: true }
        }
    }
</script>

<style scoped>

  .section-title .section-title-content {
    text-transform: uppercase;
    border-bottom: none;
    letter-spacing: 1px;
    /*color: #333;*/
    text-align: left;
    font-style: normal;
    font-weight: normal;
    margin-top: 0.8em;
  }

  .section-title .section-title-hr {
    width: 50px;
    margin-bottom: 1.3em;
    /*padding-bottom: 0.5em;*/
  }

</style>
