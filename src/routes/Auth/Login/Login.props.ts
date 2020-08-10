import { Dispatch } from 'react';

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginGeneratedProps {
  login: (credentials: Credentials) => void;
  pending: boolean;
  goToForgotPassword: () => void;
}
