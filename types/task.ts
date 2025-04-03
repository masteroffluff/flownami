import { UUID } from "node:crypto";

export type Task = {
  name: string;
  id:UUID;
};
