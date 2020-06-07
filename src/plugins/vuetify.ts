import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/src/locale/es';

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'mdi'
});

export const vuetify = new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#EE44AA',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang: {
      locales: { es },
      current: 'es',
    }
});
