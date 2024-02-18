import { StatusType } from "app/appSlice";

export type FilterValuesType = "active" | "completed" | "all";

export type TodolistType = {
  id: string;
  title: string;
  // "addedDate": string
  // "order": number,
  // filter: FilterValuesType,
  entityStatus: StatusType;
  isLoading?: boolean;
};
