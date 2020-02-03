<template>
  <div>
    <h1 class="text-center">Active Events</h1>
    <EventCard
      :event="event"
      v-for="event in activeEvents"
      :key="event.id"
      :id="event.id"
    />
    <h1 class="text-center">Upcoming Events</h1>
    <EventCard
      :event="event"
      v-for="event in upcomingEvents"
      :key="event.id"
      :id="event.id"
    />
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { forEach, orderBy, sortby, pickBy } from "lodash-es";
import { EventStatus } from "../interfaces";
import EventCard from "@/components/Events/EventCard";

export default {
  name: "events",
  components: {
    EventCard
  },
  computed: {
    ...mapGetters({
      events: "getEvents"
    }),
    allUpcomingEvents(): any {
      const upcomingEvents = {};
      forEach(this.events, (event, id) => {
        if (
          event.status === EventStatus.active ||
          event.status === EventStatus.created
        ) {
          upcomingEvents[id] = event;
        }
      });

      const upEvents = this.orderEvents(upcomingEvents);

      return upEvents;
    },
    activeEvents(): any {
      return pickBy(
        this.allUpcomingEvents,
        event => event.status === EventStatus.active
      );
    },
    upcomingEvents(): any {
      return pickBy(
        this.allUpcomingEvents,
        event => event.status === EventStatus.created
      );
    }
  },
  methods: {
    orderEvents(events) {
      let orderedEvents: any = [];
      forEach(events, (event, id) => {
        orderedEvents.push({ ...event, id });
      });

      return orderBy(orderedEvents, "date");
    }
  }
};
</script>
