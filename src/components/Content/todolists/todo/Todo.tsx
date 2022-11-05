import React, {FC, useEffect} from 'react';
import {
    deleteTodolistTC,
    DomainTodolistType
} from "../../../../state/reducers/todolistReducer/todolists-reducer";
import styled from "styled-components";
import {AddItemForm} from "../../../AddItemForm/AddItemForm";
import styles from "./Todo.module.scss"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {addTaskTC, fetchTasksTC} from "../../../../state/reducers/taskReducer/tasks-reducer";
import {Tasks} from "./task/Tasks";

const TodoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 16px;
  padding: 15px 0;
  background-color: ${props => props.theme.taskBG};
  border-radius: 20px;
  box-shadow: 2px 2px 4px lightgray;

  & h3 {
    text-align: center;

  }
`
export const Todo: FC<DomainTodolistType> = (props) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[props.id])
    const removeTodolistHandler = () => {
        dispatch(deleteTodolistTC(props.id))
    }
    const AddTaskHandler = (title: string) => {
        dispatch(addTaskTC(props.id, title))
    }
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    return (
        <TodoBox>
            <h3>{props.title}</h3>
            <div className={styles.removeIcon}>
                <RemoveCircleOutlineIcon onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm callback={AddTaskHandler} placeholder={"add task"}/>
            <Tasks tasks={tasks}/>
        </TodoBox>
    );
};

