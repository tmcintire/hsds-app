<template>
  <div class="home">
    <h1>{{ year }} Yearly Report</h1>

    <v-container>
      <v-row no-gutters>
        <v-col>
          <p>Number of Events: {{ Object.keys(yearEvents).length }}</p>
          <p>Number of Tickets: {{ numTickets }}</p>
        </v-col>
        <v-col>
          <p>Income: ${{ income }}</p>
          <p>Expenses: ${{ expenses }}</p>
          <span :class="net >= 0 ? 'green' : 'red'">
            <p>Net ${{ net }}</p>
          </span>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />
    <v-data-table
      dense
      v-if="tableEvents"
      :headers="headers"
      :items="tableEvents"
      class="elevation-1"
    >
      <template v-slot:item.totalRevenue="{ item }">
        ${{ item.totalRevenue }}
      </template>
      <template v-slot:item.totalExpenses="{ item }">
        ${{ item.totalExpenses }}
      </template>
      <template v-slot:item.net="{ item }">
        <span :class="item.net >= 0 ? 'green' : 'red'">
          <p>${{ item.net }}</p>
        </span>
      </template>
    </v-data-table>
    <!-- <EventReport
      v-for="(event, key) in yearEvents"
      :key="key"
      :event="event"
      :id="key"
    /> -->
  </div>
</template>

<style lang="less">
.green {
  color: green;
}

.red {
  color: red;
}
</style>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import moment from "moment";
import { forEach } from "lodash-es";
import { IEvent, EventStatus } from "@/interfaces";
import {
  totalRevenue,
  totalExpenses,
  totalTickets
} from "@/helpers/calculations";
import EventReport from "@/components/Events/EventReport.vue";
import { Route } from "vue-router";

export default Vue.extend({
  name: "home",
  components: {
    //EventReport
  },
  computed: {
    ...mapGetters({
      events: "getEvents"
    }),
    tableEvents(): any[] {
      const events = Object.keys(this.yearEvents).map(key => {
        const event = this.yearEvents[key];
        return {
          name: event.name,
          totalRevenue: event.totalRevenue,
          totalExpenses: event.totalExpenses,
          net: event.net
        };
      });
      return events;
    }
  },
  created() {
    this.getYearEvents();
    this.year = this.$route.params.year;
  },
  watch: {
    // Listen for the route to change in case the id has changed, or been nullified
    $route(to: Route, from) {
      this.getYearEvents();
      this.year = to.params.year;
    }
  },
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Revenue", value: "totalRevenue" },
      { text: "Expenses", value: "totalExpenses" },
      { text: "Net", value: "net" }
    ],
    year: "",
    yearEvents: {},
    numTickets: 0,
    expenses: 0,
    income: 0,
    net: 0
  }),
  methods: {
    getYearEvents() {
      const year = this.$route.params.year;
      const currentDate = moment().format("L"); // get the current date
      const startDate = new Date(`01/01/${year}`).getTime();
      const endDate = new Date(`12/31/${year}`).getTime();
      const yearEvents: any = {};

      let revenue = 0;
      let net = 0;
      let numTickets = 0;
      let expenses = 0;
      Object.keys(this.events).map(key => {
        const event = this.events[key];
        const eventDate = new Date(event.date).getTime();

        if (
          startDate < eventDate &&
          eventDate < endDate &&
          event.status === EventStatus.closed
        ) {
          yearEvents[key] = event;
          revenue += totalRevenue(event);
          expenses += totalExpenses(event);
          numTickets += totalTickets(event);
        }
      });

      this.income = revenue;
      this.expenses = expenses;
      this.numTickets = numTickets;
      const init = this.income - this.expenses;
      const fixed = init.toFixed(2);

      this.net = parseFloat(fixed);
      this.yearEvents = yearEvents;
    }
  }
});
</script>
