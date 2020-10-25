import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import { useAuth } from '../auth';
import Button from '../components/Button';
import Input from '../components/Input';
import './SignupPage.scss';

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
    <PageLayout className="centered">
      {loading && <div>Loading ...</div>}
      {error && <div>{getSignupErrorMessage(error)}</div>}
      <h2>Create your account</h2>
      <div className="SignupPage--form-container">
        <form className="SignupPage--form" onSubmit={onSubmit}>
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
            Sign up
          </Button>
        </form>
      </div>
      <Link to="/login">Already have an account?</Link>
      {success && <Redirect to="/login" />}
    </PageLayout>
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
