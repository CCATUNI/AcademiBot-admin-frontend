<template>
  <div>
    <vue-dropzone ref="dropzone" id="customdropzone"
                  @vdropzone-file-added="vfileAdded"
                  @vdropzone-error="verror"
                  @vdropzone-removed-file="vremoved"
                  :options="dropzoneOptions"
                  :duplicateCheck="true"
                  style="align-content: center"
    >
    </vue-dropzone>
  </div>
</template>

<script lang="js">
    import Vue from 'vue';
    import vueDropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';
    // import vueDropzone from '../../../dist/vue2Dropzone.js';
    // require('../../../dist/vue2Dropzone.min.css')
    export default Vue.extend({
        props: {
            fileAdder: {
                type: Function
            },
            fileRemover: {
                type: Function
            },
            flag: {
                type: Boolean
            },
            maxFiles: {
                type: Number,
                defaultValue: Infinity
            }
        },
        data() {
            return {
                ok: true,
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    maxFilesize: 50,
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    autoQueue: false,
                    dictDefaultMessage: 'Añade un archivo',
                    dictFileTooBig: 'El archivo es muy grande',
                    dictRemoveFile: 'Quitar archivo'
                },
                filecounter: 0
            }
        },
        watch: {
            flag() {
                const dropZone = this.$refs.dropzone.dropzone;
                for (const file of dropZone.files) {
                    dropZone.removeFile(file);
                }
            }
        },
        components: {
            vueDropzone
        },
        methods: {
            vfileAdded(file) {
                console.log(this.maxFiles, this.filecounter);
                this.filecounter++;
                if (this.fileAdder) this.fileAdder(file);
                if (this.filecounter > this.maxFiles) {
                    const dropZone = this.$refs.dropzone.dropzone;
                    dropZone.removeFile(file);
                    return;
                }
                console.log('Added');
                const pbar = document.querySelector('.dz-progress'); // removes progress bar
                if (pbar) pbar.remove();
                document.querySelector('.dz-preview');
                
                //console.log(preview.style);
                // TODO: CENTER FILE UPLOADES IN DROP ZONE
            },
            verror(file) {
                console.log(file.name);
            },
            vremoved(file) {
                if (this.fileRemover) this.fileRemover(file);
                this.filecounter--;
            }
        }
    })
</script>
