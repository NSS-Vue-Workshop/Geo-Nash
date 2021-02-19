<template>
  <v-navigation-drawer class="purple" dark permanent app>
    <h1 class="text-center mt-6">
      <v-icon x-large color="white">
        mdi-map-check
      </v-icon>
    </h1>
    <h1 class="text-center white--text brand nav-header">GeoNash</h1>
    <v-divider />
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item to="/map">
          <v-list-item-title>
            <v-icon color="white">mdi-map-marker-multiple</v-icon>
            Geocaches
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/hide" v-if="user">
          <v-list-item-title>
            <v-icon color="white">mdi-earth-plus</v-icon>
            Add Geocache
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          inactive
          v-if="!user"
          @click="signIn"
          class="list-item--inactive"
        >
          <v-list-item-title>
            <v-icon color="white">mdi-login-variant</v-icon>
            Sign In
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          inactive
          v-else
          @click="signOut"
          class="list-item--inactive"
        >
          <v-list-item-title>
            <v-icon color="white">mdi-logout-variant</v-icon>
            Sign Out
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { signIn, signOut } from "../firebase";

export default {
  methods: {
    ...mapMutations(["setSnackbarMessage"]),
    async signIn() {
      await signIn();
      this.setSnackbarMessage(`Welcome ${this.user.displayName}`);
    },
    async signOut() {
      await signOut();
      if (this.$route.path != "/map") {
        this.$router.push("/map");
      }
      this.setSnackbarMessage(`You're now logged out`);
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style></style>
