import React, { FC, useState} from 'react';
import {deleteTaskTC, TaskType, updateTaskTC} from "../../../../../state/reducers/taskReducer/tasks-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../Todo.module.scss"
import {useAppDispatch} from "../../../../../hooks/reduxHooks";
import {Skeleton} from "@mui/material";
import {AppStatusType} from "../../../../../state/reducers/app-reducer/app-reducer";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {EditableField} from "../../../../EditableField/EditableField";

type TaskPropsType = TaskType & { entityStatus: AppStatusType }

export const Task: FC<TaskPropsType> = (props) => {

    const taskStatus = props.entityStatus
    const dispatch = useAppDispatch()
    const [isEdit, setEdit] = useState(false)

    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(props.todoListId, props.id))
    }

    const editModeHandler = () => {
        setEdit(true)
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
                    isEdit ?
                       <EditableField value={props.title} callback={changeValueHandler}/>
                        :
                        <>
                            <EditOutlinedIcon onClick={editModeHandler}/>
                            <div className={styles.title}>{props.title}</div>
                        </>
                }

                <div>
                    <DeleteIcon sx={{color: "#9700006b"}}
                                onClick={deleteTaskHandler}
                    />
                </div>

            </div>
    )

};

