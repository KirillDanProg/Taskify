import React, {FC} from 'react';
import {TaskType} from "../../../../../state/reducers/taskReducer/tasks-reducer";
import {Task} from "./Task";
import {AppStatusType} from "../../../../../state/reducers/app-reducer/app-reducer";

type TasksPropsType = {
    tasks: TaskType[]
    status: AppStatusType
}
export const Tasks:FC<TasksPropsType> = ({tasks, status}) => {
    return (
        <>
            {
                tasks?.map(task => <Task entityStatus={status} key={task.id} {...task}/>)
            }
        </>
    );
};

