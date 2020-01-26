<template>
  <v-app>
    <Nav :events="events" />
    <v-content>
      <v-container class="main-wrapper">
        <router-view v-if="eventsLoaded"></router-view>
        <h1 v-else>Loading</h1>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Nav from "@/components/Nav/Nav.vue";
import { subscribeToAllEvents } from "@/api/api";
import { mapGetters } from "vuex";
import store from "@/store";

export default Vue.extend({
  name: "App",
  components: {
    Nav
  },
  computed: {
    ...mapGetters({
      events: "getEvents"
    }),
    eventsLoaded() {
      return this.events ? Object.keys(this.events).length > 0 : false;
    }
  },
  created() {
    subscribeToAllEvents();
  }
});
</script>
