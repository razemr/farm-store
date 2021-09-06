import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    flex: 1,
    margin: "0 20px",
  },
});

export default function CalendarWidget() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader />
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ start: "title", center: "", end: "prev,next" }}
          eventContent = {renderEventContent}
          events={[
            {
              title: "20-20-20\n15-5-35\nDiuron",
              date: new Date(),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
    </>
  )
}
