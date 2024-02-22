import React, { useState } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableField } from "components/EditableField/EditableField";
import { RemoveCircleOutline, ExpandMore } from "@mui/icons-material";
import s from "./Todo.module.scss";
import commonStyles from "common/styles/commonStyles.module.scss";
import styled from "styled-components";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useDeleteTodolistMutation, useUpdateTodoTitleMutation } from "../../todoApi";
import { useAddTaskMutation, useFetchTasksQuery } from "../../../tasks/tasksApi";
import { Tasks } from "features/tasks/ui/Tasks";
import { type TodolistType } from "features/todos/types";

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
`;
type Props = TodolistType & { className: string };
export const Todo = ({ id, title, className }: Props) => {
  const [expended, setExpended] = useState(false);
  const [removeTodolist] = useDeleteTodolistMutation();
  const [updateTodoTitle] = useUpdateTodoTitleMutation();
  const { data = [] } = useFetchTasksQuery({ todolistId: id });
  const [addTask] = useAddTaskMutation();

  const expandHandler = () => {
    setExpended(!expended);
  };
  const removeTodolistHandler = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    void removeTodolist(id);
  };
  const addTaskHandler = async (title: string) => {
    void addTask({ todolistId: id, title });
  };
  const changeTodoTitleHandler = async (value: string) => {
    void updateTodoTitle({ todolistId: id, title: value });
  };

  return (
    <TodoBox className={className}>
      <Accordion onChange={expandHandler} expanded={expended} sx={{ all: "unset" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{
            focusVisible: `${s.customFocusVisible}`,
          }}
        >
          <>
            <EditableField initialValue={title} callback={changeTodoTitleHandler}>
              <h3 className={`${commonStyles.title} ${expended ? commonStyles.expended : ""}`}>
                {title}
              </h3>
            </EditableField>
            <div className={s.removeIcon}>
              <RemoveCircleOutline onClick={removeTodolistHandler} />
            </div>
          </>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <AddItemForm callback={addTaskHandler} placeholder={"add task"} />
            {<Tasks tasks={data} />}
          </>
        </AccordionDetails>
      </Accordion>
    </TodoBox>
  );
};

export default React.memo(Todo);
