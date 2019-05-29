import React, { useState } from 'react';
import { AUTH_TOKEN } from '../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const signupMutation = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ history }) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleInputChange = setter => ({ target }) => setter(target.value);
  const toggleLogin = () => setLogin(prevLogin => !prevLogin);

  const confirm = async data => {
    const { token } = login ? data.login : data.signup;
    saveUserData(token);
    history.push('/');
  };

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={handleInputChange(setName)}
          />
        )}
        <input
          type="text"
          value={email}
          placeholder="Your email address"
          onChange={handleInputChange(setEmail)}
        />
        <input
          type="password"
          value={password}
          placeholder="Choose a safe password"
          onChange={handleInputChange(setPassword)}
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? loginMutation : signupMutation}
          variables={{ email, password, name }}
          onCompleted={data => confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
        <div className="pointer button" onClick={toggleLogin}>
          {login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </div>
  );
};

const saveUserData = token => localStorage.setItem(AUTH_TOKEN, token);

export default Login;
