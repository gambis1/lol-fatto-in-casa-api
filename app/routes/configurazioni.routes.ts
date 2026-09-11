import { Router } from "express";
import { getConfigurazioni } from "../services/configurazione.service";

const router = Router();

router.get("/", getConfigurazioni);

export default router;