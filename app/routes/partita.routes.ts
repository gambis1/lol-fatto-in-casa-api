import { Router } from "express";
import { getPartita, deletePartita, create, update } from "../services/partita.service";

const router = Router();

router.get("/:id_partita", getPartita);

router.post("/", create);

router.put("/", update);

router.delete("/:id_partita", deletePartita);

export default router;