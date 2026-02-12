function PlaceCard({
  placeName,
  location,
  dateVisited,
  description,
  rating,
  imageUrl,
}) {
  return (
    <div className="place-card">
      <img src={imageUrl} alt={placeName} className="place-image" />
      <div className="place-details">
        <h2 className="place-name">{placeName}</h2>
        <p className="place-location">
          <strong>Location:</strong> {location}
        </p>
        <p className="place-date">
          <strong>Date Visited:</strong> {dateVisited}
        </p>
        <p className="place-description">{description}</p>
        <p className="place-rating">
          <strong>Rating:</strong> {rating} / 5
        </p>
      </div>
    </div>
  );
}

export default PlaceCard;
