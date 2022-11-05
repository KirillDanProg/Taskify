import React, {FC} from 'react';
import {TaskType} from "../../../../../state/reducers/taskReducer/tasks-reducer";
import {Task} from "./Task";

type TasksPropsType = {
    tasks: TaskType[]
}
export const Tasks:FC<TasksPropsType> = ({tasks}) => {
    return (
        <>
            {
                tasks?.map(task => <Task key={task.id} {...task}/>)
            }
        </>
    );
};

