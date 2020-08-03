import { Schema, model, Document } from "mongoose";

const schema = new Schema({
  title: String,
  description: String,
  img: String,
  size: number,
  createdDate: Date,
  lastModified: Date,
});

interface IPhoto extends Document {
  title: string;
  description: string;
  img: string;
  size: number;
  createdDate: Date;
  lastModified: Date;
}

export default model<IPhoto>("Photo", schema);
