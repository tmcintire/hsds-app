<template>
  <v-container>
    <h1>Expenses</h1>
    <v-row v-for="(expense, key) in expenses" :key="key">
      <p>${{ expense.desc }}</p>
      <p>${{ expense.cost }}</p>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapPropsModels } from "@/components/vueHelper";

export default Vue.extend({
  name: "expenses",
  props: ["expenses", "id"],
  methods: {}
});
</script>
