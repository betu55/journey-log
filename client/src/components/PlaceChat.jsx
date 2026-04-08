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

function PlaceChat({ placeId, initialComments = [], isOpen, onMessageReceived }) {
  const [messages, setMessages] = useState(initialComments);
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    setMessages(initialComments || []);
  }, [initialComments, placeId]);

  useEffect(() => {
    if (!isOpen || !placeId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = io("http://localhost:8080", {
      auth: { token }
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join_place", placeId);
    });

    socket.on("receive_msg", (msg) => {
      setMessages((prev) => [...prev, msg]);
      onMessageReceived?.(msg);
    });

    return () => socket.disconnect();
  }, [placeId, isOpen, onMessageReceived]);

  function handleSend(e) {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText || !socketRef.current) return;

    socketRef.current.emit("send_msg", {
      placeId,
      text: trimmedText,
    });

    setText("");
  }

  return (
    <div className="place-chat">
      <h3 className="place-chat-title">Comments</h3>

      <div className="place-chat-messages">
        {messages.length === 0 ? (
          <p className="place-chat-empty">No comments yet. Start the conversation.</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="place-chat-message">
              <div className="place-chat-message-header">
                <span className="place-chat-username">{msg.username}</span>
                {msg.time && (
                  <span className="place-chat-time">{formatCommentTime(msg.time)}</span>
                )}
              </div>
              <p className="place-chat-text">{msg.text}</p>
            </div>
          ))
        )}
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
