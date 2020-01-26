import Vue from "vue";
import Vuex from "vuex";
import firebase from "../../firebase";
import { addEditEvent, updateTicketCount, finalizeEvent, startEvent } from '@/api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: {},
    eventId: ''
  },
  mutations: {
    eventsUpdated(state, payload) {
      state.events = payload;
    },
    eventUpdated(state: any, payload) {
      state.events[payload.id] = payload.event
    },
    subscribeEvent(state: any, payload) {
      state.eventId = payload.id
    },
    addEditEvent(state: any, payload) {
      // if (state.events[payload.id]) {
      //   state.events[payload.id] = payload.event
      // } else {
      //   state.event
      // }
    }
  },
  actions: {
    eventsUpdated(context, payload) {
      context.commit("eventsUpdated", payload);
    },
    eventUpdated(context, payload) {
      context.commit('eventUpdated', payload)
    },
    subscribeEvent(context, payload) {
      context.commit('subscribeEvent', payload)
    },
    async addEditEvent(context, payload) {
      const id = await addEditEvent(payload)
      return id
    },
    updateTicketCount(context, payload) {
      updateTicketCount(payload)
    },
    finalizeEvent(context, payload) {
      finalizeEvent(payload)
    },
    startEvent(context, payload) {
      startEvent(payload)
    }
  },
  getters: {
    getEvents(state) {
      return state.events;
    },
    getEvent(state) {
      if (state.events[state.eventId]) {
        return state.events[state.eventId]
      }
      return null
    }
  },
  modules: {}
});
