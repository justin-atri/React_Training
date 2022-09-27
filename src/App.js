import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
