import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function VerificationMessages() {
  const { id: verificationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const token = localStorage.getItem("accessToken");
  const currentUserName = `${localStorage.getItem("firstName") || ""} ${
    localStorage.getItem("lastName") || ""
  }`.trim();

  // Fetch messages
  const fetchMessages = async () => {
    if (!verificationId) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/verifications/verifications/${verificationId}/messages/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let data = Array.isArray(res.data) ? res.data : [];
      data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/verifications/verifications/${verificationId}/messages/send/`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => {
        const updated = [...prev, res.data];
        updated.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return updated;
      });

      setNewMessage("");
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial fetch and refresh every 5s
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [verificationId]);

  if (loading) return <div>Loading chat...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      {/* Chat Header */}
      <div
        className="py-2 px-3"
        style={{
          backgroundColor: "#075E54",
          color: "#fff",
          borderRadius: "10px 10px 0 0",
          flexShrink: 0,
        }}
      >
        <h6 className="mb-0">Verification Chat</h6>
        <small>Chat with Sale Person</small>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#ECE5DD",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 && (
          <p className="text-muted text-center mt-3">No messages yet.</p>
        )}

        {messages.map((msg) => {
          const isCurrentUser = msg.sender_name === currentUserName;
          return (
            <div
              key={msg.id}
              className={`d-flex mb-2 ${
                isCurrentUser ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                style={{
                  backgroundColor: isCurrentUser ? "#DCF8C6" : "#FFF",
                  color: "#000",
                  padding: "10px 14px",
                  borderRadius: "20px",
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="fw-bold small mb-1">{msg.sender_name}</div>
                <div>{msg.message}</div>
                <div
                  className="text-end mt-1"
                  style={{ fontSize: "0.7rem", color: "#555" }}
                >
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Message Input */}
      <div
        className="d-flex p-2"
        style={{
          backgroundColor: "#FFF",
          borderTop: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ borderRadius: "20px", padding: "10px 14px" }}
        />
        <button
          className="btn"
          onClick={sendMessage}
          style={{
            backgroundColor: "#075E54",
            color: "#fff",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
