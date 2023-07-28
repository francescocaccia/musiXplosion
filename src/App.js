import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ArtistCard from "./components/ArtistCard";
import AlbumPage from "./components/AlbumPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/album/:albumId" component={AlbumPage} />
        <Route path="/artist/:artistId" component={ArtistCard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
