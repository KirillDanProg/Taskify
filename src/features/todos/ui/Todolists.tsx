import { Todo } from "./todo/Todo";
import { useFetchTodoslistsQuery } from "../todoApi";
import s from "./Todolists.module.scss";
import { useSearchParams } from "react-router-dom";

export const Todolists = () => {
  const { data: todolists = [] } = useFetchTodoslistsQuery();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const align = searchParams.get("align");
  const sortedTodolists = sort
    ? [...todolists].sort((a: any, b: any) => {
        return sort === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      })
    : todolists;

  const mappedTodolists = sortedTodolists.map(({ id, title, entityStatus }) => {
    return (
      <Todo
        key={id}
        title={title}
        id={id}
        isLoading={false}
        entityStatus={entityStatus}
        className={s.todolist}
      />
    );
  });

  return (
    <div className={`${s.mainContentBox} ${align ? s[align] : ""}`}>
      {mappedTodolists}
    </div>
  );
};
