import { useState } from "react";
import {FaUser} from "react-icons/fa";
import Button from "./Button";

function AccountBanner({ currentUser, onLogout }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="account-banner-wrapper">
      <Button
        type="button"
        variant="transparent"
        onClick={() => setShowModal(true)}
        title="Account"
      >
        <FaUser size={14} style={{ color: "#A1CCA5" }} />
        <span> </span>
        <span>{currentUser.username}</span>
      </Button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="banner-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Account</h3>
              <hr style={{ border: "0.5px solid #ddd" }} />
              <p>
                Signed in as{" "}
                <strong style={{ color: "#A1CCA5" }}>
                  <FaUser size={14} />
                  <span> </span>
                  {currentUser.username}
                </strong>
              </p>
              <p>Do you want to log out?</p>
            </div>

            <div className="modal-actions">
              <Button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={onLogout}
                width="16"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountBanner;
