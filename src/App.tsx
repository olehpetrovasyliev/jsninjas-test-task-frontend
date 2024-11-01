import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import HomePage from "./Routes/HomePage";
import AllCharactersPage from "./Routes/AllCharactersPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/characters" element={<AllCharactersPage />} />
      <Route path="/characters/:id" element={<Test />} />
      <Route path="/addCharacter" element={<Test />} />
    </Routes>
  );
}

export default App;
