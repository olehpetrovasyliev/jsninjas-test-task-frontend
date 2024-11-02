import { Route, Routes } from "react-router-dom";
import HomePage from "./Routes/HomePage/HomePage";
import AllCharactersPage from "./Routes/AllCharactersPage";
import AddCharacterPage from "./Routes/AddCharacterPage";
import CharacterPage from "./Routes/CharacterPage";
import "./index.scss";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/characters" element={<AllCharactersPage />} />
      <Route path="/characters/:id" element={<CharacterPage />} />
      <Route path="/addCharacter" element={<AddCharacterPage />} />
    </Routes>
  );
}

export default App;
