<template>
  <v-row dense justify="center">
    <router-link :to="{ name: 'eventDetails', params: { id } }">
      <v-card width="400px" height="50px">
        <v-row
          class="full-height"
          dense
          justify="center"
          align-content="center"
        >
          {{ event.name }} - {{ event.date }}
        </v-row>
      </v-card>
    </router-link>
  </v-row>
</template>

<style>
.full-height {
  height: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "event-card",
  props: ["event", "id"]
});
</script>
