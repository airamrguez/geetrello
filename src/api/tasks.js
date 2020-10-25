import { createJSONFetcher } from '../utils';

const BASE_URL = 'https://apitrello.herokuapp.com';
const authJSONFetcher = createJSONFetcher({ includeAuth: true });

export function fetchTasks(taskListID) {
  return authJSONFetcher(`${BASE_URL}/list/tasks/${taskListID}`);
}

export function fetchTask(taskID) {
  return authJSONFetcher(`${BASE_URL}/tasks/${taskID}`);
}

export function postTask(taskListID, body) {
  return authJSONFetcher(`${BASE_URL}/tasks`, {
    method: 'POST',
    body: { ...body, idlist: taskListID },
  });
}

export function putTask(taskID, body) {
  return authJSONFetcher(`${BASE_URL}/tasks/${taskID}`, {
    method: 'PUT',
    body,
  });
}

export function deleteTask(taskID) {
  return authJSONFetcher(`${BASE_URL}/tasks/${taskID}`, {
    method: 'DELETE',
  });
}
