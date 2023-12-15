import React from 'react';
import { Todo } from "./todo/Todo";
import { useFetchTodoslistsQuery } from "../todoApi";

export const Todolists = () => {
    const { data: todolists = [], isLoading } = useFetchTodoslistsQuery()

    const mappedTodolists = todolists.map((todo) => {
        return (
            <Todo key={todo.id} {...todo} isLoading={isLoading} />
        )
    })

    return (
        <div className={"mainContentBox"}>
            {mappedTodolists}
        </div>
    );
};

