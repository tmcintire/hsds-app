<template>
  <div>{{ event.name }} - ${{ event.net }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { totalRevenue, totalExpenses } from "@/helpers/calculations";

export default Vue.extend({
  name: "event-report",
  props: ["event", "id"],
  components: {}
});
</script>
