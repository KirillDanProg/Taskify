import { DomainTodolistType, todolistReducer} from "./todolists-reducer";

let initialState: DomainTodolistType[]
let emptyInitialState: DomainTodolistType[]


beforeEach(() => {

    initialState = [
        {
            id: "c2013730-de1d-4ba7-a714-e8fe36dc06e8",
            title: "new todolist",
            addedDate: "2022-11-03T10:41:29.073",
            order: -3,
            filter: "all"
        },
        {
            id: "c2013730-de1d-4ba7-a714-e8fe36dc06e9",
            title: "new todolist2",
            addedDate: "2022-11-03T10:41:29.074",
            order: -4,
            filter: "all"
        },
    ]

    emptyInitialState = []
})
test("todolist should be added", () => {

    const action = {
        type: "ADD-TODOLISTS" as const,

        todolist: {
            id: "c2013730-de1d-4ba7-a714-e8fe36dc0610",
            title: "new todolist3",
            addedDate: "2022-11-03T10:41:29.075",
            order: -5,
            filter: "all"
        }
    }
    const newState = todolistReducer(initialState, action)

    expect(newState.length).toBe(3)
    expect(newState[0].id).toBe(action.todolist.id)
})

test("todolist should be removed", () => {

    const action = {
        type: "DELETE-TODOLISTS",
        todolistId: "c2013730-de1d-4ba7-a714-e8fe36dc06e9"
    } as const

    const updatedState = todolistReducer(initialState, action)

    expect(updatedState.length).toBe(1)
    expect(initialState.every(el => el.id !== action.todolistId)).toBeFalsy()
    expect(updatedState.every(el => el.id !== action.todolistId)).toBeTruthy()
})

test("todolists should be uploaded", () => {
    const action = {
        type: "FETCH-TODOLISTS" as const,
        todolists: [
            {
                id: "3",
                title: "new todolist",
                addedDate: "2022-11-03T10:41:29.073",
                order: -3,
            },
            {
                id: "4",
                title: "new todolist",
                addedDate: "2022-11-03T10:41:29.073",
                order: -3,
            }
        ]
    }

    const newState = todolistReducer(emptyInitialState, action)

    expect(newState.length).toBe(2)
})