import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  auth,
  selectCurrentId,
  selectCurrentToken,
  selectCurrentUser,
} from "../../context/authReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socket } from "../../features/Socket";
import { ReactMic } from "react-mic";
import {
  faMicrophone,
  faPaperPlane,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import { MessageBox, MessageList, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import Navbar from "../Navbar/Navbar";
import {
  useGetCommunityByIdMutation,
  useGetFullCommunitysMutation,
} from "../../api/publicApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ChefNavbar from "../Navbar/ChefNavbar";

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [getCommunitys] = useGetFullCommunitysMutation();
  const [getCommunityById] = useGetCommunityByIdMutation();
  const [currentCommunity, setCurruntCommunity] = useState({});
  const [groups, setGroups] = useState([]);
  const user = useSelector(selectCurrentUser);
  const id = useSelector(selectCurrentId);
  const { role } = useSelector(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const inputRef = useRef(null);

  const handleInputMessage = (e) => {
    const inputValue = e.target.value;

    setMessage({
      text: inputValue,
      user,
      time: Date.now(),
      type: "text",
      groupId: currentCommunity?._id,
    });
  };

 

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await getCommunitys(id);
       
        setGroups(res.data.communitys);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    fetchCommunity();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
    if (Object.keys(currentCommunity).length !== 0) {

      if (!socket) {
        return;
      }
      socket.connect();
      socket.emit("setup", { room: currentCommunity.title });
      const handleChat = (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("chat", handleChat);
      return () => {
        socket.off("chat", handleChat);
        socket.disconnect();
      };
    }
  }, [currentCommunity]);

  const sendMessage = () => {
    try {
      if (message?.text?.trim()) {
        socket.emit("chat", { ...message });
      }
      setMessage({});
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // setNewFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({ dataURL: reader.result, type: file.type });
      };

      reader.readAsDataURL(file);
    }
  };

  const sendFile = () => {
    try {
      if (filePreview) {
        const data = {
          data: filePreview.dataURL,
          user,
          time: Date.now(),
          type: filePreview.type.startsWith("video/") ? "video" : "photo",
          groupId: currentCommunity?._id,
        };
        socket.emit("chat", { ...data });
      }
      setMessage({});
      setFilePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleAudioData = (data) => {
    if (data) {
      const file = new File([data], "audio_file.webm", {
        type: "audio/webm;codecs=opus",
      });
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        const audioContent = e.target.result;
        setAudioData(audioContent);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const sendVoice = () => {
    try {
      if (audioData) {
        const data = {
          data: audioData,
          user,
          time: Date.now(),
          type: "audio",
          groupId: currentCommunity?._id,
        };
        socket.emit("chat", { ...data });
      }
      setMessage({});
      setAudioData(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default Enter key behavior (e.g., newline in a textarea)
      if (filePreview !== null) {
        sendFile();
      } else if (message?.text?.trim()) {
        sendMessage();
      } else {
        sendVoice();
      }
    }
  };

  return (
    <>
      <div className="h-screen">
        {role[0] === 3000 ? (
          <ChefNavbar className=" fixed w-screen z-50" />
        ) : (
          <Navbar className=" fixed w-screen z-50" />
        )}
        <div className="flex h-full w-full">
          {/* Sidebar (fixed for md and lg screens) */}
          <div className="hidden md:block lg:block w-1/4 p-4 mt-20 bg-gray-600 overflow-y-scroll">
            <h2 className="text-xl font-bold mb-4">Groups</h2>
            {groups.map((group) => (
              <div
                key={group._id}
                 onClick={() => {
                        setCurruntCommunity(group);
                        setMessages(group?.messages)
                        // setShowSidebar(!showSidebar);
                      }}
                // onClick={() => setCurruntCommunity(group)}
                className={`flex cursor-pointer ${
                  group._id == currentCommunity._id
                    ? "bg-blue-300"
                    : "bg-gray-300"
                } rounded-sm p-2 items-center mb-3`}
              >
                <img
                  src={group.proImage}
                  alt="Group Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold">{group.title}</div>
                  <div className="text-sm text-gray-500">
                  Welcome to {group?.title} community
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col pt-12">
            <button
              className="p-2 pt-5 bg-red-400 md:hidden lg:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? "Hide" : "Show"} Groups
            </button>
            <div className="md:hidden lg:hidden">
              {/* Toggle Button (visible on smaller screens) */}

              {/* Toggleable Sidebar (visible on smaller screens) */}
              <div className={showSidebar ? "block" : "hidden"}>
                <div className="w-full p-4 bg-gray-200">
                  <h2 className="text-xl font-bold mb-4">Groups</h2>
                  {groups.map((group) => (
                    <div
                      key={group._id}
                      onClick={() => {
                        setCurruntCommunity(group);
                        setMessages(group?.messages)
                        setShowSidebar(!showSidebar);
                      }}
                      className={`flex cursor-pointer ${
                        group._id == currentCommunity._id
                          ? "bg-blue-400"
                          : "bg-gray-300"
                      } rounded-md p-2 items-center mb-3`}
                    >
                      <img
                        src={group.proImage}
                        alt="Group Profile"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div className="font-semibold">{group.title}</div>
                        <div className="text-sm text-gray-500">
                        Welcome to {group?.title} community
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:mt-8 bg-gray-300 flex-1 overflow-y-auto">
              {Object.keys(currentCommunity)?.length === 0 && (
                <div className="w-full h-full flex items-center justify-center ">
                  <h1 className="font-bold text-4xl">

                  seclect a group
                  </h1>
                </div>
              )}
              {messages?.map((message, index) => (
                <MessageBox
                  key={index}
                  position={message?.user == user ? "right" : "left"}
                  type={message?.type}
                  text={message?.type === "text" ? message?.text : undefined}
                  date={message?.time}
                  title={message?.user}
                  data={
                    message?.data
                      ? message?.type === "video"
                        ? {
                            videoURL: message?.data,
                            width: 300,
                            height: 300,
                            status: {
                              click: true,
                              loading: 0.5,
                              download: true,
                            },
                          }
                        : message?.type === "photo"
                        ? {
                            uri: message?.data,
                            width: 300,
                            height: 300,
                          }
                        : {
                            audioURL: message.data,
                          }
                      : null
                  }
                />
              ))}
            </div>

            {/* Input Box */}
            {Object.keys(currentCommunity)?.length !== 0 && (
              <div className="p-4">
                <div
                  className={`${
                    isRecording ? " flex justify-between h-16  " : "hidden"
                  }`}
                >
                  <ReactMic
                    record={isRecording}
                    onStop={(recordedData) =>
                      handleAudioData(recordedData?.blob)
                    }
                    className={`${
                      isRecording ? "block sound-wave sm:max-w-full max-w-64 " : "hidden"
                    }`}
                    strokeColor="#000000"
                    backgroundColor="#FF4081"
                  />
                  <button
                    className={`bg-${
                      isRecording ? "red" : "green"
                    }-500 text-white px-3 py-3 rounded ms-2 ${
                      isRecording ? "block sound-wave" : "hidden"
                    }`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                </div>
                {isRecording || audioData || filePreview ? (
                  <>
                    {filePreview && (
                      <div className="flex justify-between items-center">
                        {filePreview?.type.startsWith("video/") ? (
                          <video controls className="max-h-40 mr-2">
                            <source
                              src={filePreview?.dataURL}
                              type={filePreview?.type}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={filePreview?.dataURL}
                            alt="Preview"
                            className="max-h-40 mr-2"
                          />
                        )}
                        <div>
                          <button
                            className="bg-red-500 text-white px-4 py-3 rounded ml-2"
                            onClick={() => setFilePreview(null)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-blue-500 text-white px-4 py-3 rounded ml-2"
                            onClick={sendFile}
                          >
                            Send File
                          </button>
                        </div>
                      </div>
                    )}
                    {audioData && !isRecording && (
                      <div className="sm:flex justify-between ">
                        <audio className="ms-7" controls src={audioData} />
                        <div className="flex justify-center mt-3">
                          <button
                            className={`bg-${
                              isRecording ? "red" : "green"
                            }-500 text-white px-4 py-3 rounded mr-2`}
                            onClick={() => setIsRecording(!isRecording)}
                          >
                            {isRecording
                              ? "Stop Recording"
                              : "Start New"}
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-3 rounded ml-2"
                            onClick={() => setAudioData(null)}
                          >
                            cancel
                          </button>
                          <button
                            onClick={sendVoice}
                            className="bg-blue-500 text-white px-4 py-3 rounded ml-2"
                          >
                            Send 
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Input
                    placeholder="Type here..."
                    onChange={handleInputMessage}
                    referance={inputRef}
                    onKeyPress={handleKeyPress}
                    multiline={true}
                    rightButtons={[
                      <label className="bg-red-500 text-white px-4 py-3 rounded mr-2">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileInputChange}
                          key={1}
                          className="hidden"
                        />
                        <FontAwesomeIcon icon={faFileVideo} />
                      </label>,
                      <button
                        key={2}
                        className={`bg-${
                          isRecording ? "red" : "green"
                        }-500 text-white px-4 py-3 rounded mr-2`}
                        onClick={() => setIsRecording(!isRecording)}
                      >
                        <FontAwesomeIcon icon={faMicrophone} />
                      </button>,
                      <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-3 rounded"
                        key={3}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>,
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
