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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";

const TodoBox = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
  margin-bottom: 16px;
  background-color: ${props => props.theme.taskBG};
  border-radius: 20px;
  box-shadow: 2px 2px 4px lightgray;

  & h3 {
    text-align: center;

  }

  @media (max-width: 500px) {
    width: 90%;
  }
`
export const Todo: FC<DomainTodolistType> = (props) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[props.id])
    const removeTodolistHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation()
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
            <Accordion sx={{all: "unset"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <>
                        <h3>{props.title}</h3>

                        <div className={styles.removeIcon}>
                            <RemoveCircleOutlineIcon onClick={removeTodolistHandler}/>
                        </div>
                    </>
                </AccordionSummary>
                <AccordionDetails>
                    <>
                        <AddItemForm callback={AddTaskHandler} placeholder={"add task"}/>
                        {tasks?.length > 0 ? <Tasks tasks={tasks} status={props.entityStatus}/> : " no  tasks"}
                    </>

                </AccordionDetails>
            </Accordion>
        </TodoBox>
    );
};

