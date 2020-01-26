<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="navigate('home')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        
        <v-list-group
          prepend-icon="mdi-home"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Reports</v-list-item-title>
          </template>
          <v-list-item-content>
            <v-list-item @click="navigatePath('reports', { key: 'year', value: year })" v-for="year in years" :key="year">
              <v-list-item-title >{{year}}</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-group>


        <v-list-item @click="navigate('events')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Events</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigatePath('addEditEvent', {key: 'id', value: undefined})">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Event</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigate('admin')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { navigateName, navigatePath } from "@/router";
import moment from "moment";

export default Vue.extend({
  name: "Nav",
  props: ["events"],
  data: () => ({
    showNav: true,
    drawer: null
  }),
  computed: {
    years(): string[] {
      const currentDate = moment().format("L"); // get the current date
      const currentYear = currentDate.split("/")[2];
      const years: string[] = [];
      Object.keys(this.events).map(key => {
        let year = this.events[key].date.split("/")[2];
        year = year.split(" ")[0];
        if (years.indexOf(year) === -1 && year <= currentYear) {
          years.push(year);
        }
      });

      return years;
    }
  },
  methods: {
    navigate(route: string) {
      navigateName(route);
    },
    navigatePath(route: string, { key, value }) {
      const path = { name: route, params: { [key]: value } };
      navigatePath(path);
    },
    handleEventSelection(eventId: string) {
      // setEventDetails(eventId);
      this.drawer = null;
    },
    logout() {
      //this.$store.dispatch('logout');
      document.cookie = "user=";
      document.cookie = "role=";
      document.cookie = "refreshToken=";
      // firebase
      //   .auth()
      //   .signOut()
      //   .then(() => {
      //     router.push({ name: "login" });
      //   });
    }
  }
});
</script>


<style scoped lang='less'>
#nav {
  padding: 30px;

  .event-name {
    margin-right: 50px;
  }

  a,
  span {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>