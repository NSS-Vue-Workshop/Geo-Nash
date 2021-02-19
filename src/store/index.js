import Vue from "vue";
import Vuex from "vuex";
import { latLng, latLngBounds } from "leaflet";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userCoords: null,
    snackbarMessage: null,
    nashvilleCenter: latLng(36.1627, -86.7816),
    appBounds: latLngBounds(latLng(35.89, -87.93), latLng(36.62, -85.61)) // used to determine if coords are valid
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserCoords(state, payload) {
      state.userCoords = payload;
    },
    setSnackbarMessage(state, payload) {
      state.snackbarMessage = payload;
    }
  },
  actions: {
    showSnackbar({ commit }, payload) {
      commit("setSnackbarMessage", payload);
      setTimeout(() => {
        commit("setSnackbarMessage", null);
      }, 1000);
    }
  },
  modules: {}
});
