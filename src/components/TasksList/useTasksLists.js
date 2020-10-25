import { useReducer, useEffect, useCallback } from 'react';
import * as TasksListApi from '../../api/tasksList';

export default function useTasksList() {
  const [{ tasksLists, loading, error }, dispatch] = useReducer(reducer, {
    tasksLists: undefined,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const { promise, controller } = TasksListApi.fetchTasksList();
    (async () => {
      dispatch({ type: 'loading' });
      try {
        const tasksLists = await promise;
        dispatch({ type: 'success', payload: tasksLists });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  const createTasksList = useCallback(
    async (body) => {
      dispatch({ type: 'loading' });
      try {
        const newTasksList = await TasksListApi.postTasksList(body).promise;
        dispatch({
          type: 'success',
          payload: [...tasksLists, newTasksList],
        });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
      }
    },
    [tasksLists],
  );

  const updateTasksList = useCallback(async (tasksListID, body) => {
    dispatch({ type: 'loading' });
    try {
      await TasksListApi.putTasksList(tasksListID, body).promise;
    } catch (error) {
      dispatch({ type: 'failure', payload: error });
      return;
    }

    // TODO: Check if any task was modified or not and refetch only in that case.
    try {
      const tasksLists = await TasksListApi.fetchTasksList().promise;
      dispatch({
        type: 'success',
        payload: tasksLists,
      });
    } catch (error) {
      dispatch({ type: 'failure', payload: error });
    }
  }, []);

  const deleteTasksList = useCallback(
    async (tasksListID) => {
      dispatch({ type: 'loading' });
      try {
        await TasksListApi.deleteTasksList(tasksListID).promise;
        dispatch({
          type: 'success',
          payload: tasksLists.filter(
            (tasksList) => tasksList.id !== tasksListID,
          ),
        });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
        return;
      }
    },
    [tasksLists],
  );

  const deleteAllTasks = useCallback(
    async (tasksListID) => {
      dispatch({ type: 'loading' });
      try {
        await TasksListApi.deleteAllTasks(tasksListID).promise;
        dispatch({
          type: 'success',
          payload: tasksLists,
        });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
      }
    },
    [tasksLists],
  );

  return {
    tasksLists,
    loading,
    error,
    createTasksList,
    updateTasksList,
    deleteTasksList,
    deleteAllTasks,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'success':
      return {
        ...state,
        tasksLists: action.payload.map((tasksList) => ({
          ...tasksList,
          createdAt: new Date(tasksList.createdAt),
          updatedAt: new Date(tasksList.updatedAt),
        })),
        loading: false,
        error: null,
      };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`invalid action type ${action.type}`);
  }
}
