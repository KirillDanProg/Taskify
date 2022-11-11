import React from 'react';
import {useAppSelector} from "../../../hooks/reduxHooks";
import {Todo} from "./todo/Todo";
import {TodolistType} from "../../../state/reducers/todolistReducer/todolists-reducer";

export const Todolists = () => {
    const todolists = useAppSelector(state => state.todolist)
//todo todotype
    const mappedTodolists = todolists.map((todo: any) => {
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

