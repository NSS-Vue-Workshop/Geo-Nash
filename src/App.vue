<template>
  <v-app>
    <app-sidebar />
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar bottom right :value="snackbarMessage">{{
      snackbarMessage
    }}</v-snackbar>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { latLng } from "leaflet";
import { auth } from "./firebase";
import AppSidebar from "./components/AppSidebar.vue";

export default {
  components: {
    AppSidebar
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      this.setUser(user);
    });
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      const userCoords = latLng(coords.latitude, coords.longitude);
      this.setUserCoords(userCoords);
    });
  },
  methods: {
    ...mapMutations(["setUser", "setUserCoords"])
  },
  computed: {
    ...mapState(["snackbarMessage"])
  }
};
</script>
