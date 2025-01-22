'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  bootstrap({ strapi }) {
    let { Server } = require('socket.io');
    
    let io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "https://quick-chat-frontend-a8cz.vercel.app",
        methods: ["POST", "GET"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      // console.log("A user connected:", socket.id);

      socket.on("user-msg", (msgs) => {
        // console.log("Message received:", msgs);
        socket.emit("message", msgs);
      });

      socket.on("disconnect", () => {
        // console.log("A user disconnected:", socket.id);
      });
    });

    strapi.io = io;
  },
};
