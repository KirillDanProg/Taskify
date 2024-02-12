import { FC, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "features/todos/ui/todo/Todo.module.scss";
import { Skeleton } from "@mui/material";
import { EditableField } from "components/EditableField/EditableField";
import { StatusType } from "common/app/appSlice";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "features/tasks/tasksApi";
import { TaskType } from "features/tasks/taskSlice";

type TaskPropsType = { task: TaskType } & { entityStatus: StatusType };
export const Task: FC<TaskPropsType> = ({ task, entityStatus }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const deleteTaskHandler = async () => {
    await deleteTask({ todolistId: task.todoListId, taskId: task.id });
  };

  const changeValueHandler = (newValue: string) => {
    const data = {
      todolistId: task.todoListId,
      taskId: task.id,
      updatedTask: { ...task, title: newValue },
    };
    updateTask(data);
  };

  return (
    <div className={styles.taskBox}>
      <EditableField value={task.title} callback={changeValueHandler}>
        <div className={styles.title}>{task.title}</div>
      </EditableField>
      <DeleteIcon
        sx={{ color: "#9700006b", cursor: "pointer" }}
        onClick={deleteTaskHandler}
      />
    </div>
  );
};
