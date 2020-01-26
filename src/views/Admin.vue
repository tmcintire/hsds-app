<template>
  <div class="home">
    <h1>Admin</h1>
    <v-btn @click="convert">Convert</v-btn>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { convert } from "@/api/api";

export default {
  name: "admin",
  components: {},
  methods: {
    convert() {
      convert();
    }
  }
};
</script>
