import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleDelete(place){
    try{
      const res = await fetch(`http://localhost:8080/api/places/placeName/${encodeURIComponent(place.placeName)}`, {
        method: "DELETE"
      });
      if(!res.ok) throw new Error("Failed to delete place");
      setPlaces((prev) => prev.filter((p) => p.id !== place.id));
    }catch(err){
      console.error(err);
      alert("Error deleting place. Try again.");
    }
  }

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      setError(null);
      try {
         let url = "http://localhost:8080/api/places"; // Initial fetch
        if (searchQuery.trim() !== "") {
          url += `/search?placeName=${encodeURIComponent(searchQuery)}`; //Query fetch
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
            <p>Add more places to see them here.</p>
          ) : (
            places.map((place) => (
              <PlaceCard
                key={place.id}
                placeName={place.placeName}
                location={place.location}
                dateVisited={place.dateVisited}
                description={place.description}
                rating={place.rating}
                imageUrl={place.imageUrl}
                onDelete={() => handleDelete(place)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
