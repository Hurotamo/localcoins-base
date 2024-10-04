import { createContext } from 'react';

export interface IUser {
  id: string;
  name: string;
  publicKey: string;
  email: string;
  country?: string;
}
export interface IAppContext {
  context: {
    user?: IUser;
    fetching?: boolean;
  };
  setUser?: (user: IUser) => void;
  setFetching?: (fetching: boolean) => void;
}

export const AppContext = createContext<IAppContext>({ context: {} });
