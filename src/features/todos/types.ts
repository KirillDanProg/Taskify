export type FilterValuesType = "active" | "completed" | "all";

export interface TodolistType {
  id: string;
  title: string;
  addedDate?: string;
  order?: number;
  // filter: FilterValuesType,
  // entityStatus: StatusType;
  isLoading?: boolean;
}
