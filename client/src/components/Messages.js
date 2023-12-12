import React from "react";

function Messages({ messages }) {
  console.log(messages);
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
    </div>
  );
}

export default Messages;
