import { fetchJSON, fetchText } from '../utils';

const BASE_URL = 'https://apitrello.herokuapp.com';

export function signin(username, password) {
  return fetchText(`${BASE_URL}/users/login`, {
    method: 'POST',
    body: { username, password },
  });
}

export function signup(username, password) {
  return fetchJSON(`${BASE_URL}/users`, {
    method: 'POST',
    body: { username, password },
  });
}

export function logout() {}
