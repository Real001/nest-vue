import { Schema } from 'mongoose';
import {Date} from '../graphql.schema';

export const SettingIde = new Schema({
  user: String,
  lang: String,
  theme: String,
});

export const Codes = new Schema({
  user: String,
  code: String,
  name: String,
  result: String,
  lang: String,
  updatedAt: Date,
  createdAt: Date,
});