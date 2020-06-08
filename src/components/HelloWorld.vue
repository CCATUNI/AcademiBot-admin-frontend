<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
                src="/public/img/academibot.png"
                class="my-3"
                contain
                height="200"
        />
      </v-col>
      
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          AcademiBot
        </h1>
        <v-container style="min-width: 45vw; max-width: 30em; text-align: justify">
          <p class="subheading font-weight-regular">
            AcademiBot es un chatbot que envía examenes pasados a los estudiantes de la Universidad Nacional de
            Ingeniería en esta página de administración podrás ver estadísticas de uso, configuración, reportes
            y manejar la subida de nuevos archivos.
          </p>
        </v-container>
      </v-col>
      
      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Tablero
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <p>
            En esta página podrás ver estadísticas sobre el envío de archivos, los
            mensajes recibidos, nuevos usuarios y los nuevos archivos en el sistema.
          </p>
        </v-container>
      </v-col>
      
      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Configuración
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <p>
            En esta página podrás comprobar el estado de los servicios que componen AcademiBot, incluyendo
            su conexión a Facebook, AWS S3, base de datos y Dialogflow. Además podrás monitorear el estado
            de los recursos del sistema como CPU y memoria RAM.
          </p>
        </v-container>
      </v-col>
      
      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Reportes
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <p>
            En esta página podrás descargar reportes en formato PDF que muestren los indicadores
            de uso de AcademiBot en un determinado periodo de tiempo.
          </p>
        </v-container>
      </v-col>
      
      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Gestor de archivos
        </h2>
        <v-container style="min-width: 40vw; max-width: 20em; text-align: justify">
          <p>
            En esta página podrás subir nuevos archivos uno por uno, indicando la facultad, curso
            y ciclo correspondiente.
          </p>
        </v-container>
      </v-col>
    
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HelloWorld',

    data: () => ({
    }),
  })
</script>
