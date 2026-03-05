import Button from "./Button";
import { FaTrash, FaMapMarkerAlt, FaRegCalendarAlt, FaStar, FaRegStar, FaPen } from "react-icons/fa";

function Stars({ value }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= value ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </span>
  );
}

function PlaceCard({
  placeName,
  location,
  dateVisited,
  description,
  rating,
  imageUrl,
  onDelete,
  onEdit,
  onClick,
}) {
  return (
    <div className="place-card" onClick={onClick}>
      {(onDelete || onEdit) && (
        <div className="place-card__action">
          {onEdit && (
            <Button
              variant="edit-light"
              width="fit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <FaPen size={12} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger-light"
              width="fit"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <FaTrash size={12} />
            </Button>
          )}
        </div>
      )}
      <img src={imageUrl} alt={placeName} className="place-image" />
      <div className="place-details">
        <div className="place-header">
          <h3 className="place-name">{placeName}</h3>
          <p className="place-rating">
            <Stars value={rating} />
          </p>
        </div>
        <p className="place-location">
          <FaMapMarkerAlt size={14} /> {location}
        </p>
        <p className="place-description">{description}</p>
        <p className="place-date">
          <FaRegCalendarAlt size={14} /> {dateVisited}
        </p>
      </div>
    </div>
  );
}

export default PlaceCard;
