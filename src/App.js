import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./TicketsComponent/Home/Home";
import Today from "./TicketsComponent/Closed/Today";
import Yesterday from "./TicketsComponent/Closed/Yesterday";
import ThisWeek from "./TicketsComponent/Closed/ThisWeek";
import ThisMonth from "./TicketsComponent/Closed/ThisMonth";
import ThisQuarter from "./TicketsComponent/Closed/ThisQuarter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Adjusted paths to match the 'Link' paths in Home.js */}
        <Route path="/tickets/closed/today" element={<Today />} />
        <Route path="/tickets/closed/yesterday" element={<Yesterday />} />
        <Route path="/tickets/closed/this-week" element={<ThisWeek />} />
        <Route path="/tickets/closed/this-month" element={<ThisMonth />} />
        <Route path="/tickets/closed/this-quarter" element={<ThisQuarter />} />
      </Routes>
    </Router>
  );
}

export default App;
