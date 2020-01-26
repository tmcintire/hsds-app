<template>
  <div class="home">
    <v-overlay dark :opacity="0.8" v-model="dialog">
      <v-container>
        <v-text-field
          :label="'Starting Cash Box'"
          v-model="cash"
        ></v-text-field>
        <v-btn @click="startEvent">Start Event</v-btn>
      </v-container>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { forEach } from "lodash-es";
import { IEvent } from "@/interfaces";
import { totalRevenue, totalExpenses } from "@/helpers/calculations";
import Tickets from "@/components/Events/Tickets.vue";
import Expenses from "@/components/Events/Expenses.vue";

export default Vue.extend({
  name: "start-event",
  props: ["event", "id"],
  data: () => ({
    dialog: true,
    cash: "0"
  }),
  methods: {
    startEvent() {
      const event = this.event;
      event.cash = parseFloat(this.cash);
      this.$store.dispatch("startEvent", { id: this.id, event });
      this.$emit("close-start");
    }
  }
});
</script>
