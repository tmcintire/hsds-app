import moment from "moment";

const currentDate = moment().format("L"); // get the current date

export function fetchFutureEvents(events) {
  const futureEvents = {};
  Object.keys(events).map(event => {
    const date = events[event].date;
    if (new Date(date).getTime() > new Date(currentDate).getTime()) {
      futureEvents[event] = events[event];
    }
    return futureEvents;
  });
  return orderEvents(futureEvents, "ascending");
}

export function fetchPastEvents(events) {
  const pastEvents = {};
  Object.keys(events).map(event => {
    const date = events[event].date;
    if (new Date(date).getTime() < new Date(currentDate).getTime()) {
      pastEvents[event] = events[event];
    }
    return pastEvents;
  });
  return orderEvents(pastEvents, "descending");
}

/* Function to sort array in ascending order */
export function sortArrayAscendingByDate(a, b) {
  return new Date(a.value.date).getTime() - new Date(b.value.date).getTime();
}

/* Function to sort array in descending order */
export function sortArrayDescendingByDate(a, b) {
  return new Date(b.value.date).getTime() - new Date(a.value.date).getTime();
}

/* Function to sort array in descending alphabetical order*/
export function sortArrayDescendingByName(a, b) {
  const valueA = a.type;
  const valueB = b.type;

  if (valueA < valueB) {
    return -1;
  } else if (valueA > valueB) {
    return 1;
  } else {
    return 0;
  }
}

// Function order events given a direction
export function orderEvents(events, direction) {
  // Create an array of the returned events
  const eventsArray: any[] = [];
  Object.keys(events).map(event => {
    //eslint-disable-line
    eventsArray.push({
      key: event,
      value: events[event]
    });
  });
  // Sort the events
  if (direction === "ascending") {
    eventsArray.sort(sortArrayAscendingByDate);
  } else {
    eventsArray.sort(sortArrayDescendingByDate);
  }

  // Send the objects back into an object
  const eventsObject = {};
  let i;
  for (i = 0; i < eventsArray.length; i += 1) {
    eventsObject[eventsArray[i].key] = eventsArray[i].value;
  }
  return eventsObject;
}
