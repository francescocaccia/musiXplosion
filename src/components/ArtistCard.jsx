import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArtistCard = ({ album, onPlaySong }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAlbumClick = () => {
    setShowModal(true);
  };

  const handlePlaySong = () => {
    onPlaySong(album.preview);
  };

  return (
    <>
      <Card
        key={album.id}
        style={{ width: "12rem", cursor: "pointer", padding: 0 }}
        className="col-sm-6 col-md-4 col-lg-3 mb-4 ms-2"
        onClick={handleAlbumClick}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <Card.Img
            src={album.album.cover_medium}
            className="card-img-top"
            alt={album.album.title}
            style={{ height: "100%", objectFit: "cover" }}
          />
          <div
            className="text-overlay"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "10px",
              background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
            }}
          >
            <h5 className="titleCard text-truncate text-white fw-bold fs-5">
              {album.title}
            </h5>
            <p className="pCard text-light">{album.artist.name}</p>
          </div>
        </div>
        <Button
          onClick={handlePlaySong}
          style={{
            backgroundColor: "transparent",
            border: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 150%)",
          }}
        >
          <FontAwesomeIcon
            icon={faPlay}
            className="large-icon"
            style={{ color: "#ffffff" }}
            bounce
          />
        </Button>
      </Card>
      {/* Modal content */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {album && (
          <>
            <Modal.Header closeButton className="modal-heade">
              <Modal.Title>{album.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <p>Artist: {album.artist.name}</p>
              <p>Duration: {album.duration} seconds</p>
              <div className="album-cover">
                <img src={album.album.cover_medium} alt="Album Cover" />
              </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              {album.preview && (
                <audio controls autoPlay className="audio-player">
                  <source src={album.preview} type="audio/mpeg" />
                  Il tuo browser non supporta l'elemento audio.
                </audio>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default ArtistCard;
