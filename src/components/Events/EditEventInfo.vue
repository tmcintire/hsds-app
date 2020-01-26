<template>
  <v-form>
    <h3 class="flex-row flex-center">Event Info</h3>
    <v-text-field :label="'Name'" v-model="name"></v-text-field>
    <DatePicker v-on:update-event="updateEvent" :date="event.date" />
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import DatePicker from "./DatePicker.vue";

export default Vue.extend({
  name: "edit-event-info",
  props: ["event"],
  components: {
    DatePicker
  },
  computed: {
    name: {
      get(): string {
        return this.event.name;
      },
      set(name: string) {
        this.$emit("update:event", { ...this.event, name });
      }
    },
    cash: {
      get(): string {
        return this.event.date;
      },
      set(date: string) {
        this.$emit("update:event", { ...this.event, date });
      }
    }
  },
  methods: {
    updateSelectedEvent(payload) {
      // this.$store.commit("updateSelectedEvent", payload);
    },
    updateEvent(data) {
      this.$emit("update:event", { ...this.event, [data.key]: data.value });
    }
  }
});
</script>
