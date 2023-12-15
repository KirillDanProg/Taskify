import React, { FC, useState } from 'react';
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableField } from "components/EditableField/EditableField";
import { RemoveCircleOutline } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import styles from "./Todo.module.scss"
import styled from "styled-components";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
    useDeleteTodolistMutation,
    useUpdateTodoTitleMutation
} from "../../todoApi";
import { TodolistType } from "../../todoSlice";
import { useAddTaskMutation, useFetchTasksQuery } from "../../../tasks/tasksApi";
import { Tasks } from "features/tasks/ui/Tasks";

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
    console.log("todo rendered");

    const [expended, setExpended] = useState(false)
    const [removeTodolist] = useDeleteTodolistMutation()
    const [updateTodoTitle] = useUpdateTodoTitleMutation()
    const { data = [] } = useFetchTasksQuery({ todolistId: props.id })
    const [addTask] = useAddTaskMutation()
    const status = props.isLoading || false

    const expandHandler = () => {
        setExpended(!expended)
    }
    const removeTodolistHandler = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation()
        await removeTodolist(props.id)
    }
    const AddTaskHandler = async (title: string) => {
        await addTask({ todolistId: props.id, title })
    }
    const changeTodoTitleHandler = async (value: string) => {
        await updateTodoTitle({ todolistId: props.id, title: value })
    }

    return (
        <TodoBox>
            {
                status
                    ? "...loading"
                    : <Accordion onChange={expandHandler} expanded={expended} sx={{ all: "unset" }}>
                        <AccordionSummary expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <>
                                <EditableField value={props.title} callback={changeTodoTitleHandler}>
                                    <h3>{props.title}</h3>
                                </EditableField>
                                <div className={styles.removeIcon}>
                                    <RemoveCircleOutline onClick={removeTodolistHandler} />
                                </div>
                            </>
                        </AccordionSummary>
                        <AccordionDetails>
                            <>
                                <AddItemForm callback={AddTaskHandler} placeholder={"add task"} />
                                {
                                    data.length > 0
                                        ? <Tasks tasks={data} status={props.entityStatus} />
                                        : ""
                                }
                            </>
                        </AccordionDetails>
                    </Accordion>
            }
        </TodoBox>
    );
};

