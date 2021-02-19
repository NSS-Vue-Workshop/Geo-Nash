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
  },
  methods: {
    ...mapMutations(["setUser"])
  },
  computed: {
    ...mapState(["snackbarMessage"])
  }
};
</script>
