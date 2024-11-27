import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./TicketsComponent/Home/Home";
import Today from "./TicketsComponent/Closed/Today";
import Yesterday from "./TicketsComponent/Closed/Yesterday";
import ThisWeek from "./TicketsComponent/Closed/ThisWeek";
import ThisMonth from "./TicketsComponent/Closed/ThisMonth";
import ThisQuarter from "./TicketsComponent/Closed/ThisQuarter";
import TodayDetails from "./TicketsComponent/Closed/TodayDetails";
import YesterdayDetails from "./TicketsComponent/Closed/YesterdayDetails";
import ThisWeekDetails from "./TicketsComponent/Closed/ThisWeekDetails";
import ThisMonthDetails from "./TicketsComponent/Closed/ThisMonthDetails";
import ThisQuarterDetails from "./TicketsComponent/Closed/ThisQuarterDetails";
import ThisYear from "./TicketsComponent/Closed/ThisYear";
import ThisYearDetails from "./TicketsComponent/Closed/ThisYearDetails";
import Open from "./TicketsComponent/Open/Open";
import OpenDetails from "./TicketsComponent/Open/OpenDetails";
import Answered from "./TicketsComponent/Open/Answered";
import AnsweredDetails from "./TicketsComponent/Open/AnsweredDetails";
import Overdue from "./TicketsComponent/Open/Overdue";
import OverdueDetails from "./TicketsComponent/Open/OverdueDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {}
        <Route path="/tickets/closed/today" element={<Today />} />
        <Route path="/tickets/closed/yesterday" element={<Yesterday />} />
        <Route path="/tickets/closed/this-week" element={<ThisWeek />} />
        <Route path="/tickets/closed/this-month" element={<ThisMonth />} />
        <Route path="/tickets/closed/this-quarter" element={<ThisQuarter />} />
        <Route path="/tickets/closed/this-year" element={<ThisYear />} />
        <Route path="/today-details/:id" element={<TodayDetails />} />
        <Route path="/yesterday-details/:id" element={<YesterdayDetails />} />
        <Route path="/thisweek-details/:id" element={<ThisWeekDetails />} />
        <Route path="/thismonth-details/:id" element={<ThisMonthDetails />} />
        <Route
          path="/thisquarter-details/:id"
          element={<ThisQuarterDetails />}
        />
        <Route path="/thisyear-details/:id" element={<ThisYearDetails />} />
        <Route path="/tickets/open" element={<Open />} />
        <Route path="/open-details/:id" element={<OpenDetails />} />
        <Route path="/tickets/answered" element={<Answered />} />
        <Route path="/answered-details/:id" element={<AnsweredDetails />} />
        <Route path="/tickets/overdue" element={<Overdue />} />
        <Route path="/overdue-details/:id" element={<OverdueDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
