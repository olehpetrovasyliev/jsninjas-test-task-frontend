import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import HomePage from "./Routes/HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/characters" element={<Test />} />
      <Route path="/characters/:id" element={<Test />} />
    </Routes>
  );
}

export default App;
