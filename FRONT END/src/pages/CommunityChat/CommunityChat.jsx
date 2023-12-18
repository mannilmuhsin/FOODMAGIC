import React, { useEffect, useState } from "react";
import { ZIMKitManager, Common } from "@zegocloud/zimkit-react";
import "@zegocloud/zimkit-react/index.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../context/authReducer";

function CommunityChat() {
  const id = Math.floor(Math.random() * 1000);
  const user = useSelector(selectCurrentUser)

  const [state, setstate] = useState({
    appConfig: {
      appID: 366623839, // The AppID you get from the ZEGOCLOUD admin console.
      serverSecret: "b82a70b0bdff1ec21f108d964da4ea86", // The serverSecret you get from ZEGOCLOUD Admin Console.
    },
    // The userID and userName is a strings of 1 to 32 characters.
    // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
    userInfo: {
      // Your ID as a user.
      userID: user,
      // Your name as a user.
      userName: user,
      // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
      userAvatarUrl: "",
    },
  });

  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        state.appConfig.appID,
        state.appConfig.serverSecret,
        state.userInfo.userID
      );
      await zimKit.init(state.appConfig.appID);
      await zimKit.connectUser(state.userInfo, token);
    };

    init();
  }, []);

  

  return (
    <div>
      
      hello{state.userInfo.userID}
      <Common>
      </Common>
    </div>
  );
}

export default CommunityChat;
