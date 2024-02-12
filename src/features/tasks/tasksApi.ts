import { apiSlice } from "../api/apiSlice";
import { ResponseType } from "../../api/todolists-api";
import { TaskType } from "./taskSlice";

type FetchTasksResType = {
  items: TaskType[];
  error: string;
};

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchTasks: build.query<TaskType[], { todolistId: string }>({
      query: ({ todolistId }) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
      transformResponse(response: FetchTasksResType) {
        return response.items;
      },
    }),
    addTask: build.mutation<
      ResponseType<{ item: TaskType }>,
      { todolistId: string; title: string }
    >({
      query: ({ title, todolistId }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<
      ResponseType<{}>,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<
      TaskType,
      { todolistId: string; taskId: string; updatedTask: TaskType }
    >({
      query: ({ todolistId, taskId, updatedTask }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;

export type UpdateTaskModelType = Partial<TaskType>;
