import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import HomePage from "./Routes/HomePage";
import AllCharactersPage from "./Routes/AllCharactersPage";
import AddCharacterPage from "./Routes/AddCharacterPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/characters" element={<AllCharactersPage />} />
      <Route path="/characters/:id" element={<Test />} />
      <Route path="/addCharacter" element={<AddCharacterPage />} />
    </Routes>
  );
}

export default App;
