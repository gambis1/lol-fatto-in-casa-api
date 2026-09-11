import mongoose, { Schema, Model } from "mongoose";

export interface IGiocatore {
  identificativo: string;
  nome: string;
  ammonizioni: number;
  espulso: boolean;
}

export const GiocatoreSchema: Schema = new Schema<IGiocatore>(
  {
    identificativo: { type: String, required: false },
    nome: { type: String, required: false },
    ammonizioni: { type: Number, required: false },
    espulso: { type: Boolean, required: false }
  },
  { _id: false }
);

const Giocatore: Model<IGiocatore> = mongoose.model<IGiocatore>("Giocatore", GiocatoreSchema);

export default Giocatore;
