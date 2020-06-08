<template>
  <v-card>
    <v-card-title class="headline">
      <v-flex align-self-start>
        <v-btn depressed color="white" class="text-none headline" @click="showAll = !showAll">
          Selector
          <v-icon large right>mdi-account</v-icon>
        </v-btn>
      </v-flex>
      
      <v-flex align-self-end sm3>
        <v-layout>
          <v-flex>
            <v-btn left @click="selectAll">todos</v-btn>
          </v-flex>
          <v-flex>
            <v-btn right color="success" @click="submit">Aceptar</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card-title>
    <v-divider/>
    <v-card-text ref="cardText">
      <v-form>
        <v-layout wrap justify-space-around justify-space-between justify-center align-center>
          <v-flex sm9>
            <v-combobox
                    :items="ciclos"
                    v-model="ciclosSeleccionados"
                    multiple
                    small-chips
                    hide-selected
                    clearable
                    label="Ciclos"
            >
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                        v-if="item === Object(item)"
                        v-bind="attrs"
                        :color="`${item.color} lighten-3`"
                        :input-value="selected"
                        label
                        small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon
                          small
                          @click="parent.selectItem(item)"
                  >mdi-close</v-icon>
                </v-chip>
              </template>

            </v-combobox>
          </v-flex>
          <v-flex sm1>
            <v-btn @click="ciclosSeleccionados=ciclos">Todos</v-btn>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around justify-space-between justify-center align-center>
          <v-flex sm9>
            <v-combobox
                    :items="especialidades"
                    v-model="especialidadesSeleccionadas"
                    multiple
                    small-chips
                    hide-selected
                    clearable
                    label="Especialidades"
            >
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                        v-if="item === Object(item)"
                        v-bind="attrs"
                        :color="`${item.color} lighten-3`"
                        :input-value="selected"
                        label
                        small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon
                          small
                          @click="parent.selectItem(item)"
                  >mdi-close</v-icon>
                </v-chip>
              </template>
      
            </v-combobox>
          </v-flex>
          <v-flex sm1>
            <v-btn @click="especialidadesSeleccionadas=especialidades">Todos</v-btn>
          </v-flex>
        </v-layout>
        <v-divider style="padding-bottom: 0.25em; padding-top: 0.25em"/>
        <v-flex align-self-center>
          <v-subheader class="pl-0">Hora promedio de envio de mensajes</v-subheader>
        </v-flex>
        <v-flex align-self-center>
          <v-container block>
            <v-range-slider
                    min="0"
                    max="24"
                    v-model="selectedHours"
                    thumb-label
                    :tick-labels="$vuetify.breakpoint.smAndUp ? [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] : []"
            />
          </v-container>
        </v-flex>
        <v-divider/>
        <v-flex>
          <v-subheader class="pl-0">Selección basada en la fecha de última interacción del usuario</v-subheader>
        </v-flex>
        <v-layout wrap justify-space-around justify-space-between justify-center align-center>
          
          <v-flex sm8>
            <v-date-picker
                    range
                    v-model="dates"
                    :allowed-dates="(v) => new Date(v) <= new Date(Date.now() + 1000*60*60*24)"
                    full-width
                    :landscape="$vuetify.breakpoint.smAndUp"
            />
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-divider/>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
      name: "UserSelector",
      data() {
          return {
              ciclos: [
                  {
                      value: 1,
                      text: '1er ciclo'
                  },
                  {
                      value: 2,
                      text: '2do ciclo'
                  },
                  {
                      value: 3,
                      text: '3er ciclo'
                  },
                  {
                      value: 4,
                      text: '4to ciclo'
                  },
                  {
                      value: 5,
                      text: '5to ciclo'
                  },
                  {
                      value: 6,
                      text: '6to ciclo'
                  },
                  {
                      value: 7,
                      text: '7mo ciclo'
                  },
                  {
                      value: 8,
                      text: '8vo ciclo'
                  },
                  {
                      value: 9,
                      text: '9no ciclo'
                  },
                  {
                      value: 10,
                      text: '10mo ciclo'
                  },
                  {
                      value: 11,
                      text: '11er ciclo'
                  },
                  {
                      value: null,
                      text: 'Sin ciclo'
                  }
              ], //TODO USE API
              ciclosSeleccionados: [] as { value: number|null; text: string }[],
              especialidades: [
                  {
                      value: 'i1',
                      text: 'Ing. Industrial'
                  },
                  {
                      value: 'i2',
                      text: 'Ing. de Sistemas'
                  },
                  {
                      value: null,
                      text: 'Sin especialidad.'
                  }
              ],
              especialidadesSeleccionadas: [] as { value: string|null; text: string }[],
              selectedHours: [1, 23],
              dates: ['2019-01-01', new Date().toISOString().substr(0, 10)],
              showAll: true
          }
      },
      watch: {
          showAll(v: boolean) {
              const cardBody = (this.$refs.cardText as Vue & { style: CSSStyleDeclaration; show: () => void; hide: () => void });
              if (v) {
                  cardBody.style.display = 'block';
                  this.$store.commit('selectUsers', undefined);
              } else {
                  cardBody.style.display = 'none';
              }
          }
      },
      methods: {
          selectAll() {
              this.ciclosSeleccionados = this.ciclos;
              this.especialidadesSeleccionadas = this.especialidades;
              this.selectedHours = [0, 24];
              this.dates = ['2019-01-01', new Date().toISOString().substr(0, 10)];
              setTimeout(this.submit, 1000);
          },
          submit() {
              const userSelection = {
                  ciclos: this.ciclosSeleccionados,
                  especialidades: this.especialidadesSeleccionadas,
                  horas: this.selectedHours,
                  fechas: this.dates
              };
              this.$store.commit('selectUsers', userSelection);
              this.showAll = false;
          }
      },
      async mounted() {
          this.$store.commit('selectUsers', undefined);
      }
  });
</script>

<style scoped>

</style>