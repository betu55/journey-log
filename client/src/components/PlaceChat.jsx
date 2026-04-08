import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

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
      text,
    });

    setText("");
  }

  return (
    <div className="place-chat">
      <h3>Comments</h3>

      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default PlaceChat;