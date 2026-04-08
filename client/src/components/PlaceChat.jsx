import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Button from "./Button";

function PlaceChat({ placeId, initialComments = [], isOpen }) {
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
    });

    return () => socket.disconnect();
  }, [placeId, isOpen]);

  function handleSend(e) {
    e.preventDefault();

    if (!text.trim() || !socketRef.current) return;

    socketRef.current.emit("send_msg", {
      placeId,
      text: text.trim(),
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
                {msg.time && <span className="place-chat-time">{msg.time}</span>}
              </div>
              <p className="place-chat-text">{msg.text}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="place-chat-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="place-chat-input"
        />
        <Button type="submit" variant="primary" width="fit">
          Send
        </Button>
      </form>
    </div>
  );
}

export default PlaceChat;