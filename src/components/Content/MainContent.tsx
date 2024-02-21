import styled from "styled-components";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Todolists } from "../../features/todos/ui/Todolists";
import { useAddTodolistMutation } from "../../features/todos/todoApi";
import { Button } from "@mui/material";

const Wrap = styled.div`
  padding-top: 80px;
  color: ${props => props.theme.mainColor};
`;

export const MainContent = () => {
  // todo: look data of request
  const [addTodo] = useAddTodolistMutation();

  const addTodolistHandler = (title: string) => {
    addTodo(title);
  };

  return (
    <Wrap>
      <AddItemForm callback={addTodolistHandler} placeholder={"add todolist..."} />
      <Todolists />
    </Wrap>
  );
};
