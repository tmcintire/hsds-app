<template>
  <div class="home">
    <h1>Events</h1>
    <router-link 
      v-for="(event, key) in closedEvents" 
      :key="key" 
      :to="{ name: 'eventDetails', params: {id: key } }"
    >
      {{event.name}}
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import { fetchEventDetails } from "@/api/api";
import { EventStatus } from "../interfaces";

export default {
  name: "events",
  components: {},
  computed: {
    ...mapGetters({
      events: "getEvents"
    }),
    closedEvents() {
      const closedEvents = {};
      Object.keys(this.events).map(id => {
        const event = this.events[id];
        if (
          event.status === EventStatus.active ||
          event.status === EventStatus.created
        ) {
          closedEvents[id] = event;
        }
      });

      return closedEvents;
    }
  }
};
</script>
