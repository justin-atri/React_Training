import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
import TablePage from "./pages/TablePage";
import UpdatePage from "./pages/UpdatePage";
// Using compiled SCSS (path setting from "live sass format")
import "./css/main.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:category/:itemId" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
