import React, {FC, useState} from 'react';
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {EditableField} from "components/EditableField/EditableField";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./Todo.module.scss"
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
    useDeleteTodolistMutation,
    useUpdateTodoTitleMutation
} from "../../todoApi";
import {TodolistType} from "../../todoSlice";
import {useAddTaskMutation, useFetchTasksQuery} from "../../../tasks/tasksApi";
import {useAppSelector} from "hooks/reduxHooks";
import {selectCurrentStatus} from "../../../selectors";
import {Tasks} from "features/tasks/task/Tasks";

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

export const Todo: FC<TodolistType> = (props) => {
    const [expended, setExpended] = useState(false)

    const expandHandler = () => {
        setExpended(!expended)
    }

    const [removeTodolist] = useDeleteTodolistMutation()
    const [updateTodoTitle] = useUpdateTodoTitleMutation()

    const status = useAppSelector(selectCurrentStatus)

    const {data = []} = useFetchTasksQuery({todolistId: props.id})

    const [addTask] = useAddTaskMutation()


    const removeTodolistHandler = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation()
        await removeTodolist(props.id)
    }

    const AddTaskHandler = async (title: string) => {
        await addTask({todolistId: props.id, title})
    }

    const changeTodoTitleHandler = async (value: string) => {
        await updateTodoTitle({todolistId: props.id, title: value})
    }

    return (
        <TodoBox>
            {
                status === "loading"
                    ? "...loging"
                    : <Accordion onChange={expandHandler} expanded={expended} sx={{all: "unset"}}>

                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header">
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
                                {
                                    data.length > 0
                                        ? <Tasks tasks={data} status={props.entityStatus}/>
                                        : ""
                                }
                            </>
                        </AccordionDetails>

                    </Accordion>
            }

        </TodoBox>
    );
};

