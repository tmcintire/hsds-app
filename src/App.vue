<template>
  <v-app>
    <Nav :events="events" />
    <v-content>
      <v-container class="main-wrapper">
        <InAppNavigation />
        <router-view v-if="eventsLoaded"></router-view>
        <h1 v-else>Loading</h1>
      </v-container>
    </v-content>
    <v-snackbar v-if="snackBar" :value="snackBar">
      {{ snackBar.text }}
      <v-btn dark text @click="closeSnackBar">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Nav from "@/components/Nav/Nav.vue";
import InAppNavigation from "@/components/Nav/InAppNavigation.vue";
import { subscribeToAllEvents } from "@/api/api";
import { mapGetters } from "vuex";
import store from "@/store";

export default Vue.extend({
  name: "App",
  components: {
    Nav,
    InAppNavigation
  },
  computed: {
    ...mapGetters({
      events: "getEvents",
      snackBar: "getSnackBar"
    }),
    eventsLoaded() {
      return this.events ? Object.keys(this.events).length > 0 : false;
    }
  },
  created() {
    subscribeToAllEvents();
  },
  methods: {
    closeSnackBar() {
      this.$store.dispatch("snackBar", null);
    }
  }
});
</script>
