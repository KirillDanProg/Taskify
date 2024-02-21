import { Todo } from "./todo/Todo";
import { useLazyFetchTodoslistsQuery } from "../todoApi";
import s from "./Todolists.module.scss";
import { useSearchParams } from "react-router-dom";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { type TodolistType } from "features/todos/types";

export const Todolists = () => {
  const [fetchTodolists] = useLazyFetchTodoslistsQuery();

  let [items, setItems] = useState<TodolistType[]>([]);
  const [searchParams] = useSearchParams();
  const sort: string | null = searchParams.get("sort");
  const align: string | null = searchParams.get("align");

  items = [] as TodolistType[];
  useEffect(() => {
    void (async function () {
      const { data: todolists = [] } = await fetchTodolists();
      setItems(todolists);
    })();
  }, [fetchTodolists]);

  const sortedTodolists = sort
    ? items.toSorted((a: any, b: any) => {
        return sort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      })
    : items;

  const mappedTodolists = sortedTodolists.map((todo: TodolistType) => {
    const { id, title } = todo;
    return (
      <Reorder.Item key={id} value={todo}>
        <Todo key={id} title={title} id={id} isLoading={false} className={s.todolist} />
      </Reorder.Item>
    );
  });
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
};
