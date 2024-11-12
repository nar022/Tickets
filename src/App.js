import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Home from "./TicketsComponent/Home/Home.js";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4B973C",
          colorText: "#4B444C",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
