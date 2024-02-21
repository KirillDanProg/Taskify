import { type FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "features/todos/ui/todo/Todo.module.scss";
import { EditableField } from "components/EditableField/EditableField";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/tasks/tasksApi";
import { type TaskType } from "features/tasks/types";
import { Icon } from "common/components/icon/Icon";

interface TaskPropsType {
  task: TaskType;
}

export const Task: FC<TaskPropsType> = ({ task }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const deleteTaskHandler = async (): Promise<void> => {
    await deleteTask({ todolistId: task.todoListId, taskId: task.id });
  };

  const changeValueHandler = async (newValue: string): Promise<void> => {
    const data = {
      todolistId: task.todoListId,
      taskId: task.id,
      updatedTask: { ...task, title: newValue },
    };
    updateTask(data);
  };

  return (
    <div className={styles.taskBox}>
      <EditableField initialValue={task.title} callback={changeValueHandler} iconSide="right">
        <div className={styles.title}>{task.title}</div>
      </EditableField>
      <Icon>
        <DeleteIcon sx={{ color: "#9700006b" }} onClick={deleteTaskHandler} />
      </Icon>
    </div>
  );
};
