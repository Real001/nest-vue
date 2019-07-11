import { Schema } from 'mongoose';

export const SettingIde = new Schema({
  user: String,
  lang: String,
  theme: String,
});