import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useAuth } from '../auth';

export default function LoginPage() {
  const { signin, isAuthenticated, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      signin(username, password);
    },
    [password, signin, username],
  );

  return (
    <div>
      I'm a login page I'm I authenticated? {isAuthenticated}
      {loading && <div>Loading ...</div>}
      {error && <div>{getLoginErrorMessage(error)}</div>}
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
      <Link to="/signup">Register a new account</Link>
      {isAuthenticated && <Redirect to="/board" />}
    </div>
  );
}

function getLoginErrorMessage(loginError) {
  switch (loginError.status) {
    case 401:
      return 'Incorrect password';
    case 500:
      return 'Internal error ocurred';
    default:
      return 'Unexpected error ocurred';
  }
}
