import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import possibileLogo from "../possibileLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ArtistCard from "./ArtistCard";

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [searchArtist, setSearchArtist] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongPreviewUrl, setSelectedSongPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Si è verificato un errore: ", error);
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchArtist}`
      );
      const data = await response.json();
      setSearchResults(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Si è verificato un errore: ", error);
      setIsLoading(false);
    }
  };

  const handlePlaySong = (previewUrl) => {
    setSelectedSongPreviewUrl(previewUrl);
  };

  return (
    <Container className="homepage-container">
      <div className="container-fluid">
        <div className="container-fluid mt-4 p-4 bg-dark rounded shadow">
          <div className="row d-flex align-items-center gap-3 form-container">
            <div className="col-auto">
              <img
                src={possibileLogo}
                alt="possibileLogo"
                width={100}
                height={100}
              />
            </div>
            <div className="col">
              <h1 className="mb-0 text-light">musiXplosion</h1>
            </div>
            <div className="col search-form">
              <Form onSubmit={handleSearch}>
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
          </div>
        </div>
        <div className="row justify-content-center">
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : searchResults.length === 0 ? (
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
    </Container>
  );
};

export default HomePage;
