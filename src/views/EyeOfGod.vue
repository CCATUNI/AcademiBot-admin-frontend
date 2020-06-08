<template>
  <person-finder/>
</template>

<script lang="ts">
  import Vue from "vue";
  import PersonFinder from "@/components/PersonFinder.vue";
  export default Vue.extend({
      name: "EyeOfGod",
      components: {
          PersonFinder
      }
  })
</script>

<style scoped>

</style>