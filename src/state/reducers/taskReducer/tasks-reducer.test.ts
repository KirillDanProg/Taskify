import {TasksInitialStateType, tasksReducer} from "./tasks-reducer";

let startState: TasksInitialStateType = {
    ["1"]: [
        {
            description: "string",
            title: "task one",
            completed: false,
            status: 0,
            priority: 1,
            startDate: "01.02.02",
            deadline: "string",
            id: "1",
            todoListId: "1",
            order: 1,
            addedDate: "01.01.01",
        },
        {
            description: "string",
            title: "task two",
            completed: false,
            status: 0,
            priority: 1,
            startDate: "01.02.02",
            deadline: "string",
            id: "2",
            todoListId: "1",
            order: 1,
            addedDate: "01.01.01",
        }
    ]
}

beforeEach(() => {
    startState = {
        ["1"]: [
            {
                description: "string",
                title: "task one",
                completed: false,
                status: 0,
                priority: 1,
                startDate: "01.02.02",
                deadline: "string",
                id: "1",
                todoListId: "1",
                order: 1,
                addedDate: "01.01.01",
            },
            {
                description: "string",
                title: "task two",
                completed: false,
                status: 0,
                priority: 1,
                startDate: "01.02.02",
                deadline: "string",
                id: "2",
                todoListId: "1",
                order: 1,
                addedDate: "01.01.01",
            }
        ]
    }
})

test("task should be added", () => {
    const action = {
        type: "ADD-TASK",
        todolistId: "1",
        task: {
            description: "string",
            title: "task three",
            completed: false,
            status: 0,
            priority: 1,
            startDate: "01.02.02",
            deadline: "string",
            id: "3",
            todoListId: "1",
            order: 1,
            addedDate: "01.01.01",
        }
    } as const

    const newState = tasksReducer(startState, action)

    expect(newState[action.todolistId].length).toBe(3)
    expect(newState[action.todolistId].some(task => task.id === action.task.id)).toBeTruthy()
})

test("task should be removed", () => {

    const action = {
        type: "DELETE-TASK",
        todolistId: "1",
        taskId: "2"
    } as const

    const newState = tasksReducer(startState, action)

    expect(newState[action.todolistId].length).toBe(1)
    expect(newState[action.todolistId].every(task => task.id !== action.taskId)).toBeTruthy()
})

test("tasks should be uploaded", () => {
    const action = {
        type: "FETCH-TASKS" as const,
        todolistId: "2",
        tasks: [
            {
                description: "string",
                title: "task three",
                completed: false,
                status: 0,
                priority: 1,
                startDate: "01.02.02",
                deadline: "string",
                id: "3",
                todoListId: "2",
                order: 1,
                addedDate: "01.01.01"
            },
            {
                description: "string",
                title: "task three",
                completed: false,
                status: 0,
                priority: 1,
                startDate: "01.02.02",
                deadline: "string",
                id: "4",
                todoListId: "2",
                order: 1,
                addedDate: "01.01.01"
            }
        ]
    }

    const newState = tasksReducer(startState, action)

    expect(newState[action.todolistId].length).toBe(2)
    expect(newState[action.todolistId].every(task => task.todoListId === action.todolistId)).toBeTruthy()
})

test("task should be updated", () => {
    const action = {
        type: "UPDATE-TASK" as const,
        todolistId: "1",
        taskId: "1",
        updatedTask: {
            description: "string",
            title: "updated task title",
            completed: false,
            status: 0,
            priority: 1,
            startDate: "01.02.02",
            deadline: "string",
            id: "1",
            todoListId: "1",
            order: 1,
            addedDate: "01.01.01",
        }
    }

    const newState = tasksReducer(startState, action)

    expect(newState[action.todolistId].filter(task => task.id === action.taskId)[0].title).toBe(action.updatedTask.title)
})