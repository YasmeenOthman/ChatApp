import React, { useEffect, useRef } from "react";

function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map((msg, index) => {
        return (
          <div key={index}>
            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
              <div className="content ">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />``
    </div>
  );
}

export default Messages;
