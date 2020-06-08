<template>
  <v-container>
    <v-card>
      <v-card-title primary-title class="justify-center">
        <p class="headline">BUSCA PERSONAS</p>
      </v-card-title>
      <v-card-text>
        <div>
          <v-alert type="error" prominent :value="failure">
            <v-row align="center">
              <v-col class="grow">Error: {{firstSearchError.message}}</v-col>
            </v-row>
          </v-alert>
        </div>
        <v-container>
          <v-form :value="valido" ref="searchForm" id="personForm" @submit="submit" onsubmit="return false;">
            <v-text-field
                    label="Nombre"
                    name="personName"
                    hint="Nombre público en Facebook"
                    :value="personName"
                    :rules="[v=>!!v || 'Campo requerido', v=> v.replace(/ /g,'').length > 2 || 'Cantidad de caracteres insuficiente.']"
                    block
                    autocomplete="off"
                    autofocus
            />
            <v-btn
                    block
                    color="success"
                    form="personForm"
                    @click="submit"
                    type="submit"
            >
              <v-icon left>mdi-magnify</v-icon>
              Buscar
            </v-btn>
          </v-form>
          <v-divider style="padding: 1em"></v-divider>
          <v-select
                  label="Usuario"
                  :items="posiblePersons"
                  name="Usuario elegido"
                  item-avatar="profile_pic"
                  item-value="id"
                  item-text="name"
                  :disabled="!posiblePersons.length"
                  @change="details"
                  ref="userSelect"
                  v-model="id"
          >
            <template v-slot:item="{item}">
              <v-avatar size="1.75em" left>
                <img :src="item.profile_pic" alt="Avatar">
              </v-avatar>
              {{item.name}}
            </template>
          </v-select>
        </v-container>
      </v-card-text>
    </v-card>
    <v-spacer style="padding-top: 1em"></v-spacer>
    <v-card v-if="userName && user">
      <v-card-title class="headline">
        {{userName}}
      </v-card-title>
      <v-card-text>
        <v-layout wrap justify-center justify-space-between justify-space-around>
          <v-flex xs4>
            <v-switch
                    :input-value="user.info.publicidad"
                    readonly
                    label="Acepta publicidad"
                    style="font-weight: bold; color: black"/>
          </v-flex>
          <v-flex xs4>
            <v-switch :input-value="user.activo"
                      readonly
                      :label="`Usuario ${user.activo ? 'activo' : 'inactivo'}`"
                      style="font-weight: bold; color: black"/>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center justify-space-between justify-space-around>
          <v-flex xs4>
            <v-text-field
                    :value="user.info.especialidad"
                    label="Especialidad"
                    readonly
            />
          </v-flex>
          <v-flex xs4>
            <v-text-field
                    :value="user.info.curso"
                    label="Curso"
                    readonly
            />
          </v-flex>
        </v-layout>
        <v-spacer style="padding-top: 1em"></v-spacer>
        <v-layout align-center>
          <v-slider
                  v-model="user.info.ciclo"
                  min="1"
                  max="11"
                  :tick-labels="ciclos"
                  step="1"
                  ticks
                  readonly
                  thumb-label="always"
                  label="Ciclo"
          >
            <template v-slot:thumb-label>
              <v-icon color="white">mdi-school</v-icon>
            </template>
          </v-slider>
        </v-layout>
      </v-card-text>
      <v-card-subtitle class="title">
        Información de donación
      </v-card-subtitle>
      <v-card-text>
        <v-layout wrap justify-center justify-space-between justify-space-around>
          <v-flex sm6>
            <p>Total de donaciones: {{user.donacion.cantidad}}</p>
          </v-flex>
          <v-flex sm6>
            <p style="font-weight: bold">Hora promedio de envío de donaciones: </p>
            <clock :time="user.donacion.cantidad > 0 ? user.donacion.horaPromedio : '00:00:00'"></clock>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-subtitle class="title">
        Información de solicitud
      </v-card-subtitle>
      <v-card-text>
        <v-layout wrap justify-center justify-space-between justify-space-around>
          <v-flex sm6>
            <p>Total de solicitudes: {{user.solicitud.total}}</p>
            <p>Total de solicitudes exitosas: {{user.solicitud.exitosas}}</p>
            <p>Total de solicitudes fallidas: {{user.solicitud.fallidas}}</p>
          </v-flex>
          <v-flex sm6>
            <p style="font-weight: bold;">Hora promedio de solicitud de recursos: </p>
            <clock :time="user.solicitud.total > 0 ? user.solicitud.horaPromedio : '00:00:00'"></clock>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-subtitle class="title">
        Información de contacto
      </v-card-subtitle>
      <v-card-text v-for="(item, index) in user.canales" :key="index">
        <v-card-subtitle class="subtitle-1">{{item.id}}</v-card-subtitle>
        <v-layout wrap justify-center justify-space-between justify-space-around>
          <v-flex sm6>
            <p>El total de mensajes recibidos es: {{item.totalMensajes}}</p>
          </v-flex>
          <v-flex sm6>
            <p style="font-weight: bold">Hora promedio de envío de mensajes: </p>
            <clock :time="item.horaPromedioMensajes"/>
          </v-flex>
          <v-flex md9>
            <p style="font-weight: bold">Información pública: </p>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Clave</th>
                  <th class="text-left">Valor</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value, key) in item.infoPublica" :key="key">
                  <td>{{key}}</td>
                  <td>
                    <p v-if="!linkMatcher.test(value)">{{value}}</p>
                    <a v-else :href="value">{{value.substr(0, 30) + '...'}}</a>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {BACK_URL} from "@/config";
  import axios, { AxiosResponse } from 'axios';
  import Clock from './Clock.vue';

  export default Vue.extend({
      name: "PersonFinder",
      data() {
          return {
              valido: false,
              valido2: false,
              personName: '',
              requesting: false,
              posiblePersons: [] as {[p: string]: any; profile_pic: string}[],
              failure: false,
              firstSearchError: {} as Error,
              requesting2: false,
              id: undefined as unknown as string,
              user: undefined as unknown as {[p: string]: any},
              userName: undefined as unknown as string,
              ciclos: [1,2,3,4,5,6,7,8,9,10,11],
              linkMatcher: /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
          }
      },
      watch: {
          failure(v: boolean) {
              if (v) {
                  setTimeout(() => this.failure = false, 7500);
              }
          }
      },
      methods: {
          async submit() {
              const valid = (this.$refs.searchForm as Vue & { validate: () => boolean }).validate();
              if (!valid || this.requesting) return;
              this.requesting = true;
              const finder = `${BACK_URL}/api/user/facebook/list`;
              const formData = new FormData((this.$refs.searchForm as Vue & { $el: HTMLFormElement }).$el);
              const personName = formData.get('personName') as string;
              try {
                  const response = await axios.post(finder, { personName });
                  this.posiblePersons = response.data;
                  const select = this.$refs.userSelect as Vue &{ $el: HTMLSelectElement };
                  setTimeout(() => select.$el.focus(), 10);
              } catch (e) {
                  const response = e.response as AxiosResponse;
                  if (response.status === 404) {
                      this.firstSearchError = new Error('No existen coincidencias con su búsqueda.');
                  } else if (response.status === 500) {
                      this.firstSearchError = new Error('Error en el servidor: '+e.message);
                  } else if (response.status === 401) {
                      this.firstSearchError = new Error('No se ha iniciado sesión o no se tienen permisos suficientes.');
                  } else {
                      this.firstSearchError = e;
                  }
                  this.failure = true;
              } finally {
                  this.requesting = false;
              }
          },
          async details(id: string) {
              this.userName = this.posiblePersons.find(v => v.id === id)!.name;
              if (this.requesting2) return ;
              this.requesting2 = true;
              const finder = `${BACK_URL}/api/user/${id}`;
              try {
                  const response = await axios.get(finder);
                  this.user = response.data;
              } catch (e) {
                  const response = e.response as AxiosResponse;
                  if (response.status === 404) {
                      this.firstSearchError = new Error('No existen coincidencias con su búsqueda.');
                  } else if (response.status === 500) {
                      this.firstSearchError = new Error('Error en el servidor: '+e.message);
                  } else if (response.status === 401) {
                      this.firstSearchError = new Error('No se ha iniciado sesión o no se tienen permisos suficientes.');
                  } else {
                      this.firstSearchError = e;
                  }
                  this.failure = true;
              } finally {
                  this.requesting2 = false;
                  setTimeout(() => this.id = undefined as unknown as string, 10);
              }
          }
      },
      components: {
        Clock
      }
  })
</script>

<style scoped>

</style>