<template>
  <div>
    <v-row v-if="geocache" justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">
          <v-icon size="80" color="blue-grey">
            mdi-earth
          </v-icon>
        </h1>
        <h1 class="text-center">{{ geocache.title }}</h1>
        <h6 class="text-center purple--text">
          Hidden by {{ geocache.username }}
        </h6>
        <h4 class="text-center red--text mb-1">{{ milesAway }}</h4>
        <h2 class="blue-grey--text text-center my-5">
          {{ geocache.lat }}&deg;, {{ geocache.lon }}&deg;
        </h2>
        <p>{{ geocache.description }}</p>
        <v-divider class="py-3" />
        <log-book :geocache-id="geocache.id" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { latLng } from "leaflet";
import { db } from "../firebase";
import LogBook from "../components/LogBook";

export default {
  components: { LogBook },
  data() {
    return {
      geocache: null,
      discoveries: []
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    const snapshot = await db
      .collection("geocaches")
      .doc(id)
      .get();
    this.geocache = {
      ...snapshot.data(),
      id: snapshot.id
    };
  },
  computed: {
    ...mapState(["userCoords"]),
    milesAway() {
      if (!this.userCoords || !this.geocache) return null;

      const cacheCoords = latLng(this.geocache.lat, this.geocache.lon);
      const distanceInMeters = this.userCoords.distanceTo(cacheCoords);
      const metersInMile = 1609.344;
      const distanceInMiles = (distanceInMeters / metersInMile).toFixed(1);
      return `${distanceInMiles} miles away`;
    }
  }
};
</script>

<style></style>
