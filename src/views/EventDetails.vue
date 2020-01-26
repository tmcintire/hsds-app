<template>
  <v-container class="home">
    <h1>{{ event.name }} - {{ event.date }}</h1>
    <v-row>
      <router-link :to="{ name: 'addEditEvent', params: { id } }"
        >Edit Event</router-link
      >
      <v-btn @click="startEvent">Start Event</v-btn>
      <v-btn @click="finalizeEvent">Finalize Event</v-btn>
    </v-row>
    <div v-if="event">
      <Tickets :id="id" :tickets="event.tickets" />
      <Expenses :id="id" :expenses="event.expenses" />

      <p>Total Revenue: ${{ totalRevenue }}</p>
      <p>Total Expenses: ${{ totalExpenses }}</p>
      <p>Net: ${{ net }}</p>
      <p>Starting Cash: ${{ event.cash }}</p>
    </div>

    <StartEvent
      v-if="startForm"
      :event="event"
      :id="id"
      v-on:close-start="startForm = false"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { forEach } from "lodash-es";
import { IEvent } from "@/interfaces";
import { totalRevenue, totalExpenses } from "@/helpers/calculations";
import Tickets from "@/components/Events/Tickets.vue";
import Expenses from "@/components/Events/Expenses.vue";
import StartEvent from "@/components/Events/StartEvent.vue";

export default Vue.extend({
  name: "event-details",
  components: {
    Tickets,
    Expenses,
    StartEvent
  },
  computed: {
    ...mapGetters({
      events: "getEvents"
    }),
    event(): IEvent {
      return this.events[this.$route.params.id];
    },
    id(): string {
      return this.$route.params.id;
    },
    totalRevenue(): number {
      return totalRevenue(this.event);
    },
    totalExpenses(): number {
      return totalExpenses(this.event);
    },
    net(): string {
      const net: number = this.totalRevenue - this.totalExpenses;
      return net.toFixed(2);
    }
  },
  data: () => ({
    startForm: false
  }),
  methods: {
    finalizeEvent() {
      console.log("finalizing event");
      this.$store.dispatch("finalizeEvent", { id: this.id, event: this.event });
    },
    startEvent() {
      this.startForm = true;
    }
  }
});
</script>
