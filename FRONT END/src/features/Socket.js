import { io } from "socket.io-client";

export const socket = io("https://foodmagic.mannilmuhsin.shop", {
  // path: "/socket.io",
  // transports: ["websocket", "polling"],
});
