import React, {FC, useEffect} from 'react';
import {Tasks} from "./task/Tasks";
import {AddItemForm} from "../../../AddItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {EditableField} from "../../../EditableField/EditableField";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./Todo.module.scss"
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {addTaskTC, fetchTasksTC} from "../../../../state/reducers/taskReducer/tasks-reducer";
import {
    deleteTodolistTC,
    DomainTodolistType,
    updateTodolistTC
} from "../../../../state/reducers/todolistReducer/todolists-reducer";

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
    width: 100%;
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
    const changeTodoTitleHandler = (value: string) => {
        dispatch(updateTodolistTC(props.id, value))
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
                        <EditableField value={props.title} callback={changeTodoTitleHandler}>
                            <h3>{props.title}</h3>
                        </EditableField>
                        <div className={styles.removeIcon}>
                            <RemoveCircleOutlineIcon onClick={removeTodolistHandler}/>
                        </div>
                    </>
                </AccordionSummary>

                <AccordionDetails>
                    <>
                        <AddItemForm callback={AddTaskHandler} placeholder={"add task"}/>
                        {tasks?.length > 0 ? <Tasks tasks={tasks} status={props.entityStatus}/> : ""}
                    </>
                </AccordionDetails>

            </Accordion>
        </TodoBox>
    );
};

