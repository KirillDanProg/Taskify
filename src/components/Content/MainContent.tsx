import React from 'react';
import styled from "styled-components";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Todolists } from "../../features/todos/ui/Todolists";
import { useAddTodolistMutation } from "../../features/todos/todoApi";

const Wrap = styled.div`
  color: ${(props) => props.theme.mainColor};
`

export const MainContent = () => {
    const [addTodo] = useAddTodolistMutation()

    const addTodolistHandler = (title: string) => {
        addTodo(title)
    }

    return (
        <Wrap>
            <AddItemForm callback={addTodolistHandler} placeholder={"Add todolist"} />
            <Todolists />
        </Wrap>
    );
};

