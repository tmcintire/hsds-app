<template>
  <v-form>
    <h3 class="flex-row flex-center">Ticket Info</h3>
    <v-expansion-panels>
      <v-expansion-panel v-for="(ticket, key) in tickets" :key="key">
        <v-expansion-panel-header>{{ticket.type}} - ${{ticket.price}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <TicketInfo :id="key" :ticket="ticket" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn @click="addTicket">Add Ticket</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import uuid from "uuid";
import TicketInfo from "./TicketInfo.vue";
import { ITicket } from "@/interfaces";

export default Vue.extend({
  name: "edit-ticket-info",
  props: ["tickets"],
  components: {
    TicketInfo
  },
  computed: {},
  methods: {
    addTicket() {
      const newTicket: ITicket = {
        price: 0,
        count: 0,
        type: ""
      };

      const id = uuid();
      Vue.set(this.tickets, id, newTicket);
    }
  }
});
</script>
