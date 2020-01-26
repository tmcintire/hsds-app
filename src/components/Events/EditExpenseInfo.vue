<template>
  <v-form>
    <h3 class="flex-row flex-center">Expense Info</h3>
    <v-expansion-panels>
      <v-expansion-panel v-for="(expense, key) in expenses" :key="key" >
        <v-expansion-panel-header>{{expense.desc}} - ${{expense.cost}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <ExpenseInfo :id="key" :expense="expense" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn @click="addExpense">Add Expense</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import uuid from "uuid";
import ExpenseInfo from "./ExpenseInfo.vue";
import { IExpense } from "@/interfaces";

export default Vue.extend({
  name: "edit-expense-info",
  props: ["expenses"],
  components: {
    ExpenseInfo
  },
  computed: {},
  methods: {
    addExpense() {
      const newExpense: IExpense = {
        cost: 0,
        notes: "",
        paid: false,
        percent: 0,
        type: "",
        desc: ""
      };

      const id = uuid();
      Vue.set(this.expenses, id, newExpense);
    }
  }
});
</script>
