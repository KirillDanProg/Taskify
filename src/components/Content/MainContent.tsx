import styled from "styled-components";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Todolists } from "../../features/todos/ui/Todolists";
import { useAddTodolistMutation, useFetchTodoslistsQuery } from "../../features/todos/todoApi";
import { useMemo, memo } from "react";
import useDebugHook from "common/hooks/debugHook";

const Wrap = styled.div`
  padding-top: 80px;
  color: ${props => props.theme.mainColor};
`;

export const MainContent = () => {
  const [addTodo] = useAddTodolistMutation();
  const { data = [] } = useFetchTodoslistsQuery();

  const addTodolistHandler = (title: string) => {
    addTodo(title);
  };

  const memoizedTodolists = useMemo(() => data, [data]);

  return (
    <Wrap>
      <AddItemForm callback={addTodolistHandler} placeholder={"add todolist..."} />
      <Todolists todolists={memoizedTodolists} />
    </Wrap>
  );
};
