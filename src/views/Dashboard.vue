<template>
  <v-container>
    
    <InfoChart
            v-for="item of items"
            :titulo="item.titulo"
            :icono="item.icono"
            :tipo-evento="item.tipoEvento"
            :color="item.color"
            :label="item.label"
            :key="item.tipoEvento"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import InfoChart from '@/components/InfoChart.vue';
    export default Vue.extend({
        name: "Dashboard",
        components: {
            InfoChart
        },
        data() {
            const color = 'rgba(62,115,248,0.5)';
            return {
                items: [
                    { titulo: 'Recursos enviados', icono: 'mdi-file-replace', tipoEvento: 3, color, label: '# de recursos enviados' },
                    { titulo: 'Mensajes recibidos', icono: 'mdi-message', tipoEvento: 2, color, label: '# de mensajes recibidos' },
                    { titulo: 'Nuevos usuarios', icono: 'mdi-account-alert', tipoEvento: 1, color, label: '# de usuarios nuevos' },
                    { titulo: 'Nuevos recursos', icono: 'mdi-file-plus', tipoEvento: 6, color, label: '# de nuevos recursos' }
                ]
            }
        }
    })
</script>