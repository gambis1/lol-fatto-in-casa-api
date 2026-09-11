import Configurazioni from "../models/configurazioni.model";
import { Request, Response } from "express";

export const getConfigurazioni = async (req: Request, res: Response): Promise<void> => {
  try {
    let item = await Configurazioni.findOne().exec();
    let response = {
      esito: true,
      errori: [],
      configurazioni: item
    };
    res.send(response);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};