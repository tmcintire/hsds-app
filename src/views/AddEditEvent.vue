<template>
  <v-stepper v-model="page">
    <v-stepper-header>
      <v-stepper-step @click="page = 1" :complete="page > 1" step="1">Event Details</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step @click="page = 2" :complete="page > 2" step="2">Ticket Info</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step @click="page = 3" step="3">Expenses</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1" title="Event">
          
        <EditEventInfo :event.sync="event" />

        <v-btn color="primary" @click="page = 2">Continue</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <EditTicketInfo :tickets.sync="event.tickets"/>

        <v-btn color="primary" @click="page = 3">Continue</v-btn>
        <v-btn color="primary" @click="page -= 1">Back</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <EditExpenseInfo :expenses.sync="event.expenses"/>

        <v-btn color="primary" @click="addEditEvent">Submit</v-btn>
        <v-btn color="primary" @click="page -= 1">Back</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import Vue from "vue";
import EditEventInfo from "@/components/Events/EditEventInfo.vue";
import EditTicketInfo from "@/components/Events/EditTicketInfo.vue";
import EditExpenseInfo from "@/components/Events/EditExpenseInfo.vue";
import { IEvent, EventStatus } from "@/interfaces";
import { navigatePath } from "@/router";
import { mapGetters } from "vuex";

interface Data {
  page: number;
  event: IEvent;
  key: string | null;
}

const newEvent: IEvent = {
  name: "",
  type: "",
  date: "",
  fee: 0,
  max_fee: 0,
  cash: 0,
  band_minimum: 0,
  tickets: {},
  expenses: {},
  status: EventStatus.created
};

export default Vue.extend({
  name: "add-edit-event",
  components: {
    EditEventInfo,
    EditTicketInfo,
    EditExpenseInfo
  },
  mounted() {
    // When the component mounts, we should check if an event exists
    this.handleEventChanged();
  },
  watch: {
    // Listen for the route to change in case the id has changed, or been nullified
    $route(to, from) {
      this.handleEventChanged();
    }
  },
  computed: {
    ...mapGetters({
      events: "getEvents"
    })
  },
  data: (): Data => ({
    page: 1,
    key: null,
    event: newEvent
  }),
  methods: {
    async addEditEvent() {
      const id = await this.$store.dispatch("addEditEvent", {
        event: this.event,
        key: this.key
      });

      // After the event is created, navigate to it
      if (id) {
        navigatePath({ name: "eventDetails", params: { id } });
      }
    },
    handleEventChanged() {
      this.key = this.$route.params.id;
      if (this.key) {
        this.event = this.events[this.key];
      } else {
        this.event = newEvent;
      }
    },
    cancel() {
      this.$router.back();
    }
  }
});
</script>
