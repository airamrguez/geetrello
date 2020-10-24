import React, { useReducer, useCallback } from 'react';
import TokenStorage from './TokenStorage';
import { AuthContext } from './useAuth';
import * as UsersApi from '../api/users';

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
  const [{ username, success, loading, error }, dispatch] = useReducer(
    reducer,
    {
      username: undefined,
      success: false,
      loading: false,
      error: null,
    },
  );

  const signup = useCallback(async (username, password) => {
    const { promise } = UsersApi.signup(username, password);
    try {
      dispatch({ type: 'loading' });
      await promise;
      dispatch({ type: 'success', payload: {} });
    } catch (error) {
      dispatch({ type: 'failure', payload: error });
    }
  }, []);

  const signin = useCallback(async (username, password) => {
    const { promise } = UsersApi.signin(username, password);
    try {
      dispatch({ type: 'loading' });
      const token = await promise;
      TokenStorage.set(token);
      dispatch({ type: 'success', payload: { username } });
    } catch (error) {
      dispatch({ type: 'failure', payload: error });
    }
  }, []);

  const signout = useCallback(() => {
    TokenStorage.remove();
    // Here we should log out from the server but no endpoint was given.
  }, []);

  return {
    username,
    success,
    loading,
    error,
    signin,
    signup,
    signout,
    isAuthenticated: TokenStorage.get() != null,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'failure':
      return { ...state, loading: false, error: action.payload };
    case 'success':
      return {
        ...state,
        success: true,
        loading: false,
        username: action.payload,
        error: null,
      };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}
