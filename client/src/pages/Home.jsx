import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { FaTimes } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PlaceChat from "../components/PlaceChat";

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 13);
  }, [coords, map]);
  return null;
}

function Home() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);
  const [mapCoords, setMapCoords] = useState([51.505, -0.09]);

  async function handleViewMap(place) {
    setSelectedPlace(place);
    
    try {
      const res = await fetch(`http://localhost:8080/api/places/coords?id=${place._id}`);

      if (!res.ok) throw new Error("Failed to fetch coordinates");

      const body = await res.json();

      if (body?.data) {
        const coords = [parseFloat(body.data.latitude), parseFloat(body.data.longitude)];
        setMapCoords(coords);
      }
    } catch (err) {
      alert("Error fetching coordinates:");
    }
  }

  async function handleDelete(place) {
    if (!window.confirm(`Delete ${place.placeName}?`)) return;
    try {
      const res = await fetch(
      `http://localhost:8080/api/places/${place._id}`,
      { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete place");
      setPlaces(prev => prev.filter(p => p._id !== place._id));
     if (selectedPlace?._id === place._id) setSelectedPlace(null);
    } catch (err) {
      alert("Error deleting place.");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/api/places/${editingPlace._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlace)
      }
    );
      if (!res.ok) throw new Error("Failed to update place");

      const updated = await res.json();

      setPlaces((prev) =>
        prev.map((p) =>
        p._id === editingPlace._id ? updated.data : p
        )
      );

      setEditingPlace(null);
    } catch (err) {
      alert("Error updating place.");
    }
  }

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      try {
        let url = "http://localhost:8080/api/places";
        if (searchQuery.trim() !== "") {
          url += `/search?placeName=${encodeURIComponent(searchQuery)}`;
        }
        const res = await fetch(url);
        const body = await res.json();
        setPlaces(body.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, [searchQuery]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Home Page</h1>
        <SearchBar placeName={searchQuery} setPlaceName={setSearchQuery} />
      </div>

      {loading && <p>Loading places...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="place-list">
          {places.length === 0 ? (
            <p>No places found.</p>
          ) : (
            places.map((place) => (
              <PlaceCard
                key={place._id}
                {...place}
                dateVisited={place.dateVisited?.split("T")[0]}
                imageUrl={place.imageUrl || "/images/default-Image.jpg"}
                onDelete={() => handleDelete(place)}
                onEdit={() => setEditingPlace(place)}
                onClick={() => handleViewMap(place)}
              />
            ))
          )}
        </div>
      )}

      {editingPlace && (
        <div className="modal-overlay" onClick={() => setEditingPlace(null)}>
          <div
            className="edit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleUpdate} className="add-form">
              <div className="form-header">
                <h2>Edit Place</h2>
                <Button
                  variant="danger-light"
                  width="fit"
                  onClick={() => setEditingPlace(null)}
                >
                  <FaTimes size={14} />
                </Button>
              </div>
              <div className="form-group">
                <label>Place Name</label>
                <input
                  type="text"
                  value={editingPlace.placeName}
                  onChange={(e) =>
                    setEditingPlace({
                      ...editingPlace,
                      placeName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={editingPlace.location}
                  onChange={(e) =>
                    setEditingPlace({
                      ...editingPlace,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Date Visited</label>
                <input
                  type="date"
                  value={editingPlace.dateVisited?.split("T")[0]}
                  onChange={(e) =>
                    setEditingPlace({
                      ...editingPlace,
                      dateVisited: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={editingPlace.description}
                  onChange={(e) =>
                    setEditingPlace({
                      ...editingPlace,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Rating (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingPlace.rating}
                  onChange={(e) =>
                    setEditingPlace({ ...editingPlace, rating: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" variant="primary" width="fit">
                Update Place
              </Button>
            </form>
          </div>
        </div>
      )}

      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close-wrapper">
              <Button
                variant="danger-light"
                width="fit"
                onClick={() => setSelectedPlace(null)}
              >
                <FaTimes size={16}/>
              </Button>
            </div>

            <img
              src={selectedPlace.imageUrl}
              alt={selectedPlace.placeName}
              className="modal-img-full"
            />

            <div className="modal-body">
              <h2>{selectedPlace.placeName}</h2>
              <p>
                <strong>Location:</strong> {selectedPlace.location}
              </p>
              <p>{selectedPlace.description}</p>

              <div className="modal-map-wrap">
                <MapContainer
                  center={mapCoords}
                  zoom={13}
                  style={{ height: "250px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={mapCoords}>
                    <Popup>{selectedPlace.placeName}</Popup>
                  </Marker>
                  <RecenterMap coords={mapCoords} />
                </MapContainer>
              </div>
              <PlaceChat
                placeId={selectedPlace._id}
                initialComments={selectedPlace.comments || []}
                isOpen={!!selectedPlace}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
