import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import possibileLogo from "../possibileLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ArtistCard from "./ArtistCard";

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [searchArtist, setSearchArtist] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongPreviewUrl, setSelectedSongPreviewUrl] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
        );
        const data = await response.json();
        // Limita gli album ai primi dieci elementi
        const firstTenAlbums = data.tracks.data.slice(0, 12);
        setAlbums(firstTenAlbums);
      } catch (error) {
        console.error("Si è verificato un errore: ", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchArtist}`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("Si è verificato un errore: ", error);
    }
  };

  const handlePlaySong = (previewUrl) => {
    setSelectedSongPreviewUrl(previewUrl);
  };

  return (
    <Container className="homepage-container">
      <div className="container mt-4 p-4 bg-dark rounded shadow">
        <div className="d-flex align-items-center gap-3 form-container">
          <img
            src={possibileLogo}
            alt="possibileLogo"
            width={100}
            height={100}
          />
          <h1 className="mb-0 text-light">musiXplosion</h1>
          <Form onSubmit={handleSearch} className="search-form">
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Search by artist"
                value={searchArtist}
                onChange={(e) => setSearchArtist(e.target.value)}
              />
              <Button
                type="submit"
                variant="transparent"
                className="search-button"
              >
                <FontAwesomeIcon icon={faSearch} className="large-icon" />
              </Button>
            </div>
          </Form>
        </div>

        <div className="row">
          <h2 className="text-center mb-5 text-light">Home</h2>
          {searchResults.length === 0 ? (
            albums.length === 0 ? (
              <p className="text-center w-100">Loading...</p>
            ) : (
              albums.map((album) => (
                <ArtistCard
                  key={album.id}
                  album={album}
                  onPlaySong={() => handlePlaySong(album.preview)}
                />
              ))
            )
          ) : (
            searchResults.map((album) => (
              <ArtistCard
                key={album.id}
                album={album}
                onPlaySong={() => handlePlaySong(album.preview)}
              />
            ))
          )}
        </div>
      </div>
      <div className="audio-player-container">
        {selectedSongPreviewUrl && (
          <audio controls autoPlay>
            <source src={selectedSongPreviewUrl} type="audio/mpeg" />
            Il tuo browser non supporta l'elemento audio.
          </audio>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
