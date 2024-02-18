import React, { FC } from "react";
import { Task } from "./task/Task";
import { StatusType } from "../../../app/appSlice";
import { TaskType } from "../types";

type TasksPropsType = {
  tasks: TaskType[];
  status: StatusType;
};

export const Tasks: FC<TasksPropsType> = ({ tasks, status }) => {
  return (
    <>
      {tasks?.map((task) => (
        <Task entityStatus={status} key={task.id} task={task} />
      ))}
    </>
  );
};
