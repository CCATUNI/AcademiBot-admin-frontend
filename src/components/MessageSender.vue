<template>
  <v-card v-if="userSelection">
    <v-card-title class="headline">
      Mensaje masivo
      <v-layout justify-end>
        <v-flex sm2>
          <v-btn color="success" @click="submit" :disabled="!text && !myFiles.length">Enviar</v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider style="padding-bottom: 1em"/>
    <v-card-text>
      <v-layout justify-center>
        <v-flex xs10>
          <v-form :value="valid" ref="messageForm">
            <v-textarea
                    solo
                    label="Escribe un mensaje..."
                    hint="Si incluyes urls serán enviadas como vistas previas."
                    v-model="text"
            />
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout justify-center style="padding-bottom: 1em">
        <v-flex xs8>
          <dropzone :file-adder="addFile" :file-remover="removeFile" :max-files="3"/>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text v-if="showProgress">
      <v-divider style="padding-bottom: 1em"/>
      <v-subheader class="pl-0">Progreso de envío: </v-subheader>
      <v-layout wrap>
        <v-spacer/>
        <v-flex sm2>
          <v-progress-circular
                  :value="progressValue"
                  :size="200"
                  :width="20"
                  block
                  color="success"
          >
            {{progressValue}}
          </v-progress-circular>
        </v-flex>
        <v-spacer/>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Dropzone from "@/components/Dropzone.vue";
  import { BACK_URL } from "@/config";
  import axios from 'axios';

  export default Vue.extend({
      name: "MessageSender",
      data(): {text: string; myFiles: File[]; valid: boolean; sending: boolean; showProgress: boolean; progressValue: number} {
          return {
              text: '',
              myFiles: [] as File[],
              valid: false,
              sending: false,
              showProgress: false,
              progressValue: 0
          }
      },
      computed: {
          userSelection: {
              get(): object {
                  return this.$store.getters.userSelection;
              },
              set(v: object | undefined) {
                  this.$store.commit('selectUsers', v);
              }
          }
      },
      components: {
          Dropzone
      },
      methods: {
          addFile(file: File) {
              this.myFiles.push(file);
          },
          removeFile(file: File) {
              const i = this.myFiles.indexOf(file);
              this.myFiles.splice(i, 1);
              
          },
          async submit() {
              const valid = (this.$refs.messageForm as Vue & { validate: () => boolean }).validate();
              if (!valid || this.sending) return;
              this.sending = true;
              const formData = new FormData();
              formData.set('message', this.text);
              formData.set('userSelection', JSON.stringify(this.userSelection));

              for (const file of this.myFiles) {
                  formData.append('files', file);
              }
              const url = `${BACK_URL}/api/message/massive`;
              try {
                  const response = await axios.post<{id: string; total: number}>(url, formData, {
                      headers: {
                          'Content-Type': 'multipart/form-data'
                      }
                  });
                  if (response.data.total === 0) {
                    throw new Error('No se ha encontrado a ningun usuario.');
                  }
                  this.showProgress = true;
                  this.progress(response.data.id)
                  .catch(() => {
                    this.sending = false;
                  });
              } catch {
                this.sending = false;
              }
          },
          async progress(id: string) {
              const url = `${BACK_URL}/api/message/massive/${id}`;
              const response = await axios.get<{ id: string; success: number; maximum: number; failed: number }>(url);
              const { success, failed, maximum } = response.data;
              this.progressValue = parseFloat((response.data.success / response.data.maximum*100).toFixed(2));
              if (success + failed != maximum) {
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  await this.progress(id);
                  return;
              } else {
                  this.sending = false;
                  return;
              }

          }
      }
  })
</script>

<style scoped>

</style>