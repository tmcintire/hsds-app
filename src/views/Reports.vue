<template>
  <div class="home">
    <h1>Reports</h1>
    <EventReport 
      v-for="(event, key) in yearEvents" 
      :key="key" 
      :event="event" 
      :id="key"/> 
    
    <p>${{net}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import moment from "moment";
import { forEach } from "lodash-es";
import { IEvent, EventStatus } from "@/interfaces";
import { totalRevenue, totalExpenses } from "@/helpers/calculations";
import EventReport from "@/components/Events/EventReport.vue";

export default Vue.extend({
  name: "home",
  components: {
    EventReport
  },
  computed: {
    ...mapGetters({
      events: "getEvents"
    }),
    yearEvents(): any {
      const year = this.$route.params.year;
      const currentDate = moment().format("L"); // get the current date
      const startDate = new Date(`01/01/${year}`).getTime();
      const endDate = new Date(`12/31/${year}`).getTime();
      const yearEvents: any = {};
      Object.keys(this.events).map(key => {
        const event = this.events[key];
        const eventDate = new Date(event.date).getTime();

        if (
          startDate < eventDate &&
          eventDate < endDate &&
          event.status === EventStatus.closed
        ) {
          yearEvents[key] = event;
        }
      });
      return yearEvents;
    },
    net() {
      let net = 0;
      forEach(this.yearEvents, event => {
        net += event.net;
      });
      return net;
    }
  }
});
</script>
