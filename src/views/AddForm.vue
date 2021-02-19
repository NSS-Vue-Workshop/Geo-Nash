<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <h1 class="text-center">
        <v-icon size="80" color="purple">
          mdi-earth-plus
        </v-icon>
      </h1>
      <v-sheet elevation="3" class="pa-5 my-5">
        <h1 class="text-center mb-6 blue-grey--text">Hide New Geocache</h1>
        <v-form @submit.prevent="save" class="mb-5">
          <v-text-field
            color="blue-grey"
            outlined
            label="Geocache Title"
            v-model="title"
          />
          <v-row>
            <v-col>
              <v-text-field
                color="blue-grey"
                outlined
                label="Latitude"
                v-model="lat"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                color="blue-grey"
                outlined
                label="Longitude"
                v-model="lon"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="8" md="6">
              <v-select
                v-model="difficulty"
                color="blue-grey"
                label="Difficulty"
                :items="difficultyOptions"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-textarea
            color="blue-grey"
            outlined
            placeholder="Description"
            v-model="description"
          ></v-textarea>
          <v-btn type="submit" color="blue-grey" dark large>SAVE</v-btn>
        </v-form>
      </v-sheet>
      <v-alert
        v-if="error"
        border="left"
        colored-border
        type="error"
        elevation="2"
        transition="scale-transition"
      >
        {{ error }}
        <v-btn icon absolute right @click="error = null">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { latLng } from "leaflet";
import { db, auth } from "../firebase";

export default {
  data() {
    return {
      difficultyOptions: ["Easy", "Moderate", "Difficult"],
      title: "",
      lat: null,
      lon: null,
      difficulty: null,
      description: null,
      error: null
    };
  },
  methods: {
    ...mapActions(["showSnackbar"]),
    async save() {
      if (!this.isValidNashvilleCoords) {
        this.error = "Coordinates must be in Nashville";
        return;
      }

      await db.collection("geocaches").add({
        title: this.title,
        lat: this.lat,
        lon: this.lon,
        difficulty: this.difficulty,
        description: this.description,
        userId: auth.currentUser.uid,
        username: auth.currentUser.displayName
      });
      this.showSnackbar("Geocache added!");
      this.$router.push("/map");
    }
  },
  computed: {
    ...mapState(["appBounds"]),
    isValidNashvilleCoords() {
      return this.appBounds.contains(latLng(this.lat, this.lon));
    }
  }
};
</script>

<style></style>
