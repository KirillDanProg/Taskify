import React from 'react';
import styled from "styled-components";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolists} from "./todolists/Todolists";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {addTodolistTC} from "../../state/reducers/todolistReducer/todolists-reducer";

const Wrap = styled.div`
  color: ${(props) => props.theme.mainColor};
`

export const MainContent = (props: any) => {
    const dispatch = useAppDispatch()

    const addTodolistHandler = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <Wrap>
            <AddItemForm callback={addTodolistHandler} placeholder={"Add todolist"}/>
            <Todolists/>
        </Wrap>
    );
};

