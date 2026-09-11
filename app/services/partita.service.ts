import Partita from "../models/partita.model";
import { Request, Response } from "express";

const configTimer = {
  m: 60,
  h: 3600
};

export const getPartita = async (req: Request, res: Response) => {
  try {
    let item = await Partita.findOne({ id_partita: req.params.id_partita }).exec();
    res.send({ partita: item, esito: true, errori: [] });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const item = await Partita.create({
      id_partita: generateIdPartita(),
      fine_partita: false,
      timer: calcoloTimer(req.body.timerSelezionato),
      timerSelezionato: req.body.timerSelezionato,
      numeroMaxAmmonizioni: req.body.numeroMaxAmmonizioni,
      azioneAttiva: {
        nome: "",
        descrizione: ""
      },
      giocatori: req.body.giocatori.map((nome: string) => ({
          identificativo: generateIdGiocatore(),
          nome,
          ammonizioni: 0,
          espulso: false
      }))
    });

    res.send({ id_partita: item.id_partita, esito: true, errori: [] });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const generateIdPartita = () => {
  let length = 5,
    charset = "abcdefghijklmnopqrstuvwxyz0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const generateIdGiocatore = () => {
  let length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const calcoloTimer = (timerSelezionato: string) => {
  let timer: number;
  const splitTimer = timerSelezionato.split("-");
  timer = parseInt(splitTimer[0]) * configTimer[splitTimer[1] as keyof typeof configTimer];
  return timer;
};

export const update = async (req: Request, res: Response) => {
  try {
    let item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    const body = req.body;
    if (!item) {
      res.status(404).send({ message: "Partita non trovata" });
      return;
    }
    item.fine_partita = body.fine_partita;
    item.timer = body.timer;
    item.azioneAttiva = body.azioneAttiva;
    for (let i = 0; i < item.giocatori.length; i++) {
      let giocatore = item.giocatori[i];
      for (let j = 0; j < body.giocatori.length; j++) {
        if (giocatore.identificativo == body.giocatori[j].identificativo) {
          giocatore.ammonizioni = body.giocatori[j].ammonizioni;
          giocatore.espulso = body.giocatori[j].espulso;
        }
      }
    }

    let dati = await item.save();
    res.send({ partita: dati, esito: true, errori: [] });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

export const deletePartita = async (req: Request, res: Response) => {
  try {
    await Partita.deleteOne({ id_partita: req.params.id_partita }).exec();
    res.send({ fine_partita: true });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
