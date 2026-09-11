import mongoose, { Model, Schema } from "mongoose";
import { IGiocatore, GiocatoreSchema } from "./giocatore.model";

export interface IPartita extends Document {
  id_partita: string;
  fine_partita: boolean;
  timer: number;
  timerSelezionato: string;
  numeroMaxAmmonizioni: number;
  azioneAttiva: string;
  giocatori: IGiocatore[];
}

const PartitaSchema: Schema = new Schema({
  id_partita: { type: String, required: true },
  fine_partita: { type: Boolean, required: false },
  timer: { type: Number, required: false },
  timerSelezionato: { type: String, required: false },
  numeroMaxAmmonizioni: { type: Number, required: false },
  azioneAttiva: { type: String, required: false },
  giocatori: [GiocatoreSchema]
});

const Partita: Model<IPartita> = mongoose.model<IPartita>("Partita", PartitaSchema);

export default Partita;
