<template>
  <v-container>
    <h1>Tickets</h1>
    <v-row v-for="(ticket, key) in tickets" :key="key">
      <p>${{ticket.price}}</p>   
      <v-btn @click="updateTicketCount(ticket, key, 1)">Add</v-btn>
      <v-btn :disabled="ticket.count < 1" @click="updateTicketCount(ticket, key, -1)">Remove</v-btn>
      {{ticket.count}}
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapPropsModels } from "@/components/vueHelper";

export default Vue.extend({
  name: "tickets",
  props: ["tickets", "id"],
  methods: {
    updateTicketCount(ticket, key, count) {
      this.$store.dispatch("updateTicketCount", {
        id: this.id,
        key,
        count: ticket.count + count
      });
    }
  }
});
</script>

