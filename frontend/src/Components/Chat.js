import React, {useState, useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import "../style/chat.css"
import {useParams} from "react-router";
let cryptoJS = require("crypto-js")


function Chat({socket}) {
    const params = useParams()
    const room = params.room
    const [messages, setMessages] = useState([])
    const username = localStorage.getItem("username")
    const [currentMessage, setCurrentMessage] = useState("")

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("received message")
            setMessages((list) => [...list, data]);
            console.log(messages)
        });
    }, [socket]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            let ciphertext = cryptoJS.AES.encrypt(JSON.stringify(currentMessage), 'my-secret-key@123').toString();

            const messageData = {
                room: room,
                author: username,
                message: ciphertext,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessages((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messages.map((messageContent, index) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                                key={index}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;