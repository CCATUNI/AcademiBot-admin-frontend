<template>
  <v-navigation-drawer
    app
    temporary
    :v-model="drawer"
    :value="drawer"
    :color="color"
    dark
  >
    <v-list dense nav>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="/public/img/academibot.png" alt="">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>AcademiBot</v-list-item-title>
          <v-btn @click="changeRoute('/')" x-small depressed :color="color" style="text-transform: none; text-align: left">
            <v-list-item-subtitle>Inicio</v-list-item-subtitle>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      <v-list-item v-if="!logged">
        <v-btn @click="changeRoute('/login')" depressed :color="color" block large>
          <v-icon left>mdi-login</v-icon>
          <v-list-item-title style="text-align: left">Login</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="() => {logged=false; changeRoute('/')}" depressed :color="color" block large>
          <v-icon left>mdi-logout</v-icon>
          <v-list-item-title style="text-align: left">Logout</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="changeRoute('/dashboard')" depressed :color="color" block large>
          <v-icon left>mdi-view-dashboard</v-icon>
          <v-list-item-title style="text-align: left">Tablero</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="logged">
        <v-btn @click="changeRoute('/settings')" depressed :color="color" block large>
          <v-icon left>mdi-cog</v-icon>
          <v-list-item-title style="text-align: left">Configuración</v-list-item-title>
        </v-btn>
      </v-list-item>
<!--      <v-list-item v-if="logged">
        <v-btn @click="changeRoute('reports')" depressed :color="color" block large>
          <v-icon left>mdi-file-chart</v-icon>
          <v-list-item-title style="text-align: left">Reportes</v-list-item-title>
        </v-btn>
      </v-list-item>-->
      <v-list-item>
        <v-flex block v-if="logged">
          <v-list-group class="white--text" active-class="white--text">
            <template v-slot:activator>
              <v-icon left>mdi-file</v-icon>
              <v-list-item-title style="text-align: left; letter-spacing: 1px">
                ARCHIVOS
              </v-list-item-title>
            </template>
            <v-list-item>
              <v-btn @click="changeRoute('/resource/upload')" block large depressed :color="color">
                <v-icon left>mdi-file-upload</v-icon>
                <v-list-item-title style="text-align: left">Subir</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="changeRoute('/resource/manage')" block large depressed :color="color">
                <v-icon left>mdi-file-cog</v-icon>
                <v-list-item-title style="text-align: left">Administrar</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list-group>
        </v-flex>
      </v-list-item>
      <v-list-item>
        <v-flex block v-if="logged">
          <v-list-group class="white--text" active-class="white--text">
            <template v-slot:activator>
              <v-icon left>mdi-account-key</v-icon>
              <v-list-item-title style="text-align: left; letter-spacing: 1px">
                MODO DIOS
              </v-list-item-title>
            </template>
            <v-list-item>
              <v-btn @click="changeRoute('/god/eye')" depressed :color="color" block large>
                <v-icon left>mdi-magnify</v-icon>
                <v-list-item-title style="text-align: left">Busca personas</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="changeRoute('/god/mouth')" depressed :color="color" block large>
                <v-icon left>mdi-send</v-icon>
                <v-list-item-title style="text-align: left">Mensaje masivo</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list-group>
        </v-flex>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
      data: function () {
          return {
              color: 'primary'
          }
      },
      computed: {
          drawer: {
              get() {
                  // TODO: commit cuando se haga un cambio, por alguna razon al bajarse solito no pasa nada :'v
                  return this.$store.getters.drawer + 1;
              }
          },
          logged: {
              get() {
                  return this.$store.getters.logged;
              },
              set(v) {
                  if (!v) {
                      this.$store.commit('setRefreshToken', undefined);
                      this.$store.commit('setAccessToken', undefined);
                  }
                  return this.$store.commit('logged', v);
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
  })
  
</script>