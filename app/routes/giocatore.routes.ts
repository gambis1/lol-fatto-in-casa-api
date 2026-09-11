import { Router } from "express";
import { getGiocatori, getGiocatore, createGiocatore } from "../services/giocatore.service";

const router = Router();

router.get("/api/giocatore/:id_partita", getGiocatori);

router.get("/api/giocatore/:id_partita/:id_giocatore", getGiocatore);

router.post("/api/giocatore", createGiocatore);

export default router;
