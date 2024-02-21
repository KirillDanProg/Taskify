import React, { type FC } from "react";
import { Task } from "./task/Task";
import { type TaskType } from "../types";

interface TasksPropsType {
  tasks: TaskType[];
}

export const Tasks: FC<TasksPropsType> = ({ tasks }) => {
  return <>{tasks?.map(task => <Task key={task.id} task={task} />)}</>;
};
