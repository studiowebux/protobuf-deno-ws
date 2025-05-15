import { ChatMessage } from "./proto/message.ts";
import { Buffer } from "node:buffer";

Deno.serve({
  port: 8585,
}, (req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    console.info("🟢 Peer connected");
  });

  socket.addEventListener("message", async (event) => {
    const decoded = ChatMessage.decode(new Uint8Array(event.data));
    console.log("Server received:", decoded);
    const payload = {
      user: "Machine",
      text: "Bonjour!",
    };

    console.log("JSON Size", Buffer.from(JSON.stringify(payload)).byteLength);
    console.log(
      "Proto Size",
      ChatMessage.encode(ChatMessage.create(payload)).finish().byteLength,
    );

    // JSON Size 36
    // Proto Size 19

    socket.send(ChatMessage.encode(ChatMessage.create(payload)).finish());
  });

  socket.addEventListener("close", () => {
    console.info("🔴 Peer disconnected");
  });
  return response;
});
