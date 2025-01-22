'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    let { Server } = require('socket.io')
    
    let io = new Server (strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["POST", "GET"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
    })

    io.on("connection", (socket)=>{
      // console.log("A user connected", socket.id)

      socket.on("user-msg", (msgs) => {
        // console.log("Broadcasting message:", msgs);
        socket.emit("message", msgs);
      })

      socket.on("disconnect", () => {
        // console.log("A user disconnected", socket.id)
      })
    })
    
    strapi.io = io
  },
};
