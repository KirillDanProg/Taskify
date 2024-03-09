import { Todo } from "./todo/Todo";
import { useFetchTodoslistsQuery } from "../todoApi";
import s from "./Todolists.module.scss";
import { useSearchParams } from "react-router-dom";
import { Reorder } from "framer-motion";
import { useEffect, memo, useState } from "react";
import { type TodolistType } from "features/todos/types";
import useWindowWidth from "common/hooks/useWindowWidth";
import React from "react";
import useDebugHook from "common/hooks/debugHook";

const sortTodolists = (items: TodolistType[], sort: string | null): TodolistType[] => {
  return sort
    ? [...items].sort((a: any, b: any) => {
        return sort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      })
    : items;
};

type Props = {
  todolists: TodolistType[];
};
export const Todolists = memo(({ todolists }: Props) => {
  let [items, setItems] = useState<TodolistType[]>(todolists);
  const [searchParams] = useSearchParams();
  const isMobile = useWindowWidth() < 640;
  const sort: string | null = searchParams.get("sort");
  const align: string | null = searchParams.get("align");

  useEffect(() => {
    setItems(todolists);
  }, [todolists]);

  const sortedTodolists = sortTodolists(items, sort);
  const mappedTodolists = sortedTodolists.map((todo: TodolistType) => {
    const { id, title } = todo;
    return isMobile ? (
      <Reorder.Item key={id} value={todo}>
        <Todo title={title} id={id} isLoading={false} className={s.todolist} />
      </Reorder.Item>
    ) : (
      <Todo key={id} title={title} id={id} isLoading={false} className={s.todolist} />
    );
  });

  if (isMobile) {
    return (
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={newOrder => {
          setItems(newOrder);
        }}
      >
        <div className={`${s.mainContentBox} ${align ? s[align] : ""}`}>{mappedTodolists}</div>
      </Reorder.Group>
    );
  }

  return <div className={`${s.mainContentBox} ${align ? s[align] : ""}`}>{mappedTodolists}</div>;
});

Todolists.displayName = "Todolists";
