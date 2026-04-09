import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Button from "./Button";

const COMMENT_MAX_LENGTH = 1000;

const commentTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "America/Toronto",
});

function formatCommentTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return `${commentTimeFormatter.format(date)} ET`;
}

function PlaceChat({ placeId, initialComments = [], socket, creatorUsername }) {
  const [text, setText] = useState("");
  const newMessage = useRef(null)

  const scrollToBottom = () => {
    newMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [initialComments]);

  function handleSend(e) {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText || !socket) return;

    socket.emit("send_msg", {
      placeId,
      text: trimmedText,
    });

    setText("");
  }

  return (
    <div className="place-chat">
      <h3 className="place-chat-title">Comments</h3>

      <div className="place-chat-messages">
        {initialComments.length === 0 ? (
          <p className="place-chat-empty">No comments yet. Start the conversation.</p>
        ) : (
          initialComments.map((msg, i) => {
            const isCreator =
              msg.username?.toLowerCase() === creatorUsername?.toLowerCase();

            return (
              <div key={i} className="place-chat-message">
                <div className="place-chat-message-header">
                  <span className="place-chat-username">
                    {msg.username}
                    {isCreator && (
                      <span className="place-chat-creator-badge">Creator</span>
                    )}
                  </span>
                  {msg.time && (
                    <span className="place-chat-time">{formatCommentTime(msg.time)}</span>
                  )}
                </div>
                <p className="place-chat-text">{msg.text}</p>
              </div>
            );
          })
        )}
         <div ref={newMessage}/>
      </div>

      <form onSubmit={handleSend} className="place-chat-form">
        <div className="place-chat-input-wrap">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="place-chat-input"
            rows="3"
            maxLength={COMMENT_MAX_LENGTH}
          />
          <div
            className={`place-chat-counter ${
              text.length === COMMENT_MAX_LENGTH ? "place-chat-counter-danger" : ""
            }`}
          >
            {text.length}/{COMMENT_MAX_LENGTH}
          </div>
        </div>
        <div className="place-chat-button-wrap">
          <Button type="submit" variant="primary" width="full" disabled={!text.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PlaceChat;
