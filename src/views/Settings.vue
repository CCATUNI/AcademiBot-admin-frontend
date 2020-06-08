<template>
  <v-container>
    <HealthCheck/>
    <ResourceUsage/>
  </v-container>

</template>

<script lang="ts">
  import Vue from 'vue';
  import ResourceUsage from "@/components/ResourceUsage.vue";
  import HealthCheck from "@/components/HealthCheck.vue";
  export default Vue.extend({
      name: "Settings",
      components: {
          ResourceUsage,
          HealthCheck
      }
  })
</script>

<style scoped>

</style>