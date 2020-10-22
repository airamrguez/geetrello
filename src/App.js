import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import AuthRoute from './components/AuthRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const BoardPage = lazy(() => import('./pages/BoardPage'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <AuthRoute path="/board">
              <BoardPage />
            </AuthRoute>
            <Redirect exact from="/" to="/board" />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
