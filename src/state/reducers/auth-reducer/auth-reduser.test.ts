//
// beforeEach(() => {
//     startState = {
//         email: "xxx@mail.ru",
//         login: "sss",
//         id: 1
//     }
// })
//
// // test.skip("auth shåould be succeeded", () => {
// //     const action = {
// //         type: "AUTH-ME",
// //         data: {email: "qwer", password: "qwer"}
// //     } as const
// //
// //     // const newState = authReducer(startState, action)
// //
// //     // expect(newState.email).toBeTruthy()
// // })
//
// test("user login should be completed", () => {
//     const action = {
//         type: "LOGIN",
//         id: 24998
//     } as const
//
//     const newState = authReducer(startState, action)
//
//     expect(newState.id).toBe(action.id)
// })

export {}