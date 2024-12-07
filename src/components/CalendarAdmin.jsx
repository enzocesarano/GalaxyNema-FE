import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/it";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("it", {
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
});

const adjustTimezone = (dateString) => {
    const date = moment(dateString);
    return date.isValid() ? date.toDate() : new Date();
};

const CalendarAdmin = () => {
  const localizer = momentLocalizer(moment); 
  const films = useSelector((state) => state.proiezioni.proiezioni);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (films.content && films.content.length > 0) {
      setIsLoading(false);
    }
  }, [films.content]);

  const NoAllDayPanel = () => null;
  const events =
    Array.isArray(films.content) && films.content.length > 0
      ? films.content.flatMap((film) => {
          return film.proiezioneList.map((proiezione) => {
            const startDateTime = adjustTimezone(proiezione.oraInizio);
            const endDateTime = adjustTimezone(proiezione.oraFine);

            return {
              title: `${film.titolo} (${proiezione.sala.nome})`,
              start: startDateTime,
              end: endDateTime,
              allDay: false,
              resource: {
                ...film,
                proiezione,
              },
            };
          });
        })
      : [];

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="calendar-container h-100 overflow-card text-light">
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 1000 }}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="week"
        min={new Date().setHours(10, 0, 0)}
        step={120}
        timeslots={1}
        components={{
            allDayPanel: NoAllDayPanel
          }}
      />
    </div>
  );
};

export default CalendarAdmin;
