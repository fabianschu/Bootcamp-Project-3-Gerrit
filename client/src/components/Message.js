import React from "react";

const Message = props => {
  let { username, content, created_at, userId } = props.message;
  created_at = created_at.slice(11, 16);

  const generalStyle = {
    backgroundColor: "white",
    margin: "10px 0 10px 0",
    width: "80vw"
  };

  const ownStyle = {
    backgroundColor: "yellow",
    margin: "10px 0 10px 0",
    width: "80vw",
    alignSelf: "flex-end"
  };

  return (
    <>
      {props.user._id === userId ? (
        <div className="own-message">
          <div className="own-message-body">
            <a href={`/profile/${props.user._id}`}>
              <p className="username">{username}</p>
            </a>
            <p className="message-content">{content}</p>
            <p className="message-timestamp">{created_at}</p>
          </div>
          <div className="arrow-right"></div>
        </div>
      ) : (
        <div className="other-message">
          <div className="arrow-left"></div>
          <div className="other-message-body">
            <a href={`/profile/${userId}`}>
              <p className="username">{username}</p>
            </a>
            <p className="message-content">{content}</p>
            <p className="message-timestamp">{created_at}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
