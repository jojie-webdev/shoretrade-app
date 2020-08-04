import { Dispatch } from 'react';

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginGeneratedProps {
  credentials: Credentials;
  updateCredentials: Dispatch<Partial<Credentials>>;
  login: () => void;
}
