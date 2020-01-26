<template>
  <div>
    <v-text-field :label="'Type'" v-model="type"></v-text-field>
    <v-text-field :label="'Description'" v-model="desc"></v-text-field>
    <v-text-field :label="'Cost'" v-model="cost"></v-text-field>
    <v-text-field :label="'Percent'" v-model="percent"></v-text-field>
    <v-text-field :label="'Notes'" v-model="notes"></v-text-field>
    <v-switch :label="'Paid'" v-model="paid"></v-switch>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapPropsModels, mapPropsFloatModels } from "@/components/vueHelper";

export default Vue.extend({
  name: "expense-info",
  props: ["expense", "id"],
  components: {},
  computed: {
    ...mapPropsModels(["notes", "paid", "type", "desc"], {
      object: "expense"
    }),
    ...mapPropsFloatModels(["cost", "percent"], {
      object: "expense"
    })
  }
});
</script>
