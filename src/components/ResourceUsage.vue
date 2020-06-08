<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        Uso del CPU
      </v-card-title>
      <v-card-text>
        <v-flex style="position: relative; height:60vh; width:80vw">
          <canvas id="CPUCanvas" ref="canvasCPU"></canvas>
        </v-flex>
      </v-card-text>
    </v-card>
    <v-spacer style="padding: 0.40em"></v-spacer>
    <v-card>
      <v-card-title class="headline">
        Uso de RAM
      </v-card-title>
      <v-card-text>
        <v-flex style="position: relative; height:60vh; width:80vw">
          <canvas id="RAMCanvas" ref="canvasRAM"></canvas>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Chart, ChartConfiguration} from 'chart.js';
  import axios from 'axios';
  import {BACK_URL} from "@/config";

  export default Vue.extend({
      name: "ResourceUsage",
      data() {
          return {
              chartCPU: null as unknown as Chart,
              chartRAM: null as unknown as Chart
          }
      },
      methods: {
          async getResourcesData() {
              const url = `${BACK_URL}/api/healthcheck/resources`;
              const response = await axios.get<{ ram: { max: number; used: number[]; interval: number }; cpu: { used: number[]; interval: number } }>(url);
              const cpuData = response.data.cpu;
              const ramData = response.data.ram;
              const dataCPU: {y: number; x: number }[] = [];
              const dataRAM: {y: number; x: number }[] = [];
              for (let i = 0; i < cpuData.used.length; i++) {
                  dataCPU.push({
                      y: cpuData.used[i],
                      x: (cpuData.used.length - i - 1) * cpuData.interval / 1000 /60
                  })
              }
              for (let i = 0; i < ramData.used.length; i++) {
                  dataRAM.push({
                      y: (ramData.used[i] / 1024 / 1024),
                      x: (ramData.used.length - i - 1) * ramData.interval / 1000 / 60
                  })
              }
              this.chartCPU.data.datasets = [{
                  data: dataCPU,
                  backgroundColor: 'rgba(65, 131, 215, 0.4)',
                  label: 'Uso de CPU%',
                  borderColor: 'rgba(65, 131, 215, 0.7)',
                  cubicInterpolationMode: 'monotone'
              }];
              this.chartCPU.update();
              this.chartRAM.data.datasets = [{
                  data: dataRAM,
                  backgroundColor: 'rgba(221,167,85,0.4)',
                  label: 'Uso de RAM en megabytes',
                  borderColor: 'rgba(221,167,85,0.7)',
                  cubicInterpolationMode: 'monotone'
              }];
              this.chartRAM.update();
          }
      },
      async mounted() {
          const ctxCPU = (this.$refs.canvasCPU as Vue & { getContext: (p: string) => CanvasRenderingContext2D }).getContext('2d');
          const ctxRAM = (this.$refs.canvasRAM as Vue & { getContext: (p: string) => CanvasRenderingContext2D }).getContext('2d');
          this.chartCPU = new Chart(ctxCPU, {
              type: 'line',
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                      yAxes: [{
                          ticks: { beginAtZero: true, max: 100 }
                      }],
                      xAxes: [{
                          type: "linear",
                          ticks: {
                              reverse: true
                          },
                          scaleLabel: {
                              labelString: 'minutos',
                              display: true
                          }
                      }]
                  },
                  elements: {
                      point:{
                          radius: 0
                      }
                  }
              },
              data: { datasets: [] }
          } as ChartConfiguration);
          this.chartRAM = new Chart(ctxRAM, {
              type: 'line',
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                      yAxes: [{
                          ticks: { beginAtZero: true }
                      }],
                      xAxes: [{
                          type: "linear",
                          ticks: {
                              reverse: true
                          },
                          scaleLabel: {
                              labelString: 'minutos',
                              display: true
                          }
                      }]
                  },
                  elements: {
                      point:{
                          radius: 0
                      }
                  }
              },
              data: { datasets: [] }
          } as ChartConfiguration);
          this.getResourcesData();
      }
    })
</script>

<style scoped>

</style>