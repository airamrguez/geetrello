import { useEffect, useReducer, useCallback } from 'react';
import * as TasksApi from '../../api/tasks';

export default function useTasks(tasksListID) {
  const [{ tasks, loading, error }, dispatch] = useReducer(reducer, {
    tasks: [],
    loading: false,
    error: null,
  });

  const refetchTasks = useCallback(() => {
    const { promise, controller } = TasksApi.fetchTasks(tasksListID);
    (async () => {
      try {
        dispatch({ type: 'loading' });
        const tasks = (await promise) ?? [];
        dispatch({ type: 'success', payload: tasks });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
      }
    })();
    return { promise, controller };
  }, [tasksListID]);

  useEffect(() => {
    const { controller } = refetchTasks();
    return () => {
      controller.abort();
    };
  }, [refetchTasks]);

  const createTask = useCallback(
    async (body) => {
      try {
        dispatch({ type: 'loading' });
        const newTask = await TasksApi.postTask(tasksListID, body).promise;
        dispatch({
          type: 'success',
          payload: [...tasks, newTask],
        });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
      }
    },
    [tasks, tasksListID],
  );

  const updateTask = useCallback(
    async (taskID, body) => {
      try {
        dispatch({ type: 'loading' });
        await TasksApi.putTask(taskID, body).promise;
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
        return;
      }

      // TODO: Here we could check if the amount of updated items is greater than 0
      // instead of updating every time.
      try {
        dispatch({ type: 'loading' });
        const newTask = await TasksApi.fetchTask(taskID).promise;
        dispatch({
          type: 'success',
          payload: tasks.map((task) => (task.id === taskID ? newTask : task)),
        });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
        return;
      }
    },
    [tasks],
  );

  const deleteTask = useCallback(
    async (taskID) => {
      try {
        dispatch({ type: 'loading' });
        await TasksApi.deleteTask(tasksListID).promise;
        dispatch({
          type: 'success',
          payload: tasks.filter((task) => task.id !== taskID),
        });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
        return;
      }
    },
    [tasks, tasksListID],
  );

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    refetchTasks,
    loading,
    error,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'success':
      return { ...state, tasks: action.payload, loading: false };
    case 'failure':
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error(`invalid action type ${action.type}`);
  }
}
