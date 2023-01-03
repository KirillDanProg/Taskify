import React from 'react';
import {Todo} from "./todolists/todo/Todo";
import {useFetchTodoslistsQuery} from "./todoApi";

export const Todolists = () => {
    const {data: todolists = []} = useFetchTodoslistsQuery()

    const mappedTodolists = todolists.map((todo) => {
        return (
            <Todo key={todo.id} {...todo}/>
        )
    })

    return (
        <div className={"mainContentBox"}>
            {mappedTodolists}
        </div>
    );
};

