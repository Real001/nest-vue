export type ID = string;

export interface Header {
  host: string;
  origin: string;
  authorization: string;
  "user-agent": string
}