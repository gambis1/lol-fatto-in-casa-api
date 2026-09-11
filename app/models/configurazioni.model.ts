import mongoose, { Schema, Model } from "mongoose";

export interface ITempiDiGioco {
  label: string;
  value: string;
}

export const TempiDiGiocoSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

export interface IConfigurazioni {
  numeroMinGiocatori: number,
  numeroMaxGiocatori: number
  numeroMaxAmmonizioni: number,
  tempiDiGioco: ITempiDiGioco[]
}

const ConfigurazioniSchema: Schema = new Schema({
  numeroMinGiocatori: { type: Number, required: false },
  numeroMaxGiocatori: { type: Number, required: false },
  numeroMaxAmmonizioni: { type: Number, required: false },
  tempiDiGioco: [TempiDiGiocoSchema]
});

const Configurazioni: Model<IConfigurazioni> = mongoose.model<IConfigurazioni>("Configurazioni", ConfigurazioniSchema);

export default Configurazioni;
