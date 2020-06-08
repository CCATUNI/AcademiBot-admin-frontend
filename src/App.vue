<template>
  <v-app>
    
    <ToolBar/>
    <NavDrawer/>
    <v-spacer style="padding-top: 2em"></v-spacer>
    <router-view/>
    <v-spacer></v-spacer>
  
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ToolBar from "@/components/ToolBar.vue";
  import NavDrawer from "@/components/NavDrawer.vue";
  export default Vue.extend({
    name: 'App',

    components: {
      ToolBar,
      NavDrawer
    },

    data() {
      return {}
    },
  });
</script>
