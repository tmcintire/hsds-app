import firebase from "../../firebase";
import moment from "moment";
import { find } from 'lodash-es'
import store from "@/store";
import { orderEvents } from '@/api/helpers';
import { IEvent, EventStatus } from '@/interfaces';
import { totalRevenue, totalExpenses } from '@/helpers/calculations';

const firebaseDb = firebase.database().ref();
const eventsRef = firebaseDb.child('events');
const currentDate = moment().format('L'); // get the current date
const currentYear = currentDate.split('/')[2];

export const subscribeToAllEvents = () => {
  eventsRef.orderByChild('date').on('value', (snapshot) => {
    const events = snapshot.val() || null
    store.dispatch('eventsUpdated', events)
  })
}

export const addEditEvent = async ({ event, key }: { event: IEvent, key: string | null }) => {
  const events = store.getters.getEvents
  if (!key) {
    // This is a new event
    key = eventsRef.push().key as string;
    await eventsRef.child(key).set(event);
  } else {
    await eventsRef.child(key).set(event)
  }

  return key
}

export const updateTicketCount = ({ id, key, count }) => {
  // Set firebase references
  const eventRef = eventsRef.child(id);
  const ticketsRef = eventRef.child('tickets');
  ticketsRef.child(key).update({ count })
}

export const finalizeEvent = ({ event, id }) => {
  const eventRef = eventsRef.child(id);
  const revenue = totalRevenue(event);
  const expenses = totalExpenses(event);
  const net: number = revenue - expenses;
  const limitDecimal = net.toFixed(2)
  const formattedValue = parseFloat(limitDecimal)
  eventRef.update({
    net: formattedValue,
    totalRevenue: revenue,
    totalExpenses: expenses,
    status: EventStatus.closed
  })
}

export const startEvent = ({ event, id }) => {
  const eventRef = eventsRef.child(id);

  eventRef.update({
    ...event,
    status: EventStatus.active
  })
}