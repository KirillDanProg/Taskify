import React, {FC, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../Todo.module.scss"
import {useAppDispatch} from "../../../../../hooks/reduxHooks";
import {Skeleton} from "@mui/material";
import {EditableField} from "../../../../EditableField/EditableField";
import {deleteTaskTC, TaskType, updateTaskTC} from "../../../../../state/reducers/taskReducer/tasks-reducer";
import {AppStatusType} from "../../../../../state/reducers/app-reducer/app-reducer";

type TaskPropsType = TaskType & { entityStatus: AppStatusType }

export const Task: FC<TaskPropsType> = (props) => {

    const taskStatus = props.entityStatus
    const dispatch = useAppDispatch()
    const [isEdit, setEdit] = useState(false)

    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(props.todoListId, props.id))
    }

    const changeValueHandler = (newValue: string) => {
        setEdit(false)
        dispatch(updateTaskTC(props.todoListId, props.id, {title: newValue}))
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
                    <DeleteIcon sx={{color: "#9700006b"}}
                                onClick={deleteTaskHandler}
                    />
                </div>
            </div>
    )

};

