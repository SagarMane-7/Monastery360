import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setChat([
        ...chat,
        { role: "You", content: input },
        { role: "Monastery360", content: data.reply },
      ]);
    } catch (error) {
      setChat([
        ...chat,
        { role: "You", content: input },
        { role: "Monastery360", content: "⚠️ Server not responding" },
      ]);
    }

    setInput("");
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          color: "#00CC99",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          border:"2px solid  #cc6e2e",
          zIndex: 1000,
          fontSize: "28px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/assets/Home/logo.png" style={{height:"60px",width:"60px"}}></img>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "450px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
            fontSize: "18px",
          }}
        >
          {/* Optional image at the top */}
          
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            {chat.map((msg, i) => (
              <p
                key={i}
                style={{
                  textAlign: msg.role === "You" ? "right" : "left",
                  margin: "5px 0",
                  lineHeight: "1.4",
                }}
              >
                <b style={{ color: "#cc6e2e" }}>{msg.role}:</b>{" "}
                <span style={{ color: "#454545" }}>{msg.content}</span>
              </p>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                fontSize: "16px",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's on your mind? Ask me about Sikkim!"
            />
            <button
              style={{
                padding: "10px",
                border: "none",
                backgroundColor: "#cc6e2e",
                color: "#ffffff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
