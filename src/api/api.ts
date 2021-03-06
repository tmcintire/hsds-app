import firebase from "../../firebase";
import moment from "moment";
import { forEach } from "lodash-es";
import store from "@/store";
import { IEvent, EventStatus } from "@/interfaces";
import { totalRevenue, totalExpenses } from "@/helpers/calculations";

const firebaseDb = firebase.database().ref();
const eventsRef = firebaseDb.child("events");
const currentDate = moment().format("L"); // get the current date

export const subscribeToAllEvents = () => {
  eventsRef.orderByChild("date").on("value", snapshot => {
    const events = snapshot.val() || null;
    store.dispatch("eventsUpdated", events);
  });
};

export const addEditEvent = async ({
  event,
  key
}: {
  event: IEvent;
  key: string | null;
}) => {
  const events = store.getters.getEvents;
  if (!key) {
    // This is a new event
    key = eventsRef.push().key as string;
    await eventsRef.child(key).set(event);
  } else {
    await eventsRef.child(key).set(event);
  }

  return key;
};

export const updateTicketCount = ({ id, key, count }) => {
  // Set firebase references
  const eventRef = eventsRef.child(id);
  const ticketsRef = eventRef.child("tickets");
  ticketsRef.child(key).update({ count });
};

export const finalizeEvent = ({ event, id }) => {
  const eventRef = eventsRef.child(id);
  const revenue = totalRevenue(event);
  const expenses = totalExpenses(event);
  const net: number = revenue - expenses;
  const limitDecimal = net.toFixed(2);
  const formattedValue = parseFloat(limitDecimal);
  eventRef.update({
    net: formattedValue,
    totalRevenue: revenue,
    totalExpenses: expenses,
    status: EventStatus.closed
  });
};

export const startEvent = ({ event, id }) => {
  const eventRef = eventsRef.child(id);

  eventRef.update({
    ...event,
    status: EventStatus.active
  });
};

export const convert = () => {
  const events = store.getters.getEvents;

  forEach(events, event => {
    forEach(event.tickets, ticket => {
      if (typeof ticket.price === "string") {
        const price = parseFloat(ticket.price);
        if (!isNaN(price)) {
          ticket.price = price;
        }
      }
      if (typeof ticket.count === "string") {
        const count = parseInt(ticket.count);
        if (!isNaN(count)) {
          ticket.count = count;
        }
      }
    });

    forEach(event.expenses, expense => {
      if (typeof expense.cost === "string") {
        const cost = parseFloat(expense.cost);
        if (!isNaN(cost)) {
          expense.cost = cost;
        }
      }

      if (typeof expense.percent === "string") {
        const percent = parseInt(expense.percent);
        if (!isNaN(percent)) {
          expense.percent = percent;
        }
      }
    });

    event.status = 2;
  });

  eventsRef.set(events);
};
