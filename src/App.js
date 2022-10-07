import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
import TablePage from "./pages/TablePage";
import UpdatePage from "./pages/UpdatePage";
// Using compiled SCSS (path setting from "live sass format")
import "./css/main.min.css";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("Unknown");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage setUserName={setUserName} />} />
        <Route path="/table" element={<TablePage userName={userName} />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:categoryURL/:itemId" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
