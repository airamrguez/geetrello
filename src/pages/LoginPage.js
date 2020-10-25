import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../auth';
import './LoginPage.scss';

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
    <PageLayout className="centered">
      {loading && <div>Loading ...</div>}
      {error && <div>{getLoginErrorMessage(error)}</div>}
      <div className="LoginPage--form-container">
        <form className="LoginPage--form" onSubmit={onSubmit}>
          <Input
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="success" type="submit">
            Sign in
          </Button>
        </form>
      </div>
      <Link to="/signup">Register a new account</Link>
      {isAuthenticated && <Redirect to="/board" />}
    </PageLayout>
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
