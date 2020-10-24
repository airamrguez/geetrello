import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth';

export default function SignupPage() {
  const { signup, success, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      signup(username, password);
    },
    [password, signup, username],
  );

  return (
    <div>
      I'm a register page
      {loading && <div>Loading ...</div>}
      {error && <div>{getSignupErrorMessage(error)}</div>}
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
      {success && <Redirect to="/login" />}
    </div>
  );
}

function getSignupErrorMessage(signupError) {
  switch (signupError.status) {
    case 500:
      return 'Internal error ocurred';
    default:
      return 'Error trying to register user';
  }
}
