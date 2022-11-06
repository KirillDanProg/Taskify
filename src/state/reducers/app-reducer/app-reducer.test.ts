import {AppInitialStateType, appReducer, CHANGE_APP_STATUS} from "./app-reducer";

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        status: "loading",
        error: null,
        isInitialized: false,
    }
})

test("app status should be changed", () => {
    const action = {
        type: CHANGE_APP_STATUS,
        status: "failed"
    } as const

    const newState = appReducer(startState, action)

    expect(newState.status).toBe(action.status)
})

test("app error should be changed", () => {
    const action = {
        type: "CHANGE-APP-ERROR",
        error: "some error"
    } as const
    const newState = appReducer(startState, action)

    expect(newState.error).toBe(action.error)
    expect(typeof newState.error).toBe("string")
})

