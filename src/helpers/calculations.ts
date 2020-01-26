import { IEvent } from "@/interfaces";
import { forEach } from "lodash-es";
export const totalRevenue = (event: IEvent): number => {
  let total = 0;
  if (event.tickets && Object.keys(event.tickets).length > 0) {
    forEach(event.tickets, (ticket, key) => {
      total += ticket.count * ticket.price;
    });
  }

  return total;
};

export const totalExpenses = (event: IEvent): number => {
  let total = 0;
  if (event.expenses && Object.keys(event.expenses).length > 0) {
    forEach(event.expenses, (expense, key) => {
      total += expense.cost;
    });
  }

  return total;
};
