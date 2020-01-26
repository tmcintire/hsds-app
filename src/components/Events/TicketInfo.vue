<template>
  <div>
    <v-text-field :label="'Type'" v-model="type" ></v-text-field>
    <v-text-field :label="'Price'" v-model="price"></v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapPropsModels, mapPropsFloatModels } from "@/components/vueHelper";

export default Vue.extend({
  name: "ticket-info",
  props: ["ticket", "id"],
  components: {},
  computed: {
    ...mapPropsModels(["type"], { object: "ticket" }),
    ...mapPropsFloatModels(["price"], { object: "ticket" })
  }
});
</script>

