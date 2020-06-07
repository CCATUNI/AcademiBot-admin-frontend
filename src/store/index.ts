import Vue from 'vue';
import Vuex from 'vuex';
import { BACK_URL, REFRESH_TOKEN, ACCESS_TOKEN } from "@/config";
Vue.use(Vuex);

const LOGGED = 'logged';

export const store = new Vuex.Store({
  state: {
    navDrawerActive: false,
    logged: localStorage.getItem(LOGGED) === 'true',
    userSelection: undefined as unknown as object,
    refreshToken: localStorage.getItem(REFRESH_TOKEN),
    accessToken: localStorage.getItem(ACCESS_TOKEN)
  },
  mutations: {
    toggle(state) {
      state.navDrawerActive = !state.navDrawerActive;
    },
    setRefreshToken(state, rtoken) {
      if (!rtoken) {
        rtoken = '';
      }
      localStorage.setItem(REFRESH_TOKEN, rtoken);
      state.refreshToken = rtoken;
    },
    setAccessToken(state, atoken) {
      if (!atoken) {
        atoken = '';
      }
      state.accessToken = atoken;
      localStorage.setItem(ACCESS_TOKEN, atoken);
    },
    logged(state, value) {
      state.logged = value;
      if (!value) {
        state.accessToken = '';
        state.refreshToken = '';
        localStorage.setItem(REFRESH_TOKEN, '');
        localStorage.setItem(ACCESS_TOKEN, '');
      }
      localStorage.setItem(LOGGED, value.toString());
    },
    selectUsers(state, value) {
      state.userSelection = value;
    }
  },
  getters: {
    drawer: state => state.navDrawerActive,
    rootBackUrl: () => BACK_URL,
    logged: state => state.logged,
    refreshToken: state => state.refreshToken,
    accessToken: state => state.accessToken,
    userSelection: state => state.userSelection
  }
})