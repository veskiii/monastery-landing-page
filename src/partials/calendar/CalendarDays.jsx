import { useState, useEffect } from "react";
import CalendarEvent from "./CalendarEvent";
import Modal from "../../utils/Modal";
import CalendarEventDetails from "./CalendarEventDetails";
import { apiUrl } from "../../App";

const CalendarDays = (props) => {
  const { month, year } = props;
  const [showSelectedEventModal, setShowSelectedEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  let blankdays = [];
  let no_of_days = [];

  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // find where to start calendar day of week
  let dayOfWeek = new Date(year, month).getDay();
  let blankdaysArray = [];
  for (var i = 1; i <= dayOfWeek; i++) {
    blankdaysArray.push(i);
  }

  let daysArray = [];
  for (var i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  blankdays = blankdaysArray;
  no_of_days = daysArray;

  const parseDate = (dateString) => {
    if (dateString) {
      const [date, time] = dateString.split(" ");
      const [dateYear, dateMonth, dateDay] = date.split("-");
      const [timeHour, timeMinute, timeSecond] = time.split(":");

      return new Date(dateYear, dateMonth - 1, dateDay, timeHour, timeMinute);
    }
    return "";
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    fetch(apiUrl + "/eventy", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setEvents(
          data.map((event, i) => {
            if (event.type === "Msza") {
              return {
                id: event.nabozenstwo_id,
                title: event.nabozenstwo_name,
                date: parseDate(event.data).toString(),
                type: event.type,
                properties: {
                  Opis: event.nabozenstwo_opis,
                  Intencja: event.nabozenstwo_intencja,
                  Data: parseDate(event.data).toLocaleString(),
                  Kaplani: event.przypisania.map((kaplan, i) => {
                    return kaplan.kaplan_name;
                  }),
                },
              };
            } else if (event.type === "Spowiedz") {
              return {
                id: event.spowiedz_id,
                title: event.spowiedz_name,
                date: parseDate(event.data_start).toString(),
                type: event.type,
                properties: {
                  Rozpoczecie: parseDate(event.data_start).toLocaleString(),
                  Zakonczenie: parseDate(event.data_end).toLocaleString(),
                  Kaplani: event.przypisania.map((kaplan, i) => {
                    return kaplan.kaplan_name;
                  }),
                },
              };
            }
          })
        );
      });
  };

  const getFilteredEvents = (day) => {
    console.log("filtered events");
    return events.filter((e) => {
      console.log(new Date(e.date).toDateString());

      return (
        new Date(e.date).toDateString() ===
        new Date(year, month, day).toDateString()
      );
    });
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  };

  const showPopupHandler = (calendar_event) => {
    setSelectedEvent(calendar_event);
    setShowSelectedEventModal(true);
  };

  return (
    <div className="flex flex-wrap border-t border-l">
      {blankdays.map((_blankday, i) => (
        <div
          className="text-center border-r border-b px-4 pt-2 w-[14.28%] h-[120px]"
          key={i}
        ></div>
      ))}
      {no_of_days.map((date, i) => (
        <div
          className="px-4 pt-2 border-r border-b relative w-[14.28%] h-[120px]"
          key={i + 7}
        >
          <div
            className={
              (isToday(date) && "bg-blue-500 text-white ") +
              "inline-flex w-6 h-6 items-center justify-center text-center leading-none rounded-full transition ease-in-out duration-100"
            }
          >
            {date}
          </div>
          <div className="overflow-y-auto mt-1 h-[80px]">
            {getFilteredEvents(date).map((event, i) => (
              <CalendarEvent
                onShowPopup={showPopupHandler}
                event={event}
                key={i}
              />
            ))}
          </div>
        </div>
      ))}

      <Modal
        id="selected-event-modal"
        ariaLabel="modal-headline"
        show={showSelectedEventModal}
        handleClose={() => {
          console.log("close");
          //setSelectedEvent(null);
          setShowSelectedEventModal(false);
        }}
      >
        {selectedEvent && <CalendarEventDetails event={selectedEvent} />}
      </Modal>
    </div>
  );
};

export default CalendarDays;
