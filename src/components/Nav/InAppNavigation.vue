<template>
  <div>
    <v-btn @click="back">
      <v-icon>
        mdi-arrow-left-bold
      </v-icon>
    </v-btn>
    <v-btn @click="forward">
      <v-icon>mdi-arrow-right-bold</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "InAppNavigation",
  methods: {
    forward() {
      this.$router.forward();
    },
    back() {
      this.$router.back();
    }
  }
});
</script>
