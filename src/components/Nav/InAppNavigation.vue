<template>
  <div>
    <v-btn>
      <v-icon :disabled="backDisabled" @click="back"
        >mdi-arrow-left-bold</v-icon
      >
    </v-btn>
    <v-btn>
      <v-icon @click="forward">mdi-arrow-right-bold</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { navigateName, navigatePath } from "@/router";
import moment from "moment";

export default Vue.extend({
  name: "Nav",
  props: ["events"],
  data: (): any => ({
    history: [],
    historyIndex: 0
  }),
  computed: {
    backDisabled(): boolean {
      return this.historyIndex === 0;
    }
  },
  methods: {
    forward() {
      this.$router.forward();
      this.historyIndex += 1;
    },
    back() {
      this.historyIndex -= 1;
      this.$router.back();
    }
  }
});
</script>
