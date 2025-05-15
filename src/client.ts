import { ChatMessage } from "./proto/message.ts";

const ws = new WebSocket("ws://localhost:8585");

ws.binaryType = "arraybuffer";

// Send a message
ws.onopen = () => {
  const payload: ChatMessage = { user: "Alice", text: "Hello!" };
  ws.send(ChatMessage.encode(payload).finish());
};

// Receive a message
ws.onmessage = (event) => {
  const decoded = ChatMessage.decode(new Uint8Array(event.data));
  console.log("Received:", decoded);
};
