export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TOrderType = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
