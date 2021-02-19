<template>
  <l-map @ready="mapReady" ref="map" :zoom="13" :center="nashvilleCenter">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy;<a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
    />
    <l-marker
      v-for="cache in geocaches"
      :key="cache.id"
      :lat-lng="[cache.lat, cache.lon]"
    >
      <l-popup>
        <h2 class="purple--text">
          {{ cache.title }}
        </h2>
        <h5 class="blue-grey--text">Hidden by {{ cache.username }}</h5>
        <p class="mb-0">Difficuly: {{ cache.difficulty }}</p>
        <p class="my-0">Latitude: {{ cache.lat }}&deg;</p>
        <p class="mt-0">Longitude: {{ cache.lon }}&deg;</p>
        <v-btn :to="`/geocache/${cache.id}`" x-small color="purple" dark>
          Details
        </v-btn>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      geocaches: []
    };
  },
  methods: {
    mapReady() {
      this.getMarkers();
    },
    async getMarkers() {
      const snaphot = await db.collection("geocaches").get();
      this.geocaches = snaphot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        };
      });
    }
  },
  computed: {
    ...mapState(["nashvilleCenter"])
  }
};
</script>

<style></style>
