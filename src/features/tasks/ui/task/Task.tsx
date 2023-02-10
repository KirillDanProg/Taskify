import {FC, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "features/todos/ui/todo/Todo.module.scss"
import {useAppDispatch} from "hooks/reduxHooks";
import {Skeleton} from "@mui/material";
import {EditableField} from "components/EditableField/EditableField";
import { StatusType } from 'features/app/appSlice';
import { useDeleteTaskMutation } from 'features/tasks/tasksApi';
import { TaskType, updateTaskTC } from 'features/tasks/taskSlice';

type TaskPropsType = TaskType & { entityStatus: StatusType }

export const Task: FC<TaskPropsType> = (props) => {
    const [deleteTask] = useDeleteTaskMutation();

    const taskStatus = props.entityStatus
    const dispatch = useAppDispatch()
    const [isEdit, setEdit] = useState(false)

    const deleteTaskHandler = async () => {
        await deleteTask({todolistId: props.todoListId, taskId: props.id})
    }

    const changeValueHandler = (newValue: string) => {
        //todo: update task

        setEdit(false)
        const data = {
            todolistId: props.todoListId,
            taskId: props.id,
            model: {title: newValue}
        }
        dispatch(updateTaskTC(data))
    }

    return (
        taskStatus === "loading" ?
            <Skeleton variant="rectangular" className={styles.taskBox}/>
            :
            <div className={styles.taskBox}>
                {
                    <EditableField value={props.title} callback={changeValueHandler}>
                        <div className={styles.title}>{props.title}</div>
                    </EditableField>
                }
                <div>
                    <DeleteIcon sx={{color: "#9700006b", cursor: "pointer"}}
                                onClick={deleteTaskHandler}
                    />
                </div>
            </div>
    )

};

