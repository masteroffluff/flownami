import { UUID } from "node:crypto";

export type Task = {
  name: string;
  id: UUID;
  column: string;
};
export type Column = {
  name: string;
  tasks: Array<Task>;
};

export type TaskMap = Record<UUID, Task>;

export interface ColumnMap {
  [key: string]: Column;
}
