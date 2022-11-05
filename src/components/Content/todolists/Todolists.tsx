import React from 'react';
import {useAppSelector} from "../../../hooks/reduxHooks";
import {Todo} from "./todo/Todo";

export const Todolists = () => {
    const todolists = useAppSelector(state => state.todolist)

    const mappedTodolists = todolists.map(todo => {
        return (
            <Todo key={todo.id} {...todo}/>
        )
    })

    return (
        <div>
            {mappedTodolists}
        </div>
    );
};

