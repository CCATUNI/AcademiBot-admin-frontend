<template>
  <v-container>
    <v-card >
      <v-card-title class="headline">
        <v-btn depressed color="white" class="text-none headline" @click="showAll = !showAll">
          {{ titulo }}
          <v-icon large v-if="icono" right style="padding-left: 10px">{{ icono }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div ref="divForm">
          <v-form :value="valido" @submit.prevent="submit" ref="infoForm" id="chartForm">
            <v-layout wrap align-left>
              <v-spacer></v-spacer>
              <v-flex sm3>
                <v-select
                        v-model="formData.intervalo"
                        :value="timeValues[0]"
                        :rules="[v => !!v || 'Campo requerido']"
                        :items="timeValues"
                        label="Intervalo"
                        name="duracion"
                ></v-select>
              </v-flex>
              <v-flex sm3>
                <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                            label="Fecha"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                            name="fecha"
                            :value="formData.date"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="formData.date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm2>
                <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="formData.hour"
                        transition="scale-transition"
                        offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                            label="Hora"
                            prepend-icon="mdi-clock-outline"
                            readonly
                            v-on="on"
                            name="hora"
                            :value="formData.hour"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                          v-if="menu"
                          v-model="formData.hour"
                          full-width
                          @click:minute="$refs.menu.save(formData.hour)"
                          ampm-in-title
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex sm2 style="margin-top: 0.5em">
                <v-btn block color="success" @click="submit" form="chartForm" :disabled="!(formData.intervalo && formData.hour && formData.date)">
                  Ver
                </v-btn>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-form>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text ref="cardBody">
        <v-flex style="position: relative; height:60vh; width:80vw">
          <canvas id="ChartsCanvas" ref="canvas"></canvas>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import {Chart, ChartConfiguration, TimeUnit} from 'chart.js';
  import {BACK_URL} from "@/config";
  const HORA = 1000 * 60 * 60;
  const DIA = HORA * 24;
  
 
  export default Vue.extend({
      name: "InfoChart",
      props: {
          titulo: {
              type: String
          },
          icono: {
              type: String
          },
          tipoEvento: {
              type: Number
          },
          color: {
              type: String
          },
          label: {
              type: String
          }
      },
      data() {
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          return {
              timeValues: [
                  {
                      text: 'Últ. día',
                      value: DIA
                  },
                  {
                      text: 'Últ. semana',
                      value: DIA * 7
                  },
                  {
                      text: 'Últ. 30 días',
                      value: DIA * 30
                  },
                  {
                      text: 'Últ. año',
                      value: DIA * 365
                  }
              ],
              valido: false,
              menu2: false,
              menu: false,
              showAll: false,
              chart: null as unknown as Chart,
              formData: {
                  intervalo: 0,
                  date: new Date().toISOString().substr(0, 10),
                  hour: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
              }
          }
      },
      watch: {
          showAll(v) {
              const cardBody = (this.$refs.cardBody as Vue & { style: CSSStyleDeclaration; show: () => void; hide: () => void });
              const divForm = (this.$refs.divForm as Vue & { style: CSSStyleDeclaration; show: () => void; hide: () => void });
              if (v) {
                  cardBody.style.display = 'block';
                  divForm.style.display = 'block';
              } else {
                  cardBody.style.display = 'none';
                  divForm.style.display = 'none';
              }
          }
      },
      methods: {
          async submit() {
              const valido = (this.$refs.infoForm as Vue & { validate: () => boolean }).validate();
              if (valido) {
                  const startDate = `${this.formData.date} ${this.formData.hour}`;
                  const length = this.formData.intervalo as number;
                  const url = `${BACK_URL}/api/evento/${this.tipoEvento}`;
                  let groupBy: string;
                  if (length >= 365*DIA) {
                      groupBy = 'month';
                  } else if (length >= 6*DIA) {
                      groupBy = 'day';
                  } else if (length >= DIA) {
                      groupBy = 'hour';
                  } else {
                      groupBy = 'minute';
                  }
                  const response = await axios.post(url, { startDate, length, groupBy });
                  const data = response.data.map((v: { x: string; y: number }) => ({ x: new Date(v.x), y: v.y}));
                  this.chart.data.datasets = [{ data, backgroundColor: this.color, label: this.label }];
                  this.chart.options!.scales!.xAxes![0].time!.unit = groupBy as TimeUnit;
                  this.chart.update();
              }
          }
      },
      async mounted() {
          const cardBody = (this.$refs.cardBody as Vue & { style: CSSStyleDeclaration; show: () => void; hide: () => void });
          const divForm = (this.$refs.divForm as Vue & { style: CSSStyleDeclaration; show: () => void; hide: () => void });
          if (!this.showAll) {
              divForm.style.display = 'none';
              cardBody.style.display = 'none';
          }

          const ctx = (this.$refs.canvas as Vue & { getContext: (p: string) => CanvasRenderingContext2D }).getContext('2d');
          this.chart = new Chart(ctx, {
              type: 'bar',
              data: {
                  datasets: []
              },
              options: {
                  scales: {
                      xAxes: [{
                          type: 'time',
                          time: {
                              unit: 'hour',
                              minUnit: 'hour',
                              round: 'hour'
                          }
                      }],
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  showDataPoints: true
              }
          } as ChartConfiguration);
      }
  })
</script>

<style scoped>

</style>