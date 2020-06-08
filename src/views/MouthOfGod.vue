<template>
  <v-container>
    <UserSelector/>
    <v-spacer style="padding-top: 1em"/>
    <MessageSender/>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import UserSelector from "@/components/UserSelector.vue";
  import MessageSender from "@/components/MessageSender.vue";
  export default Vue.extend({
      name: "MouthOfGod",
      components: {
          UserSelector,
          MessageSender
      }
  })
</script>

<style scoped>

</style>