<template>
  <div>
    <v-row justify="space-between">
      <v-col>
        <h3>
          <v-icon color="purple">mdi-book-open</v-icon>
          Log Book
        </h3>
      </v-col>
      <v-col>
        <v-dialog v-if="user" v-model="showModal" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              class="float-right"
              color="purple"
              small
              dark
              v-bind="attrs"
              v-on="on"
            >
              I found this!
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline blue-grey lighten-3">
              Congrats!
            </v-card-title>

            <v-card-text class="py-6">
              <v-menu
                v-model="dateDialog"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="discoveryForm.date"
                    outlined
                    label="Date"
                    ic
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="discoveryForm.date"
                  color="purple"
                  @input="dateDialog = false"
                ></v-date-picker>
              </v-menu>

              <v-textarea
                v-model="discoveryForm.message"
                color="blue-grey"
                outlined
                label="Tell everyone about your discovery"
              />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple" text @click="submitLog">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-list three-line>
      <template v-for="discovery in discoveries">
        <v-list-item :key="discovery.id">
          <v-list-item-avatar>
            <v-img :src="discovery.avatarUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ discovery.username }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ discovery.date }}
            </v-list-item-subtitle>
            {{ discovery.message }}
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";

export default {
  props: ["geocacheId"],
  data() {
    return {
      discoveries: [],
      showModal: false,
      dateDialog: false,
      discoveryForm: {
        date: null,
        message: null,
        username: null,
        userId: null,
        avatarUrl: null
      }
    };
  },
  async mounted() {
    db.collection("geocaches")
      .doc(this.geocacheId)
      .collection("/discoveries")
      .onSnapshot(snapshot => {
        this.discoveries = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          };
        });
      });
  },
  methods: {
    async submitLog() {
      if (!this.user) return;

      this.discoveryForm.username = this.user.displayName;
      this.discoveryForm.userId = this.user.uid;
      this.discoveryForm.avatarUrl = this.user.photoURL;

      await db
        .collection("geocaches")
        .doc(this.geocacheId)
        .collection("/discoveries")
        .add(this.discoveryForm);

      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.discoveryForm = {
        date: null,
        message: null,
        username: null,
        userId: null,
        avatarUrl: null
      };
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style></style>
