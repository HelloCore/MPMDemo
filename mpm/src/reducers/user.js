// @flow
import type { UserAction } from '../actions/user';

export type UserState = {
  username: string,
  password: string,
  isLoggedIn: boolean,
  isSavedPassword: boolean
};

const initialState: UserState = {
  username: '',
  password: '',
  isLoggedIn: true,
  isSavedPassword: false
};

export default function userReducer(
  state: UserState = initialState,
  action: UserAction
) {
  return state;
}
