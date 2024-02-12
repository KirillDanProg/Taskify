import { Todo } from "./todo/Todo";
import { useFetchTodoslistsQuery } from "../todoApi";
import s from "./Todolists.module.scss";

export const Todolists = () => {
  const { data: todolists = [] } = useFetchTodoslistsQuery();
  // console.log("todolists render");
  const mappedTodolists = todolists.map(({ id, title, entityStatus }) => {
    return (
      <Todo
        key={id}
        title={title}
        id={id}
        isLoading={false}
        entityStatus={entityStatus}
      />
    );
  });

  return <div className={s.mainContentBox}>{mappedTodolists}</div>;
};
