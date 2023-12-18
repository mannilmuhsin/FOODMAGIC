import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPaperPlane,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import { MessageBox, MessageList, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import Navbar from "../Navbar/Navbar";

function NewChat() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Dummy data for chat messages
  const messages = [
    {
      position: "left",
      type: "text",
      text: "Hello!",
      date: new Date(),
      avatar: "https://placekitten.com/50/52", // Replace with actual avatar URL
      title: "John Doe", // Replace with actual username
    },
    {
      position: "right",
      type: "text",
      text: "Hi there!",
      date: new Date(),
      avatar: "https://placekitten.com/50/53", // Replace with actual avatar URL
      title: "You", // Replace with actual username
    },
    {
      position: "left",
      type: "text",
      text: "How are you?",
      date: new Date(),
      avatar: "https://placekitten.com/50/54", // Replace with actual avatar URL
      title: "John Doe", // Replace with actual username
    },
    // Add more messages as needed
  ];

  // Dummy data for groups
  const groups = [
    {
      id: 1,
      title: "Group 1",
      lastMessage: "How are you doing?",
      profilePicture: "https://placekitten.com/50/50", // Replace with actual profile picture URL
    },
    {
      id: 2,
      title: "Group 2",
      lastMessage: "Ready for our meeting?",
      profilePicture: "https://placekitten.com/50/51",
    },
    // Add more groups as needed
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed for md and lg screens) */}
      <div className="hidden md:block lg:block w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-bold mb-4">Groups</h2>
        {groups.map((group) => (
          <div key={group.id} className="flex items-center mb-3">
            <img
              src={group.profilePicture}
              alt="Group Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold">{group.title}</div>
              <div className="text-sm text-gray-500">{group.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="md:hidden lg:hidden">
          {/* Toggle Button (visible on smaller screens) */}
          <button
            className="p-2 bg-gray-300"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide" : "Show"} Sidebar
          </button>

          {/* Toggleable Sidebar (visible on smaller screens) */}
          <div className={showSidebar ? "block" : "hidden"}>
            <div className="w-full p-4 bg-gray-200">
              <h2 className="text-xl font-bold mb-4">Groups</h2>
              {groups.map((group) => (
                <div key={group.id} className="flex items-center mb-3">
                  <img
                    src={group.profilePicture}
                    alt="Group Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <div className="font-semibold">{group.title}</div>
                    <div className="text-sm text-gray-500">
                      {group.lastMessage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-300 flex-1 overflow-y-auto">
          {/* Display chat messages here */}
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={messages.map((message) => ({
              ...message,
              title: message.title || "Unknown", // Default username if not provided
            }))}
          />
        </div>

        {/* Input Box */}
        <div className="p-4">
          <Input
            placeholder="Type here..."
            multiline={true}
            rightButtons={[
              <button className="bg-green-500 text-white px-4 py-3 rounded mr-2">
                <FontAwesomeIcon icon={faFileVideo} />
              </button>,
              <button className="bg-red-500 text-white px-4 py-3 rounded mr-2">
                <FontAwesomeIcon icon={faMicrophone} />
              </button>,
              <button className="bg-blue-500 text-white px-4 py-3 rounded">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default NewChat;
