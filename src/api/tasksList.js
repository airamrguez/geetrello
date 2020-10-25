import { createJSONFetcher } from '../utils';

const BASE_URL = 'https://apitrello.herokuapp.com';
const authJSONFetcher = createJSONFetcher({ includeAuth: true });

export function fetchTasksList() {
  return authJSONFetcher(`${BASE_URL}/list`);
}

export function fetchTasks(taskListID) {
  return authJSONFetcher(`${BASE_URL}/list/${taskListID}`);
}

export function postTasksList(body) {
  return authJSONFetcher(`${BASE_URL}/list`, { method: 'POST', body });
}

export function putTasksList(taskListID, body) {
  return authJSONFetcher(`${BASE_URL}/list/${taskListID}`, {
    method: 'PUT',
    body,
  });
}

export function deleteTasksList(taskListID) {
  return authJSONFetcher(`${BASE_URL}/list/${taskListID}`, {
    method: 'DELETE',
  });
}

export function deleteAllTasks(taskListID) {
  return authJSONFetcher(`${BASE_URL}/list/tasks/${taskListID}`, {
    method: 'DELETE',
  });
}
