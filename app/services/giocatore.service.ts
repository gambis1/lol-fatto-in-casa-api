import Partita from "../models/partita.model";
import Giocatore, { IGiocatore } from "../models/giocatore.model";
import { Request, Response } from "express";
import { generateIdGiocatore } from "../services/partita.service";

export const getGiocatori = async (req: Request, res: Response) => {
  try {
    let item = await Partita.findOne({ id_partita: req.params.id_partita }).exec();
    if (!item) {
      res.status(404).send({ message: "Giocatore non trovato" });
      return;
    }
    res.send(item.giocatori);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

export const getGiocatore = async (req: Request, res: Response) => {
  try {
    let item = await Partita.findOne({ id_partita: req.params.id_partita }).exec();
    if (!item) {
      res.status(404).send({ message: "Partita non trovata" });
      return;
    }
    let giocatore = item.giocatori.find((g: IGiocatore) => g.identificativo == req.params.id_giocatore);
    res.send(giocatore);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

export const createGiocatore = async (req: Request, res: Response) => {
  try {
    let item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    if (!item) throw { message: "Partita non trovata. Inserire il codice della partita corretto." };
    let _req = req.body;
    let giocatore = new Giocatore({
      nome: _req.nome,
      identificativo: generateIdGiocatore(),
      ruolo: null,
      in_vita: true,
      voti: []
    });
    item.giocatori.push(giocatore);
    await item.save();
    res.send({ id_giocatore: giocatore.identificativo });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
