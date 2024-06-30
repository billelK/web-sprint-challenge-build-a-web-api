const express = require('express');
const actionsRouters = require("./actions/actions-router")
const projectsRouters = require("./projects/projects-router")

const server = express();

server.use(express.json())
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", actionsRouters)
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", projectsRouters) 
// Do NOT `server.listen()` inside this file!

module.exports = server;
