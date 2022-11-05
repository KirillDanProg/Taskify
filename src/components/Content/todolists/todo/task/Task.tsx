import React, {FC} from 'react';
import { deleteTaskTC, TaskType} from "../../../../../state/reducers/taskReducer/tasks-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../Todo.module.scss"
import {useAppDispatch} from "../../../../../hooks/reduxHooks";


export const Task: FC<TaskType> = (props) => {

    const dispatch = useAppDispatch()
    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(props.todoListId, props.id))
    }
    return (
        <div className={styles.taskBox}>
            <div className={styles.title}>{props.title}</div>
            <div>
                <DeleteIcon sx={{color: "#9700006b"}}
                            onClick={deleteTaskHandler}/>
            </div>
        </div>
    );

};

