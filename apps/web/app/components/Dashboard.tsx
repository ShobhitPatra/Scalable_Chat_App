"use client";
import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import useSendMessage from "../hooks/useSendMessage";

const Dashboard = () => {
  const [textInput, setTextInput] = useState("");
  const { messages, socket } = useSocket() || { socket: null, messages: [] };
  const sendMessage = useSendMessage();
  const onclickHandler = (e: React.FormEvent) => {
  
    sendMessage(textInput);
    setTextInput("");
  };
  return (
    <>
      <div className="h-screen bg-slate-950 flex justify-center items-center ">
        <div className="bg-slate-900 flex-col min-w-96 min-h-96 rounded-md">
          <div className="bg-slate-600 min-h-80 rounded-t-md">
            {messages.map((message) => (
              <div>{JSON.stringify(message)}</div>
            ))}
          </div>

          <div className="m-2 p-2 flex gap-2">
            <input
              type="text"
              placeholder="Type here"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-outline" onClick={onclickHandler}>
              send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
