<template>
  <v-container :style="containerStyle">
    <v-card
            :color="color"
            class="elevation-9 rounded_corner"
            app
    >
      <v-container pa-6 grid-list-xl>
        <v-dialog
                v-model="errorDialog"
                max-width="400"
        >
          <v-card >
            <v-card-title class="headline">Error</v-card-title>
      
            <v-card-text>
              <p>El siguiente error se ha encontrado: {{creationError.message}}</p>
              <p v-if="creationError.url">La url al objeto es: <a :href="creationError.url">LINK</a></p>
              <p v-if="creationError.ruta">El archivo se encuentra en "{{creationError.ruta}}"</p>
            </v-card-text>
      
            <v-card-actions v-if="creationError.url">
              <v-spacer></v-spacer>
              <v-btn
                      color="green darken-1"
                      text
                      @click="() => {
                          this.submissionData.fileFirstName = 'x';
                          this.$nextTick(() => this.submissionData.fileFirstName = '');
                          this.errorDialog = false
                      }"
                      v-if="creationError.message === 'Archivo existente en dicha key'"
              >
                Renombrar
              </v-btn>
              <v-btn
                      color="error"
                      text
                      @click="() => {
                          submit({ force: true})
                          this.errorDialog = false
                      }"
              >
                Forzar Creación
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div>
          <h2 style='text-align: center; font-family: "Roboto", sans-serif '>SUBIR ARCHIVO A BASE DE DATOS</h2>
        </div>
        <div>
          <v-alert type="success" :value="success">
            Archivo creado con éxito
          </v-alert>
          <v-alert type="error" prominent :value="failure">
            <v-row align="center">
              <v-col class="grow">Error: {{creationError.message}}</v-col>
              <v-col class="shrink">
                <v-btn @click="errorDialog = true">Ver más</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </div>
        <Dropzone :file-adder="addFile" :file-remover="removeFile" :flag="flag" :max-files="1"/>
        <div style="height: 10px"></div>
        <v-form :value="valido" @submit.prevent="submit" ref="form" id="formFile">
          <v-select
                  :items="facultades"
                  label="Facultad"
                  :rules="[v=>!!v || 'Campo requerido']"
                  name="facultad"
                  @change="poblateCursos"
                  item-text="nombre"
                  item-value="id"
                  v-if="myFiles.length"
          />
          <v-select
                  :items="cursos"
                  label="Curso"
                  :rules="[v=>!!v || 'Campo requerido']"
                  name="curso"
                  item-text="nombre"
                  item-value="id"
                  v-if="myFiles.length"
          />
          <v-layout wrap align-left>
            <v-spacer></v-spacer>
            <v-flex xs12 sm3 d-flex>
              <v-select
                      label="Carpeta"
                      ref="carpeta"
                      :value="submissionData.carpeta"
                      :rules="[v => !!v]"
                      name="folder"
                      v-if="myFiles.length"
                      :items="folders"
              />
            </v-flex>
            <v-flex xs12 sm5 d-flex>
              <v-text-field
                      label="Nombre"
                      :rules="[v =>  /^[A-Za-z\-0-9_]+$/.test(v) || 'Contiene caracter no válido', v => !!v || 'Campo requerido']"
                      name="fileFirstName"
                      :value="submissionData.fileFirstName"
                      autocomplete="off"
                      v-if="myFiles.length"
                      hint="Formato: <ciclo>-<sección> Ejemplo: 20-1-x"
              />
            </v-flex>
            <v-flex xs12 sm2 d-flex>
              <v-text-field
                      label="Página"
                      type="number"
                      ref="pagina"
                      :value="submissionData.pagina"
                      :rules="[v => v > 0 || 'Debe ser un número positivo']"
                      name="page"
                      v-if="myFiles.length"
                      hint="El número de página del archivo si hay más de uno"
              />
            </v-flex>
            <input type="hidden" name="extension" :value="submissionData.extension" />
            <v-spacer></v-spacer>
          </v-layout>
          <v-divider></v-divider>
          <v-layout wrap>
            <v-spacer></v-spacer>
            
            <v-flex xs12 sm2 d-flex>
              <v-btn block color="error" @click="resetForm">
                Limpiar
              </v-btn>
            </v-flex>
            <v-flex xs12 sm2 d-flex>
              <v-btn block color="success" type="submit" form="formFile" :disabled="!valido">
                Enviar
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
    import Dropzone from "@/components/Dropzone.vue";
    import Vue from 'vue';
    import axios from 'axios';
    import {BACK_URL} from "@/config";

    let canSubmit = true;
    export default Vue.extend({
        name: "Uploads",
        data() {
            return {
                myFiles: [] as File[],
                color: 'light',
                valido: true,
                containerStyle: {
                    'margin-top': '3em'
                },
                submissionData: {
                  extension: '',
                  pagina: "1",
                  fileFirstName: '',
                  carpeta: ''
                } as {[p: string]: any},
                facultades: [],
                cursos: [],
                flag: true,
                success: false,
                failure: false,
                creationError: {
                    ruta: '',
                    url: '',
                    message: ''
                },
                errorDialog: false,
                folders: [
                  {value: 'entrada', text: 'prueba de entrada'},
                  {value: '1pc', text: '1pc'},
                  {value: '2pc', text: '2pc'},
                  {value: 'examen-parcial', text: 'examen parcial'},
                  {value: '3pc', text: '3pc'},
                  {value: '4pc', text: '4pc'},
                  {value: '5pc', text: '5pc'},
                  {value: 'examen-final', text: 'examen final'},
                  {value: 'sustitutorio', text: 'examen sustitutorio'},
                  {value: 'material-adicional', text: 'material adicional'}
                ]
            }
        },
        watch: {
            success(v) {
                if (v)
                    setTimeout(() => this.success = false, 5000);
                
            },
            failure(v) {
                if (v)
                    setTimeout(() => this.failure = false, 10000);

            }
        },
        methods: {
            addFile(file: File) {
                this.myFiles.push(file);
                const filename = file.name;
                const parts = filename.split('.');
                this.submissionData.extension = parts[parts.length - 1];
            },
            removeFile(file: File) {
                const i = this.myFiles.indexOf(file);
                this.myFiles.splice(i, 1);
                this.submissionData.extension = '';
            },
            async submit(opts?: { force: boolean }) {
                const valid = (this.$refs.form as Vue & { validate: () => boolean }).validate();
                const url = `${BACK_URL}/api/upload/recurso${opts?.force ? '?force=true' : ''}`;
                if (canSubmit && valid) {
                    if (!this.myFiles.length) return alert('Archivo necesario');
                    canSubmit = false;
                    const formData = new FormData((this.$refs.form as Vue & { $el: HTMLFormElement }).$el);
                    // (this.$refs.form as Vue & { $el: HTMLFormElement }).$el internal htmlform element
                    formData.append('file', this.myFiles[0]);
                    const request = axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    try {
                        await request;
                        this.resetForm();
                        this.success = true;
                    } catch (e) {
                        this.creationError = e.response.data;
                        this.failure = true;
                    } finally {
                        canSubmit = true;
                    }
                }
            },
            async poblateCursos(facultadId: string) {
                // TODO: OPTIMIZE THIS WITH CACHING
                const url = `${BACK_URL}/api/facultad/${facultadId}/cursos`;
                const response = await axios.get(url);
                this.cursos = response.data;
            },
            resetForm() {
                this.flag = !this.flag;
                (this.$refs.form as Vue & { reset: () => boolean }).reset();
                // pendejadita para poder colocar un valor por defecto luego de reiniciar
                this.submissionData.pagina = "0";
                this.$nextTick(() => {
                    this.submissionData.pagina = "1";
                });
            }
        },
        components:{
            Dropzone,
        },
        async created() {
            const url = `${BACK_URL}/api/facultad`;
            const response = await axios.get(url);
            this.facultades = response.data;
        }
    })
</script>

<style scoped>

</style>