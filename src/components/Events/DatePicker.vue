<template>
    <v-row>
      <v-col cols="12" lg="6">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              readonly=""
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateValue" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { EventStatus } from "@/interfaces";

export default Vue.extend({
  props: ["date"],
  data: () => ({
    menu1: false
  }),
  computed: {
    dateValue: {
      get(): string {
        //return this.date;
        if (this.date !== "") {
          return new Date(this.date).toISOString().substring(0, 10);
        }

        return "";
      },
      set(date: string) {
        const formattedDate = moment(date).format("MM/DD/YYYY");
        this.$emit("update-event", { key: "date", value: formattedDate });
      }
    }
  },
  methods: {}
});
</script>