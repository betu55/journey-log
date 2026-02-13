function SearchBar({ placeName, setPlaceName }) {
  return (
    <div className="search">
    <input
      type="text"
      value={placeName}
      className="search-input"
      onChange={(e) => setPlaceName(e.target.value)}
      placeholder="Search Place Name..."
    />
    </div>
  );
}

export default SearchBar