import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ManualQuiz from "./pages/ManualQuiz";
import VoiceQuiz from "./pages/VoiceQuiz";
import Summary from "./pages/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/manual" element={<ManualQuiz />} />
        <Route path="/voice" element={<VoiceQuiz />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;