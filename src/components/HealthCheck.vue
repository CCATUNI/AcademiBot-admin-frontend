<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        Estado de los servicios
      </v-card-title>
      <v-card-text>
        <v-layout wrap align-content-center justify-space-around>
          <v-flex sm1 style="max-width: 15vw">
            <v-container>
              <v-img src="/public/img/facebook.svg" max-width="8vw" min-width="8vw" title="FACEBOOK"></v-img>
              <v-layout wrap align-content-center>
                <v-spacer></v-spacer>
                <v-flex align-self-center>
                  <v-icon v-if="facebook === undefined" large>mdi-dots-horizontal</v-icon>
                  <v-icon v-if="facebook === true" color="success" large>mdi-check</v-icon>
                  <v-icon v-if="facebook === false" color="error" large>mdi-alert-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-container>
            
          </v-flex>
          <v-flex sm1 style="max-width: 15vw">

            <v-container>
              <v-img src="/public/img/s3.svg" max-width="8vw" min-width="8vw" title="AWS S3"></v-img>
              <v-layout wrap align-content-center>
                <v-spacer></v-spacer>
                <v-flex align-self-center>
                  <v-icon v-if="s3 === undefined" large>mdi-dots-horizontal</v-icon>
                  <v-icon v-if="s3 === true" color="success" large>mdi-check</v-icon>
                  <v-icon v-if="s3 === false" color="error" large>mdi-alert-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-container>
  
          </v-flex>
          <v-flex sm1 style="max-width: 15vw">
            <v-container>
              <v-img src="/public/img/sequelize.svg" max-width="8vw" min-width="8vw" title="DATABASE"></v-img>
              <v-layout wrap align-content-center>
                <v-spacer></v-spacer>
                <v-flex align-self-center>
                  <v-icon v-if="sequelize === undefined" large>mdi-dots-horizontal</v-icon>
                  <v-icon v-if="sequelize === true" color="success" large>mdi-check</v-icon>
                  <v-icon v-if="sequelize === false" color="error" large>mdi-alert-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-container>
  
          </v-flex>
          <v-flex sm1 style="max-width: 15vw">

            <v-container>
              <v-img src="/public/img/dialogflow.svg" max-width="10vw" min-width="9vw" title="DIALOGFLOW"></v-img>
              <v-layout wrap align-content-center>
                <v-spacer></v-spacer>
                <v-flex align-self-center>
                  <v-icon v-if="dialogflow === undefined" large>mdi-dots-horizontal</v-icon>
                  <v-icon v-if="dialogflow === true" color="success" large>mdi-check</v-icon>
                  <v-icon v-if="dialogflow === false" color="error" large>mdi-alert-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-container>
  
          </v-flex>

        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {BACK_URL} from "@/config";
  import axios from 'axios';
  export default Vue.extend({
      name: "HealthCheck",
      data() {
          return {
              facebook: undefined as unknown as boolean,
              s3: undefined as unknown as boolean,
              sequelize: undefined as unknown as boolean,
              dialogflow: undefined as unknown as boolean
          }
      },
      async mounted() {
          const url = `${BACK_URL}/api/healthcheck/services`;
          const response = await axios.get<{ facebook: boolean; s3: boolean; dialogflow: boolean; sequelize: boolean }>(url);
          const data = response.data;
          this.facebook = data.facebook;
          this.s3 = data.s3;
          this.sequelize = data.sequelize;
          this.dialogflow = data.dialogflow;
      }
  })
</script>

<style scoped>

</style>