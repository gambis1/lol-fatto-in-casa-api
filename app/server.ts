import express from "express";
import http from "http";
const app = express();
app.use(express.static("public"));

import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "50mb" }));

import cors from "cors";
const corsOptions = {
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configuring the database
import dbConfig from "../mongodb.config.json";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

// Connecting to the database
//var env = process.env.NODE_ENV.trim();
const dbUrl = dbConfig.url_dev;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(() => {
    console.log("Could not connect to MongoDB.");
    process.exit();
  });

import partitaRoutes from "./routes/partita.routes"
import giocatoreRoutes from "./routes/giocatore.routes"
import configurazioniRoutes from "./routes/configurazioni.routes"

app.use("/api/partita", partitaRoutes);
app.use("/api/giocatore", giocatoreRoutes);
app.use("/api/configurazioni", configurazioniRoutes);

// Create a Server

const server = http.createServer(app);

import { WebSocketServer } from "ws";
const webSocket = new WebSocketServer({ server });
webSocket.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("Received:", Buffer.from(message as Buffer).toString("utf8"));
    // Echo del messaggio a tutti
    webSocket.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
const PORT: number = parseInt(process.env.PORT || "4000", 10);

server.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});