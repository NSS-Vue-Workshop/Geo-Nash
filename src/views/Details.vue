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
  }
};
</script>

<style></style>
