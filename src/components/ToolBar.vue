<template>
  <v-app-bar dense app :color="color">
    <v-app-bar-nav-icon @click="customonclick"></v-app-bar-nav-icon>
  
    <v-btn v-if="!logged" @click="changeRoute('/login')" depressed :color="color">
      Login
    </v-btn>
    <v-btn v-if="logged" @click="changeRoute('/dashboard')" depressed :color="color">
      Tablero
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
      name: 'ToolBar',
      data() {
          return {
              customonclick: () => {
                this.$store.commit('toggle');
              },
              color: 'light'
          }
      },
      computed: {
          logged: {
              get() {
                  return this.$store.getters.logged;
              }
          }
      },
      methods: {
          changeRoute(desiredRoute: string) {
              if (this.$route.fullPath !== `/${desiredRoute}`) {
                  this.$router.push(desiredRoute);
              }
          }
      }
  });
</script>